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
      form: {
        type:'',
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
        value:''
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
      const data = await TaxCollectionService.singleHolding(this.holding_id.value,{union_id:this.$union_id,year:this.$year})
      this.form = data.data
      this.form.paid_amount = parseInt(this.form.total_amount-this.form.total_paid)
      this.form.discount_amount = parseInt(this.form.discount)
      
      if(this.$route.query.id){
        this.holdings(this.form.holding_no)
      }
      
    },
     async holdings(holding_no=''){
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

    async validateBeforeSubmit() {
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
                title: "??????????????????????????? ?????? ???????????? ???????????????????????? ???????????? ?????????????????? ???????????? ????????????",
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
        }
            TaxCollectionService.store(input).then(success=>{
              this.$swal({
                type: 'success',
                title: '????????????????????? ?????????????????? ????????? ??????',
                showConfirmButton: false,
                timer: 1500
              })
              
            //tax-collection/2?year=3
            this.$router.push({ path: '/tax-collection/'+success.data.id+'?year='+this.form.year })
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

  }
}

</script>
<template>
    <div>
        <div class="row">

            <div class="col-lg-12">
                <div class="card">
                <div class="card-body">
                <div class="card-title"> ????????????????????? ??????????????????
                    <div class="pull-right">
                      <router-link tag="a" to="/tax-collection" class="btn btn-xs btn-light waves-effect waves-light m-1"><i class="fa fa-list"></i> ????????? ????????????????????? </router-link>
                    </div>
                </div>
                <hr>
                <form method="POST" @submit.prevent="validateBeforeSubmit" enctype="multipart/form-data">

                    <div class="row">
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="col-md-12 no-padding"> ?????????????????? ????????????????????? </label>
                                <div class="col-md-12 no-padding">
                                 <select class="form-control" @change="holdings()" required v-model="form.word">
                                    <option value=""> -?????????????????? ???????????????????????? ????????????- </option>
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
                                <label class="col-md-12 no-padding"> ??????????????? </label>
                                <div class="col-md-12 no-padding">
                                    <select class="form-control" @change="holdings()" required v-model="form.village_id">
                                    <option value=""> -??????????????? ???????????????????????? ????????????- </option>
                                    <option v-for="(data,i) in village" :key="i" :value="data.id"> {{data.bn_name}} </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="col-md-12 no-padding"> ????????? </label>
                                <div class="col-md-12 no-padding">
                                    <select class="form-control" @change="holdings()" required v-model="form.year">
                                    <option value=""> -????????? ???????????????????????? ????????????- </option>
                                    <option v-for="(data,i) in years" :key="i" :value="data.id"> {{data.name}} </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3">
                          <div class="form-group">
                              <label class="col-md-12 no-padding"> ????????????????????? ??????????????? ???????????? </label>
                              <div class="col-md-12 no-padding">
                                  <v-select class="form-multiple-select" @keypress.native="holdings()" v-on:input="singleHoldingData()" placeholder="????????????????????? ???????????????????????? ????????????" v-model="holding_id" :options="allHoldings"></v-select>
                              </div>
                          </div>
                      </div>
                        
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <h6> ????????????????????? ???????????? </h6>
                        <div class="table-responsive">
                          <table class="table table-bordered">
                            <tr>
                              <td width="40%">????????????????????? ?????????????????????</td>
                              <td>{{form.holding_no}}</td>
                            </tr>
                            <tr>
                              <td>????????????????????? ?????????</td>
                              <td>{{form.owner_name}}</td>
                            </tr>
                            <tr>
                              <td>?????????????????? ?????????????????????</td>
                              <td>{{form.mobile}}</td>
                            </tr>
                            <tr>
                              <td><span v-if="form.type==1">??????????????? ?????????</span> <span v-else=""> ???????????????????????????????????? ?????????</span></td>
                              <td>{{form.organization_name}}</td>
                            </tr>
                            <tr>
                              <td>????????????/??????????????????</td>
                              <td>{{form.father_or_husband}}</td>
                            </tr>
                            <tr>
                              <td>?????????</td>
                              <td><span v-if="form.type==1">??????????????????</span> <span v-else-if="form.type==2"> ???????????????????????????</span></td>
                            </tr>
                            <tr>
                              <td>????????????????????? ???????????????????????????</td>
                              <td>{{form.annual_assessment}}</td>
                            </tr>


                          </table>

                        </div>


                      </div>
                      <div class="col-md-6" style="background: rgba(0,0,0,.2);padding:10px">
                        <h6 style="border-bottom:1px solid #315081"> ???????????? ???????????? ????????? </h6>
                        <div class="form-group row no-margin">
                          <label class="col-md-4 date-label no-margin">???????????????</label>
                          <div class="col-md-8" style="padding:3px 6px">
                              <vuejs-datepicker type="date" format="dd-MM-yyyy" :input-class="{'form-control': true, 'text-danger': errors.has('payment_date') }" v-validate="'required'" required name="payment_date"  v-model="form.payment_date" :placeholder="new Date().toJSON().slice(0,10)"></vuejs-datepicker>
                          </div>
                        </div>
                        <div class="table-responsive">
                          <table class="table table-striped">
                            <tr>
                              <td  width="40%">????????????????????? ?????? ({{form.year_name}})</td>
                              <td><span class="form-control"> {{form.tax}}</span> </td>
                            </tr>
                            <tr>
                              <td>??????????????? ??????</td>
                              <td><span class="form-control">{{form.prev_due}}</span></td>
                            </tr>
                            <tr v-if="form.total_paid>0">
                              <td>?????????????????? ????????? </td>
                              <td><span class="form-control">{{form.total_paid}}</span></td>
                            </tr>
                            <tr>
                              <td>????????? ????????????</td>
                              <td><span class="form-control">{{parseInt(this.form.total_amount-this.form.total_paid)}}</span>
                              </td>
                            </tr>
                             <tr>
                              <td>???????????????????????????</td>
                              <td><input type="number" min="0" :max="parseInt(this.form.total_amount-this.form.total_paid)" required v-model="form.discount_amount" name="discount" id="discount_amount" placeholder="??????????????????????????? ?????? ??????????????????" :class="{'form-control': true, 'text-danger': errors.has('discount_amount') }"></td>
                            </tr>
                            
                            <tr>
                              <td>?????????</td>
                              <td><input type="number" min="0" :max="form.paid_amount" required v-model="form.paid_amount" name="paid_amount" id="paid_amount" placeholder="???????????? ??????????????????" v-validate="'required'" :class="{'form-control': true, 'text-danger': errors.has('paid_amount') }">
                              <span v-show="errors.has('paid_amount')" class="help text-danger">{{ errors.first('paid_amount') }}</span>
                            <span v-if="validateErrors.paid_amount" class="help text-danger">{{validateErrors.paid_amount[0] }}</span></td>
                            </tr>
                           
                            <!-- <tr>
                              <td>???????????? </td>
                              <td><input type="number" min="0" required v-model="form.due_amount" name="due_amount" id="due_amount" placeholder="???????????? " v-validate="'required'" :class="{'form-control': true, 'text-danger': errors.has('due_amount') }"></td>
                            </tr> -->
                            <tr>
                              <td>????????????????????? ????????????????????? </td>
                              <td> <span class="form-control"> {{form.invoice}} </span> </td>
                            </tr>
                            <tr>
                              <td colspan="2" class="no-border"><button type="submit" class="btn btn-primary px-5 pull-right"><i class="fa fa-save"></i> ????????????????????? ?????????????????? </button></td>
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

