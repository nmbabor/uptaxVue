<template>
  <div>
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class=" card-header">
            " {{ this.form.keyword }} " এর জন্য সার্চ রেজাল্ট
            <div class="pull-right"></div>
          </div>

          <div class="card-body">
            <div
              v-if="loading"
              class="col-md-12"
              style="text-align:center;position:absolute;    background: rgb(30, 71, 108,.8);z-index:9;padding:100px;left:0;height:85%"
            >
              <img
                style="width:100px"
                src="/static/assets/images/blue.gif"
                alt="Loading.."
              />
            </div>
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
                    <th v-if="form.type == 2">প্রতিষ্ঠানের নাম</th>
                    <th>
                      পূর্বের <br />
                      বকেয়া
                    </th>
                    <th>
                      বার্ষিক<br />
                      কর
                    </th>
                    <th>
                      মোট<br />
                      টাকা
                    </th>
                    <th>জমা</th>
                    <th>
                      বর্তমান <br />
                      বকেয়া
                    </th>
                    <th class="no-print">একশন</th>
                    <th class="no-print">বিস্তারিত</th>
                    <th class="no-print">
                      ট্যাক্স <br />
                      সংগ্রহ
                    </th>
                  </tr>
                </thead>
                <tbody style="font-size:80%">
                  <tr v-for="data in allHoldings" :key="data.id">
                    <td>{{ data.holding_no }}</td>
                    <td>{{ data.owner_name }}</td>
                    <td>{{ data.father_or_husband }}</td>
                    <td>{{ data.mobile }}</td>
                    <td>{{ data.word }}</td>
                    <td>{{ data.village_name }}</td>
                    <td v-if="form.type == 2">{{ data.organization_name }}</td>
                    <td>{{ data.prev_due }}</td>
                    <td>{{ data.tax }}</td>
                    <td>{{ data.total_amount }}</td>
                    <td>{{ data.total_paid }}</td>
                    <td>{{ data.total_amount - data.total_paid }}</td>
                    <td class="no-print">
                      <router-link
                        v-if="data.total_amount - data.total_paid > 0"
                        title="ডিসকাউন্ট"
                        class="btn btn-xs btn-info waves-effect waves-light m-1"
                        v-bind:to="{
                          name: 'editHolding',
                          params: { id: data.holding_id },
                          query: { discount: 1 }
                        }"
                      >
                        <i class="fa fa-tag"></i
                      ></router-link>
                      <router-link
                        class="btn btn-xs btn-warning waves-effect waves-light m-1"
                        v-bind:to="{
                          name: 'editHolding',
                          params: { id: data.holding_id }
                        }"
                      >
                        <i class="fa fa-edit"></i
                      ></router-link>
                      <button
                        class="btn btn-xs btn-danger waves-effect waves-light m-1"
                        @click="deleteData(data.holding_id)"
                      >
                        <i class="fa fa-trash"></i>
                      </button>
                    </td>
                    <td class="no-print">
                      <router-link
                        title="ব্যক্তিগত প্রতিবেদন"
                        tag="a"
                        :to="{
                          path:
                            '/personal-details?id=' +
                            data.holding_id +
                            '&year=' +
                            data.year
                        }"
                        class="btn btn-xs btn-info waves-effect waves-light m-1"
                        ><i class="fa fa-user"></i>
                      </router-link>
                      <router-link
                        title="বিল প্রতিবেদন"
                        tag="a"
                        :to="{
                          path:
                            '/bill-report?id=' +
                            data.holding_id +
                            '&year=' +
                            data.year
                        }"
                        class="btn btn-xs btn-primary waves-effect waves-light m-1"
                        ><i class="fa fa-print"></i>
                      </router-link>
                    </td>
                    <td class="no-print">
                      <router-link
                        v-if="data.total_amount - data.total_paid > 0"
                        title="বিল আদায়"
                        tag="a"
                        :to="{
                          path:
                            '/tax-collection/create?id=' +
                            data.id +
                            '&year=' +
                            data.year
                        }"
                        class="btn btn-xs btn-success waves-effect waves-light m-1"
                        ><i class="fa fa-plus-circle"></i>
                      </router-link>
                    </td>
                  </tr>
                </tbody>
                <tbody style="font-size:80%" v-if="allTradelicence.length > 0">
                  <tr>
                    <th colspan="14" class="text-center"> &nbsp; </th>
                  </tr>
                  <tr>
                    <th colspan="14" class="text-center">ট্রেড লাইসেন্স</th>
                  </tr>
                  <tr style="background:#777">
                    <th>ট্রেডলাইসেন্স নাম্বার</th>
                    <th>প্রোপাইটরের নাম</th>
                    <th>প্রতিষ্ঠানের নাম</th>
                    <th>মোবাইল নাম্বার</th>
                    <th>পিতা/স্বামির নাম</th>
                    <th>বাজার</th>
                    <th>ব্যবসার ধরণ</th>
                    <th>
                      পূর্বের <br />
                      বকেয়া
                    </th>
                    <th>বার্ষিক কর সহ ফী </th>
                    <th>মোট কর সহ ফী</th>
                    <th>জমা</th>
                    <th>
                      বর্তমান <br />
                      বকেয়া
                    </th>
                    <th class="no-print">একশন</th>
                    <th class="no-print">
                      ট্যাক্স <br />
                      সংগ্রহ
                    </th>
                  </tr>

                  <tr
                    v-for="tlData in allTradelicence"
                    :key="'tl-' + tlData.id"
                  >
                    <td>{{ tlData.trade_licence_no }}</td>
                    <td>{{ tlData.owner_name }}</td>
                    <td>{{ tlData.organization_name }}</td>
                    <td>{{ tlData.mobile }}</td>
                    <td>{{ tlData.father_or_husband }}</td>
                    <td>{{ tlData.bazar_name }}</td>
                    <td>{{ tlData.business_type }}</td>
                    <td>{{ tlData.prev_due }}</td>
                    <td>{{ tlData.total_amount - tlData.prev_due }}</td>
                    <td>{{ tlData.total_amount }}</td>
                    <td>{{ tlData.total_paid }}</td>
                    <td>{{ tlData.total_amount - tlData.total_paid }}</td>
                    <td class="no-print">
                    <router-link
                        title="বিস্তারিত প্রতিবেদন"
                        tag="a"
                        :to="{
                          path:
                            '/trade-licence-print?id=' +
                            tlData.trade_licence_id +
                            '&year=' +
                            tlData.year
                        }"
                        class="btn btn-xs btn-info waves-effect waves-light m-1"
                        ><i class="fa fa-file"></i>
                      </router-link>
                      <router-link
                        class="btn btn-xs btn-warning waves-effect waves-light m-1"
                        v-bind:to="{
                          name: 'editTradeLicence',
                          params: { id: tlData.trade_licence_id }
                        }"
                      >
                        <i class="fa fa-edit"></i
                      ></router-link>
                      <button
                        class="btn btn-xs btn-danger waves-effect waves-light m-1"
                        @click="deleteTlData(tlData.trade_licence_id)"
                      >
                        <i class="fa fa-trash"></i>
                      </button>
                    </td>
                    <td class="no-print"></td>
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
import SearchService from "@/services/SearchService";
import HoldingsService from "@/services/HoldingsService";
import TradeLicenceService from '@/services/TradeLicenceService'
export default {
  name: "Search",
  data() {
    return {
      loading: false,
      allTradelicence: [],
      allData: [],
      allHoldings: {},
      form: {
        union_id: this.$union_id,
        year: this.$year,
        keyword: ""
      }
    };
  },
  mounted() {
    this.getData();
    this.getTradeLicence();
  },
  methods: {
    async getData() {
      this.form.keyword = this.$route.query.keyword;
      this.loading = true;
      SearchService.search(this.form)
        .then(response => {
          this.allHoldings = response.data;
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
        });
    },
    async getTradeLicence() {
      this.form.keyword = this.$route.query.keyword;
      this.loading = true;
      SearchService.searchTradeLicence(this.form)
        .then(response => {
          this.allTradelicence = response.data;
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
        });
    },

    async deleteData(id) {
      const $this = this;
      $this
        .$swal({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        })
        .then(function(result) {
          if (result.value) {
            HoldingsService.delete(id)
              .then(response => {
                $this.$swal({
                  type: "success",
                  title: "Deleted Successfully Done",
                  showConfirmButton: false,
                  timer: 1500
                });
                $this.getData();
              })
              .catch(err => {
                $this.$swal({
                  type: "error",
                  title: err.response.data,
                  showConfirmButton: true
                });
              });
          }
        });
    },
     async deleteTlData(id) {
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
};
</script>
