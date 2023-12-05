<template>
    <div>
  
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header card-info">
              <div class="card-btn pull-right">
                <button class="btn btn-xs btn-primary " v-print="'#printMe'"><i class="fa fa-print"></i> Print</button>
                <router-link tag="a" to="/tax-collection/create" class="btn btn-xs btn-light waves-effect waves-light m-1"><i class="fa fa-plus-circle"></i> কর আদায় </router-link>
              </div>
              <h4 class="card-title"> {{credentials['union']}} ইউনিয়ন পরিষদ ট্রেড লাইসেন্স ফি আদায়ের রেজিষ্টার প্রতিবেদন</h4>
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
                            <select class="form-control" @change="dataDistribute()" required v-model="form.year">
                            <option value=""> -বছর নির্বাচন করুন- </option>
                            <option v-for="(data,i) in years" :key="i" :value="data.id"> {{data.name}} </option>
                            </select>
                        </div>
                    </div>
                </div>
                
                <div class="col-md-3 no-padding">
                   <div class="form-group">
                    <label class="col-md-12 no-padding"> &nbsp; </label>
                        <div class="col-md-12">
                          <input type="text" @keyup="holdings()" v-model="form.keyword" class="form-control" placeholder="এখানে সার্চ করুন...">
                        </div>
                   </div>
                </div>
                <div class="col-md-1 no-padding">
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
                <table width="100%" class="tax-colltection">
                  <thead>
                    <tr>
                      <td>
                        <div class="col-md-12"  style="text-align:center">
                           <br>
                          <h5>{{credentials['union']}} ইউনিয়ন পরিষদ ট্রেড লাইসেন্স ফি আদায়ের রেজিষ্টার প্রতিবেদন, <span v-if="credentials['bazar']"> {{credentials['bazar']}}, </span> <span v-if="(credentials['year'])"> {{credentials['year']}}</span></h5>
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
                        <th width="5%">ট্রেড লাইসেন্স নং</th>
                        <th width="7%">আদায়ের <br> তারিখ</th>
                        <th width="13%">ব্যবসা প্রতিষ্ঠানের নাম</th>
                        <th width="13%">মালিকের নাম</th>
                        <th width="10%">বাবার/স্বামীর নাম</th>
                        <th width="10%">মোবাইল নাম্বার</th>
                        <th width="8%">বাজার</th>
                        <th width="5%"> বকেয়া <br> কর</th>
                        <th width="5%">মোট <br> পাওনা</th>
                        <th width="5%">বর্তমান <br> জমা</th>
                        <th width="5%">বর্তমান <br> বকেয়া</th>
                        <th  width="5%" class="no-print"><i class="fa fa-print"></i></th>
                      </tr>
  
                    </thead>
                    <tbody>
                      <tr v-for="data in allHoldings.data" :key="data.id">
                        <td> {{data.trade_licence_no}} </td>
                        <td> {{data.payment_date}} </td>
                        <td> {{data.organization_name}} </td>
                        <td style="white-space: normal;"> {{data.owner_name}} </td>
                        <td style="white-space: normal;"> {{data.father_or_husband}} </td>
                        <td> {{data.mobile}} </td>
                        <td style="white-space: normal;"> {{data.bazar_name}} </td>
                        <td> {{data.prev_due}} </td>
                        <td> {{data.total_payable}} </td>
                        <td> {{data.paid_amount}} </td>
                        <td> {{data.due_amount}} </td>
                         <td class="no-print">
                           <router-link tag="a" :to="{ path: '/tax-collection/'+data.id+'?year='+form.year}" class="btn btn-xs btn-info"><i class="fa fa-print"></i> </router-link>
                           <button class="btn btn-xs btn-danger" @click="deleteData(data.id)"><i class="fa fa-trash"></i></button>
                         </td>
                      </tr>
                      <tr style="background:#999">
                        <th colspan="7" style="text-align:right">মোট:</th>
                        <th v-if="form.type==2"></th>
                        <th>{{this.footer.prev_due}}</th>
                        <th>{{this.footer.total_payable}}</th>
                        <th>{{this.footer.total_paid}}</th>
                        <th>{{this.footer.tax_due}}</th>
                        <td class="no-print"></td>
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
  import AreaService from '@/services/AreaService'
  import TaxCollectionService from '@/services/TaxCollectionService'
  import LicenseTaxCollectionService from '@/services/LicenseTaxCollectionService'
  export default {
    name: 'Hondings',
    data () {
      return {
        loading:false,
        bazar: [],
        types: [],
        form:{
          union_id:this.$union_id,
          bazar_id:'',
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
        pagination: {},
        footer:{
          prev_due:0,
          tax:0,
          prev_paid:0,
          total_payable:0,
          total_paid:0,
          tax_due:0,
        }
      }
    },
    mounted () {
      this.getData()
    },
    methods: {
      async getData () {
         const yearsData = await LicenseTaxCollectionService.years()
        this.years = yearsData.data
        this.loadBazar ()
    },
  
      async holdings(page = 1){
        this.loading=true;
        this.form.page = page
        this.form.paid_status=1
        //const response =
        LicenseTaxCollectionService.index(this.form).then(response=>{
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
            prev_due:0,
            tax:0,
            prev_paid:0,
            total_payable:0,
            total_paid:0,
            tax_due:0,
          };
          for(let i = 0;i<this.allData.length;i++){
            this.allData[i].total_payable =parseInt(this.allData[i].due_amount) + parseInt(this.allData[i].paid_amount)
            this.footer.prev_due += parseFloat(this.allData[i].prev_due)
            this.footer.tax += parseFloat(this.allData[i].yearly_amount)
            this.footer.prev_paid += this.allData[i].total_amount - (parseFloat(this.allData[i].paid_amount)+parseFloat(this.allData[i].due_amount))+parseFloat(this.allData[i].discount)
            this.footer.total_payable += parseFloat(this.allData[i].total_payable)
  
            this.footer.total_paid += parseFloat(this.allData[i].paid_amount)
            this.footer.tax_due += parseFloat(this.allData[i].due_amount)
          }
      },
  
  
      async loadBazar (){
         if(this.form.union_id!==''){
          const allData = await AreaService.bazar(this.form.union_id)
          this.bazar = allData.data
         }else{
           this.bazar = []
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
            TaxCollectionService.delete(id,$this.$year).then(response=>{
             $this.$swal({
                  type: 'success',
                  title: 'Successfully Deleted',
                  showConfirmButton: false,
                  timer: 1500
                })
                console.log(response.data)
            }).catch(err=>{
              if(err.response.status===400){
                $this.$swal({
                  type: 'error',
                  title: "এটি ডিলেট করা সম্ভব না। এই হোল্ডিং এ আরো একটি জমা রিসিপ্ট রয়েছে।",
                  showConfirmButton: true
                })
              }
            })
            $this.getData()
          }
        })
      }
    }
  }
  </script>
  
  <style media="print">
  .tax-colltection tr th, .tax-colltection tr td{font-size: 12px;}
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
  