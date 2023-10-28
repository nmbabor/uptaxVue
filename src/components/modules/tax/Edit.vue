<script>
import AreaService from '@/services/AreaService'
import TaxCollectionService from '@/services/TaxCollectionService'
import vSelect from 'vue-select'
export default {
  name: 'TaxCollectionCreate',
  data () {
    return {
        allData:[],
        unions: [],
        village: [],
      form: {
        type:'',
        holding_no:'',
        owner_name:'',
        organization_name:'',
        father_or_husband:'',
        mother:'',
        mobile:'',
        annual_tax:'',
        union_id:'',
        word:'',
        village_id:'',
      },
      year:'',
      holding_id:'',
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
      const unionData = await TaxCollectionService.unions();
      this.unions = unionData.data;
      const yearsData = await TaxCollectionService.years()
      this.years = yearsData.data
      this.form.union_id = this.unions[0].id
      this.loadVillage ()

    },
    async singleHoldingData(){
      const data = await TaxCollectionService.singleHolding(this.holding_id.value)
      this.form = data.data
    },
    async holdings(){
      const response = await TaxCollectionService.holding(this.form)
      let all_Data = response.data

      let holding = []
      for(let data of all_Data){
         holding.push({label:data.holding_no+'('+data.owner_name+')',value:data.id})
       }
       this.allData = holding


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
              let input = {
                holding_id:this.form.id,
                payment_date:this.form.payment_date,
                tax:this.form.annual_tax,
                year:this.year
              }

            TaxCollectionService.store(input).then(success=>{

              this.$swal({
                type: 'success',
                title: 'Added Successfully Done',
                showConfirmButton: false,
                timer: 1500
              })
              this.$router.push({ name: 'taxCollection' })
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
                      <router-link tag="a" to="/tax-collection" class="btn btn-xs btn-light waves-effect waves-light m-1"><i class="fa fa-list"></i> সকল হোল্ডিং </router-link>
                    </div>
                </div>
                <hr>
                <form method="POST" @submit.prevent="validateBeforeSubmit" enctype="multipart/form-data">

                    <div class="row">
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="col-md-12 no-padding"> ইউনিয়ন </label>
                                <div class="col-md-12 no-padding">
                                    <select class="form-control" required v-model="form.union_id" @change="loadVillage()">
                                    <option value=""> -ইউনিয়ন নির্বাচন করুন- </option>
                                    <option v-for="(data,i) in unions" :key="i" :value="data.id"> {{data.bn_name}} </option>
                                    </select>
                                </div>
                            </div>
                        </div>
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
                                    <select class="form-control" required v-model="year">
                                    <option value=""> -বছর নির্বাচন করুন- </option>
                                    <option v-for="(data,i) in years" :key="i" :value="data.id"> {{data.name}} </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                              <div class="form-group">
                                  <label class="col-md-12"> হোল্ডিং নির্বাচন করুন  </label>
                                  <div class="col-md-12">
                                    <v-select class="form-multiple-select" v-on:input="singleHoldingData()" placeholder="হোল্ডিং নির্বাচন করুন" v-model="holding_id" :options="allData"></v-select>

                                  </div>
                              </div>
                          </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-md-3">
                            <label for="holding_no">হোল্ডিং নাম্বার</label>
                            <input type="text" disabled name="holding_no" required v-model="form.holding_no" id="holding_no" placeholder="হোল্ডিং নাম্বার" v-validate="'required'" :class="{'form-control': true, 'text-danger': errors.has('holding_no') }">
                            <span v-show="errors.has('holding_no')" class="help text-danger">{{ errors.first('holding_no') }}</span>
                            <span v-if="validateErrors.holding_no" class="help text-danger">{{validateErrors.holding_no[0] }}</span>
                        </div>
                        <div class="form-group col-md-3">
                            <label for="owner_name"> মালিক</label>
                            <input type="text" disabled name="owner_name" required v-model="form.owner_name" id="owner_name" placeholder=" মালিকের নাম" v-validate="'required'" :class="{'form-control': true, 'text-danger': errors.has('owner_name') }">
                            <span v-show="errors.has('owner_name')" class="help text-danger">{{ errors.first('owner_name') }}</span>
                            <span v-if="validateErrors.owner_name" class="help text-danger">{{validateErrors.owner_name[0] }}</span>
                        </div>
                        <div class="form-group col-md-3">
                            <label for="input-2">মোবাইল নাম্বার</label>
                            <input type="number" disabled min="0" required v-model="form.mobile" name="mobile" id="input-2" placeholder="মোবাইল নাম্বার" v-validate="'required'" :class="{'form-control': true, 'text-danger': errors.has('mobile') }">
                            <span v-show="errors.has('mobile')" class="help text-danger">{{ errors.first('mobile') }}</span>
                            <span v-if="validateErrors.mobile" class="help text-danger">{{validateErrors.mobile[0] }}</span>
                        </div>
                        <div class="form-group col-md-3">
                            <label for="input-2">ধরণ</label>
                           <select class="form-control" disabled v-model="form.type">
                             <option value="1"> আবাসিক </option>
                             <option value="2"> বানিজ্যিক </option>
                           </select>
                        </div>
                    </div>
                <div class="row">
                    <div class="form-group col-md-4">
                        <label for="organization_name"><span v-if="form.type==1">বাড়ির নাম</span> <span v-else=""> প্রতিষ্ঠানের নাম</span></label>
                        <input type="text" required v-model="form.organization_name" name="organization_name" id="organization_name" disabled v-validate="'required'" :class="{'form-control': true, 'text-danger': errors.has('organization_name') }">
                        <span v-show="errors.has('organization_name')" class="help text-danger">{{ errors.first('organization_name') }}</span>
                        <span v-if="validateErrors.organization_name" class="help text-danger">{{validateErrors.organization_name[0] }}</span>
                    </div>
                    <div class="form-group col-md-4">
                        <label for="father_or_husband">বাবা/স্বামী</label>
                        <input type="text" disabled required v-model="form.father_or_husband" name="father_or_husband" id="father_or_husband" placeholder="বাবা/স্বামী" v-validate="'required'" :class="{'form-control': true, 'text-danger': errors.has('father_or_husband') }">
                        <span v-show="errors.has('father_or_husband')" class="help text-danger">{{ errors.first('father_or_husband') }}</span>
                        <span v-if="validateErrors.father_or_husband" class="help text-danger">{{validateErrors.father_or_husband[0] }}</span>
                    </div>
                    <div class="form-group col-md-4">
                        <label for="annual_assessment">বার্ষিক বাড়ির মূল্যায়ন</label>
                        <input type="text" disabled v-model="form.annual_assessment" name="annual_assessment" id="annual_assessment" placeholder="বার্ষিক বাড়ির মূল্যায়ন" v-validate="'required'" :class="{'form-control': true, 'text-danger': errors.has('annual_assessment') }">

                    </div>
                </div>
                <div class="row">
                  <div class="form-group col-md-4">
                        <label for="annual_tax">বার্ষিক কর</label>
                        <input type="text" v-model="form.annual_tax" name="annual_tax" id="annual_tax" placeholder="বার্ষিক কর" disabled v-validate="'required'" :class="{'form-control': true, 'text-danger': errors.has('annual_tax') }">

                    </div>
                    <div class="form-group col-md-4">
                        <label for="payment_date"> তারিখ</label>
                        <vuejs-datepicker type="date" format="dd-MM-yyyy" :input-class="{'form-control': true, 'text-danger': errors.has('payment_date') }" v-validate="'required'" name="payment_date"  v-model="form.payment_date" placeholder=" তারিখ"></vuejs-datepicker>
                    </div>
                </div>
                <div class="form-group">
                    <button type="submit" class="btn btn-light px-5"><i class="fa fa-save"></i> ট্যাক্স সাবমিট </button>
                </div>
                </form>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>

