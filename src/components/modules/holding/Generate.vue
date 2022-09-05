<template>
  <div>

    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header card-info">
            <div class="card-btn pull-right">
              <button class="btn btn-xs btn-primary " v-print="'#printMe'"><i class="fa fa-print"></i> Print</button>
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
                          <option value="1"> আবাসিক </option>
                          <option value="2"> বানিজ্যিক </option>
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
      </div>
    </div>
  </div>
</template>
<script>
import ReportsService from '@/services/ReportsService'
import HoldingsService from '@/services/HoldingsService'
import TaxCollectionService from '@/services/TaxCollectionService'
export default {
  name: 'Hondings',
  data () {
    return {
      loading:false,
      unions: [],
      form:{
        union_id:this.$union_id,
        year:this.$year,
        type:1,
        invoice_serial:1
      },
      years: [],
      result:{
          status:false
      }
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    async getData () {
      const unionData = await ReportsService.unions();
      this.unions = unionData.data;
       const yearsData = await TaxCollectionService.years()
      this.years = yearsData.data
    },

     generate(){
      this.loading=true;
      HoldingsService.taxGenerate(this.form).then(response=>{
      console.log(response)
        this.result=response.data
        this.result.status=true
        this.loading=false;
        this.$swal({
            type: 'success',
            title: response.data.total+'টি হোল্ডিং থেকে, নতুন জেনারেট হয়েছেঃ '+response.data.create+'টি এবং আপডেট হয়েছেঃ '+responoe.data.update,
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


    }

  }
}
</script>


