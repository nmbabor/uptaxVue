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
                      <th v-if="form.type==3">ব্যবসার ধরণ</th>
                      <th v-if="form.type!=3">ঘরের <br> বিবরন সমূহ</th>
                      <th>বার্ষিক <br> ভাড়া মূল্য </th>
                      <th>মেরামত খরচ</th>
                      <th>খরচ বাদে <br> বার্ষিক মূল্যায়ন</th>
                      <th>বকেয়া</th>
                      <th>অন্যান্য <br> বিল</th>
                      <th>বার্ষিক <br> কর</th>
                      <th>মোট</th>
                      <th> জমা </th>
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
                      <td v-if="form.type==2"> {{data.organization_name}} </td>
                      <td v-if="form.type==3"> {{data.business_type}} </td>
                      <td v-if="form.type!=3">
                        <span v-if="data.house_ripe>0">পাকা: {{data.house_ripe}}</span>
                        <span v-if="data.house_semi_ripe>0">আধা পাকা: {{data.house_semi_ripe}}</span>
                        <span v-if="data.house_bhite_paka>0"> ভিটে পাকা: {{data.house_bhite_paka}}</span>
                        <span v-if="data.house_dochala_tinshade>0"> দোচালা টিনশেড: {{data.house_dochala_tinshade}}</span>
                        <span v-if="data.house_unripe>0"> কাঁচা: {{data.house_unripe}}</span>
                      </td>
                      <td> {{data.annual_assessment}} </td>
                      <td> {{parseFloat((data.annual_assessment-((data.annual_assessment/12)*10)).toFixed(2))}} </td>
                      <td> {{parseFloat((data.annual_assessment-((data.annual_assessment/12)*2)).toFixed(2))}} </td>
                      <td> {{data.prev_due}} </td>
                      <td> {{data.others_bill}} </td>
                      <td> {{data.tax}} </td>
                      <td> {{data.total_amount}} </td>
                      <td> {{data.total_paid}} </td>
                    </tr>
                    <tr style="background:#999">
                      <th colspan="7" style="text-align:right">মোট:</th>
                      <th>{{this.footer.annual_assessment}}</th>
                      <th>{{parseFloat(this.footer.repair_cost).toFixed(2)}}</th>
                      <th>{{parseFloat(this.footer.house_rent).toFixed(2)}}</th>
                      <th>{{this.footer.tax_due}}</th>
                      <th>{{this.footer.others_bill}}</th>
                      <th>{{this.footer.annual_tax}}</th>
                      <th>{{this.footer.payment}}</th>
                      <th>{{this.footer.total_paid}}</th>
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
import AreaService from '@/services/AreaService'
import TaxCollectionService from '@/services/TaxCollectionService'
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
          tax_due:0,
          others_bill:0,
          annual_tax:0,
          payment:0,
          total_paid:0,
        };
        for(let i = 0;i<this.allData.length;i++){

          this.footer.annual_assessment+=parseFloat(this.allData[i].annual_assessment)
          this.footer.repair_cost += parseFloat((this.allData[i].annual_assessment-((this.allData[i].annual_assessment/12)*10)).toFixed(2))
          this.footer.house_rent += parseFloat((this.allData[i].annual_assessment-((this.allData[i].annual_assessment/12)*2)).toFixed(2))
          this.footer.tax_due+=parseFloat(this.allData[i].prev_due)
          this.footer.others_bill+=parseFloat(this.allData[i].others_bill)
          this.footer.annual_tax+=parseFloat(this.allData[i].tax)
          this.footer.payment += parseFloat(this.allData[i].total_amount)
          this.footer.total_paid += parseFloat(this.allData[i].total_paid)
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
