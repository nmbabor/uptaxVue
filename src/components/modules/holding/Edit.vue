<script>
import AreaService from '@/services/AreaService'
import HoldingsService from '@/services/HoldingsService'
export default {
  name: 'HondingEdit',
  data () {
    return {
      loading:false,
        unions: [],
        village: [],
        types:[],
      form: {
        type:'1',
        holding_no:'',
        owner_name:'',
        organization_name:'',
        father_or_husband:'',
        mother:'',
        mobile:'',
        profession:'',
        education:'',
        religion:'',
        gender:'',
        birthday:'',
        nid:'',
        got_social_benefits:'অন্যান্য',
        get_social_benefits:'অন্যান্য',
        eligible_for_social_benefits:'অন্যান্য',
        tube_well:'আছে',
        toilet:'পাকা',
        house_unripe:'0',
        house_dochala_tinshade:'0',
        house_bhite_paka:'0',
        house_semi_ripe:'0',
        house_ripe:'0',
        annual_assessment:'',
        annual_tax:'',
        tax_due:'',
        others_bill_details:'',
        others_bill:'',
        union_id:'',
        word:'',
        village_id:'',
      },
      discount:{
        status:0,
        discount_amount:0,
        tax_year_id:''
      },
      validateErrors: [],
      holding:{},
      area:{}
    }
  },
  mounted(){

    this.getData()

  },
  methods: {
    async getData(){
       this.holdingTypes()
      this.loading=true;
      if(this.$route.query.discount){
        this.discount.status=1;
      }
    
      const unionData = await HoldingsService.unions();
      this.unions = unionData.data;
      const response = await HoldingsService.show(this.$route.params.id,{year:this.$year})
      this.form = response.data.holding
      this.loadVillage()
      if(response.data.tax!='' && response.data.tax!=null){
         this.area = response.data.area
        this.holding = response.data.tax
        this.discount.discount_amount = response.data.tax.discount
        this.discount.tax_year_id = response.data.tax.id
      }
      this.loading=false;
      
    },
    async loadVillage (){
       if(this.form.union_id!==''){
        const allData = await AreaService.village(this.form.union_id)
        this.village = allData.data

       }else{
         this.village = []
       }
    },
    async holdingTypes(){
       const allTypes = await HoldingsService.holdingType()
        this.types = allTypes.data
    },

    async validateBeforeSubmit() {
      this.$validator.validateAll()
        .then((resp)=>{
          if (!resp){
            return
          }
          else if (resp){

            let day = new Date(this.form.birthday).getDate()
              let month = new Date(this.form.birthday).getMonth()+1
              if(month<10){
                month = '0'+month
              }
              if(day<10){
                day = '0'+day
              }
              let year = new Date(this.form.birthday).getFullYear()
              let date = year+'-'+month+'-'+day
              this.form.birthday = date

            HoldingsService.update(this.form,this.$route.params.id).then(success=>{

              this.$swal({
                type: 'success',
                title: 'Updated Successfully Done',
                showConfirmButton: false,
                timer: 1500
              })

            }).catch(err=>{
              console.log(err.response.data)
              if(err.response.data.error){
                this.validateErrors=err.response.data.error
              }else{
                this.$swal({
                  type: 'error',
                  title: "Something Error Found!",
                  showConfirmButton: true
                })
              }

            })
          }
        })
        .catch(function(e) {
          console.log(e)
        })
    },
    async discountSubmit() {
        HoldingsService.update(this.discount,this.$route.params.id).then(success=>{
          this.$swal({
            type: 'success',
            title: 'Discount Added Successfully Done',
            showConfirmButton: false,
            timer: 1500
          })
          this.getData();

        }).catch(err=>{
          console.log(err.response.data)
          if(err.response.data.error){
            this.validateErrors=err.response.data.error
          }else{
            this.$swal({
              type: 'error',
              title: "Something Error Found!",
              showConfirmButton: true
            })
          }
        })
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


  }
}
</script>
<template>
    <div>
        <div class="row">

            <div class="col-lg-12">
                <div class="card">
                <div class="card-body">
                <div class="card-title"> হোল্ডিং তথ্য সংশোধন
                    <div class="pull-right">
                      <router-link tag="a" to="/holdings" class="btn btn-xs btn-light waves-effect waves-light m-1"><i class="fa fa-list"></i> সকল হোল্ডিং </router-link>
                    </div>
                </div>
      
                <hr>
              <div v-if="loading" class="col-md-12" style="text-align:center;position:absolute;background: rgb(30, 71, 108,.8);z-index:9;padding:100px;left:0;height:85%">
                <img style="width:100px" src="/static/assets/images/blue.gif" alt="Loading..">
              </div>
                <form method="POST" @submit.prevent="discountSubmit" enctype="multipart/form-data" v-if="discount.status==1">
                
                  <div class="col-md-12 main-table">
                     <h5 class="text-center">{{area.union_name}} ইউনিয়ন পরিষদ </h5>
                    <h6 class="text-center"> উপজেলাঃ{{area.upazila_name}} , জেলাঃ {{area.district_name}} <br>
                    <small> <span>{{en2bn(holding.year_name)}}</span> (<span>{{holding.type_name}}</span> ) </small></h6>
                  <table class="table table-bordered table-striped bill-table" >
                   <tr>
                    <th> ক্রমিক নং <b>:</b> </th>
                    <td width="50%">{{en2bn(holding.invoice)}}</td>
                  </tr>
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
                  
                  
                  <tr v-if="holding.total_paid>0">
                    <th> মোট জমা<b>:</b> </th>
                    <td>{{en2bn(holding.total_paid)}}</td>
                  </tr>
                  <tr>
                    <th> কর ডিসকাউন্ট <b>:</b> </th>
                    <td><input type="number" min="0" :max="(holding.total_amount - holding.total_paid)" name="discount_amount" v-model="discount.discount_amount" placeholder="কর ডিসকাউন্ট" class="form-control"></td>
                  </tr>
                  <tr>
                    <th> মোট টাকা<b>:</b> </th>
                    <td>{{en2bn((holding.total_amount - holding.total_paid ))}}</td>
                  </tr>
              </table>
              </div>
                  
                  <div class="form-group">
                      <button type="button" @click="discountSubmit" class="btn btn-light px-5"><i class="fa fa-save"></i> সাবমিট </button>
                  </div>

                </form>
                <form @submit.prevent="validateBeforeSubmit" enctype="multipart/form-data" v-if="discount.status==0">
                    <div class="row">
                     <div class="col-md-3">
                        <div class="form-group">
                            <div class="col-md-12 no-padding">
                              <select class="form-control" required v-model="form.type">
                                <option v-for="(type,i) in types" :key="i" :value="i"> {{type}} </option>
                            </select>

                            </div>
                        </div>
                    </div>

                    </div>
                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="col-md-12 no-padding"> ইউনিয়ন </label>
                                <div class="col-md-12 no-padding">
                                    <select class="form-control" required v-model="form.union_id" @change="loadVillage()">
                                    <option value=""> -ইউনিয়ন নির্বাচন করুন- </option>
                                    <option v-for="(data,i) in unions" :key="i" :value="data.id"> {{data.bn_name}} </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="col-md-12 no-padding"> ওয়ার্ড নাম্বার </label>
                                <div class="col-md-12 no-padding">
                                  <input type="number" min="1" v-model="form.word" class="form-control" required>

                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
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
                    </div>
                    <div class="row">
                        <div class="form-group col-md-4">
                            <label for="holding_no">হোল্ডিং নাম্বার</label>
                            <input type="number" step="any" min="1" name="holding_no" required v-model="form.holding_no" id="holding_no" placeholder="হোল্ডিং নাম্বার" v-validate="'required'" :class="{'form-control': true, 'text-danger': errors.has('holding_no') }">
                            <span v-show="errors.has('holding_no')" class="help text-danger">{{ errors.first('holding_no') }}</span>
                            <span v-if="validateErrors.holding_no" class="help text-danger">{{validateErrors.holding_no[0] }}</span>
                        </div>
                        <div class="form-group col-md-4">
                            <label for="owner_name"> মালিক</label>
                            <input type="text" name="owner_name" required v-model="form.owner_name" id="owner_name" placeholder=" মালিকের নাম" v-validate="'required'" :class="{'form-control': true, 'text-danger': errors.has('owner_name') }">
                            <span v-show="errors.has('owner_name')" class="help text-danger">{{ errors.first('owner_name') }}</span>
                            <span v-if="validateErrors.owner_name" class="help text-danger">{{validateErrors.owner_name[0] }}</span>
                        </div>
                        <div class="form-group col-md-4">
                            <label for="input-2">মোবাইল নাম্বার</label>
                            <input type="number" min="0" required v-model="form.mobile" name="mobile" id="input-2" placeholder="মোবাইল নাম্বার" v-validate="'required'" :class="{'form-control': true, 'text-danger': errors.has('mobile') }">
                            <span v-show="errors.has('mobile')" class="help text-danger">{{ errors.first('mobile') }}</span>
                            <span v-if="validateErrors.mobile" class="help text-danger">{{validateErrors.mobile[0] }}</span>
                        </div>
                    </div>
                <div class="row">
                    <div class="form-group col-md-4">
                        <label for="organization_name"><span v-if="form.type==1">বাড়ির নাম</span> <span v-else=""> প্রতিষ্ঠানের নাম</span></label>
                        <input type="text" v-model="form.organization_name" name="organization_name" id="organization_name" :class="{'form-control': true, 'text-danger': errors.has('organization_name') }">
                        <span v-show="errors.has('organization_name')" class="help text-danger">{{ errors.first('organization_name') }}</span>
                        <span v-if="validateErrors.organization_name" class="help text-danger">{{validateErrors.organization_name[0] }}</span>
                    </div>
                    <div class="form-group col-md-4">
                        <label for="father_or_husband">বাবা/স্বামী</label>
                        <input type="text" required v-model="form.father_or_husband" name="father_or_husband" id="father_or_husband" placeholder="বাবা/স্বামী" v-validate="'required'" :class="{'form-control': true, 'text-danger': errors.has('father_or_husband') }">
                        <span v-show="errors.has('father_or_husband')" class="help text-danger">{{ errors.first('father_or_husband') }}</span>
                        <span v-if="validateErrors.father_or_husband" class="help text-danger">{{validateErrors.father_or_husband[0] }}</span>
                    </div>
                    <div class="form-group col-md-4">
                        <label for="mother">মায়ের নাম</label>
                        <input type="text" v-model="form.mother" name="mother" id="mother" placeholder="মায়ের নাম" v-validate="'required'" :class="{'form-control': true, 'text-danger': errors.has('mother') }">
                        <span v-show="errors.has('mother')" class="help text-danger">{{ errors.first('mother') }}</span>
                        <span v-if="validateErrors.mother" class="help text-danger">{{validateErrors.mother[0] }}</span>
                    </div>

                </div>
                <div class="row">
                  <div class="form-group col-md-4">
                        <label for="profession"> মালিকের পেশা</label>
                        <select name="profession" v-validate="'required'" :class="{'form-control': true, 'text-danger': errors.has('profession') }" v-model="form.profession" required="">
                              <option value=''>-পেশা নির্বাচন করুন-</option>
                              <option value="কৃষক">কৃষক</option>
                              <option value="ব্যবসায়ী">ব্যবসায়ী</option>
                              <option value="সরকারী চাকুরীজীবী">সরকারী চাকুরীজীবী</option>
                              <option value="চাকুরীজীবী">চাকুরীজীবী</option>
                              <option value="অন্যান্য">অন্যান্য </option>
                          </select>
                        <span v-show="errors.has('profession')" class="help text-danger">{{ errors.first('profession') }}</span>
                        <span v-if="validateErrors.profession" class="help text-danger">{{validateErrors.profession[0] }}</span>
                    </div>
                    <div class="form-group col-md-4">
                        <label for="education">শিক্ষাগত যোগ্যতা</label>
                        <select name="education" :class="{'form-control': true, 'text-danger': errors.has('education') }" v-model="form.education" >
                              <option value=''>-শিক্ষাগত যোগ্যতা নির্বাচন করুন-</option>
                              <option value="পি এস সি">পি এস সি</option>
                              <option value="জে এস সি">জে এস সি</option>
                              <option value="এস এস সি">এস এস সি</option>
                              <option value="এইচ এস সি">এইচ এস সি</option>
                              <option value="ডিপ্লোমা">ডিপ্লোমা</option>
                              <option value="অনার্স">অনার্স</option>
                              <option value="বি এস সি">বি এস সি</option>
                              <option value="মাস্টার্স">মাস্টার্স </option>
                          </select>
                        <span v-show="errors.has('education')" class="help text-danger">{{ errors.first('education') }}</span>
                        <span v-if="validateErrors.education" class="help text-danger">{{validateErrors.education[0] }}</span>
                    </div>
                    <div class="form-group col-md-4">
                        <label for="religion">ধর্ম</label>
                        <select name="religion" v-validate="'required'" :class="{'form-control': true, 'text-danger': errors.has('religion') }" v-model="form.religion" required="">
                              <option value=''>-ধর্ম নির্বাচন করুন-</option>
                              <option value="ইসলাম" selected>ইসলাম</option>
                              <option value="সনাতন(হিন্দু)">সনাতন(হিন্দু)</option>
                              <option value="খৃষ্টান">খৃষ্টান</option>
                              <option value="বৌদ্ধ">বৌদ্ধ</option>
                              <option value="অন্যান্য">অন্যান্য</option>
                          </select>
                        <span v-show="errors.has('religion')" class="help text-danger">{{ errors.first('religion') }}</span>
                        <span v-if="validateErrors.religion" class="help text-danger">{{validateErrors.religion[0] }}</span>
                    </div>

                </div>
                <div class="row">
                  <div class="form-group col-md-4">
                        <label for="gender"> মালিকের লিঙ্গ</label>
                        <select name="gender" v-validate="'required'" :class="{'form-control': true, 'text-danger': errors.has('gender') }" v-model="form.gender" required="">
                              <option value=''>-লিঙ্গ নির্বাচন করুন-</option>
                              <option value="পুরুষ">পুরুষ</option>
                              <option value="মহিলা">মহিলা</option>
                              <option value="অন্যান্য">অন্যান্য</option>
                          </select>
                        <span v-show="errors.has('gender')" class="help text-danger">{{ errors.first('gender') }}</span>
                        <span v-if="validateErrors.gender" class="help text-danger">{{validateErrors.gender[0] }}</span>
                    </div>
                  <div class="form-group col-md-4">
                        <label for="birthday">জন্ম তারিখ</label>
                        <vuejs-datepicker type="date" format="dd-MM-yyyy" :input-class="{'form-control': true, 'text-danger': errors.has('birthday') }" name="birthday"  v-model="form.birthday" placeholder="জন্ম তারিখ"></vuejs-datepicker>
                        <span v-show="errors.has('birthday')" class="help text-danger">{{ errors.first('birthday') }}</span>
                        <span v-if="validateErrors.birthday" class="help text-danger">{{validateErrors.birthday[0] }}</span>
                    </div>
                    <div class="form-group col-md-4">
                        <label for="nid">জাতীয় পরিচয়পত্র/ জন্ম নিবন্ধন নম্বর</label>
                        <input type="number" min="0" name="nid" required v-model="form.nid" id="nid" placeholder="জাতীয় পরিচয়পত্র/ জন্ম নিবন্ধন নম্বর" v-validate="'required'" :class="{'form-control': true, 'text-danger': errors.has('nid') }">
                        <span v-show="errors.has('nid')" class="help text-danger">{{ errors.first('nid') }}</span>
                        <span v-if="validateErrors.nid" class="help text-danger">{{validateErrors.nid[0] }}</span>
                    </div>


                </div>
                <div class="row" v-if="form.type==1">
                  <div class="form-group col-md-3">
                      <label for="tube_well">টিউবওয়েল : </label>
                      <select name="tube_well" :class="{'form-control': true, 'text-danger': errors.has('tube_well') }" v-model="form.tube_well" required="">
                          <option value="আছে">আছে </option>
                          <option value="নাই">নাই </option>
                      </select>
                  </div>
                   <div class="form-group col-md-3">
                      <label for="toilet">টয়লেট : </label>
                      <select name="toilet" :class="{'form-control': true, 'text-danger': errors.has('toilet') }" v-model="form.toilet" required="">
                          <option value="পাকা">পাকা </option>
                          <option value="কাচা">কাচা </option>
                          <option value="নাই">নাই </option>
                      </select>
                  </div>
                  
                </div>
                <div class="row" v-if="form.type==1">
                  <div class="form-group col-md-4">
                      <label for="got_social_benefits">সামাজিক সুবিধা পেয়েছে</label>
                      <select name="got_social_benefits" :class="{'form-control': true, 'text-danger': errors.has('got_social_benefits') }" v-model="form.got_social_benefits" required="">
                            <option value=''>-সামাজিক সুবিধা নির্বাচন করুন-</option>
                            <option value="বয়স্ক ভাতা">বয়স্ক ভাতা </option>
                            <option value="বিধবা ভাতা">বিধবা ভাতা </option>
                            <option value="প্রতিবন্ধী ভাতা">প্রতিবন্ধী ভাতা </option>
                            <option value="৪০ দিন কর্মসূচী">৪০ দিন কর্মসূচী </option>
                            <option value="১০ টাকা চাল">১০ টাকা চাল </option>
                            <option value="মুক্তিযোদ্ধা ভাতা">মুক্তিযোদ্ধা ভাতা </option>
                            <option value="অন্যান্য">অন্যান্য </option>
                        </select>
                      <span v-show="errors.has('got_social_benefits')" class="help text-danger">{{ errors.first('got_social_benefits') }}</span>
                      <span v-if="validateErrors.got_social_benefits" class="help text-danger">{{validateErrors.got_social_benefits[0] }}</span>
                  </div>
                  <div class="form-group col-md-4">
                      <label for="get_social_benefits">সামাজিক সুবিধা পায়</label>
                      <select name="get_social_benefits" :class="{'form-control': true, 'text-danger': errors.has('get_social_benefits') }" v-model="form.get_social_benefits" required="">
                            <option value=''>-সামাজিক সুবিধা নির্বাচন করুন-</option>
                            <option value="বয়স্ক ভাতা">বয়স্ক ভাতা </option>
                            <option value="বিধবা ভাতা">বিধবা ভাতা </option>
                            <option value="প্রতিবন্ধী ভাতা">প্রতিবন্ধী ভাতা </option>
                            <option value="৪০ দিন কর্মসূচী">৪০ দিন কর্মসূচী </option>
                            <option value="১০ টাকা চাল">১০ টাকা চাল </option>
                            <option value="মুক্তিযোদ্ধা ভাতা">মুক্তিযোদ্ধা ভাতা </option>
                            <option value="অন্যান্য">অন্যান্য </option>
                        </select>
                      <span v-show="errors.has('get_social_benefits')" class="help text-danger">{{ errors.first('get_social_benefits') }}</span>
                      <span v-if="validateErrors.get_social_benefits" class="help text-danger">{{validateErrors.get_social_benefits[0] }}</span>
                  </div>
                  <div class="form-group col-md-4">
                      <label for="eligible_for_social_benefits">সামাজিক সুবিধা পাওয়ার যোগ্য</label>
                      <select name="eligible_for_social_benefits" :class="{'form-control': true, 'text-danger': errors.has('eligible_for_social_benefits') }" v-model="form.eligible_for_social_benefits" required="">
                            <option value=''>-সামাজিক সুবিধা নির্বাচন করুন-</option>
                            <option value="বয়স্ক ভাতা">বয়স্ক ভাতা </option>
                            <option value="বিধবা ভাতা">বিধবা ভাতা </option>
                            <option value="প্রতিবন্ধী ভাতা">প্রতিবন্ধী ভাতা </option>
                            <option value="৪০ দিন কর্মসূচী">৪০ দিন কর্মসূচী </option>
                            <option value="১০ টাকা চাল">১০ টাকা চাল </option>
                            <option value="মুক্তিযোদ্ধা ভাতা">মুক্তিযোদ্ধা ভাতা </option>
                            <option value="অন্যান্য">অন্যান্য </option>
                        </select>
                      <span v-show="errors.has('eligible_for_social_benefits')" class="help text-danger">{{ errors.first('eligible_for_social_benefits') }}</span>
                      <span v-if="validateErrors.eligible_for_social_benefits" class="help text-danger">{{validateErrors.eligible_for_social_benefits[0] }}</span>
                  </div>
                </div>
                 <div class="row" v-if="form.type==3">
                  <div class="form-group col-md-3">
                      <label for="business_type">ব্যবসার ধরণ</label>
                      <input type="text" name="business_type" v-model="form.business_type" id="business_type" placeholder="ব্যবসার ধরণ" class="form-control">
                  </div>
                </div>
                <div class="row"  v-if="form.type!=3">
                  <div class="form-group col-md-3">
                      <label for="house_unripe">বাড়ির ধরণ (কাঁচা ঘর)</label>
                      <input type="number" min="0" name="house_unripe" required v-model="form.house_unripe" id="house_unripe" placeholder="কাঁচা ঘরের সংখ্যা" class="form-control">
                  </div>
                  <div class="form-group col-md-3">
                      <label for="house_dochala_tinshade">বাড়ির ধরণ (কাঁচা দোচালা  টিনশেড)</label>
                      <input type="number" min="0" name="house_dochala_tinshade" v-model="form.house_dochala_tinshade" id="house_dochala_tinshade" placeholder="কাঁচা দোচালা টিনশেড ঘরের সংখ্যা" class="form-control">
                  </div>
                  <div class="form-group col-md-3">
                      <label for="house_bhite_paka">বাড়ির ধরণ (ভিটে পাকা ঘর)</label>
                      <input type="number" min="0" name="house_bhite_paka" required v-model="form.house_bhite_paka" id="house_bhite_paka" placeholder="ভিটে পাকা ঘরের সংখ্যা" class="form-control">
                  </div>
                  <div class="form-group col-md-3">
                      <label for="house_semi_ripe">বাড়ির ধরণ (আধা পাকা ঘর)</label>
                      <input type="number" min="0" name="house_semi_ripe" required v-model="form.house_semi_ripe" id="house_semi_ripe" placeholder="আধা পাকা ঘরের সংখ্যা" class="form-control">
                  </div>
                  <div class="form-group col-md-3">
                      <label for="house_ripe">বাড়ির ধরণ (পাকা ঘর)</label>
                      <input type="number" min="0" name="house_ripe" required v-model="form.house_ripe" id="house_ripe" placeholder="পাকা ঘরের সংখ্যা" class="form-control">
                  </div>
                  
                  
                  
                </div>
                <div class="row">
                  <div class="form-group col-md-3">
                      <label for="annual_assessment">বার্ষিক বাড়ির মূল্যায়ন</label>
                      <input type="number" min="0" v-model="form.annual_assessment" name="annual_assessment" id="annual_assessment" placeholder="বার্ষিক বাড়ির মূল্যায়ন" v-validate="'required'" :class="{'form-control': true, 'text-danger': errors.has('annual_assessment') }">
                      <span v-show="errors.has('annual_assessment')" class="help text-danger">{{ errors.first('annual_assessment') }}</span>
                      <span v-if="validateErrors.annual_assessment" class="help text-danger">{{validateErrors.annual_assessment[0] }}</span>
                  </div>
                  <div class="form-group col-md-3">
                      <label for="tax_due">বকেয়া কর</label>
                      <input type="number" min="0" v-model="form.tax_due" name="tax_due" id="tax_due" placeholder="বকেয়া কর"  :class="{'form-control': true, 'text-danger': errors.has('tax_due') }">
                      <span v-show="errors.has('tax_due')" class="help text-danger">{{ errors.first('tax_due') }}</span>
                      <span v-if="validateErrors.tax_due" class="help text-danger">{{validateErrors.tax_due[0] }}</span>
                  </div>
                  <div class="form-group col-md-3">
                      <label for="others_bill_details">অন্যান্য বিলের নাম</label>
                      <input type="text" v-model="form.others_bill_details" name="others_bill_details" id="others_bill_details" placeholder="অন্যান্য বিলের নাম" class="form-control">
                  </div>
                  <div class="form-group col-md-3">
                      <label for="others_bill">অন্যান্য বিল</label>
                      <input type="number" min="0" v-model="form.others_bill" name="others_bill" id="others_bill" placeholder="অন্যান্য বিল" class="form-control">
                  </div>
                </div>

                <div class="form-group">
                    <button type="button" @click="validateBeforeSubmit" class="btn btn-light px-5"><i class="fa fa-save"></i> সাবমিট </button>
                </div>
                </form>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
  .form-control {
    width:100% !important;
  }
</style>