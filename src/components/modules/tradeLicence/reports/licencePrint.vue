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
              <router-link tag="a" to="/report/due-tax" class="btn btn-xs btn-light waves-effect waves-light m-1"><i
                  class="fa fa-list"></i> বকেয়া প্রতিবেদন
              </router-link>
            </div>
            <h4 class="card-title">
              {{ area.union_name }} ইউনিয়ন পরিষদ ট্রেড লাইসেন্স
            </h4>
          </div>
          <div class="card-body">
            <div v-if="loading" class="col-md-12"
              style="text-align:center;position:absolute;background: rgb(30, 71, 108,.8);z-index:9;padding:100px;left:0;height:85%">
              <img style="width:100px" src="/static/assets/images/blue.gif" alt="Loading.." />
            </div>
            <div class="rows" style="background: #fff; padding: 30px; 0">
              <div id="printMe" class="raw bill-print" style="background: #fff; ">
                <div class="row" v-for="licence in licencesData" :key="licence.id"
                  style="padding:5px;overflow:hidden;height: 100%;">
                  <div class="col-md-12" style="width:100%;">
                    <div class="row" style="text-align:center;padding:10px 0;width:100%;margin:0">
                      <div class="col-md-12">
                        <h5>{{ area.union_name }} ইউনিয়ন পরিষদ</h5>
                        <h6 style="color: red;">
                          {{ area.upazila_name }},{{ area.district_name }}
                        </h6>
                      </div>
                    </div>
                    <div class="row" style="text-align:center;padding:10px 0;width:100%;margin:0">
                      <div class="col-md-3" style="width:17%;float:left;">
                        <vue-qrcode :text="qrCodeData +
                          `?id=${licence.trade_licence_id}&year=${licence.year}`
                          " :size="100"></vue-qrcode>
                        <div style="text-align:left">
                          <p
                            style="margin-top: 25px; margin-bottom: 5px; border-bottom:2px solid #ccc; padding: 5px; text-align: center;">
                            লাইসেন্স ইস্যুর বিবরণ
                          </p>
                          <p style="margin-bottom: 2px;">
                            ইস্যুর তারিখঃ
                            <span> {{ en2bn(currentDate) }} </span>
                          </p>
                          <p>
                            ইস্যুর সময় <span> {{ en2bn(currentTime) }} </span>
                          </p>
                        </div>
                      </div>
                      <div class="col-md-6" style="width:66%;float:left;">
                        <img :src="base_url + '/images/default/bd.png'" alt="Bangladesh"
                          style="margin: 0 auto; width: 80px;" />
                        <h6 style="color: red; margin-top:5px;">
                          ই-ট্রেড লাইসেন্স
                        </h6>
                        <p>
                          লাইসেন্স নং :
                          <b> {{ licence.trade_licence_no }} </b>
                        </p>
                      </div>
                      <div class="col-md-3" style="width:17%;float:right;">
                        <div style="width: 120px; height: 130px; border: 1px solid #ddd; float: right">
                          <small> ছবি সংযুক্তি </small>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-12" style="border: 2px solid #ccc;padding: 10px;margin-bottom: 15px;">
                      <p style="margin-bottom:0; color: green; text-align: justify;">
                        স্থানীয় সরকার (ইউনিয়ন পরিষদ) আইন, ২০০৯ (২০০৯ সনের ৬১ নং
                        আইন) এর ধারা ৬৬ তে প্রদত্ত ক্ষমতাবলে সরকার প্রণীত আদর্শ
                        কর তফসিল, ২০১৩ এর ৬ ও ১৭ নং অনুচ্ছেদ অনুযায়ী ব্যবসা,
                        বৃত্তি, পেশা বা শিল্প প্রতিষ্ঠানের উপর আরোপিত কর আদায়ের
                        লক্ষ্যে নির্ধারিত শর্তে নিম্নবর্ণিত ব্যক্তি/প্রতিষ্ঠানের
                        অনুকূলে এই ট্রেড লাইসেন্সটি ইস্যু করা হলঃ
                      </p>
                    </div>
                    <div class="col-md-12 main-table">

                      <table class="table print-table"
                        style="background: url('@/assets/images/bd-bg.png') no-repeat center; background-size:50%">
                        <tbody>
                          <tr>
                            <td>১। ব্যবসা প্রতিষ্ঠানের নাম</td>
                            <td>:</td>
                            <td colspan="4">
                              <span> {{ licence.organization_name }} </span>
                            </td>
                          </tr>
                          <tr>
                            <td>২। ব্যবসা প্রতিষ্ঠানের মালিকের নাম</td>
                            <td>:</td>
                            <td colspan="4">
                              <span> {{ licence.owner_name }} </span>
                            </td>
                          </tr>

                          <tr>
                            <td>৩। মাতার নাম</td>
                            <td>:</td>
                            <td colspan="4">
                              <span> {{ licence.mother }} </span>
                            </td>
                          </tr>

                          <tr>
                            <td>৪। পিতা/স্বামীর নাম</td>
                            <td>:</td>
                            <td colspan="4">
                              <span> {{ licence.father_or_husband }} </span>
                            </td>
                          </tr>
                          <tr>
                            <td>৫। ব্যবসার ধরণ</td>
                            <td>:</td>
                            <td colspan="4" style="white-space: normal;">
                              <span> {{ licence.business_type }} </span>
                            </td>
                          </tr>
                          <tr>
                            <td>৬। ব্যবসার প্রতিষ্ঠানের ঠিকানা</td>
                            <td>:</td>
                            <td colspan="4" style="white-space: normal;">
                              <span> {{ licence.present_address }} </span>
                            </td>
                          </tr>
                          <tr>
                            <td>৭। ওয়ার্ড নং</td>
                            <td>:</td>
                            <td colspan="4">
                              <span> {{ en2bn(licence.word) }} </span>
                            </td>
                          </tr>
                          <tr>
                            <td colspan="6">&nbsp;</td>
                          </tr>
                          <tr>
                            <td>
                              ৮। (ক) এন আইডি / জন্ম নিবন্ধন নম্বর
                            </td>
                            <td>:</td>
                            <td>
                              <span> {{ licence.nid }} </span>
                            </td>
                            <td>
                              <span>
                                (খ) মোবাইল নাম্বার
                              </span>
                            </td>
                            <td>:</td>
                            <td>
                              <span> {{ licence.mobile }} </span>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <span style="margin-left: 25px;">
                                (গ) টিআইএন
                              </span>
                            </td>
                            <td>:</td>
                            <td>
                              <span> {{ licence.tin_number }} </span>
                            </td>

                            <td>
                              (ঘ) বিআইএন
                            </td>
                            <td>:</td>
                            <td>
                              <span> {{ licence.bin_number }} </span>
                            </td>
                          </tr>
                          <tr>
                            <td colspan="6">&nbsp;</td>
                          </tr>
                          <tr>
                            <td>৯। (ক) অর্থ বছর</td>
                            <td>:</td>
                            <td>
                              <span> {{ en2bn(licence.year_name) }} </span>
                            </td>

                            <td>(খ) ব্যবসার শুরুর অর্থ বছর</td>
                            <td>:</td>
                            <td>
                              <span>
                                {{ en2bn(licence.start_year_name) }}
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td>১০। বাজারের নাম</td>
                            <td>:</td>
                            <td>
                              <span> {{ licence.bazar_name }} </span>
                            </td>
                          </tr>
                          <tr>
                            <td>১১। (ক) মালিকের স্থায়ী ঠিকানা</td>
                            <td>:</td>
                            <td colspan="4" style="white-space: normal;">
                              <span> {{ licence.permanent_address }} </span>
                            </td>
                          </tr>
                          <tr>
                            <td colspan="6">&nbsp;</td>
                          </tr>
                          <tr>
                            <th style="border-bottom: 1px solid  #ccc;padding-bottom:5px;">
                              ১২। <span> করের বিবরণ </span> <br />
                            </th>
                          </tr>
                          <tr>
                            <td>
                              <span style="margin-left: 26px">
                                (ক) ট্রেড লাইসেন্স ফি
                              </span>
                            </td>
                            <td>:</td>
                            <td>
                              <span>
                                {{ en2bn(licence.annual_tax) }} টাকা
                              </span>
                            </td>

                            <td>(খ) সাইনবোর্ড ফি</td>
                            <td>:</td>
                            <td>
                              <span>
                                {{ en2bn(licence.signboard_fee) }} টাকা
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <span style="margin-left: 26px">
                                (গ) ব্যবসা ও পেশা বৃত্তির উপর কর
                              </span>
                            </td>
                            <td>:</td>
                            <td>
                              <span>
                                {{ en2bn(licence.business_profession_tax) }}
                                টাকা
                              </span>
                            </td>

                            <td>(ঘ) আয় কর / উৎস কর</td>
                            <td>:</td>
                            <td>
                              <span>
                                {{ en2bn(licence.income_tax) }} টাকা
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <span style="margin-left: 26px"> (ঙ) ভ্যাট </span>
                            </td>
                            <td>:</td>
                            <td>
                              <span> {{ en2bn(licence.vat) }} টাকা </span>
                            </td>

                            <td>(চ) সার্ভিস চার্জ</td>
                            <td>:</td>
                            <td>
                              <span>
                                {{ en2bn(licence.service_charge) }} টাকা
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding-bottom:10px;">
                              <span style="margin-left: 26px">
                                (ছ) সংশোধন ফি
                              </span>
                            </td>

                            <td>:</td>

                            <td>
                              <span>
                                {{ en2bn(licence.correction_fee) }} টাকা
                              </span>
                            </td>

                            <td>
                              (জ) পুর্বের বকেয়া
                            </td>

                            <td>:</td>

                            <td>
                              <span> {{ en2bn(licence.prev_due) }} টাকা </span>
                            </td>
                          </tr>

                          <tr>
                            <th colspan="3" style="border-top: 1px solid #ccc;"></th>
                            <th style="border-top: 1px solid #ccc;">
                              সর্বমোট
                            </th>
                            <th style="border-top: 1px solid #ccc">:</th>
                            <th style="border-top: 1px solid #ccc">
                              {{ en2bn(licence.total_amount) }} টাকা
                            </th>
                          </tr>

                          <tr>
                            <td colspan="6" style="text-align:center; padding:30px 0; border-bottom: 2px solid #ddd;">
                              <b>
                                অত্র ট্রেড লাইসেন্স এর মেয়াদ ৩০ শে জুন,
                                {{ getLastYear(licence.year_name) }} পর্যন্ত
                              </b>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <div class="watermark">
                        <img class="watermark-logo" v-if="logoUrl != ''" :src="logoUrl">
                      </div>
                    </div>
                    <div class="row"
                      style="text-align: center; position: absolute; bottom: 0; margin: 0; left: 0; right: 0;">
                      <div class="col-md-6" style="margin-bottom: 60px;">
                        <p>
                          <span
                            style="border-top: 1px dashed #000; padding:0 20px; padding-top:5px;width:200px; display: inline-block;">
                            সচিব
                          </span>
                        </p>
                      </div>
                      <div class="col-md-6" style="margin-bottom: 60px;">
                        <p>
                          <span
                            style="border-top: 1px dashed #000; padding:0 20px; padding-top:5px;width:200px; display: inline-block;">
                            চেয়ারম্যান
                          </span>
                        </p>
                      </div>
                      <div class="col-md-12">
                        <p
                          style="font-size:13px;color:red !important;text-align:center;border-top: 1px solid #ccc; padding: 10px; margin: 0;">
                          নিয়মিত ইউপি কর পরিশোধ করুন, ইউনিয়নের উন্নয়নে অংশ নিন।
                        </p>
                      </div>
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
import VueQrcode from "vue-qrcode-component";
export default {
  components: {
    // Register the component
    "vue-qrcode": VueQrcode
  },
  name: "BillReport",
  data() {
    return {
      qrCodeData: `${window.location.origin}/trade-licence-details`,
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
  computed: {
    currentDate() {
      let currentDate = new Date();
      let options = { day: "numeric", month: "numeric", year: "numeric" };
      return currentDate.toLocaleDateString("en-GB", options);
    },
    currentTime() {
      const currentDateTime = new Date();
      const timeOptions = { hour: "numeric", minute: "numeric", hour12: true };
      return currentDateTime.toLocaleTimeString("en-US", timeOptions);
    }
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
    getLastYear(inputString) {
      let yearsArray = inputString.split("-");
      return this.en2bn(yearsArray[1]);
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

.bill-print {
  width: 210mm;
  border: 1px solid #000;
  margin: 50px auto;
  font-family: "SolaimanLipi";
  height: 367mm;
}

.watermark {
  width: 100%;
  text-align: center;
  position: absolute;
  top: 50px;
  display: flex;
  align-items: center;
}

.watermark img {
  width: 400px;
  opacity: 0.1;
  margin: 0 auto;
}

@media print {
  @page {
    size: a4 portrait;
    margin: 0 0 0 0;
    background: #fff !important;
  }

  html,
  body {
    width: 100%;
    height: 99%;
  }

  .bill-print {
    margin-top: 20px;
    width: 95%;
    height: 99%;
    border: none;
  }
  .watermark {
    top:30px;
  }
  .watermark img {
    width: 500px;
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
