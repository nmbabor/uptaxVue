<template>
  <div>

    <div class="row bill-details">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header card-info">
            <div class="card-btn pull-right">
              <button class="btn btn-xs btn-primary " v-print="'#printMe'"><i class="fa fa-print"></i> Print</button>
              <router-link tag="a" to="/tax-collection" class="btn btn-xs btn-light waves-effect waves-light m-1"><i class="fa fa-list"></i> কর আদায় রেজিষ্টার </router-link>
            </div>
            <h4 class="card-title"> {{$union_name}} ইউনিয়ন পরিষদ আদায়কৃত কর</h4>
          </div>
          <div class="card-body">
            <div v-if="loading" class="col-md-12" style="text-align:center;position:absolute;background: rgb(30, 71, 108,.8);z-index:9;padding:100px;left:0;height:85%">
                <img style="width:100px" src="/static/assets/images/blue.gif" alt="Loading..">
              </div>
            <div class="rows">
            <div id="printMe" class="raw bill-print" style="font-size:80%;min-width:900px">
              <div class="row" style="padding:5px;overflow:hidden;min-height:816px;background:#fff;page-break-after:always" >
             <div class="col-md-6" style="width:50%;float:left;border-right:1px dotted #333;padding-right:2%">
                 <div class="row" style="text-align:center;padding:10px 0;width:100%;margin:0">
                   <div class="col-md-2" style="width:17%;float:left;">
                   <img :src="base_url+'/images/default/bd.png'" alt="Bangladesh" class="bd-logo">
                   </div>
                   <div class="col-md-8" style="width:66%;float:left;">
                     <h5>{{$union_name}} ইউনিয়ন পরিষদ </h5>
                    <h6> উপজেলাঃ{{area.upazila_name}} , জেলাঃ {{area.district_name}} <br>
                    <small class="up-bill"> ইউপি করের বিল <span>{{en2bn(holding.year_name)}}</span> (<span>{{holding.type_name}}</span>) </small></h6>
                    <h5 style="width:150px;margin:0 auto; border:1px solid green;padding:5px;color:red;"> ইউপি কপি </h5>
                   </div>
                   <div class="col-md-2" style="width:17%;float:right;">
                     <img class="union-logo" v-if="logoUrl!=''" :src="logoUrl">
                   </div>
                    
                </div>
                <div class="col-md-12 main-table">
              <table class="table table-bordered table-striped bill-table" >
                  <tr>
                    <th style="background:#e7f9f7 !important"> হোল্ডিং নং <b>:</b> </th>
                    <td>{{en2bn(holding.holding_no)}}</td>
                  </tr>
                  <tr>
                    <th style="background:#e7f9f7 !important"> করদাতার নাম <b>:</b> </th>
                    <td>{{holding.owner_name}}</td>
                  </tr>
                  <tr>
                    <th style="background:#e7f9f7 !important"> পিতা/স্বামী <b>:</b> </th>
                    <td>{{holding.father_or_husband}}</td>
                  </tr>
                  <tr v-if="holding.type!=1">
                    <th style="background:#e7f9f7 !important"> প্রতিষ্ঠানের নাম <b>:</b> </th>
                    <td>{{holding.organization_name}}</td>
                  </tr>
                  <tr>
                    <th style="background:#e7f9f7 !important"> মোবাইল নাম্বার <b>:</b> </th>
                    <td>{{en2bn(holding.mobile)}}</td>
                  </tr>
                  <tr>
                    <th style="background:#e7f9f7 !important"> ওয়ার্ড নং <b>:</b> </th>
                    <td>{{en2bn(holding.word)}}</td>
                  </tr>
                  <tr>
                    <th style="background:#e7f9f7 !important"> গ্রামের নাম <b>:</b> </th>
                    <td>{{holding.village_name}}</td>
                  </tr>
                  <tr>
                    <th style="background:#e7f9f7 !important"> বিল ইস্যুর তারিখ <b>:</b> </th>
                    <td> {{en2bn(union_details.bill_start_date)}} </td>
                  </tr>
                  <tr>
                    <th style="background:#e7f9f7 !important"> জমাদানের শেষ তারিখ <b>:</b> </th>
                    <td>{{en2bn(union_details.bill_end_date)}}</td>
                  </tr>
                  <tr>
                    <th colspan="2" style="text-align:center"> করের বিবরণ </th>
                  </tr>
                  <tr>
                    <th style="background:#e7f9f7 !important"> পুর্বের বকেয়া<b>:</b> </th>
                    <td>{{en2bn(holding.prev_due)}}</td>
                  </tr>
                  <tr>
                    <th style="background:#e7f9f7 !important"> বার্ষিক কর <small>({{en2bn(holding.year_name)}})</small> <b>:</b> </th>
                    <td>{{en2bn(holding.tax)}}</td>
                  </tr>
                  <tr v-if="holding.discount>0">
                    <th style="background:#e7f9f7 !important"> ডিসকাউন্ট<b>:</b> </th>
                    <td>{{en2bn(holding.discount)}}</td>
                  </tr>
                  <tr>
                    <th style="background:#e7f9f7 !important"> মোট টাকা<b>:</b> </th>
                    <td>{{en2bn(holding.total_amount)}}</td>
                  </tr>
                  <tr v-if="holding.total_amount - (holding.paid_amount+holding.due_amount)>0">
                    <th style="background:#e7f9f7 !important">পুর্বে জমা<b>:</b> </th>
                    <td>{{en2bn(holding.total_amount - (holding.paid_amount+holding.due_amount))}}</td>
                  </tr>
                  <tr v-if="holding.paid_amount>0">
                    <th style="background:#e7f9f7 !important">বর্তমান জমা<b>:</b> </th>
                    <td>{{en2bn(holding.paid_amount)}}</td>
                  </tr>
                  <tr  v-if="holding.due_amount>0">
                    <th style="background:#e7f9f7 !important"> বকেয়া<b>:</b> </th>
                    <td>{{en2bn((holding.due_amount))}}</td>
                  </tr>
                  <tr v-if="holding.payment_date!=null">
                    <th style="background:#e7f9f7 !important"> জমা তারিখ<b>:</b> </th>
                    <td>{{en2bn(holding.payment_date)}}</td>
                  </tr>
              </table>
               <div class="up-bg">
                <img class="up-bg-logo" v-if="logoUrl!=''" :src="logoUrl">
              </div>
              </div>
              <br>
              <div class="col-md-12">
                <table class="table table-bordered">
                  <tr>
                    <th style="background:#e7f9f7 !important">প্রাপ্ত টাকা:</th>
                    <td width="60%"> {{en2bn(holding.paid_amount)}} </td>
                    <td rowspan="2"><p style="height:30px"></p> <span style="border-top:1px dotted #333;text-align:center;">কর আদায়কারী</span></td>
                   
                  </tr>
                  <tr>
                    <th style="background:#e7f9f7 !important">প্রাপ্ত টাকা কথায়:</th>
                    <td>{{inWords(holding.paid_amount)}}</td>
                  </tr>
                </table>
               
                <div class="col-md-12" style="overflow:hidden;font-size:90%;">
                  <span style="width:45%;float:left;border-top:1px dotted #333;margin-top:60px;text-align:center">ব্যাংক/ইউপি কার্যালয়ের সিল  </span>
                  <span style="width:40%;float:right;margin-top:15px;text-align:center">
                    <img class="signature" style="width:100px;" v-if="signatureUrl!=''" :src="signatureUrl">
                    <p v-else="" style="margin-top: 25px;"></p>
                    <br>
                  <span style="border-top:1px dotted #333;">
                    চেয়ারম্যানের স্বাক্ষর
                    </span>
                    </span>
                </div>
              <br>
                <p style="font-size:14px;color:red !important;text-align:center">নিয়মিত ইউপি কর পরিশোধ করুন, ইউনিয়নের উন্নয়নে অংশ নিন। </p>
              </div>
             </div>
             <!-- End of col-md-6 -->
             <div class="col-md-6" style="width:49%;float:right;">
                <div class="row"  style="text-align:center;padding:10px 0;margin:0;width:100%;">
                  <div class="col-md-2" style="width:17%;float:left;">
                   <img :src="base_url+'/images/default/bd.png'" alt="Bangladesh" class="bd-logo">
                   </div>
                   <div class="col-md-8" style="width:66%;float:left;">
                    <h5>{{area.union_name}} ইউনিয়ন পরিষদ </h5>
                    <h6> উপজেলাঃ {{area.upazila_name}} , জেলাঃ {{area.district_name}} <br>
                      <small class="up-bill"> ইউপি করের বিল <span>{{en2bn(holding.year_name)}}</span> (<span>{{holding.type_name}}</span>) </small> </h6>
                    <h5 style="width:150px;margin:0 auto; border:1px solid green;padding:5px;color:red;"> গ্রাহক কপি </h5>
                    </div>
                   <div class="col-md-2" style="width:17%;float:right;">
                     <img class="union-logo" v-if="logoUrl!=''" :src="logoUrl">
                   </div>
                    
                </div>
                <div class="col-md-12 main-table">
                <table class="table table-bordered table-striped bill-table">
                  <tr>
                    <th style="background:#e7f9f7 !important"> হোল্ডিং নং <b>:</b> </th>
                    <td>{{en2bn(holding.holding_no)}}</td>
                  </tr>
                  <tr>
                    <th style="background:#e7f9f7 !important"> করদাতার নাম <b>:</b> </th>
                    <td>{{holding.owner_name}}</td>
                  </tr>
                  <tr>
                    <th style="background:#e7f9f7 !important"> পিতা/স্বামী <b>:</b> </th>
                    <td>{{holding.father_or_husband}}</td>
                  </tr>
                  <tr v-if="holding.type!=1">
                    <th style="background:#e7f9f7 !important"> প্রতিষ্ঠানের নাম <b>:</b> </th>
                    <td>{{holding.organization_name}}</td>
                  </tr>
                   <tr>
                    <th style="background:#e7f9f7 !important"> মোবাইল নাম্বার <b>:</b> </th>
                    <td>{{en2bn(holding.mobile)}}</td>
                  </tr>
                  <tr>
                    <th style="background:#e7f9f7 !important"> ওয়ার্ড নং <b>:</b> </th>
                    <td>{{en2bn(holding.word)}}</td>
                  </tr>
                  <tr>
                    <th style="background:#e7f9f7 !important"> গ্রামের নাম <b>:</b> </th>
                    <td>{{holding.village_name}}</td>
                  </tr>
                  <tr>
                    <th style="background:#e7f9f7 !important"> বিল ইস্যুর তারিখ <b>:</b> </th>
                    <td> {{en2bn(union_details.bill_start_date)}} </td>
                  </tr>
                  <tr>
                    <th style="background:#e7f9f7 !important"> জমাদানের শেষ তারিখ <b>:</b> </th>
                    <td>{{en2bn(union_details.bill_end_date)}}</td>
                  </tr>
                  <tr>
                    <th colspan="2" style="text-align:center"> করের বিবরণ </th>
                  </tr>
                  <tr>
                    <th style="background:#e7f9f7 !important"> পুর্বের বকেয়া<b>:</b> </th>
                    <td>{{en2bn(holding.prev_due)}}</td>
                  </tr>
                  <tr>
                    <th style="background:#e7f9f7 !important"> বার্ষিক কর <small>({{en2bn(holding.year_name)}})</small> <b>:</b> </th>
                    <td>{{en2bn(holding.tax)}}</td>
                  </tr>
                  <tr v-if="holding.discount>0">
                    <th style="background:#e7f9f7 !important"> ডিসকাউন্ট<b>:</b> </th>
                    <td>{{en2bn(holding.discount)}}</td>
                  </tr>
                  <tr>
                    <th style="background:#e7f9f7 !important"> মোট টাকা<b>:</b> </th>
                    <td>{{en2bn(holding.total_amount)}}</td>
                  </tr>
                  <tr v-if="holding.total_amount - (holding.paid_amount+holding.due_amount)>0">
                    <th style="background:#e7f9f7 !important">পুর্বে জমা<b>:</b> </th>
                    <td>{{en2bn(holding.total_amount - (holding.paid_amount+holding.due_amount))}}</td>
                  </tr>
                  <tr v-if="holding.paid_amount>0">
                    <th style="background:#e7f9f7 !important">বর্তমান জমা<b>:</b> </th>
                    <td>{{en2bn(holding.paid_amount)}}</td>
                  </tr>
                  <tr  v-if="holding.due_amount>0">
                    <th style="background:#e7f9f7 !important"> বকেয়া<b>:</b> </th>
                    <td>{{en2bn((holding.due_amount))}}</td>
                  </tr>
                  <tr v-if="holding.payment_date!=null">
                    <th style="background:#e7f9f7 !important"> জমা তারিখ<b>:</b> </th>
                    <td>{{en2bn(holding.payment_date)}}</td>
                  </tr>
              </table>
              <div class="up-bg">
                <img class="up-bg-logo" v-if="logoUrl!=''" :src="logoUrl">
              </div>
                </div>
              <br>
              <div class="col-md-12">
                <table class="table table-bordered">
                  <tr>
                    <th style="background:#e7f9f7 !important">প্রাপ্ত টাকা:</th>
                    <td width="60%">{{en2bn(holding.paid_amount)}}</td>
                    <td rowspan="2"><p style="height:30px"></p> <span style="border-top:1px dotted #333;text-align:center;">কর আদায়কারী</span></td>
                   
                  </tr>
                  <tr>
                    <th style="background:#e7f9f7 !important">প্রাপ্ত টাকা কথায়:</th>
                    <td>{{inWords(holding.paid_amount)}}</td>
                  </tr>
                </table>
               
                <div class="col-md-12" style="overflow:hidden;font-size:90%;">
                  <span style="width:45%;float:left;border-top:1px dotted #333;margin-top:60px;text-align:center">ব্যাংক/ইউপি কার্যালয়ের সিল  </span>
                  <span style="width:40%;float:right;margin-top:15px;text-align:center">
                    <img class="signature" style="width:100px;" v-if="signatureUrl!=''" :src="signatureUrl">
                     <p v-else style="margin-top: 25px;"></p>
                    <br>
                  <span style="border-top:1px dotted #333;">
                    চেয়ারম্যানের স্বাক্ষর
                    </span>
                    </span>
              </div>
              <br>
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
      holding:{},
      area: {},
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
      if(this.$route.params.id){
         this.loading=true;
          this.singleHoldingData()
      }
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
      var bn = ["১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯", "০"];
     var en = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
      var regex; 
      for (var i = 0; i < en.length; i++) {
       regex = new RegExp(en[i], "g");
        replaceString = replaceString.replace(regex, bn[i]);
      }
      return replaceString;
    },
   inWords (num) {
    var a = ['','এক ','দুই ','তিন ','চার ', 'পাঁচ ','ছয় ','সাত ','আট ','নয় ','দশ ','এগারো ','বারো ','তেরো ','চৌদ্দ ','পনের ','ষোল ','সতের ','আঠারো ','উনিশ '];
    var b = ['', '', 'বিশ','ত্রিশ','চল্লিশ' ,'পঞ্চাশ', 'ষাট','সত্তর','আশি','নব্বই'];
        if ((num = num+"").length > 9) return 'overflow';
      var  n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
        if (!n) return; var str = '';
        str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'কোটি ' : '';
        str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'লাখ ' : '';
        str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]])  + 'হাজার ' : '';
        str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'শত ' : '';
        str += (n[5] != 0) ? ((str != '') ? 'এবং ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'মাত্র ' : '';
        return str;
    },
     async singleHoldingData(){
            TaxCollectionService.show(this.$route.params.id,{year:this.form.year,union_id:this.$union_id}).then(response=>{
              console.log(response.data)
              this.holding = response.data.holding
              this.area = response.data.area
              this.loading=false;
              console.log(this.holding)

          }).catch(err=>{
              this.loading=false;
          })
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
    .bill-details .card .table th {background:#e7f9f7 !important;}
    
  }
  .bill-details .card .table td,.bill-details .card .table th{padding: 3px 10px;}

  .table th b{display: block; font-weight: bolder; float: right;}
  .btn-action.btn-edit i{font-size: 8px;}
  .btn-action i{font-size: 9px;}
  .btn-action.btn-xs{float: left;font-size: 9px;margin: 1px;}
  ul.pagination{display:block;margin-top: 5px;width: 100%;text-align: center;}
  ul.pagination li{display:inline-block;}
 .bill-details .card .table th {background:#e7f9f7 !important;}
  .bill-details .table-bordered td,.bill-details .table-bordered th {
    border: 1px solid;
  }
  
  .up-bill{color:red}
  .up-bill span{color:red}
  .bill-print h5 {
    color: #3a803e;
}
.bill-print h6 {
    color: #03306b;
}

</style>
