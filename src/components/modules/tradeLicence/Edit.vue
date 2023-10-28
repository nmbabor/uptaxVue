<script>
import AreaService from '@/services/AreaService'
import TradeLicenceService from '@/services/TradeLicenceService'
export default {
  name: 'HondingEdit',
  data () {
    return {
      loading:false,
        unions: [],
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
        annual_tax:'',
        tax_due:'0',
        others_bill_details:'',
        others_bill:'0',
        union_id:'',
        word:'',
        bazar_id:'',
      },
      discount:{
        status:0,
        discount_amount:0,
        tax_year_id:''
      },
      validateErrors: [],
      tradeLicence:{},
      area:{}
    }
  },
  mounted(){

    this.getData()

  },
  methods: {
    async getData(){
      this.loading=true;
      if(this.$route.query.discount){
        this.discount.status=1;
      }
    
      const unionData = await TradeLicenceService.unions();
      this.unions = unionData.data;
      const response = await TradeLicenceService.show(this.$route.params.id,{year:this.$year})
      this.form = response.data.tradeLicence
      this.loadBazar()
      if(response.data.tax!='' && response.data.tax!=null){
         this.area = response.data.area
        this.tradeLicence = response.data.tax
        this.discount.discount_amount = response.data.tax.discount
        this.discount.tax_year_id = response.data.tax.id
      }
      this.loading=false;
      
    },
    async loadBazar(){
       if(this.form.union_id!==''){
        const allData = await AreaService.bazar(this.form.union_id)
        this.bazar = allData.data

       }else{
         this.bazar = []
       }

    },
   

    async validateBeforeSubmit() {
      this.$validator.validateAll()
        .then((resp)=>{
          if (!resp){
            return
          }
          else if (resp){

            TradeLicenceService.update(this.form,this.$route.params.id).then(success=>{

              this.$swal({
                type: 'success',
                title: 'Updated Successfully Done',
                showConfirmButton: false,
                timer: 1500
              })

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
    },
    async discountSubmit() {
        TradeLicenceService.update(this.discount,this.$route.params.id).then(success=>{
          this.$swal({
            type: 'success',
            title: 'Discount Added Successfully Done',
            showConfirmButton: false,
            timer: 1500
          })
          this.getData();

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
    },
    en2bn(replaceString) {
      replaceString = replaceString+"";
       if(replaceString==''){
         return '০';
       }
      var bn = ["-","১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯", "০"];
      var en = ["-","1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
      var regex; 
      for (var i = 0; i < en.length; i++) {
       regex = new RegExp(en[i], "g");
        replaceString = replaceString.replace(regex, bn[i]);
      }
      return replaceString;
    },


  }
}
</script>
<template>
    <div>
        <div class="row">

            <div class="col-lg-12">
                <div class="card">
                <div class="card-body">
                <div class="card-title"> ট্রেড লাইসেন্স তথ্য সংশোধন
                    <div class="pull-right">
                      <router-link tag="a" to="/trade-licence" class="btn btn-xs btn-light waves-effect waves-light m-1"><i class="fa fa-list"></i> সকল ট্রেড লাইসেন্স </router-link>
                    </div>
                </div>
      
                <hr>
              <div v-if="loading" class="col-md-12" style="text-align:center;position:absolute;background: rgb(30, 71, 108,.8);z-index:9;padding:100px;left:0;height:85%">
                <img style="width:100px" src="/static/assets/images/blue.gif" alt="Loading..">
              </div>
                <form method="POST" @submit.prevent="discountSubmit" enctype="multipart/form-data" v-if="discount.status==1">
                
                  <div class="col-md-12 main-table">
                     <h5 class="text-center">{{area.union_name}} ইউনিয়ন পরিষদ </h5>
                    <h6 class="text-center"> উপজেলাঃ{{area.upazila_name}} , জেলাঃ {{area.district_name}} <br>
                    <small> <span>{{en2bn(tradeLicence.year_name)}}</span> (<span>{{tradeLicence.type_name}}</span> ) </small></h6>
                  <table class="table table-bordered table-striped bill-table" >
                   <tr>
                    <th> ক্রমিক নং <b>:</b> </th>
                    <td width="50%">{{en2bn(tradeLicence.invoice)}}</td>
                  </tr>
                  <tr>
                    <th> হোল্ডিং নং <b>:</b> </th>
                    <td>{{en2bn(tradeLicence.holding_no)}}</td>
                  </tr>
                  <tr>
                    <th> করদাতার নাম <b>:</b> </th>
                    <td>{{tradeLicence.owner_name}}</td>
                  </tr>
                  <tr>
                    <th> পিতা/স্বামী <b>:</b> </th>
                    <td>{{tradeLicence.father_or_husband}}</td>
                  </tr>
                  <tr>
                    <th> প্রতিষ্ঠানের নাম <b>:</b> </th>
                    <td>{{tradeLicence.organization_name}}</td>
                  </tr>
                  <tr>
                    <th> ওয়ার্ড নং <b>:</b> </th>
                    <td>{{en2bn(tradeLicence.word)}}</td>
                  </tr>
                  <tr>
                    <th> বাজারের নাম <b>:</b> </th>
                    <td>{{tradeLicence.bazar_name}}</td>
                  </tr>
                  <tr>
                    <th colspan="2" style="text-align:center"> করের বিবরণ </th>
                  </tr>
                  <tr>
                    <th> পুর্বের বকেয়া<b>:</b> </th>
                    <td>{{en2bn(tradeLicence.prev_due)}}</td>
                  </tr>
                  <tr>
                    <th> বার্ষিক কর <small>({{en2bn(tradeLicence.year_name)}})</small> <b>:</b> </th>
                    <td>{{en2bn(tradeLicence.tax)}}</td>
                  </tr>
                  
                  
                  <tr v-if="tradeLicence.total_paid>0">
                    <th> মোট জমা<b>:</b> </th>
                    <td>{{en2bn(tradeLicence.total_paid)}}</td>
                  </tr>
                  <tr>
                    <th> কর ডিসকাউন্ট <b>:</b> </th>
                    <td><input type="number" min="0" :max="(tradeLicence.total_amount - tradeLicence.total_paid)" name="discount_amount" v-model="discount.discount_amount" placeholder="কর ডিসকাউন্ট" class="form-control"></td>
                  </tr>
                  <tr>
                    <th> মোট টাকা<b>:</b> </th>
                    <td>{{en2bn((tradeLicence.total_amount - tradeLicence.total_paid ))}}</td>
                  </tr>
              </table>
              </div>
                  
                  <div class="form-group">
                      <button type="button" @click="discountSubmit" class="btn btn-light px-5"><i class="fa fa-save"></i> সাবমিট </button>
                  </div>

                </form>
                <form @submit.prevent="validateBeforeSubmit" enctype="multipart/form-data" v-if="discount.status==0">
                  
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
                      <label for="business_type">ব্যবসার ধরণ</label>
                      <input type="text" name="business_type" v-model="form.business_type" id="business_type" placeholder="ব্যবসার ধরণ" class="form-control">
                  </div>
                  <div class="form-group col-md-3">
                      <label for="annual_tax">বার্ষিক লাইসেন্স ফি</label>
                      <input type="number" min="0" v-model="form.annual_tax" name="annual_tax" id="annual_tax" placeholder="বার্ষিক লাইসেন্স ফি" v-validate="'required'" :class="{'form-control': true, 'text-danger': errors.has('annual_tax') }">
                      <span v-show="errors.has('annual_tax')" class="help text-danger">{{ errors.first('annual_tax') }}</span>
                      <span v-if="validateErrors.annual_tax" class="help text-danger">{{validateErrors.annual_tax[0] }}</span>
                  </div>
                  <div class="form-group col-md-3">
                      <label for="tax_due">বকেয়া ফি</label>
                      <input type="number" min="0" v-model="form.tax_due" name="tax_due" id="tax_due" placeholder="বকেয়া কর" :class="{'form-control': true, 'text-danger': errors.has('tax_due') }">
                      <span v-show="errors.has('tax_due')" class="help text-danger">{{ errors.first('tax_due') }}</span>
                      <span v-if="validateErrors.tax_due" class="help text-danger">{{validateErrors.tax_due[0] }}</span>
                  </div>
                </div>
                
                <div class="row">
                  
                  <div class="form-group col-md-3">
                      <label for="others_bill_details">অন্যান্য বিলের নাম</label>
                      <input type="text" v-model="form.others_bill_details" name="others_bill_details" id="others_bill_details" placeholder="অন্যান্য বিলের নাম" class="form-control">
                  </div>
                  <div class="form-group col-md-3">
                      <label for="others_bill">অন্যান্য বিল </label>
                      <input type="number" min="0" v-model="form.others_bill" name="others_bill" id="others_bill" placeholder="অন্যান্য বিল" :class="{'form-control': true, 'text-danger': errors.has('others_bill') }">
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

