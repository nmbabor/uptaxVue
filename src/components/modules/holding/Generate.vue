<template>
  <div>

    <div class="row">
      <div class="col-md-12">
        <div class="card" v-if="tradeLicence==false">
          <div class="card-header card-info">
            <div class="card-btn pull-right">
              <router-link tag="a" to="/holdings/create" class="btn btn-xs btn-light waves-effect waves-light m-1"><i class="fa fa-plus-circle"></i> নতুন সংযোজন </router-link>
            </div>
            <h4 class="card-title"> ইউনিয়ন পরিষদ ধার্য কর জেনারেট   </h4>
          </div>
          <div class="card-body table-responsive">
            <div class="row">
              <div class="col-md-2">
                  <div class="form-group">
                      <label class="col-md-12 no-padding"> বছর </label>
                      <div class="col-md-12 no-padding">
                          <select class="form-control" required v-model="form.year">
                          <option value=""> -বছর নির্বাচন করুন- </option>
                          <option v-for="(data,i) in years" :key="i" :value="data.id"> {{data.name}} </option>
                          </select>
                      </div>
                  </div>
              </div>
              <div class="col-md-2">
                  <div class="form-group">
                      <label class="col-md-12 no-padding"> ধরণ </label>
                      <div class="col-md-12 no-padding">
                          <select class="form-control" required v-model="form.type">
                          <option v-for="(type,i) in types" :key="i" :value="i"> {{type}} </option>
                          </select>
                      </div>
                  </div>
              </div>
              <div class="col-md-2">
                  <div class="form-group">
                      <label class="col-md-12 no-padding"> অপশন </label>
                      <div class="col-md-12 no-padding">
                          <select class="form-control" required v-model="form.invoice_serial">
                            <option value="1"> কর জেনারেট </option>
                            <option value="2"> সিরিয়াল তৈরি  </option>
                          </select>
                      </div>
                  </div>
              </div>
              <div class="col-md-2">
                  <div class="form-group">
                      <label class="col-md-12 no-padding"> &nbsp; </label>
                      <div class="col-md-12 no-padding">
                        <button class="btn btn-light waves-effect waves-light" type="button" @click="generate()">কর জেনারেট</button>
                      </div>
                  </div>
              </div>
            </div>

              <div v-if="loading" class="col-md-12" style="text-align:center;position:absolute;background: rgb(30, 71, 108,.8);z-index:9;padding:100px;left:0;height:85%">
                  <img style="width:100px" src="/static/assets/images/blue.gif" alt="Loading..">
              </div>
              <div class="col-md-12 text-center" v-if="result.status">
                  <p><span v-html="result.total"></span> টি হোল্ডিং থেকে, নতুন জেনারেট হয়েছেঃ <span v-html="result.create"></span> টি এবং আপডেট হয়েছেঃ <span v-html="result.update"></span> টি</p>
              </div>
            </div>
            </div>


            <div class="card" v-else>
              <div class="card-header card-info">
                <div class="card-btn pull-right">
                 
                  <router-link tag="a" to="/trade-licence/create" class="btn btn-xs btn-light waves-effect waves-light m-1"><i class="fa fa-plus-circle"></i> নতুন সংযোজন </router-link>
                </div>
                <h4 class="card-title"> ইউনিয়ন পরিষদ ট্রেড লাইসেন্স কর জেনারেট   </h4>
              </div>
            <div class="card-body table-responsive">
              <div class="row">
              
                <div class="col-md-2">
                  
                    <div class="form-group">
                        <label class="col-md-12"> বছর </label>
                        <div class="col-md-12">
                            <select class="form-control" required v-model="trade_form.year">
                            <option value=""> -বছর নির্বাচন করুন- </option>
                            <option v-for="(data,i) in years" :key="i" :value="data.id"> {{data.name}} </option>
                            </select>
                        </div>
                    </div>
                </div>
                
                <div class="col-md-2">
                    <div class="form-group">
                        <label class="col-md-12 no-padding"> অপশন </label>
                        <div class="col-md-12 no-padding">
                            <select class="form-control" required v-model="trade_form.invoice_serial">
                              <option value="1"> কর জেনারেট </option>
                              <option value="2"> সিরিয়াল তৈরি  </option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="form-group">
                        <label class="col-md-12 no-padding"> &nbsp; </label>
                        <div class="col-md-12 no-padding">
                          <button class="btn btn-light waves-effect waves-light" type="button" @click="generateTrade()">কর জেনারেট</button>
                        </div>
                    </div>
                </div>
              </div>

              <div v-if="loading2" class="col-md-12" style="text-align:center;position:absolute;background: rgb(30, 71, 108,.8);z-index:9;padding:100px;left:0;height:85%">
                  <img style="width:100px" src="/static/assets/images/blue.gif" alt="Loading..">
                </div>
              <div class="col-md-12 text-center" v-if="trade_result.status">
                  <p><span v-html="trade_result.total"></span> টি ট্রেড লাইসেন্স থেকে, নতুন জেনারেট হয়েছেঃ <span v-html="trade_result.create"></span> টি এবং আপডেট হয়েছেঃ <span v-html="trade_result.update"></span> টি</p>
              </div>
            </div>
            
            </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ReportsService from '@/services/ReportsService'
