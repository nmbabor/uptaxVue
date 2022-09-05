<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header card-info">
            <div class="card-btn pull-right">
              <button class="btn btn-xs btn-primary " v-print="'#printMe'"><i class="fa fa-print"></i> Print</button>
              <router-link tag="a" to="/tax-collection/create" class="btn btn-xs btn-light waves-effect waves-light m-1"><i class="fa fa-plus-circle"></i> নতুন সংযোজন </router-link>
            </div>
            <h4 class="card-title"> ওয়ার্ড ভিত্তিক দৈনিক আদায় </h4>
          </div>
          <div class="card-body ">
            <div class="row">
              <div class="form-group col-md-3">
                  <label for="start_date"> শুরু তারিখ</label>
                  <vuejs-datepicker type="date" format="dd-MM-yyyy" :input-class="{'form-control': true, 'text-danger': errors.has('start_date') }" v-validate="'required'" name="start_date"  v-model="form.start_date" placeholder=" শুরু তারিখ"></vuejs-datepicker>
              </div>
              <div class="form-group col-md-3">
                  <label for="end_date"> শেষ তারিখ</label>
                  <vuejs-datepicker type="date" format="dd-MM-yyyy" :input-class="{'form-control': true, 'text-danger': errors.has('end_date') }" v-validate="'required'" name="end_date"  v-model="form.end_date" placeholder="শেষ তারিখ"></vuejs-datepicker>
              </div>
              <div class="col-md-2" style="display:none">
                  <div class="form-group">
                      <label class="col-md-12"> ইউনিয়ন </label>
                      <div class="col-md-12">
                          <select class="form-control" v-model="form.union_id" @change="loadVillage()">
                            <option value=""> -ইউনিয়ন নির্বাচন করুন- </option>
                            <option v-for="(data,i) in unions" :key="i" :value="data.id"> {{data.bn_name}} </option>
                          </select>
                      </div>
                  </div>
              </div>
              <div class="col-md-2">
                  <div class="form-group">
                      <label class="col-md-12 no-padding"> ওয়ার্ড নাম্বার </label>
                      <div class="col-md-12 no-padding">
                        <select class="form-control" required v-model="form.word">
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
              <div class="col-md-2">
                  <div class="form-group">
                      <label class="col-md-12 no-padding"> গ্রাম </label>
                      <div class="col-md-12 no-padding">
                          <select class="form-control" required v-model="form.village_id">
                          <option value=""> -গ্রাম নির্বাচন করুন- </option>
                          <option v-for="(data,i) in village" :key="i" :value="data.id"> {{data.bn_name}} </option>
                          </select>
                      </div>
                  </div>
              </div>
              <div class="col-md-2">
                <label class="col-md-12 no-padding no-margin"> &nbsp; </label>
                <button @click="dailyTax()" class="btn btn-light waves-effect waves-light m-1">সার্চ</button>
              </div>

            </div>
            <div class="rows table-responsive">
              <div class="col-sm-4 pull-right">
              <v-text-field
                v-model="search"
                append-icon="search"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </div>
             <div id="printMe">
            <v-data-table
              :headers="headers"
              :items="allData"
              sort-field="amount" sort-desc="true"
              :search="search"
              :pagination.sync="pagination"
              class="elevation-1"
            >
              <template slot="items" slot-scope="props">
                <td> {{props.item.holding_no}} </td>
                <td> {{props.item.owner_name}} </td>
                <td><span v-if="props.item.type===1">আবাসিক </span> <span v-else=""> বানিজ্যিক </span> </td>
                <td> {{props.item.word}} </td>
                <td> {{props.item.village_name}} </td>
                <td> {{props.item.payment_date}} </td>
                <td> {{props.item.year_name}} </td>
                <td> {{props.item.tax}} </td>
              </template>
              <v-alert slot="no-results" :value="true" color="error" icon="warning">
                আপনার সার্চ "{{ search }}" পাওয়া যায় না
              </v-alert>
            </v-data-table>
            <div class="col-md-12">
              <h4 class="text-right" style="margin-top:5px;"> মোট ট্যাক্স সংগ্রহ : {{total}}/- </h4>
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
export default {
  name: 'Hondings',
  data () {
    return {
      unions: [],
      village: [],
      form:{
        union_id:'',
        village_id:'',
        word:'',
        start_date:'',
        end_date:'',
      },
      allData: [],
      total:0,
      type:0,
      search: '',
      pagination: {},
      headers: [
        {
          text: 'হোল্ডিং নাম্বার',
          align: 'left',
          value: 'holding_no',sortable: false
        },
        { text: 'মালিক', value: 'owner_name' ,sortable: false},

        { text: 'ধরণ', value: 'type',sortable: false },
        { text: 'ওয়ার্ড', value: 'word',sortable: false },
        { text: 'গ্রাম', value: 'village.bn_name',sortable: false },
        { text: 'তারিখ', value: 'payment_date',sortable: false },
        { text: 'বছর', value: 'year_name',sortable: false },
        { text: 'ট্যাক্স', value: 'tax',sortable: false },
      ],
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    async getData () {
      const unionData = await ReportsService.unions();
      this.unions = unionData.data;
      this.form.union_id = this.unions[0].id
      this.loadVillage ()
    },
    async dailyTax(){
      // Start Date
      let s_day = new Date(this.form.start_date).getDate()
      let s_month = new Date(this.form.start_date).getMonth()+1
      if(s_month<10){
        s_month = '0'+s_month
      }
      if(s_day<10){
        s_day = '0'+s_day
      }
      let s_year = new Date(this.form.start_date).getFullYear()
      let start_date = s_year+'-'+s_month+'-'+s_day
      this.form.start_date = start_date
      // End Date
      let e_day = new Date(this.form.end_date).getDate()
      let e_month = new Date(this.form.end_date).getMonth()+1
      if(e_month<10){
        e_month = '0'+e_month
      }
      if(e_day<10){
        e_day = '0'+e_day
      }
      let e_year = new Date(this.form.end_date).getFullYear()
      let end_date = e_year+'-'+e_month+'-'+e_day
       this.form.end_date = end_date

      const response = await ReportsService.dailyTax(this.form)
      this.allData = response.data.allData
      this.total = response.data.total

    },
    async loadVillage (){
       if(this.form.union_id!==''){
        const allData = await AreaService.village(this.form.union_id)
        this.village = allData.data
       }else{
         this.village = []
       }
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
          HoldingsService.delete(id)
          $this.getData()
        }
      })
    }
  }
}
</script>
<style media="print">
  @media print {
    .v-datatable__actions{
      display: none;
    }
    
    
  }
  .btn-action.btn-edit i{font-size: 8px;}
  .btn-action i{font-size: 9px;}
  .btn-action.btn-xs{float: left;font-size: 9px;margin: 1px;}
</style>
