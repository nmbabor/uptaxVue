<script>
import AreaService from '@/services/AreaService'
import TradeLicenceService from '@/services/TradeLicenceService'
import TaxCollectionService from '@/services/TaxCollectionService'
export default {
  name: 'createTradeLicence',
  data () {
    return {
      years: [],
      bazar: [],
      form: {
        trade_licence_no:'',
        holding_no:'',
        owner_name:'',
        organization_name:'',
        business_type:'',
        father_or_husband:'',
        mother:'0',
        mobile:'0',
        religion:'ইসলাম',
        gender:'পুরুষ',
        nid:'',
        birth_date:'',
        tax_due:'0',
        others_bill_details:'',
        others_bill:'0',
        union_id:'',
        word:'',
        bazar_id:'',
        present_address:'',
        permanent_address:'',
        own_rent:'', // is own / rent
        signboard_length:'',
        business_start_year:'',
        annual_tax:0,
        signboard_fee:0,
        business_profession_tax:0,
        income_tax:0,
        vat:0,
        service_charge:0,
        correction_fee:0,
        tin_number:'',
        bin_number:'',
      },
      validateErrors: [],
      isPresentSame: false
    }
  },
  mounted(){
    this.getData()
  },
  methods: {
    async getData(){
      this.form.union_id = this.$union_id
      this.loadBazar();
       const yearsData = await TaxCollectionService.years()
      this.years = yearsData.data
    },
    async loadBazar(){
       if(this.form.union_id!==''){
        const allData = await AreaService.bazar(this.form.union_id)
        this.bazar = allData.data

       }else{
         this.bazar = []
       }

    },
    permanentAddressSet(){
      if(!this.isPresentSame){
        this.form.permanent_address = this.form.present_address;
      }
    },

    async validateBeforeSubmit() {
      this.$validator.validateAll()
        .then((resp)=>{
          if (!resp){
            return
          }
          else if (resp){
            let day = new Date(this.form.birth_date).getDate()
              let month = new Date(this.form.birth_date).getMonth()+1
              if(month<10){
                month = '0'+month
              }
              if(day<10){
                day = '0'+day
              }
              let year = new Date(this.form.birth_date).getFullYear()
              let date = year+'-'+month+'-'+day
              this.form.birth_date = date
            TradeLicenceService.store(this.form).then(success=>{

              this.$swal({
                type: 'success',
                title: 'Added Successfully Done',
                showConfirmButton: false,
                timer: 1500
              })
              //this.$router.push({ name: 'users' })
            }).catch(err=>{
              console.log(err.response.data)
              if(err.response.data.error){
                this.validateErrors=err.response.data.error
              }else{
                this.$swal({
                  type: 'error',
                  title: "Something Error Found!",
                  showConfirmButton: true
                })
              }

            })
          }
        })
        .catch(function(e) {
          console.log(e)
        })
    }
  }
}
</script>
<style>
.input-group>.form-control{width: 1% !important}
</style>
<template>
    <div>
        <div class="row">

            <div class="col-lg-12">
                <div class="card">
                <div class="card-body">
                <div class="card-title"> নতুন ট্রেড লাইসেন্সের তথ্য সংযোজন
                    <div class="pull-right">
                      <router-link tag="a" to="/trade-licence" class="btn btn-xs btn-light waves-effect waves-light m-1"><i class="fa fa-list"></i> সকল ট্রেড লাইসেন্স </router-link>
                    </div>
                </div>
                <hr>
                <form method="POST" enctype="multipart/form-data">
                    
                    <div class="row">
                        <div class="col-md-3">
                            <div class="form-group">
                                <label class="col-md-12 no-padding"> বাজার </label>
                                <div class="col-md-12 no-padding">
                                    <select class="form-control" required v-model="form.bazar_id">
                                    <option value=""> -বাজার নির্বাচন করুন- </option>
                                    <option v-for="(data,i) in bazar" :key="i" :value="data.id"> {{data.bn_name}} </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label class="col-md-12 no-padding"> ওয়ার্ড নাম্বার </label>
                                <div class="col-md-12 no-padding">
                                  <select class="form-control" required v-model="form.word">
                                    <option value=""> -ওয়ার্ড- </option>
                                    <option value="1"> 1 </option>
                                    <option value="2"> 2 </option>
                                    <option value="3"> 3 </option>
                                    <option value="4"> 4 </option>
                                    <option value="5"> 5 </option>
                                    <option value="6"> 6 </option>
                                    <option value="7"> 7 </option>
                                    <option value="8"> 8 </option>
                                    <option value="9"> 9 </option>
                                </select>

                                </div>
                            </div>
                        </div>
                        
                        <div class="form-group col-md-3">
                            <label for="trade_licence_no"> ট্রেড লাইসেন্স নম্বর </label>
                            <input type="number" step="any" min="1" name="trade_licence_no" required v-model="form.trade_licence_no" id="trade_licence_no" placeholder="ট্রেড লাইসেন্স নম্বর" v-validate="'required'" :class="{'form-control': true, 'text-danger': errors.has('trade_licence_no') }">
                            <span v-show="errors.has('trade_licence_no')" class="help text-danger">{{ errors.first('trade_licence_no') }}</span>
                            <span v-if="validateErrors.trade_licence_no" class="help text-danger">{{validateErrors.trade_licence_no[0] }}</span>
                        </div>
                        <div class="form-group col-md-3">
                            <label for="holding_no">হোল্ডিং নাম্বার</label>
                            <input type="number" step="any" min="1" name="holding_no" required v-model="form.holding_no" id="holding_no" placeholder="হোল্ডিং নাম্বার" v-validate="'required'" :class="{'form-control': true, 'text-danger': errors.has('holding_no') }">
                            <span v-show="errors.has('holding_no')" class="help text-danger">{{ errors.first('holding_no') }}</span>
                            <span v-if="validateErrors.holding_no" class="help text-danger">{{validateErrors.holding_no[0] }}</span>
                        </div>
                        
                    </div>
                <div class="row">
                  <div class="form-group col-md-3">
                        <label for="organization_name"><span> প্রতিষ্ঠানের নাম</span></label>
                        <input type="text" v-model="form.organization_name" name="organization_name" id="organization_name" :class="{'form-control': true, 'text-danger': errors.has('organization_name') }">
                        <span v-show="errors.has('organization_name')" class="help text-danger">{{ errors.first('organization_name') }}</span>
                        <span v-if="validateErrors.organization_name" class="help text-danger">{{validateErrors.organization_name[0] }}</span>
                    </div>
                    <div class="form-group col-md-3">
                        <label for="owner_name"> প্রোপাইটরের নাম</label>
                        <input type="text" name="owner_name" required v-model="form.owner_name" id="owner_name" placeholder="প্রোপাইটরের নাম" v-validate="'required'" :class="{'form-control': true, 'text-danger': errors.has('owner_name') }">
                        <span v-show="errors.has('owner_name')" class="help text-danger">{{ errors.first('owner_name') }}</span>
                        <span v-if="validateErrors.owner_name" class="help text-danger">{{validateErrors.owner_name[0] }}</span>
                    </div>
                    <div class="form-group col-md-3">
                          <label for="input-2">মোবাইল নাম্বার</label>
                          <input type="number" min="0" required v-model="form.mobile" name="mobile" id="input-2" placeholder="মোবাইল নাম্বার" v-validate="'required'" :class="{'form-control': true, 'text-danger': errors.has('mobile') }">
                          <span v-show="errors.has('mobile')" class="help text-danger">{{ errors.first('mobile') }}</span>
                          <span v-if="validateErrors.mobile" class="help text-danger">{{validateErrors.mobile[0] }}</span>
                      </div>
                    
                    <div class="form-group col-md-3">
                        <label for="father_or_husband">বাবা/স্বামী</label>
                        <input type="text" required v-model="form.father_or_husband" name="father_or_husband" id="father_or_husband" placeholder="বাবা/স্বামী" v-validate="'required'" :class="{'form-control': true, 'text-danger': errors.has('father_or_husband') }">
                        <span v-show="errors.has('father_or_husband')" class="help text-danger">{{ errors.first('father_or_husband') }}</span>
                        <span v-if="validateErrors.father_or_husband" class="help text-danger">{{validateErrors.father_or_husband[0] }}</span>
                    </div>

                </div>
                <div class="row">
                  <div class="form-group col-md-3">
                      <label for="business_type">ব্যবসার ধরণ</label>
                      <input type="text" name="business_type" v-model="form.business_type" id="business_type" placeholder="ব্যবসার ধরণ" class="form-control">
                  </div>
                    <div class="form-group col-md-3">
                        <label for="gender"> মালিকের লিঙ্গ</label>
                        <select name="gender" v-validate="'required'" :class="{'form-control': true, 'text-danger': errors.has('gender') }" v-model="form.gender" required="">
                              <option value=''>-লিঙ্গ নির্বাচন করুন-</option>
                              <option value="পুরুষ">পুরুষ</option>
                              <option value="মহিলা">মহিলা</option>
                              <option value="অন্যান্য">অন্যান্য</option>
                          </select>
                        <span v-show="errors.has('gender')" class="help text-danger">{{ errors.first('gender') }}</span>
                        <span v-if="validateErrors.gender" class="help text-danger">{{validateErrors.gender[0] }}</span>
                    </div>
                     <div class="form-group col-md-3">
                        <label for="nid">জাতীয় পরিচয়পত্র/ জন্ম নিবন্ধন নম্বর</label>
                        <input type="number" min="0" name="nid" required v-model="form.nid" id="nid" placeholder="জাতীয় পরিচয়পত্র/ জন্ম নিবন্ধন নম্বর" v-validate="'required'" :class="{'form-control': true, 'text-danger': errors.has('nid') }">
                        <span v-show="errors.has('nid')" class="help text-danger">{{ errors.first('nid') }}</span>
                        <span v-if="validateErrors.nid" class="help text-danger">{{validateErrors.nid[0] }}</span>
                    </div>
                    <div class="form-group col-md-3">
                        <label for="birth_date">জন্ম তারিখ</label>
                        <vuejs-datepicker style="width:100%" type="date" format="dd-MM-yyyy" :input-class="{'form-control': true, 'text-danger': errors.has('birth_date') }" name="birth_date"  v-model="form.birth_date" placeholder="জন্ম তারিখ"></vuejs-datepicker>
                        <span v-show="errors.has('birth_date')" class="help text-danger">{{ errors.first('birth_date') }}</span>
                        <span v-if="validateErrors.birth_date" class="help text-danger">{{validateErrors.birth_date[0] }}</span>
                    </div>
                    

                </div>
                <div class="row">
                  <div class="form-group col-md-5">
                      <label for="present_address"> বর্তমান ঠিকানা  </label>
                      <input type="text" name="present_address" v-model="form.present_address" id="present_address" placeholder="বর্তমান ঠিকানা" class="form-control">
                  </div>
                  <div class="form-group col-md-4">
                      <label for="permanent_address">স্থায়ী ঠিকানা</label>
                      <div class="input-group">
                        <label class="input-group-text">
                          <input type="checkbox" v-model="isPresentSame" @click="permanentAddressSet" class="mr-2">
                          একই
                        </label>
                         <input type="text" v-model="form.permanent_address" name="permanent_address" id="permanent_address" placeholder="স্থায়ী ঠিকানা"class="form-control">
                      </div><!-- /input-group -->
                  </div>
                  <div class="form-group col-md-3">
                        <label for="religion">ধর্ম</label>
                        <select name="religion" v-validate="'required'" :class="{'form-control': true, 'text-danger': errors.has('religion') }" v-model="form.religion" required="">
                              <option value=''>-ধর্ম নির্বাচন করুন-</option>
                              <option value="ইসলাম" selected>ইসলাম</option>
                              <option value="সনাতন(হিন্দু)">সনাতন(হিন্দু)</option>
                              <option value="খৃষ্টান">খৃষ্টান</option>
                              <option value="বৌদ্ধ">বৌদ্ধ</option>
                              <option value="অন্যান্য">অন্যান্য</option>
                          </select>
                        <span v-show="errors.has('religion')" class="help text-danger">{{ errors.first('religion') }}</span>
                        <span v-if="validateErrors.religion" class="help text-danger">{{validateErrors.religion[0] }}</span>
                    </div>
                </div>
                <div class="row">
                  <div class="form-group col-md-3">
                      <label for="business_start_year">ব্যবসার শুরু করার অর্থ বছর</label>
                       <select class="form-control" required v-model="form.business_start_year">
                          <option value=""> -বছর নির্বাচন করুন- </option>
                          <option v-for="(data,i) in years" :key="i" :value="data.id"> {{data.name}} </option>
                        </select>
                  </div>
                  <div class="form-group col-md-3">
                      <label for="own_rent">দোকান ঘরের মালিকানা</label>
                      <select name="own_rent" v-model="form.own_rent" required="" class="form-control">
                          <option value='' selected>-সিলেক্ট মালিকানা-</option>
                          <option value="নিজস্ব">নিজস্ব</option>
                          <option value="ভাড়া">ভাড়া</option>
                      </select>
                  </div>
                  <div class="form-group col-md-3">
                      <label for="signboard_length"> সাইনবোর্ড এর আয়তন </label>
                      <input type="text" v-model="form.signboard_length" name="signboard_length" id="signboard_length" class="form-control">
                  </div>
                   <div class="form-group col-md-3">
                      <label for="signboard_fee">সাইনবোর্ড ফি</label>
                      <input type="number" min="0" v-model="form.signboard_fee" name="signboard_fee" id="signboard_fee" placeholder="" v-validate="'required'" :class="{'form-control': true, 'text-danger': errors.has('signboard_fee') }">
                      <span v-show="errors.has('signboard_fee')" class="help text-danger">{{ errors.first('signboard_fee') }}</span>
                      <span v-if="validateErrors.signboard_fee" class="help text-danger">{{validateErrors.signboard_fee[0] }}</span>
                  </div>
                </div>
                <div class="row">
                 
                  <div class="form-group col-md-3">
                      <label for="annual_tax">ট্রেড লাইসেন্স ফি</label>
                      <input type="number" min="0" v-model="form.annual_tax" name="annual_tax" id="annual_tax" placeholder="" v-validate="'required'" :class="{'form-control': true, 'text-danger': errors.has('annual_tax') }">
                      <span v-show="errors.has('annual_tax')" class="help text-danger">{{ errors.first('annual_tax') }}</span>
                      <span v-if="validateErrors.annual_tax" class="help text-danger">{{validateErrors.annual_tax[0] }}</span>
                  </div>
                  <div class="form-group col-md-3">
                      <label for="business_profession_tax">ব্যবসা ও পেশা বৃত্তির উপর কর</label>
                      <input type="number" min="0" v-model="form.business_profession_tax" name="business_profession_tax" id="business_profession_tax" placeholder="" v-validate="'required'" :class="{'form-control': true, 'text-danger': errors.has('business_profession_tax') }">
                      <span v-show="errors.has('business_profession_tax')" class="help text-danger">{{ errors.first('business_profession_tax') }}</span>
                      <span v-if="validateErrors.business_profession_tax" class="help text-danger">{{validateErrors.business_profession_tax[0] }}</span>
                  </div>
                  <div class="form-group col-md-3">
                      <label for="income_tax">আয় কর / উৎস কর</label>
                      <input type="number" min="0" v-model="form.income_tax"  v-validate="'required'" name="income_tax" id="income_tax" placeholder="" :class="{'form-control': true, 'text-danger': errors.has('income_tax') }">
                      <span v-show="errors.has('income_tax')" class="help text-danger">{{ errors.first('income_tax') }}</span>
                      <span v-if="validateErrors.income_tax" class="help text-danger">{{validateErrors.income_tax[0] }}</span>
                  </div>
                  <div class="form-group col-md-3">
                      <label for="vat">ভ্যাট</label>
                      <input type="number" min="0"  v-validate="'required'" v-model="form.vat" name="vat" id="vat" placeholder="" :class="{'form-control': true, 'text-danger': errors.has('vat') }">
                      <span v-show="errors.has('vat')" class="help text-danger">{{ errors.first('vat') }}</span>
                      <span v-if="validateErrors.vat" class="help text-danger">{{validateErrors.vat[0] }}</span>
                  </div>
                  
                </div>
                
                <div class="row">
                  <div class="form-group col-md-3">
                      <label for="service_charge">সার্ভিস চার্জ</label>
                      <input type="number" min="0"  v-validate="'required'" v-model="form.service_charge" name="service_charge" id="service_charge" placeholder="" :class="{'form-control': true, 'text-danger': errors.has('service_charge') }">
                      <span v-show="errors.has('service_charge')" class="help text-danger">{{ errors.first('service_charge') }}</span>
                      <span v-if="validateErrors.service_charge" class="help text-danger">{{validateErrors.service_charge[0] }}</span>
                  </div>
                   <div class="form-group col-md-3">
                      <label for="correction_fee"> সংশোধন ফি </label>
                      <input type="number" min="0" v-model="form.correction_fee" name="correction_fee" id="correction_fee" placeholder="" :class="{'form-control': true, 'text-danger': errors.has('correction_fee') }">
                      <span v-show="errors.has('correction_fee')" class="help text-danger">{{ errors.first('correction_fee') }}</span>
                      <span v-if="validateErrors.correction_fee" class="help text-danger">{{validateErrors.correction_fee[0] }}</span>
                  </div>
                  <div class="form-group col-md-3">
                      <label for="tin_number">টিন নাম্বার</label>
                      <input type="text" v-model="form.tin_number" name="tin_number" id="tin_number" placeholder="টিন নাম্বার" class="form-control">
                  </div>
                  <div class="form-group col-md-3">
                      <label for="bin_number">বিন নাম্বার</label>
                      <input type="text" v-model="form.bin_number" name="bin_number" id="bin_number" placeholder="বিন নাম্বার" class="form-control">
                  </div>
                 
                </div>

                <div class="form-group">
                    <button type="button" @click="validateBeforeSubmit" class="btn btn-light px-5"><i class="fa fa-save"></i> সাবমিট </button>
                </div>
                </form>
                </div>
                </div>
            </div>
        </div>
  </div>
</template>

