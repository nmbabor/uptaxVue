<template>
  <div>

    <div class="row bill-details">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header card-info">
            <div class="card-btn pull-right">
              <button class="btn btn-xs btn-primary " v-print="'#printMe'"><i class="fa fa-print"></i> Print</button>
              <router-link tag="a" to="/report/due-tax" class="btn btn-xs btn-light waves-effect waves-light m-1"><i class="fa fa-list"></i> বকেয়া প্রতিবেদন </router-link>
            </div>
            <h4 class="card-title"> {{area.union_name}} ইউনিয়ন পরিষদ ব্যক্তিগত প্রতিবেদন</h4>
          </div>
          <div class="card-body">
            <div v-if="loading" class="col-md-12" style="text-align:center;position:absolute;background: rgb(30, 71, 108,.8);z-index:9;padding:100px;left:0;height:85%">
                <img style="width:100px" src="/static/assets/images/blue.gif" alt="Loading..">
              </div>
            <div class="rows">
            <div id="printMe" class="raw bill-print">
              <div class="row" v-for="holding in holdingsData" :key="holding.id" style="padding:5px;overflow:hidden;" >
             <div class="col-md-12" style="width:100%;">
                 <div class="row" style="text-align:center;padding:10px 0;width:100%;margin:0">
                   <div class="col-md-2" style="width:17%;float:left;">
                   <img :src="base_url+'/images/default/bd.png'" alt="Bangladesh" class="bd-logo">
                   </div>
                   <div class="col-md-8" style="width:66%;float:left;">
                     <h5>{{area.union_name}} ইউনিয়ন পরিষদ </h5>
                    <h6> উপজেলাঃ{{area.upazila_name}} , জেলাঃ {{area.district_name}} <br>
                    <small> <span>{{en2bn(holding.year_name)}}</span> (<span>{{holding.type_name}}</span>) </small></h6>
                   </div>
                   <div class="col-md-2" style="width:17%;float:right;">
                     <img class="union-logo" v-if="logoUrl!=''" :src="logoUrl">
                   </div>
                    
                </div>
                <div class="col-md-12 main-table">
              <table class="table table-bordered table-striped bill-table" >
                  <tr>
                    <th> হোল্ডিং নং <b>:</b> </th>
                    <td>{{en2bn(holding.holding_no)}}</td>
                  </tr>
                  <tr>
                    <th> করদাতার নাম <b>:</b> </th>
                    <td>{{holding.owner_name}}</td>
                  </tr>
                  <tr>
                    <th> পিতা/স্বামী <b>:</b> </th>
                    <td>{{holding.father_or_husband}}</td>
                  </tr>
                  <tr v-if="holding.type==2">
                    <th> প্রতিষ্ঠানের নাম <b>:</b> </th>
                    <td>{{holding.organization_name}}</td>
                  </tr>
                  <tr>
                    <th> ওয়ার্ড নং <b>:</b> </th>
                    <td>{{en2bn(holding.word)}}</td>
                  </tr>
                  <tr>
                    <th> গ্রামের নাম <b>:</b> </th>
                    <td>{{holding.village_name}}</td>
                  </tr>
                  <tr>
                    <th colspan="2" style="text-align:center"> করের বিবরণ </th>
                  </tr>
                  <tr>
                    <th> পুর্বের বকেয়া<b>:</b> </th>
                    <td>{{en2bn(holding.prev_due)}}</td>
                  </tr>
                  <tr>
                    <th> বার্ষিক কর <small>({{en2bn(holding.year_name)}})</small> <b>:</b> </th>
                    <td>{{en2bn(holding.tax)}}</td>
                  </tr>
                  <tr v-if="holding.discount>0">
                    <th> ডিসকাউন্ট<b>:</b> </th>
                    <td>{{en2bn(holding.discount)}}</td>
                  </tr>
                  
                  <tr>
                    <th> মোট টাকা<b>:</b> </th>
                    <td>{{en2bn(holding.total_amount)}}</td>
                  </tr>

                  <tr v-if="holding.total_paid>0">
                    <th> মোট জমা<b>:</b> </th>
                    <td>{{en2bn(holding.total_paid)}}</td>
                  </tr>
                  <tr v-if="holding.last_payment_date!=null">
                    <th style="background:#e7f9f7 !important"> জমা তারিখ <b>:</b> </th>
                    <td>{{en2bn(holding.last_payment_date)}}</td>
                  </tr>
                  <tr  v-if="holding.total_paid>0">
                    <th> মোট বকেয়া<b>:</b> </th>
                    <td>{{en2bn((holding.total_amount - holding.total_paid))}}</td>
                  </tr>
              </table>
              </div>
              <br>
              <div class="col-md-12">
                <p style="font-size:14px;color:red !important;text-align:center">নিয়মিত ইউপি কর পরিশোধ করুন, ইউনিয়নের উন্নয়নে অংশ নিন। </p>
              </div>
             </div>
             <!-- End of col-md-6 -->
               </div>
             <!-- End of Row -->
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import vSelect from 'vue-select'
import ReportsService from '@/services/ReportsService'
import HoldingsService from '@/services/HoldingsService'
import AreaService from '@/services/AreaService'
import TaxCollectionService from '@/services/TaxCollectionService'
import UnionBillDetails from '@/services/UnionBillDetails'
export default {
  name: 'BillReport',
  data () {
    return {
      loading:false,
      base_url:this.$baseUrl,
      logoUrl:'',
      signatureUrl:'',
      form:{
        union_id:this.$union_id,
        year:this.$year,
        holding_id:''
      },
      holdingsData: [],
      area: {},
      prevYear: {
        due_years:'',
        due_tax:0
      },
      allHoldings: [],
      currrentTax:{},
      years: [],
      holding_id:{
          value:'',
          label:''
      },
      union_details:''

    }
  },
  mounted () {
    this.getData()
     
  },
  components: {
    'v-select': vSelect
  },
  methods: {
    async getData () {
     
      if(this.$route.query.year){
        this.form.year = this.$route.query.year
      }
      if(this.$route.query.id){
         this.loading=true;
        var id = this.$route.query.id;
        var allId = id.split(",");
        if(allId.length>1){
          this.singleHoldingData(allId)
        }else{
          this.holding_id.value = this.$route.query.id
          this.singleHoldingData()
        }
      }
      const yearsData = await TaxCollectionService.years()
      this.years = yearsData.data
      const unionInfo = await UnionBillDetails.show(this.$union_id)
      this.union_details = unionInfo.data
      this.logoUrl = this.$baseUrl+unionInfo.data.logo
      this.signatureUrl = this.$baseUrl+unionInfo.data.signature
    },
     en2bn(replaceString) {
      replaceString = replaceString+"";
       if(replaceString==''){
         return '০';
       }
      var bn = ["-","১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯", "০"];
      var en = ["-","1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
      var regex; 
      for (var i = 0; i < en.length; i++) {
       regex = new RegExp(en[i], "g");
        replaceString = replaceString.replace(regex, bn[i]);
      }
      return replaceString;
    },
     async singleHoldingData(allData=''){
       if(allData!=''){
           ReportsService.singleHolding({holding_id:allData,year:this.form.year,union_id:this.$union_id}).then(response=>{
                this.holdingsData = response.data.holding
                this.area = response.data.area
                this.loading=false;
            }).catch(err=>{
                this.loading=false;
            })
       }else if(this.holding_id.value!==''){
             ReportsService.singleHolding({holding_id:[this.holding_id.value],year:this.form.year,union_id:this.$union_id}).then(response=>{
                this.holdingsData = response.data.holding
                this.area = response.data.area
                this.loading=false;

            }).catch(err=>{
                this.loading=false;
            })

         }

    },
    async holdings(value = ''){
       var value = $('.vs__search').val();
       if(value!=''){
         window.setTimeout(()=>{
            this.form.value = value
           ReportsService.allHoldings(this.form).then(response=>{
                this.allHoldings = response.data
                this.loading=false;
            }).catch(err=>{
                this.loading=false;
            })
        },200)
       }
        
    },

  }
}
</script>
<style media="print">
  .main-table{position: relative;}
  .up-bg{position: absolute;top: 50px;width: 100%;text-align: center}
  .up-bg-logo{opacity: .15;width:300px;}
  @media print {
    @page {size: auto;margin:0;background:#fff !important;}
    .v-datatable__actions{
      display: none;
    }
    .table td, .table th{color: #000;padding:2px 3px;}
     h5, h4,h6{color: #000;}
    *{color:#000}
    .bd-logo{float: left;width: 80px;}
    .union-logo{float: right;width: 80px;}
    .bill-print{background: #fff;color:#000;}
    /* table thead th:last-child{display: none;}
    table td:last-child{display: none;} */
    
    
  }
  .bill-details .card .table td,.bill-details .card .table th{padding: 3px 10px;}

  .table th b{display: block; font-weight: bolder; float: right;}
  .btn-action.btn-edit i{font-size: 8px;}
  .btn-action i{font-size: 9px;}
  .btn-action.btn-xs{float: left;font-size: 9px;margin: 1px;}
  ul.pagination{display:block;margin-top: 5px;width: 100%;text-align: center;}
  ul.pagination li{display:inline-block;}
 
  .bill-details .table-bordered td,.bill-details .table-bordered th {
    border: 1px solid;
  }
  
  
  .bill-print h5 {
    color: #3a803e;
}
.bill-print h6 {
    color: #03306b;
}

</style>
