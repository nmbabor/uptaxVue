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
            <h4 class="card-title"> {{credentials['union']}} ইউনিয়ন পরিষদ এর হোল্ডিংস সমূহ</h4>
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
                      <label class="col-md-12 no-padding"> ধরণ </label>
                      <div class="col-md-12 no-padding">
                          <select class="form-control" @change="holdings()" required v-model="form.type">
                          <option value="0"> সকল </option>
                          <option value="1"> আবাসিক </option>
                          <option value="2"> বানিজ্যিক </option>
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
                        <h5>{{credentials['union']}} ইউনিয়ন পরিষদ এর হোল্ডিংস সমূহ -  <span v-if="credentials['village']"> {{credentials['village']}}, </span> <span v-if="(credentials['word'])"> {{credentials['word']}} নং ওয়ার্ড </span>({{credentials['type']}})</h5>
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
                      <th>হোল্ডিং</th>
                      <th>মালিকের নাম</th>
                      <th>বাবার/স্বামীর নাম</th>
                      <th>মোবাইল নাম্বার</th>
                      <th>ওয়ার্ড</th>
                      <th>গ্রাম</th>
                      <th v-if="form.type==2">প্রতিষ্ঠানের নাম</th>
                      <th>বার্ষিক ভাড়া মূল্য </th>
                      <th>মেরামত খরচ</th>
                      <th class="no-print">একশন</th>
                    </tr>

                  </thead>
                  <tbody>
                    <tr v-for="data in allHoldings.data" :key="data.id">
                      <td> {{data.holding_no}} </td>
                      <td> {{data.owner_name}} </td>
                      <td> {{data.father_or_husband}} </td>
                      <td> {{data.mobile}} </td>
                      <td> {{data.word}} </td>
                      <td> {{data.village.bn_name}} </td>
                      <td v-if="form.type==2"> {{data.organization_name}} </td>
                      <td> {{data.annual_assessment}} </td>
                      <td> {{parseFloat((data.annual_assessment-((data.annual_assessment/12)*10)).toFixed(2))}} </td>
                      <td class="no-print">
                         <router-link class="btn btn-xs btn-light waves-effect waves-light m-1" v-bind:to="{ name: 'editHolding', params: { id: data.id } }"> <i class="fa fa-edit"></i></router-link> 
                         <button class="btn btn-xs btn-light waves-effect waves-light m-1" @click="deleteData(data.id)"><i class="fa fa-trash"></i></button>
                      </td>
                    </tr>
                    <tr style="background:#999">
                      <th colspan="6" style="text-align:right">মোট:</th>
                      <th>{{this.footer.annual_assessment}}</th>
                      <th>{{parseFloat(this.footer.repair_cost).toFixed(2)}}</th>
                      <th class="no-print">

                      </th>

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
import ReportsService from '@/services/ReportsService'
import HoldingsService from '@/services/HoldingsService'
import AreaService from '@/services/AreaService'
import TaxCollectionService from '@/services/TaxCollectionService'
export default {
  name: 'Hondings',
  data () {
    return {
      loading:false,
      village: [],
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
      footer:{
        annual_assessment:0,
        repair_cost:0,
        house_rent:0,
        tax_due:0,
        others_bill:0,
        annual_tax:0,
        payment:0,
      }
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
    },

    async holdings(page = 1){
      this.loading=true;
      this.form.page = page
      HoldingsService.index(this.form).then(response=>{
        this.allHoldings = response.data.allData
        this.credentials = response.data.credentials
        this.allData = this.allHoldings.data
        this.dataDistribute();
        this.loading=false;

      }).catch(err=>{
        this.loading=false;
      })


    },
    dataDistribute(){
      this.footer = {
          annual_assessment:0,
          repair_cost:0,
          house_rent:0,
          others_bill:0,
        };
        for(let i = 0;i<this.allData.length;i++){
          this.footer.annual_assessment+=parseFloat(this.allData[i].annual_assessment)
          this.footer.repair_cost += parseFloat((this.allData[i].annual_assessment-((this.allData[i].annual_assessment/12)*10)).toFixed(2))
          this.footer.house_rent += parseFloat((this.allData[i].annual_assessment-((this.allData[i].annual_assessment/12)*2)).toFixed(2))
          this.footer.others_bill+=parseFloat(this.allData[i].others_bill)
        }
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
           HoldingsService.delete(id).then(response=>{
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
    @page {size: landscape;margin:0}
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
