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
            <h4 class="card-title"> {{credentials['union']}} ইউনিয়ন পরিষদ ধার্য কর রেজিষ্টার প্রতিবেদন   </h4>
          </div>
          <div class="card-body">
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
              <div class="col-md-3">
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
              <div class="col-md-2">
                  <div class="form-group">
                      <label class="col-md-12 no-padding"> ধরণ </label>
                      <div class="col-md-12 no-padding">
                          <select class="form-control" @change="holdings()" required v-model="form.type">
                          <option value="0"> সকল </option>
                          <option v-for="(type,i) in types" :key="i" :value="i"> {{type}} </option>
                          </select>
                      </div>
                  </div>
              </div>
              <div class="col-md-1">
                 <div class="form-group">
                   <label class="col-md-12 no-padding"> &nbsp;  </label>
                      <div class="col-md-12 no-padding">
                        <button class="btn btn-light waves-effect waves-light" type="button" @click="holdings()"> <i class="fa fa-search"></i> </button>
                      </div>
                  </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-5 no-padding">
                 <div class="form-group">
                      <div class="col-md-12">
                        <input type="text" @keyup="holdings()" v-model="form.keyword" class="form-control" placeholder="এখানে সার্চ করুন...">
                      </div>
                 </div>
              </div>
            </div>
            <div v-if="loading" class="col-md-12" style="text-align:center;position:absolute;    background: rgb(30, 71, 108,.8);z-index:9;padding:100px;left:0;height:85%">
                <img style="width:100px" src="/static/assets/images/blue.gif" alt="Loading..">
              </div>
            <div class="rows">

            <div id="printMe" class="table-responsive">
              <table width="100%">
                <thead>
                  <tr>
                    <td>
                      <div class="col-md-12"  style="text-align:center">
                         <br>
                        <h5>{{credentials['union']}} ইউনিয়ন পরিষদ ধার্য কর রেজিষ্টার প্রতিবেদন, <span v-if="credentials['village']"> {{credentials['village']}}, </span> <span v-if="(credentials['word'])"> {{credentials['word']}} নং ওয়ার্ড, </span> <span v-if="(credentials['year'])"> {{credentials['year']}}</span>({{credentials['type']}})</h5>
                        <p class="no-print union-title">
                         {{credentials['union_details']}}
                        </p>
                      </div>
                    </td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                     <div class="table-responsive">
                     <button class="btn btn-xs btn-danger pull-right" style="margin-bottom:5px"> <i class="fa fa-comment"></i> সবাইকে এসএমএস সেন্ড করুন </button>
                <table class="table table-bordered table-striped">
                  <thead>
                    <tr style="background:#777">
                      <th>হোল্ডিং</th>
                      <th>মালিকের নাম</th>
                      <th>বাবার/স্বামীর নাম</th>
                      <th>মোবাইল নাম্বার</th>
                      <th>ওয়ার্ড</th>
                      <th>গ্রাম</th>
                      <th v-if="form.type!=1">প্রতিষ্ঠানের নাম</th>
                      <th>বকেয়া</th>
                      <th>বার্ষিক <br> কর</th>
                      <th>মোট</th>
                      <th> জমা </th>
                      <th> এস এম এস </th>
                    </tr>

                  </thead>
                  <tbody>
                    <tr v-for="data in allHoldings.data" :key="data.id">
                      <td> {{data.holding_no}} </td>
                      <td> {{data.owner_name}} </td>
                      <td> {{data.father_or_husband}} </td>
                      <td> {{data.mobile}} </td>
                      <td> {{data.word}} </td>
                      <td> {{data.village_name}} </td>
                      <td v-if="form.type!=1"> {{data.organization_name}} </td>
                      <td> {{data.prev_due}} </td>
                      <td> {{data.tax}} </td>
                      <td> {{data.total_amount}} </td>
                      <td> {{data.total_paid}} </td>
                      <td> <button class="btn btn-xs btn-warning" @click="smsSend(data.id)"> <span v-if="data.sms_send==0"> সেন্ড </span> <span v-else> রিসেন্ড</span> </button> </td>
                    </tr>
                    
                  </tbody>

                </table>
              </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="col-md-12">
                <pagination :limit="-1" :show-disabled="true" :align="'center'" :data="allHoldings" @pagination-change-page="holdings">
                  <span slot="prev-nav">&lt; Previous</span>
	                <span slot="next-nav">Next &gt;</span>
                </pagination>
                <div class="text-center">
                  <div style="display: inline-block;">
                     Rows per page:
                    <select @change="holdings()" style="width:50px;display:inline-block;margin-right:5px;    border-bottom: 1px solid #ddd;" v-model="form.perpage">
                      <option value="22">22</option>
                      <option value="44">44</option>
                      <option value="100">100</option>
                      <option :value="allHoldings.total">All</option>
                    </select>
                  </div>
                  <span>

                  {{allHoldings.from}}-{{allHoldings.to}} of {{allHoldings.total}}
                  </span>

                  </div>
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
import AreaService from '@/services/AreaService'
import TaxCollectionService from '@/services/TaxCollectionService'
import SmsService from '@/services/SmsService'
export default {
  name: 'Hondings',
  data () {
    return {
      loading:false,
      village: [],
      types: [],
      form:{
        union_id:this.$union_id,
        village_id:'',
        word:'',
        year:this.$year,
        type:1,
        page:1,
        perpage:22
      },
      allData: [],
      years: [],
      allHoldings: {},
      credentials: [],
      type:0,
      pagination: {},
      
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    async getData () {
       const yearsData = await TaxCollectionService.years()
      this.years = yearsData.data
      this.loadVillage ()
      this.holdingTypes ()
    },
    async holdingTypes(){
       const allTypes = await ReportsService.holdingType()
        this.types = allTypes.data
    },

    async holdings(page = 1){
      this.loading=true;
      this.form.page = page
      //const response =
      ReportsService.holding(this.form).then(response=>{
        this.allHoldings = response.data.allData
        this.credentials = response.data.credentials
        this.allData = this.allHoldings.data
        this.loading=false;

      }).catch(err=>{
        this.loading=false;
      })


    },
    smsSend(id){
      this.loading=true;
        SmsService.smsHolding(id).then(response=>{
         this.holdings()
        this.loading=false;
        this.$swal({
          type: 'success',
          title: 'সফলভাবে এসএমএস সেন্ড হয়েছে।',
          showConfirmButton: false,
          timer: 1500
        })

      }).catch(err=>{
        this.loading=false;
      })
     
    },


    async loadVillage (){
       if(this.form.union_id!==''){
        const allData = await AreaService.village(this.form.union_id)
        this.village = allData.data
       }else{
         this.village = []
       }
      this.holdings()
    },
   
  }
}
</script>
<style media="print">
  @media print {
    @page {size: auto;margin:0}
    .v-datatable__actions{
      display: none;
    }
    .table td, .table th{color: #000;padding: 3px;}
    table td h5{color: #000;}
    *{color:#000}
    /* table thead th:last-child{display: none;}
    table td:last-child{display: none;} */
  }
  .card .table td, .card .table th{padding: 3px;}
  .btn-action.btn-edit i{font-size: 8px;}
  .btn-action i{font-size: 9px;}
  .btn-action.btn-xs{float: left;font-size: 9px;margin: 1px;}
  ul.pagination{display:block;margin-top: 5px;width: 100%;text-align: center;}
  ul.pagination li{display:inline-block;}
</style>