import HoldingsService from '@/services/HoldingsService'
import TaxCollectionService from '@/services/TaxCollectionService'
import TradeLicenceService from '@/services/TradeLicenceService'
export default {
  name: 'Hondings',
  data () {
    return {
      loading:false,
      loading2:false,
      unions: [],
      types:[],
      form:{
        union_id:this.$union_id,
        year:this.$year,
        type:1,
        invoice_serial:1
      },
      trade_form:{
        union_id:this.$union_id,
        year:this.$year,
        invoice_serial:1
      },
      years: [],
      result:{
          status:false
      },
      trade_result:{
          status:false
      },
      tradeLicence:false
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    async getData () {
       this.holdingTypes()
      const unionData = await ReportsService.unions();
      this.unions = unionData.data;
       const yearsData = await TaxCollectionService.years()
      this.years = yearsData.data
      if(this.$route.query.tradeLicence){
        this.tradeLicence=true;
      }
    },
    async holdingTypes(){
       const allTypes = await HoldingsService.holdingType()
        this.types = allTypes.data
    },

     generate(){
       
      this.loading=true;
      HoldingsService.taxGenerate(this.form).then(response=>{
        this.result=response.data
        this.result.status=true
        this.loading=false;
        this.$swal({
            type: 'success',
            title: this.result.total+'টি হোল্ডিং থেকে, নতুন জেনারেট হয়েছেঃ '+this.result.create+'টি এবং আপডেট হয়েছেঃ '+this.result.update,
            showConfirmButton: false,
            timer: 1500
          })
      }).catch(err=>{
      console.log(err.response)
       this.$swal({
              type: 'error',
              title: err.response.data,
              showConfirmButton: true
            })
        this.loading=false;
      })


    },
    generateTrade(){
      this.loading2=true;
      TradeLicenceService.taxGenerate(this.trade_form).then(response=>{
        this.trade_result=response.data
        this.trade_result.status=true
        this.loading2=false;
        this.$swal({
            type: 'success',
            title: this.trade_result.total+'টি ট্রেড লাইসেন্স থেকে, নতুন জেনারেট হয়েছেঃ '+this.trade_result.create+'টি এবং আপডেট হয়েছেঃ '+this.trade_result.update,
            showConfirmButton: false,
            timer: 1500
          })
      }).catch(err=>{
        console.log(err.response)
       this.$swal({
              type: 'error',
              title: err.response.data && err.response.data,
              showConfirmButton: true
            })
        this.loading2=false;
      })


    }

  }
}
</script>


