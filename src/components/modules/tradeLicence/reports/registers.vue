<template>
  <div>

    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header card-info">
            <div class="card-btn pull-right">
              <button class="btn btn-xs btn-primary " v-print="'#printMe'"><i class="fa fa-print"></i> Print</button>
              <router-link tag="a" to="/trade-licence/create" class="btn btn-xs btn-light waves-effect waves-light m-1"><i class="fa fa-plus-circle"></i> নতুন সংযোজন </router-link>
            </div>
            <h4 class="card-title"> {{credentials['union']}} ইউনিয়ন পরিষদ ট্রেড লাইসেন্স ধার্য কর রেজিস্টার</h4>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-3">
                    <div class="form-group">
                        <label class="col-md-12 no-padding"> বাজার </label>
                        <div class="col-md-12 no-padding">
                            <select class="form-control" @change="holdings()" required v-model="form.bazar_id">
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
                          <select class="form-control" @change="holdings()" required v-model="form.year">
                          <option value=""> -বছর নির্বাচন করুন- </option>
                          <option v-for="(data,i) in years" :key="i" :value="data.id"> {{data.name}} </option>
                          </select>
                      </div>
                  </div>
              </div>
             
              <div class="col-md-3">
                 <div class="form-group">
                    <label class="col-md-12 no-padding"> &nbsp; </label>
                      <div class="col-md-12">
                        <input type="text" @keyup="holdings()" v-model="form.keyword" class="form-control" placeholder="এখানে সার্চ করুন...">
                      </div>
                 </div>
              </div>
              
              <div class="col-md-2">
                  <div class="form-group">
                     <label class="col-md-12 no-padding"> &nbsp; </label>
                      <div class="col-md-12 no-padding">
                        <button class="btn btn-light waves-effect waves-light" type="button" @click="holdings()">Find</button>
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
                        <h5>{{credentials['union']}} ইউনিয়ন পরিষদ ধার্য কর রেজিষ্টার প্রতিবেদন, <span v-if="credentials['bazar']"> {{credentials['bazar']}}, </span> </span> <span v-if="(credentials['year'])"> {{credentials['year']}}</span></h5>
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
                <table class="table table-bordered table-striped">
                  <thead>
                    <tr style="background:#777">
                      <th>ট্রেডলাইসেন্স  নাম্বার</th>
                      <th> হোল্ডিং  নাম্বার</th>
                      <th> বাজার </th>
                      <th>প্রতিষ্ঠানের নাম</th>
                      <th> প্রোপাইটরের নাম</th>
                      <th> পিতা/স্বামির নাম</th>
                      <th>মোবাইল নাম্বার</th>
                      <th>ব্যবসার ধরণ</th>
                    <th>
                      পূর্বের <br />
                      বকেয়া
                    </th>
                    <th>বার্ষিক কর সহ ফী </th>
                    <th>মোট কর সহ ফী</th>
                    <th>জমা</th>
                    <th>প্রিন্ট</th>
                    </tr>

                  </thead>
                  <tbody>
                    <tr v-for="data in allHoldings.data" :key="data.id">
                      <td> {{data.trade_licence_no}} </td>
                      <td> {{data.holding_no}} </td>
                      <td> {{data.bazar_name}} </td>
                      <td> {{data.organization_name}} </td>
                      <td> {{data.owner_name}} </td>
                      <td> {{data.father_or_husband}} </td>
                      <td> {{data.mobile}} </td>
                      <td> {{data.business_type}} </td>
                      <td>{{ data.prev_due }}</td>
                    <td>{{ data.total_amount - data.prev_due }}</td>
                    <td>{{ data.total_amount }}</td>
                    <td>{{ data.total_paid }}</td>
                    <td class="no-print">
                    <router-link
                        title="বিস্তারিত প্রতিবেদন"
                        tag="a"
                        :to="{
                          path:
                            '/trade-licence-print?id=' +
                            data.trade_licence_id +
                            '&year=' +
                            data.year
                        }"
                        class="btn btn-xs btn-info waves-effect waves-light m-1"
                        ><i class="fa fa-file"></i>
                      </router-link>
                      </td>
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
                    <select @change="holdings()" style="width:50px;display:inline-block;margin-right:5px;border-bottom: 1px solid #ddd;" v-model="form.perpage">
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
import ReportsService from '@/services/TlReportsService'
import AreaService from '@/services/AreaService'
import TaxCollectionService from '@/services/TaxCollectionService'
import TradeLicenceService from '@/services/TradeLicenceService'
export default {
  name: 'AllLicence',
  data () {
    return {
      loading:false,
       bazar: [],
      form:{
        union_id:this.$union_id,
        bazar_id:'',
        year:this.$year,
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
      this.loadBazar ()
      this.holdings()
    },
    async loadBazar(){
       if(this.form.union_id!==''){
        const allData = await AreaService.bazar(this.form.union_id)
        this.bazar = allData.data

       }else{
         this.bazar = []
       }

    },

    async holdings(page = 1){
      this.loading=true;
      this.form.page = page
      ReportsService.registers(this.form).then(response=>{
        this.allHoldings = response.data.allData
        this.credentials = response.data.credentials
        this.allData = this.allHoldings.data
        this.loading=false;

      }).catch(err=>{
        this.loading=false;
      })


    },
    

    async deleteData (id) {
      const $this = this
      $this.$swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(function (result) {
        if (result.value) {
           TradeLicenceService.delete(id).then(response=>{
            $this.$swal({
                type: 'success',
                title: 'Deleted Successfully Done',
                showConfirmButton: false,
                timer: 1500
              })
            $this.getData()
            
          }).catch(err=>{
           
            $this.$swal({
                  type: 'error',
                  title: err.response.data,
                  showConfirmButton: true
                })
          })
        }
      })
    }
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
    .no-print{display:none}
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
