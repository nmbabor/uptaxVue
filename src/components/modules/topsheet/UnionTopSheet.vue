
<template>
<div>
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                
                <div class=" card-header">ইউনিয়ন পরিষদ টপশিট
                    <div class="pull-right">
                   <button class="btn btn-xs btn-primary " v-print="'#printMe'"><i class="fa fa-print"></i> Print</button>
                    </div>
                </div>
                
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-3">
                            <div class="form-group row">
                                <label class="col-md-4 text-right" style="margin-top:8px">অর্থ বছর </label>
                                <div class="col-md-8 no-padding">
                                    <select class="form-control" @change="loadData()" required v-model="form.year">
                                    <option value=""> -বছর নির্বাচন করুন- </option>
                                    <option v-for="(data,i) in years" :key="i" :value="data.id"> {{data.name}} </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-2">
                        <div class="form-group">
                            <div class="col-md-12 no-padding">
                                <select class="form-control" @change="loadData()" required v-model="form.type">
                                <option value="0"> সকল </option>
                                <option value="1"> আবাসিক </option>
                                <option value="2"> বানিজ্যিক </option>
                                </select>
                            </div>
                        </div>
                    </div>
                    </div>
                  <div v-if="loading" class="col-md-12" style="text-align:center;position:absolute;    background: rgb(30, 71, 108,.8);z-index:9;padding:100px;left:0;height:85%">
                  <img style="width:100px" src="/static/assets/images/blue.gif" alt="Loading..">
                </div>
                
                  <div id="printMe" class="table-responsive">
                      <div class="col-md-12"  style="text-align:center">
                          <br>
                        <h5> {{union_name}} ইউনিয়ন পরিষদ টপশিট <br> <small> <span v-if="(credentials['year'])"> {{credentials['year']}}</span>({{credentials['type']}}) </small> </h5>
                      </div>
                <table class="table table-bordered table-striped">
                  <thead>
                    <tr style="background:#777">
                      <th>ওয়ার্ড</th>
                      <th>গ্রামের <br> সংখ্যা</th>
                      <th>খানার <br> সংখ্যা</th>
                      <th>আদায়কৃত <br> খানার সংখ্যা</th>
                      <th>বকেয়া <br> খানার সংখ্যা</th>
                      <th>হাল <br> ধার্য্য কর</th>
                      <th>হাল <br> আদায়</th>
                      <th>পূর্বের <br> বকেয়া</th>
                      <th>বকেয়া <br> আদায়</th>
                      <th>সর্বমোট <br> আদায়</th>
                      <th>অর্থ বছর</th>
                      <th>আদায়ের <br> শতকরা হার</th>
                      <th> মন্তব্য </th>
                    </tr>

                  </thead>
                  <tbody style="font-size:80%">
                    <tr v-for="data in allData" :key="data.id">
                      <td> {{data.word}} </td>
                      <td> {{data.village}} </td>
                      <td> {{data.holding}} </td>
                      <td> {{data.paid_holdings}} </td>
                      <td> {{data.holding-data.paid_holdings}} </td>
                      <td> {{data.current_tax}} </td>
                      <td> {{data.total_paid-data.total_prev_paid}}  </td>
                      <td> {{data.total_prev_due}} </td>
                      <td> {{data.total_prev_paid}} </td>
                      <td> {{data.total_paid}} </td>
                      <td> {{data.year_name}} </td>
                      <td> {{parseFloat((data.total_paid/data.total_amount)*100).toFixed(2)}}% </td>
                      <td></td>
                      
                    </tr>
                    <tr style="background:#999">
                      <th> মোটঃ </th>
                      <th> {{this.footer.village}} </th>
                      <th> {{this.footer.holding}} </th>
                      <th> {{this.footer.paid_holdings}} </th>
                      <th> {{this.footer.holding-this.footer.paid_holdings}} </th>
                      <th> {{this.footer.current_tax}} </th>
                      <th> {{this.footer.total_paid-this.footer.total_prev_paid}}  </th>
                      <th> {{this.footer.total_prev_due}} </th>
                      <th> {{this.footer.total_prev_paid}} </th>
                      <th> {{this.footer.total_paid}} </th>
                      <th> </th>
                      <th> {{parseFloat((this.footer.total_paid/this.footer.total_amount)*100).toFixed(2)}}% </th>
                      <th></th>
                    </tr>
                  </tbody>

                </table>
              </div>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>
<script>
import TopSheetService from '@/services/TopSheetService'
export default {
  name: 'UnionTopSheet',
  data () {
    return {
        loading:false,
        allData:{},
        union_name:this.$union_name,
        years: [],
        credentials: [],
        form:{
          union_id:this.$union_id,
          year:this.$year,
          type:1,
        },
        footer:{
          village:0,
          holding:0,
          paid_holdings:0,
          current_tax:0,
          total_amount:0,
          total_paid:0,
          total_prev_paid:0,
          total_prev_due:0,
        }
        
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
       async getData () {
        const yearsData = await TopSheetService.years()
      this.years = yearsData.data
      this.loadData();
       
       
    },
    loadData(){
        this.loading=true;
        TopSheetService.index(this.form).then(response=>{
            this.allData = response.data.allData
             this.credentials = response.data.credentials
            this.dataDistribute();
            this.loading=false;
        }).catch(err=>{
            this.loading=false;
        })
    },
     dataDistribute(){
      this.footer = {
          village:0,
          holding:0,
          paid_holdings:0,
          current_tax:0,
          total_amount:0,
          total_paid:0,
          total_prev_paid:0,
          total_prev_due:0,
        };
        for(let i = 0;i<this.allData.length;i++){
          this.footer.village+=parseFloat(this.allData[i].village)
          this.footer.holding+=parseFloat(this.allData[i].holding)
          this.footer.paid_holdings+=parseFloat(this.allData[i].paid_holdings)
          this.footer.current_tax+=parseFloat(this.allData[i].current_tax)
          this.footer.total_amount+=parseFloat(this.allData[i].total_amount)
          this.footer.total_paid+=parseFloat(this.allData[i].total_paid)
          this.footer.total_prev_paid+=parseFloat(this.allData[i].total_prev_paid)
          this.footer.total_prev_due+=parseFloat(this.allData[i].total_prev_due)
        }
    },

   
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
    h5{color:#000}
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