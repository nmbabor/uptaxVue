<script>
import AreaService from '@/services/AreaService'
import TaxCollectionService from '@/services/TaxCollectionService'
import ReportsService from '@/services/ReportsService'
import vSelect from 'vue-select'
export default {
  name: 'TaxCollectionCreate',
  data () {
    return {
        allData:[],
        village: [],
        allHoldings: [],
        loading:false,
      form: {
        type:'',
        type_name:'',
        holding_no:'',
        owner_name:'',
        organization_name:'',
        father_or_husband:'',
        annual_assessment:'',
        mother:'',
        mobile:'',
        tax:'',
        prev_due:'',
        discount:'0',
        discount_amount:0,
        total_amount:'',
        paid_amount:'',
        union_id:'',
        invoice:'',
        word:'',
        village_id:'',
        year:this.$year,
        year_name:'',
        value:'',
        sms_status:0
      },

      holding_id:{},
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
      const yearsData = await TaxCollectionService.years()
      this.years = yearsData.data
      this.form.union_id = this.$union_id
      this.loadVillage ()
       if(this.$route.query.id){
        this.holding_id.value = this.$route.query.id
        this.singleHoldingData()
       }
    },

    async singleHoldingData(){
       this.loading=true;
      const data = await TaxCollectionService.singleHolding(this.holding_id.value,{union_id:this.$union_id,year:this.$year})
      this.form = data.data
      this.form.paid_amount = parseInt(this.form.total_amount-this.form.total_paid)
      this.form.discount_amount = parseInt(this.form.discount)
       this.loading=false;
      if(this.$route.query.id){
        this.holdings(this.form.holding_no)
      }
      
    },
     async holdings(holding_no=''){
       this.loading=true;
       var value = $('.vs__search').val();
       if(holding_no!=''){
         value =holding_no;
       }
          this.form.value = value
          TaxCollectionService.holding(this.form).then(response=>{
              this.allHoldings = response.data
              this.loading=false;
          }).catch(err=>{
              this.loading=false;
          })
    },
    async loadVillage(){
       if(this.form.union_id!==''){
        const allData = await AreaService.village(this.form.union_id)
        this.village = allData.data

       }else{
         this.village = []
       }
    this.holdings();
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
          tax_list_id:this.form.id,
          payment_date:this.form.payment_date,
          paid_amount:this.form.paid_amount,
          total_amount:this.form.total_amount,
          discount:this.form.discount_amount,
          receipt_no:this.form.receipt_no,
          sms_status:this.form.sms_status?1:0
        }
          TaxCollectionService.store(input).then(success=>{
              this.$swal({
                type: 'success',
                title: 'সফলভাবে সংগ্রহ করা হল',
                showConfirmButton: false,
                timer: 1500
              })
               console.log(success.data)
            //tax-collection/2?year=3
            //this.$router.push({ path: '/tax-collection/'+success.data.id+'?year='+this.form.year })
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
                <div class="card-title"> ট্যাক্স সংগ্রহ
                    <div class="pull-right">
                      <router-link tag="a" to="/tax-collection" class="btn btn-xs btn-light waves-effect waves-light m-1"><i class="fa fa-list"></i> সকল ট্যাক্স </router-link>
                    </div>
                </div>
                <hr>
                <form method="POST" enctype="multipart/form-data">

                    <div class="row">
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="col-md-12 no-padding"> ওয়ার্ড নাম্বার </label>
                                <div class="col-md-12 no-padding">
                                 <select class="form-control" @change="holdings()" required v-model="form.word">
                                    <option value=""> -ওয়ার্ড নির্বাচন করুন- </option>
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
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="col-md-12 no-padding"> গ্রাম </label>
                                <div class="col-md-12 no-padding">
                                    <select class="form-control" @change="holdings()" required v-model="form.village_id">
                                    <option value=""> -গ্রাম নির্বাচন করুন- </option>
                                    <option v-for="(data,i) in village" :key="i" :value="data.id"> {{data.bn_name}} </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="col-md-12 no-padding"> বছর </label>
                                <div class="col-md-12 no-padding">
                                    <select class="form-control" @change="holdings()" required v-model="form.year">
                                    <option value=""> -বছর নির্বাচন করুন- </option>
                                    <option v-for="(data,i) in years" :key="i" :value="data.id"> {{data.name}} </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3">
                          <div class="form-group">
                              <label class="col-md-12 no-padding"> হোল্ডিং সার্চ করুন </label>
                              <div class="col-md-12 no-padding">
                                  <v-select class="form-multiple-select" @keypress.native="holdings()" v-on:input="singleHoldingData()" placeholder="হোল্ডিং নির্বাচন করুন" v-model="holding_id" :options="allHoldings"></v-select>
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
                              <td width="40%">হোল্ডিং নাম্বার</td>
                              <td>{{form.holding_no}}</td>
                            </tr>
                            <tr>
                              <td>মালিকের নাম</td>
                              <td>{{form.owner_name}}</td>
                            </tr>
                            <tr>
                              <td>মোবাইল নাম্বার</td>
                              <td>{{form.mobile}}</td>
                            </tr>
                            <tr>
                              <td><span v-if="form.type==1">বাড়ির নাম</span> <span v-else=""> প্রতিষ্ঠানের নাম</span></td>
                              <td>{{form.organization_name}}</td>
                            </tr>
                            <tr>
                              <td>বাবা/স্বামী</td>
                              <td>{{form.father_or_husband}}</td>
                            </tr>
                            <tr>
                              <td>ধরণ</td>
                              <td>{{form.type_name}}</td>
                            </tr>
                            <tr>
                              <td>বার্ষিক মূল্যায়ন</td>
                              <td>{{form.annual_assessment}}</td>
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
                              <td  width="40%">বার্ষিক কর ({{form.year_name}})</td>
                              <td><span class="form-control"> {{form.tax}}</span> </td>
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

