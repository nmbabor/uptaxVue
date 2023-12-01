<template>
  <div>

    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header card-info">
            <h4 class="card-title text-center"> {{ area.union_name }} ইউনিয়ন পরিষদ ট্রেড লাইসেন্স যাচাই</h4>
          </div>
          <div class="card-body">
            <div v-if="loading" class="col-md-12"
              style="text-align:center;position:absolute;background: rgb(30, 71, 108,.8);z-index:9;padding:100px;left:0;height:85%">
              <img style="width:100px" src="/static/assets/images/blue.gif" alt="Loading..">
            </div>
            <div class="row">
              <div class="col-md-3"></div>
              <div class="col-md-6">
                <div class="row licence-verify" style="padding:5px;overflow:hidden;">
                  <div class="col-md-12" style="width:100%;">
                    <div class="row" style="text-align:center;padding:10px 0;width:100%;margin:0">
                      <div class="col-md-2" style="width:17%;float:left;">
                        <img :src="base_url + '/images/default/bd.png'" alt="Bangladesh" class="bd-logo">
                      </div>
                      <div class="col-md-8" style="width:83%;float:left;">
                        <h6 style="color:green">{{ area.union_name }} ইউনিয়ন পরিষদ </h6>
                        <p>{{ area.upazila_name }},{{ area.district_name }}</p>
                      </div>


                    </div>
                    <div class="col-md-12 main-table">
                      <table class="table license-details">
                        <tr>
                          <td> ট্রেড লাইসেন্স নং <b class="mobile-only">:</b></td>
                          <th> <b>:</b> </th>
                          <td>{{ en2bn(licence.trade_licence_no) }}</td>
                        </tr>
                        <tr>
                          <td> প্রতিষ্ঠানের নাম <b class="mobile-only">:</b> </td>
                          <th> <b>:</b> </th>
                          <td>{{ licence.organization_name }}</td>
                        </tr>
                        <tr>
                          <td> মালিকের নাম <b class="mobile-only">:</b> </td>
                          <th> <b>:</b> </th>
                          <td>{{ licence.owner_name }}</td>
                        </tr>
                        <tr>
                          <td> হোল্ডিং নং <b class="mobile-only">:</b> </td>
                          <th> <b>:</b> </th>
                          <td>{{ en2bn(licence.holding_no) }}</td>
                        </tr>
                        <tr>
                          <td> পিতা/স্বামির নাম <b class="mobile-only">:</b> </td>
                          <th> <b>:</b> </th>
                          <td>{{ licence.father_or_husband }}</td>
                        </tr>
                        <tr>
                          <td> মাতার নাম <b class="mobile-only">:</b> </td>
                          <th> <b>:</b> </th>
                          <td>{{ licence.mother }}</td>
                        </tr>
                        <tr>
                          <td> বাজারের নাম <b class="mobile-only">:</b> </td>
                          <th> <b>:</b> </th>
                          <td>{{ licence.bazar_name }}</td>
                        </tr>
                        <tr>
                          <td> ওয়ার্ড <b class="mobile-only">:</b> </td>
                          <th> <b>:</b> </th>
                          <td>{{ en2bn(licence.word) }}</td>
                        </tr>
                        <tr>
                          <td> ব্যবসার ধরণ <b class="mobile-only">:</b> </td>
                          <th> <b>:</b> </th>
                          <td>{{ licence.business_type }}</td>
                        </tr>
                        <tr>
                          <td> প্রতিষ্ঠানের ঠিকানা <b class="mobile-only">:</b> </td>
                          <th> <b>:</b> </th>
                          <td>{{ licence.present_address }}</td>
                        </tr>
                        <tr>
                          <td> মালিকের ঠিকানা <b class="mobile-only">:</b> </td>
                          <th> <b>:</b> </th>
                          <td>{{ licence.permanent_address }}</td>
                        </tr>

                        <tr>
                          <td> অর্থ বছর <b class="mobile-only">:</b> </td>
                          <th> <b>:</b> </th>
                          <td>{{ en2bn(licence.year_name) }}</td>
                        </tr>
                      </table>
                    </div>
                    <br>
                    <div class="col-md-12">
                      <p style="font-size:14px;color:red !important;text-align:center">
                        <b> অত্র ট্রেড লাইসেন্স এর মেয়াদ ৩০ শে জুন,
                          {{ getLastYear(licence.year_name) }} পর্যন্ত
                        </b>
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
import ReportsService from '@/services/TlReportsService'
export default {
  name: 'LicenceVerify',
  data() {
    return {
      loading: false,
      base_url: this.$baseUrl,
      licence: {},
      area: {},

    }
  },
  mounted() {
    this.getData()

  },
  methods: {
    async getData() {
      if (this.$route.query.id && this.$route.query.year) {
        this.loading = true;
        this.singleLicenceData()
      }
    },
    getLastYear(inputString = '') {
      if (inputString != '') {
        let yearsArray = inputString.split("-");
        return this.en2bn(yearsArray[1]);
      }
      return '';

    },
    en2bn(replaceString) {
      replaceString = replaceString + "";
      if (replaceString == '') {
        return '০';
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
    async singleLicenceData() {
      ReportsService.licenceVerify({ trade_licence_id: this.$route.query.id, year: this.$route.query.year }).then(response => {
        this.licence = response.data.licence
        this.area = response.data.area
        this.loading = false;
      }).catch(err => {
        this.loading = false;
      })
    },

  }
}
</script>
<style>
.licence-verify{
  background-color: #fff;
  color: #000;
}
.table.license-details tr td {
  white-space: normal;
}
.table.license-details tr th {
  white-space: normal;
  background: #fff !important;
}

.up-bg {
  position: absolute;
  top: 50px;
  width: 100%;
  text-align: center
}

.up-bg-logo {
  opacity: .15;
  width: 300px;
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

.mobile-only {
  display: none;
}

/* Responsive styles */
@media (max-width: 400px) {
  .mobile-only {
    display: inline;
  }

  table.license-details,
  table.license-details th,
  table.license-details td,
  table.license-details tr {
    display: block;
  }

  table.license-details th {
    display: none;
  }
}
</style>
