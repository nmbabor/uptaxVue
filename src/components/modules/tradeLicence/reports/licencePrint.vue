<template>
  <div>
    <div class="row bill-details">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header card-info">
            <div class="card-btn pull-right">
              <button class="btn btn-xs btn-primary " v-print="'#printMe'">
                <i class="fa fa-print"></i> Print
              </button>
              <router-link
                tag="a"
                to="/report/due-tax"
                class="btn btn-xs btn-light waves-effect waves-light m-1"
                ><i class="fa fa-list"></i> বকেয়া প্রতিবেদন
              </router-link>
            </div>
            <h4 class="card-title">
              {{ area.union_name }} ইউনিয়ন পরিষদ ট্রেড লাইসেন্স
            </h4>
          </div>
          <div class="card-body">
            <div
              v-if="loading"
              class="col-md-12"
              style="text-align:center;position:absolute;background: rgb(30, 71, 108,.8);z-index:9;padding:100px;left:0;height:85%"
            >
              <img
                style="width:100px"
                src="/static/assets/images/blue.gif"
                alt="Loading.."
              />
            </div>
            <div class="rows">
              <div id="printMe" class="raw bill-print" style="width: 210mm; margin: 0 auto;">
                <div
                  class="row"
                  v-for="licence in licencesData"
                  :key="licence.id"
                  style="padding:5px;overflow:hidden;"
                >
                  <div class="col-md-12" style="width:100%;">
                    <div
                      class="row"
                      style="text-align:center;padding:10px 0;width:100%;margin:0"
                    >
                     <div class="col-md-12">
                        <h4>{{ area.union_name }} ইউনিয়ন পরিষদ</h4>
                        <h5>
                          {{ area.upazila_name }} , {{ area.district_name }}
                        </h5>
                      </div>
                    </div>
                    <div
                      class="row"
                      style="text-align:center;padding:10px 0;width:100%;margin:0"
                    >
                      <div class="col-md-2" style="width:17%;float:left;">
                        <img
                          :src="base_url + '/images/default/bd.png'"
                          alt="Bangladesh"
                          class="bd-logo"
                        />
                      </div>
                      <div class="col-md-8" style="width:66%;float:left;">
                        <img
                          :src="base_url + '/images/default/bd.png'"
                          alt="Bangladesh"
                          style="margin: 0 auto; width: 80px;"
                        />
                        <h5 style="color: red"> ট্রেড লাইসেন্স </h5>
                      </div>
                      <div class="col-md-2" style="width:17%;float:right;">
                        <div style="width: 120px; height: 130px; border: 1px solid #ddd; float: right">
                        <small> ছবি সংযুক্তি </small>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-12 main-table">
                      <table
                        class="table table-bordered table-striped bill-table"
                      >
                        <tr>
                          <th>ট্রেডলাইসেন্স নাম্বার <b>:</b></th>
                          <td>{{ en2bn(licence.trade_licence_no) }}</td>
                        </tr>
                        <tr>
                          <th>প্রোপাইটরের নাম <b>:</b></th>
                          <td>{{ licence.owner_name }}</td>
                        </tr>
                        <tr>
                          <th>প্রতিষ্ঠানের নাম <b>:</b></th>
                          <td>{{ licence.organization_name }}</td>
                        </tr>
                        <tr>
                          <th>মোবাইল নাম্বার <b>:</b></th>
                          <td>{{ licence.mobile }}</td>
                        </tr>
                        <tr>
                          <th>হোল্ডিং নং <b>:</b></th>
                          <td>{{ en2bn(licence.holding_no) }}</td>
                        </tr>
                        <tr>
                          <th>পিতা/স্বামির নাম <b>:</b></th>
                          <td>{{ licence.father_or_husband }}</td>
                        </tr>
                        <tr>
                          <th>বাজারের নাম <b>:</b></th>
                          <td>{{ licence.bazar_name }}</td>
                        </tr>
                        <tr>
                          <th>ওয়ার্ড <b>:</b></th>
                          <td>{{ en2bn(licence.word) }}</td>
                        </tr>
                        <tr>
                          <th>ব্যবসার ধরণ <b>:</b></th>
                          <td>{{ licence.business_type }}</td>
                        </tr>
                        <tr>
                          <th>
                            জাতীয় পরিচয়পত্র/ জন্ম নিবন্ধন নম্বর <b>:</b>
                          </th>
                          <td>{{ licence.nid }}</td>
                        </tr>
                        <tr>
                          <th>জন্ম তারিখ <b>:</b></th>
                          <td>{{ en2bn(licence.birth_date) }}</td>
                        </tr>
                        <tr>
                          <th>বর্তমান ঠিকানা <b>:</b></th>
                          <td>{{ licence.present_address }}</td>
                        </tr>
                        <tr>
                          <th>স্থায়ী ঠিকানা <b>:</b></th>
                          <td>{{ licence.permanent_address }}</td>
                        </tr>

                        <tr>
                          <th>ব্যবসার শুরু করার অর্থ বছর <b>:</b></th>
                          <td>{{ en2bn(licence.start_year_name) }}</td>
                        </tr>
                        <tr>
                          <th>দোকান ঘরের মালিকানা <b>:</b></th>
                          <td>{{ licence.own_rent }}</td>
                        </tr>
                        <tr>
                          <th>সাইনবোর্ড এর আয়তন <b>:</b></th>
                          <td>{{ licence.signboard_length }}</td>
                        </tr>
                        <tr>
                          <th>টিন নাম্বার <b>:</b></th>
                          <td>{{ licence.tin_number }}</td>
                        </tr>
                        <tr>
                          <th>বিন নাম্বার <b>:</b></th>
                          <td>{{ licence.bin_number }}</td>
                        </tr>
                        <tr>
                          <th colspan="2" style="text-align:center">
                            করের বিবরণ
                          </th>
                        </tr>
                        <tr>
                          <th>পুর্বের বকেয়া<b>:</b></th>
                          <td>{{ en2bn(licence.prev_due) }}</td>
                        </tr>
                        <tr>
                          <th>সাইনবোর্ড ফি <b>:</b></th>
                          <td>{{ en2bn(licence.signboard_fee) }}</td>
                        </tr>
                        <tr>
                          <th>ট্রেড লাইসেন্স ফি <b>:</b></th>
                          <td>{{ en2bn(licence.annual_tax) }}</td>
                        </tr>
                        <tr>
                          <th>ব্যবসা ও পেশা বৃত্তির উপর কর <b>:</b></th>
                          <td>{{ en2bn(licence.business_profession_tax) }}</td>
                        </tr>
                        <tr>
                          <th>আয় কর / উৎস কর <b>:</b></th>
                          <td>{{ en2bn(licence.income_tax) }}</td>
                        </tr>
                        <tr>
                          <th>ভ্যাট <b>:</b></th>
                          <td>{{ en2bn(licence.vat) }}</td>
                        </tr>
                        <tr>
                          <th>সার্ভিস চার্জ <b>:</b></th>
                          <td>{{ en2bn(licence.service_charge) }}</td>
                        </tr>
                        <tr>
                          <th>সংশোধন ফি <b>:</b></th>
                          <td>{{ en2bn(licence.correction_fee) }}</td>
                        </tr>
                        <tr>
                          <th>
                            বার্ষিক কর সহ ফী
                            <small>({{ en2bn(licence.year_name) }})</small>
                            <b>:</b>
                          </th>
                          <td>
                            {{ en2bn(licence.total_amount - licence.prev_due) }}
                          </td>
                        </tr>
                        <tr>
                          <th>মোট কর সহ ফী <b>:</b></th>
                          <td>
                            <b> {{ en2bn(licence.total_amount) }} </b>
                          </td>
                        </tr>
                        <tr v-if="licence.discount > 0">
                          <th>ডিসকাউন্ট<b>:</b></th>
                          <td>{{ en2bn(licence.discount) }}</td>
                        </tr>

                        <tr v-if="licence.discount > 0">
                          <th>মোট টাকা<b>:</b></th>
                          <td>
                            <b> {{ en2bn(licence.total_amount) }} </b>
                          </td>
                        </tr>

                        <tr v-if="licence.total_paid > 0">
                          <th>মোট জমা<b>:</b></th>
                          <td>{{ en2bn(licence.total_paid) }}</td>
                        </tr>
                        <tr v-if="licence.last_payment_date != null">
                          <th style="background:#e7f9f7 !important">
                            জমা তারিখ <b>:</b>
                          </th>
                          <td>{{ en2bn(licence.last_payment_date) }}</td>
                        </tr>
                        <tr v-if="licence.total_paid > 0">
                          <th>মোট বকেয়া<b>:</b></th>
                          <td>
                            {{
                              en2bn(licence.total_amount - licence.total_paid)
                            }}
                          </td>
                        </tr>
                      </table>
                    </div>
                    <br />
                    <div class="col-md-12">
                      <p
                        style="font-size:14px;color:red !important;text-align:center"
                      >
                        নিয়মিত ইউপি কর পরিশোধ করুন, ইউনিয়নের উন্নয়নে অংশ নিন।
                      </p>
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
import ReportsService from "@/services/TlReportsService";
import UnionBillDetails from "@/services/UnionBillDetails";
export default {
  name: "BillReport",
  data() {
    return {
      loading: false,
      base_url: this.$baseUrl,
      logoUrl: "",
      signatureUrl: "",
      form: {
        union_id: this.$union_id,
        year: this.$year,
        trade_licence_id: ""
      },
      licencesData: [],
      area: {},
      prevYear: {
        due_years: "",
        due_tax: 0
      },
      currrentTax: {},
      trade_licence_id: {
        value: "",
        label: ""
      },
      union_details: ""
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      if (this.$route.query.year) {
        this.form.year = this.$route.query.year;
      }
      if (this.$route.query.id) {
        this.loading = true;
        var id = this.$route.query.id;
        var allId = id.split(",");
        if (allId.length > 1) {
          this.singleLicenceData(allId);
        } else {
          this.trade_licence_id.value = this.$route.query.id;
          this.singleLicenceData();
        }
      }
      const unionInfo = await UnionBillDetails.show(this.$union_id);
      this.union_details = unionInfo.data;
      this.logoUrl = this.$baseUrl + unionInfo.data.logo;
      this.signatureUrl = this.$baseUrl + unionInfo.data.signature;
    },
    en2bn(replaceString) {
      replaceString = replaceString + "";
      if (replaceString == "") {
        return "০";
      }
      var bn = ["-", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯", "০"];
      var en = ["-", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
      var regex;
      for (var i = 0; i < en.length; i++) {
        regex = new RegExp(en[i], "g");
        replaceString = replaceString.replace(regex, bn[i]);
      }
      return replaceString;
    },
    async singleLicenceData(allData = "") {
      if (allData != "") {
        ReportsService.singleLicence({
          trade_licence_id: allData,
          year: this.form.year,
          union_id: this.$union_id
        })
          .then(response => {
            this.licencesData = response.data.licences;
            this.area = response.data.area;
            this.loading = false;
          })
          .catch(err => {
            this.loading = false;
          });
      } else if (this.trade_licence_id.value !== "") {
        ReportsService.singleLicence({
          trade_licence_id: [this.trade_licence_id.value],
          year: this.form.year,
          union_id: this.$union_id
        })
          .then(response => {
            this.licencesData = response.data.licences;
            this.area = response.data.area;
            this.loading = false;
          })
          .catch(err => {
            this.loading = false;
          });
      }
    }
  }
};
</script>
<style media="print">
.main-table {
  position: relative;
}
.up-bg {
  position: absolute;
  top: 50px;
  width: 100%;
  text-align: center;
}
.up-bg-logo {
  opacity: 0.15;
  width: 300px;
}
@media print {
  @page {
    size: auto;
    margin: 0;
    background: #fff !important;
  }
  .v-datatable__actions {
    display: none;
  }
  .table td,
  .table th {
    color: #000;
    padding: 2px 3px;
  }
  h5,
  h4,
  h6 {
    color: #000;
  }
  * {
    color: #000;
  }
  .bd-logo {
    float: left;
    width: 80px;
  }
  .union-logo {
    float: right;
    width: 80px;
  }
  .bill-print {
    background: #fff;
    color: #000;
  }
  /* table thead th:last-child{display: none;}
    table td:last-child{display: none;} */
}
.bill-details .card .table td,
.bill-details .card .table th {
  padding: 3px 10px;
}

.table th b {
  display: block;
  font-weight: bolder;
  float: right;
}
.btn-action.btn-edit i {
  font-size: 8px;
}
.btn-action i {
  font-size: 9px;
}
.btn-action.btn-xs {
  float: left;
  font-size: 9px;
  margin: 1px;
}
ul.pagination {
  display: block;
  margin-top: 5px;
  width: 100%;
  text-align: center;
}
ul.pagination li {
  display: inline-block;
}

.bill-details .table-bordered td,
.bill-details .table-bordered th {
  border: 1px solid;
}

.bill-print h4 {
  color: red;
}
.bill-print h5 {
  color: green;
}
</style>
