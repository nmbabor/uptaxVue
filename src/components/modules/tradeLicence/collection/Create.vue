<script>
import AreaService from '@/services/AreaService'
import LicenseTaxCollectionService from '@/services/LicenseTaxCollectionService'
import vSelect from 'vue-select'
export default {
  name: 'TaxCollectionCreate',
  data () {
    return {
        allData:[],
        bazar: [],
        allLicense: [],
        loading:false,
      form: {
        holding_no:'',
        trade_licence_no:'',
        owner_name:'',
        organization_name:'',
        business_type:'',
        father_or_husband:'',
        bazar_name:'',
        mother:'',
        mobile:'',
        tax:'',
        business_profession_tax:'',
        signboard_fee:'',
        income_tax:'',
        vat:'',
        service_charge:'',
        correction_fee:'',
        prev_due:'',
        discount:'0',
        discount_amount:0,
        total_amount:'',
        main_amount:'',
        paid_amount:'',
        union_id:'',
        invoice:'',
        word:'',
        bazar_id:'',
        year_name:'',
        value:'',
        sms_status:0
      },
      year:this.$year,

      trade_licence_id:{},
      years:[],
      validateErrors: [],
    }
  },
  mounted(){

    this.getData()

  },
  components: {
    'v-select': vSelect
  },
  methods: {
    async getData(){
      const yearsData = await LicenseTaxCollectionService.years()
      this.years = yearsData.data
      this.form.union_id = this.$union_id
      this.loadBazar ()
       if(this.$route.query.id){
        this.trade_licence_id.value = this.$route.query.id
        this.singleHoldingData()
       }
    },

    async singleHoldingData(){
       this.loading=true;
      const data = await LicenseTaxCollectionService.singleLicense(this.trade_licence_id.value,{union_id:this.$union_id,year:this.year})
      console.log(data.data)
      this.form = data.data
      this.form.paid_amount = parseInt(this.form.total_amount-this.form.total_paid)
      this.form.discount_amount = parseInt(this.form.discount)
       this.loading=false;
      if(this.$route.query.id){
        this.licenses(this.form.trade_licence_no)
      }
      
    },
     async licenses(trade_licence_no=''){
       this.loading=true;
       var value = $('.vs__search').val();
       if(trade_licence_no!=''){
         value =trade_licence_no;
       }
          let params = {
            value,
            bazar_id: this.form.bazar_id,
            year: this.year,
            union_id: this.form.union_id,

          };
          LicenseTaxCollectionService.licenses(params).then(response=>{
              this.allLicense = response.data
              this.loading=false;
          }).catch(err=>{
              this.loading=false;
          })
    },
    async loadBazar(){
       if(this.form.union_id!==''){
        const allData = await AreaService.bazar(this.form.union_id)
        this.bazar = allData.data

       }else{
         this.bazar = []
       }
    },
async submitButton() {
 console.log("submit Button")
},
    async validateBeforeSubmit() {
     
       this.$validator.validateAll()
        .then((resp)=>{
          if (!resp){
            console.log("Missing")
            return
          }
          else if (resp){

        let day = new Date(this.form.payment_date).getDate()
        let month = new Date(this.form.payment_date).getMonth()+1
        if(month<10){
          month = '0'+month
        }
        if(day<10){
          day = '0'+day
        }
        let year = new Date(this.form.payment_date).getFullYear()
        let date = year+'-'+month+'-'+day
        this.form.payment_date = date
         if(this.form.paid_amount > parseInt(this.form.total_amount-this.form.total_paid+parseInt(this.form.discount)-this.form.discount_amount)){
          this.form.paid_amount = parseInt(this.form.total_amount-this.form.total_paid+parseInt(this.form.discount)-this.form.discount_amount);
         }
        if(this.form.discount_amount>0){
          if(this.form.paid_amount!= parseInt(this.form.total_amount-this.form.total_paid+parseInt(this.form.discount)-this.form.discount_amount)){
          this.form.paid_amount = parseInt(this.form.total_amount-this.form.total_paid+parseInt(this.form.discount)-this.form.discount_amount);
            this.$swal({
                type: 'error',
                title: "ডিসকাউন্ট এর জন্য সম্পুর্ন টাকা পরিশোধ করতে হবে।",
                showConfirmButton: true
              })
            return false;
          }
        }
        let input = {
        trade_licence_list_id:this.form.id,
          payment_date:this.form.payment_date,
          paid_amount:this.form.paid_amount,
          total_amount:this.form.total_amount,
          discount:this.form.discount_amount,
          receipt_no:this.form.invoice,
          sms_status:this.form.sms_status?1:0
        }
        LicenseTaxCollectionService.store(input).then(success=>{
              this.$swal({
                type: 'success',
                title: 'সফলভাবে সংগ্রহ করা হল',
                showConfirmButton: false,
                timer: 1500
              })
               console.log(success.data)
            //tax-collection/2?year=3
            //this.$router.push({ path: '/tax-collection/'+success.data.id+'?year='+this.year })
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

  }
}

</script>
<template>
    <div>
        <div class="row">

            <div class="col-lg-12">
                <div class="card">
                <div class="card-body">
                <div class="card-title"> ট্রেড লাইসেন্স ট্যাক্স সংগ্রহ
                    <div class="pull-right">
                      <router-link tag="a" to="/tax-collection" class="btn btn-xs btn-light waves-effect waves-light m-1"><i class="fa fa-list"></i> সকল ট্যাক্স </router-link>
                    </div>
                </div>
                <hr>
                <form method="POST" enctype="multipart/form-data">

                    <div class="row">
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="col-md-12 no-padding"> বাজার </label>
                                <div class="col-md-12 no-padding">
                                    <select class="form-control" @change="licenses()" required v-model="form.bazar_id">
                                    <option value=""> -বাজার নির্বাচন করুন- </option>
                                    <option v-for="(data,i) in bazar" :key="i" :value="data.id"> {{data.bn_name}} </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="col-md-12 no-padding"> বছর </label>
                                <div class="col-md-12 no-padding">
                                    <select class="form-control" @change="licenses()" required v-model="year">
                                    <option value=""> -বছর নির্বাচন করুন- </option>
                                    <option v-for="(data,i) in years" :key="i" :value="data.id"> {{data.name}} </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                          <div class="form-group">
                              <label class="col-md-12 no-padding"> হোল্ডিং সার্চ করুন </label>
                              <div class="col-md-12 no-padding">
                                  <v-select class="form-multiple-select" @keypress.native="licenses()" v-on:input="singleHoldingData()" placeholder="হোল্ডিং নির্বাচন করুন" v-model="trade_licence_id" :options="allLicense"></v-select>
                              </div>
                          </div>
                      </div>
                        
                    </div>
                    <div v-if="loading" class="col-md-12" style="text-align:center;position:absolute;    background: rgb(30, 71, 108,.8);z-index:9;padding:100px;left:0;height:85%">
                      <img style="width:100px" src="/static/assets/images/blue.gif" alt="Loading..">
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <h6> হোল্ডিং তথ্য </h6>
                        <div class="table-responsive">
                          <table class="table table-bordered">
                            <tr>
                              <td width="40%">ট্রেড লাইসেন্স নং</td>
                              <td>{{form.trade_licence_no}}</td>
                            </tr>
                            <tr>
                              <td> ব্যবসা প্রতিষ্ঠানের নাম </td>
                              <td>{{form.organization_name}}</td>
                            </tr>
                            <tr>
                              <td> প্রতিষ্ঠানের মালিকের নাম</td>
                              <td>{{form.owner_name}}</td>
                            </tr>
                            <tr>
                              <td width="40%">হোল্ডিং নাম্বার</td>
                              <td>{{form.holding_no}}</td>
                            </tr>
                            <tr>
                              <td>মোবাইল নাম্বার</td>
                              <td>{{form.mobile}}</td>
                            </tr>
                            
                            <tr>
                              <td>পিতা/স্বামীর নাম</td>
                              <td>{{form.father_or_husband}}</td>
                            </tr>
                            <tr>
                              <td>মাতার নাম</td>
                              <td>{{form.mother}}</td>
                            </tr>
                            <tr>
                              <td> ব্যবসার ধরণ</td>
                              <td>{{form.business_type}}</td>
                            </tr>
                            <tr>
                              <td> বাজারের নাম</td>
                              <td>{{form.bazar_name}}</td>
                            </tr>
                            <tr>
                                <th colspan="2"> করের বিবরণ : </th>
                            </tr>
                            <tr> 
                              <td> (ক) ট্রেড লাইসেন্স ফি</td>
                              <td>{{form.tax}}</td>
                            </tr>
                            <tr> 
                              <td> (খ) সাইনবোর্ড ফি </td>
                              <td>{{form.signboard_fee}}</td>
                            </tr>
                            <tr> 
                              <td> (গ) ব্যবসা ও পেশা বৃত্তির উপর কর </td>
                              <td>{{form.business_profession_tax}}</td>
                            </tr>
                            <tr> 
                              <td> (ঘ) আয় কর / উৎস কর </td>
                              <td>{{form.income_tax}}</td>
                            </tr>
                            <tr> 
                              <td> (ঙ) ভ্যাট </td>
                              <td>{{form.vat}}</td>
                            </tr>
                            <tr> 
                              <td> (চ) সার্ভিস চার্জ </td>
                              <td>{{form.service_charge}}</td>
                            </tr>
                            <tr> 
                              <td> (ছ) সংশোধন ফি </td>
                              <td>{{form.service_charge}}</td>
                            </tr>


                          </table>

                        </div>


                      </div>
                      <div class="col-md-6" style="background: rgba(0,0,0,.2);padding:10px">
                        <h6 style="border-bottom:1px solid #315081"> ইউপি করের বিল </h6>
                        <div class="form-group row no-margin">
                          <label class="col-md-4 date-label no-margin">তারিখ</label>
                          <div class="col-md-8" style="padding:3px 6px">
                              <vuejs-datepicker type="date" format="dd-MM-yyyy" :input-class="{'form-control': true, 'text-danger': errors.has('payment_date') }" name="payment_date"  v-model="form.payment_date" :placeholder="new Date().toJSON().slice(0,10)"></vuejs-datepicker>
                          </div>
                        </div>
                        <div class="table-responsive">
                          <table class="table table-striped">
                            <tr>
                              <td  width="40%">বার্ষিক কর সহ ফি ({{form.year_name}})</td>
                              <td><span class="form-control"> {{form.total_amount}}</span> </td>
                            </tr>
                            <tr>
                              <td>বকেয়া কর</td>
                              <td><span class="form-control">{{form.prev_due}}</span></td>
                            </tr>
                            <tr v-if="form.total_paid>0">
                              <td>পুর্বে জমা </td>
                              <td><span class="form-control">{{form.total_paid}}</span></td>
                            </tr>
                            <tr>
                              <td>মোট টাকা</td>
                              <td><span class="form-control">{{parseInt(this.form.total_amount-this.form.total_paid)}}</span>
                              </td>
                            </tr>
                             <tr>
                              <td>ডিসকাউন্ট</td>
                              <td><input type="number" min="0" :max="parseInt(this.form.total_amount-this.form.total_paid)" required v-model="form.discount_amount" name="discount" id="discount_amount" placeholder="ডিসকাউন্ট এর পরিমান" :class="{'form-control': true, 'text-danger': errors.has('discount_amount') }"></td>
                            </tr>
                            
                            <tr>
                              <td>জমা</td>
                              <td><input type="number" min="0" :max="form.paid_amount" required v-model="form.paid_amount" name="paid_amount" id="paid_amount" placeholder="জমার পরিমান" v-validate="'required'" :class="{'form-control': true, 'text-danger': errors.has('paid_amount') }">
                              <span v-show="errors.has('paid_amount')" class="help text-danger">{{ errors.first('paid_amount') }}</span>
                            <span v-if="validateErrors.paid_amount" class="help text-danger">{{validateErrors.paid_amount[0] }}</span></td>
                            </tr>
                           
                            <!-- <tr>
                              <td>বাকি </td>
                              <td><input type="number" min="0" required v-model="form.due_amount" name="due_amount" id="due_amount" placeholder="বাকি " v-validate="'required'" :class="{'form-control': true, 'text-danger': errors.has('due_amount') }"></td>
                            </tr> -->
                            <tr>
                              <td>রিসিপ্ট নাম্বার </td>
                              <td> <span class="form-control"> {{form.invoice}} </span> </td>
                            </tr>
                            <tr>
                              <td colspan="2" class="no-border">
                             
                              <button @click="validateBeforeSubmit" type="button" class="btn btn-primary px-5 pull-right"><i class="fa fa-save"></i> ট্যাক্স সাবমিট </button>
                               <label class="pull-right" style="line-height: 40px; margin-right: 20px; font-size: 15px;" > <input type="checkbox" v-model="form.sms_status" name="sms_status" style="width: 17px;
    height: 17px;" /> <span> এসএমএস পাঠান </span> </label>
                              </td>
                            </tr>


                          </table>
                        </div>

                      </div>
                    </div>

                </form>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
.no-border{border:0 !important;}
.form-control{height: 32px;}
.vdp-datepicker{width:90%;float:right;}
.date-label{line-height: 37px;padding: 0;font-size: 13px;}
</style>

