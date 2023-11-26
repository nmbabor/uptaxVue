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
            <div class="rows" style="background: #fff; padding: 30px; 0">
              <div id="printMe" class="raw bill-print" style="width: 210mm; margin: 50px auto; ">
                <div
                  class="row"
                  v-for="licence in licencesData"
                  :key="licence.id"
                  style="padding:5px;overflow:hidden;;"
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
                      <div class="col-md-4" style="width:17%;float:left;">
                         <vue-qrcode :text="qrCodeData+`?id=${licence.trade_licence_id}&year=${licence.year}`" :size="100"></vue-qrcode>
                         <div style="text-align:left">
                          <p style="margin-top: 10px; margin-bottom: 5px;"> <u> লাইসেন্স ইস্যুর বিবরণ </u> </p>
                          <p style="margin-bottom: 2px;"> ইস্যুর তারিখঃ <b> {{en2bn(licence.create_date)}} </b> </p>
                          <p> ইস্যুর সময় <b> {{en2bn(licence.create_time)}} </b> </p>
                         </div>
                      </div>
                      <div class="col-md-4" style="width:66%;float:left;">
                        <img
                          :src="base_url + '/images/default/bd.png'"
                          alt="Bangladesh"
                          style="margin: 0 auto; width: 80px;"
                        />
                        <h6 style="color: red; margin-top:5px;"> ট্রেড লাইসেন্স </h6>
                        <p><b> ট্রেড লাইসেন্স নং : {{licence.trade_licence_no}} </b> </p>
                      </div>
                      <div class="col-md-4" style="width:17%;float:right;">
                        <div style="width: 120px; height: 130px; border: 1px solid #ddd; float: right">
                        <small> ছবি সংযুক্তি </small>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-12">
                      <p> স্থানীয় সরকার (ইউনিয়ন পরিষদ) আইন, ২০০৯ (২০০৯ সনের ৬১ নং আইন) এর ধারা ৬৬ তে প্রদত্ত ক্ষমতাবলে সরকার  প্রণীত আদর্শ কর তফসিল,
                       ২০১৩ এর ৬ ও ১৭ নং অনুচ্ছেদ অনুযায়ী ব্যবসা, বৃত্তি, পেশা বা শিল্প প্রতিষ্ঠানের উপর আরোপিত কর আদায়ের লক্ষ্যে নির্ধারিত শর্তে নিন্মবর্ণিত ব্যক্তি/প্রতিষ্ঠানের অনুকূলে এই ট্রেড লাইসেন্সটি ইস্যু করা হলঃ     </p>
                    </div>
                    <div class="col-md-12 main-table">
                      
                      <table
                        class="table bill-table"
                      >
                        <tr>
                          <td colspan="2">১। ব্যবসা প্রতিষ্ঠানের নাম : <b> {{ licence.organization_name }} </b> </td>
                        </tr>
                        <tr>
                          <td colspan="2">২। স্বত্ত্বাধীকারী/লাইসেন্সধারীর নাম : <b> {{ licence.owner_name }} </b> </td>
                        </tr>
                        
                        <tr>
                           <td colspan="2"> ৩। মাতার নাম : <b> {{ licence.mother }} </b> </td>
                        </tr>
                        
                      
                        <tr>
                          <td colspan="2"> ৪।  পিতা/স্বামির নাম : <b> {{ licence.father_or_husband }} </b> </td>
                        </tr>
                         <tr>
                          <td colspan="2"> ৫। ব্যবসার ধরণ : <b> {{ licence.business_type }} </b> </td>
                        </tr>
                        <tr>
                          <td colspan="2"> ৬। ব্যবসার প্রতিষ্ঠানের ঠিকানা : <b> {{ licence.present_address }} </b> </td>
                        </tr>
                        <tr>
                          <td colspan="2"> ৭। ওয়ার্ড নং : <b> {{ en2bn(licence.word) }} </b> </td>
                        </tr>
                        <tr>
                          <td colspan="2"> ৮।  (ক) জাতীয় পরিচয়পত্র / জন্ম নিবন্ধন নম্বর : <b> {{ licence.nid}} </b> </br> 
                          <span style="margin-left: 26px"> (খ) মোবাইল নাম্বার : <b> {{ licence.mobile}} </b> </span>
                           </td>
                        </tr>
                         <tr>
                          <td> <span style="margin-left: 26px"> (গ) টিআইএন : <b> {{ licence.tin_number}} </b> </span> </td>
                          <td>
                           (ঘ) বিআইএন : <b> {{ licence.bin_number}} </b>
                           </td>
                        </tr>
                        <tr>
                          <td> ৯। (ক) অর্থ বছর : <b> {{ en2bn(licence.year_name) }} </b> </td>
                          <td> (খ) ব্যবসার শুরুর অর্থ বছর : <b> {{ en2bn(licence.start_year_name) }} </b> </td>
                        </tr>
                        <tr>
                          <td colspan="2"> ১০। বাজারের নাম : <b> {{ licence.bazar_name }} </b> </td>
                        </tr>
                        <tr>
                          <td> ১১। (ক) বর্তমান ঠিকানা : <b> {{ licence.present_address }} </b> </td>
                          <td> (খ) স্থায়ী ঠিকানা : <b> {{ licence.permanent_address }} </b> </td>
                        </tr>
                       <tr>
                          <td colspan="2"> ১২। <b> করের বিবরণ </b> </br> 
                            
                          </td>
                      </tr>
                      <tr>
                          <td><span style="margin-left: 26px"> (ক) ট্রেড লাইসেন্স ফি : <b> {{ en2bn(licence.annual_tax) }} টাকা </b> </span> </td>
                          <td> (খ) সাইনবোর্ড ফি : <b> {{ en2bn(licence.signboard_fee) }} টাকা </b> </td>
                      </tr>
                      <tr>
                          <td><span style="margin-left: 26px"> (গ) ব্যবসা ও পেশা বৃত্তির উপর কর : <b> {{ en2bn(licence.business_profession_tax) }} টাকা </b> </span> </td>
                          <td> (ঘ) আয় কর / উৎস কর : <b> {{ en2bn(licence.income_tax) }} টাকা </b> </td>
                      </tr>
                      <tr>
                          <td><span style="margin-left: 26px"> (ঙ) ভ্যাট : <b> {{ en2bn(licence.vat) }} টাকা </b> </span> </td>
                          <td> (চ) সার্ভিস চার্জ : <b> {{ en2bn(licence.service_charge) }} টাকা </b> </td>
                      </tr>
                      <tr style="border-bottom: 2px solid #333">
                          <td><span style="margin-left: 26px"> (ছ) সংশোধন ফি : <b> {{ en2bn(licence.correction_fee) }} টাকা </b> </span> </td>
                          <td> (জ)  পুর্বের বকেয়া : <b> {{ en2bn(licence.prev_due) }} টাকা </b> </td>
                      </tr>


                        <tr>
                          <th style="color: red">
                            অত্র ট্রেড লাইসেন্স এর মেয়াদ : ৩০-০৬-{{getLastYear(licence.year_name)}} পর্যন্ত
                          </th>
                          <th>
                             সর্বমোট :
                            <b>{{ en2bn(licence.total_amount) }} টাকা মাত্র</b>
                          </th>
                        </tr>

                        <tr>
                          <td>
                            <p style="margin-top:80px; text-align: center">
                             <b> {{union_details.secretary_name}} </b> </br>
                              সচিব </br>
                             {{ area.union_name }} ইউনিয়ন পরিষদ </br>
                              {{ area.upazila_name }} , {{ area.district_name }}
                            </p>
                          </td>
                           <td>
                            <p style="margin-top:80px; text-align: center">
                               <b> {{union_details.chairman_name}} </b> </br>
                              চেয়ারম্যান </br>
                             {{ area.union_name }} ইউনিয়ন পরিষদ </br>
                              {{ area.upazila_name }} , {{ area.district_name }}
                            </p>
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
import VueQrcode from 'vue-qrcode-component';
export default {
   components: {
    // Register the component
    'vue-qrcode': VueQrcode,
  },
  name: "BillReport",
  data() {
    return {
      qrCodeData: `${window.location.origin}/trade-licence-info`,
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
.bill-print {
    border: 1px solid #000;
  }
@media print {
  @page {
    size: auto;
    margin: 0 0 0 0;
    background: #fff !important;
   
  }
  .bill-print {
    margin-top: 50px;
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
