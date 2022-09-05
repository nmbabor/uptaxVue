<script>
import AreaService from '@/services/AreaService'
import HoldingsService from '@/services/HoldingsService'
export default {
  name: 'HondingCreate',
  data () {
    return {
        village: [],
      form: {
        type:'1',
        holding_no:'',
        owner_name:'',
        organization_name:'',
        father_or_husband:'',
        mother:'0',
        mobile:'0',
        profession:'',
        education:'',
        religion:'ইসলাম',
        gender:'পুরুষ',
        birthday:'',
        nid:'',
        got_social_benefits:'অন্যান্য',
        get_social_benefits:'অন্যান্য',
        eligible_for_social_benefits:'অন্যান্য',
        tube_well:'আছে',
        toilet:'পাকা',
        house_unripe:'0',
        house_bhite_paka:'0',
        house_semi_ripe:'0',
        house_ripe:'0',
        annual_assessment:'',
        annual_tax:'',
        tax_due:'0',
        others_bill_details:'0',
        others_bill:'0',
        union_id:'',
        word:'',
        village_id:'',
      },
      validateErrors: [],
    }
  },
  mounted(){

    this.getData()

  },
  methods: {
    async getData(){
      this.form.union_id = this.$union_id
      this.loadVillage ()
    },
    async loadVillage (){
       if(this.form.union_id!==''){
        const allData = await AreaService.village(this.form.union_id)
        this.village = allData.data

       }else{
         this.village = []
       }

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

            HoldingsService.store(this.form).then(success=>{

              this.$swal({
                type: 'success',
                title: 'Added Successfully Done',
                showConfirmButton: false,
                timer: 1500
              })
              //this.$router.push({ name: 'users' })
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
    }
  }
}
</script>
<template>
    <div>
        <div class="row">

            <div class="col-lg-12">
                <div class="card">
                <div class="card-body">
                <div class="card-title"> নতুন হোল্ডিং তথ্য সংযোজন
                    <div class="pull-right">
                      <router-link tag="a" to="/holdings" class="btn btn-xs btn-light waves-effect waves-light m-1"><i class="fa fa-list"></i> সকল হোল্ডিং </router-link>
                    </div>
                </div>
                <hr>
                <form method="POST" @submit.prevent="validateBeforeSubmit" enctype="multipart/form-data">
                    <div class="row">
                      <div class="col-md-4">
                        <label> <input type="radio" v-model="form.type" name="type" value="1"> আবাসিক</label>
                        <label> <input type="radio" v-model="form.type" name="type" value="2"> বানিজ্যিক</label>
                      </div>

                    </div>
                    <div class="row">
                        
                        <div class="col-md-3">
                            <div class="form-group">
                                <label class="col-md-12 no-padding"> ওয়ার্ড নাম্বার </label>
                                <div class="col-md-12 no-padding">
                                  <select class="form-control" required v-model="form.word">
                                    <option value=""> -ওয়ার্ড- </option>
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
                        <div class="col-md-3">
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
                        <div class="form-group col-md-3">
                            <label for="holding_no">হোল্ডিং নাম্বার</label>
                            <input type="number" step="any" min="1" name="holding_no" required v-model="form.holding_no" id="holding_no" placeholder="হোল্ডিং নাম্বার" v-validate="'required'" :class="{'form-control': true, 'text-danger': errors.has('holding_no') }">
                            <span v-show="errors.has('holding_no')" class="help text-danger">{{ errors.first('holding_no') }}</span>
                            <span v-if="validateErrors.holding_no" class="help text-danger">{{validateErrors.holding_no[0] }}</span>
                        </div>
                        <div class="form-group col-md-3">
                            <label for="owner_name"> মালিক</label>
                            <input type="text" name="owner_name" required v-model="form.owner_name" id="owner_name" placeholder=" মালিকের নাম" v-validate="'required'" :class="{'form-control': true, 'text-danger': errors.has('owner_name') }">
                            <span v-show="errors.has('owner_name')" class="help text-danger">{{ errors.first('owner_name') }}</span>
                            <span v-if="validateErrors.owner_name" class="help text-danger">{{validateErrors.owner_name[0] }}</span>
                        </div>
                    </div>
                <div class="row">
                  <div class="form-group col-md-3">
                        <label for="input-2">মোবাইল নাম্বার</label>
                        <input type="number" min="0" required v-model="form.mobile" name="mobile" id="input-2" placeholder="মোবাইল নাম্বার" v-validate="'required'" :class="{'form-control': true, 'text-danger': errors.has('mobile') }">
                        <span v-show="errors.has('mobile')" class="help text-danger">{{ errors.first('mobile') }}</span>
                        <span v-if="validateErrors.mobile" class="help text-danger">{{validateErrors.mobile[0] }}</span>
                    </div>
                    <div class="form-group col-md-3">
                        <label for="organization_name"><span v-if="form.type==1">বাড়ির নাম</span> <span v-else=""> প্রতিষ্ঠানের নাম</span></label>
                        <input type="text" v-model="form.organization_name" name="organization_name" id="organization_name" :class="{'form-control': true, 'text-danger': errors.has('organization_name') }">
                        <span v-show="errors.has('organization_name')" class="help text-danger">{{ errors.first('organization_name') }}</span>
                        <span v-if="validateErrors.organization_name" class="help text-danger">{{validateErrors.organization_name[0] }}</span>
                    </div>
                    <div class="form-group col-md-3">
                        <label for="father_or_husband">বাবা/স্বামী</label>
                        <input type="text" required v-model="form.father_or_husband" name="father_or_husband" id="father_or_husband" placeholder="বাবা/স্বামী" v-validate="'required'" :class="{'form-control': true, 'text-danger': errors.has('father_or_husband') }">
                        <span v-show="errors.has('father_or_husband')" class="help text-danger">{{ errors.first('father_or_husband') }}</span>
                        <span v-if="validateErrors.father_or_husband" class="help text-danger">{{validateErrors.father_or_husband[0] }}</span>
                    </div>
                    <div class="form-group col-md-3">
                        <label for="mother">মায়ের নাম</label>
                        <input type="text" v-model="form.mother" name="mother" id="mother" placeholder="মায়ের নাম" v-validate="'required'" :class="{'form-control': true, 'text-danger': errors.has('mother') }">
                        <span v-show="errors.has('mother')" class="help text-danger">{{ errors.first('mother') }}</span>
                        <span v-if="validateErrors.mother" class="help text-danger">{{validateErrors.mother[0] }}</span>
                    </div>

                </div>
                <div class="row">
                  
                  <div class="form-group col-md-3">
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
                    <div class="form-group col-md-3">
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
                    <div class="form-group col-md-3">
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
                    <div class="form-group col-md-3">
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

                </div>
                <div class="row">
                  
                  <div class="form-group col-md-3">
                        <label for="birthday">জন্ম তারিখ</label>
                        <vuejs-datepicker style="width:100%" type="date" format="dd-MM-yyyy" :input-class="{'form-control': true, 'text-danger': errors.has('birthday') }" name="birthday"  v-model="form.birthday" placeholder="জন্ম তারিখ"></vuejs-datepicker>
                        <span v-show="errors.has('birthday')" class="help text-danger">{{ errors.first('birthday') }}</span>
                        <span v-if="validateErrors.birthday" class="help text-danger">{{validateErrors.birthday[0] }}</span>
                    </div>
                    <div class="form-group col-md-3">
                        <label for="nid">জাতীয় পরিচয়পত্র/ জন্ম নিবন্ধন নম্বর</label>
                        <input type="number" min="0" name="nid" required v-model="form.nid" id="nid" placeholder="জাতীয় পরিচয়পত্র/ জন্ম নিবন্ধন নম্বর" v-validate="'required'" :class="{'form-control': true, 'text-danger': errors.has('nid') }">
                        <span v-show="errors.has('nid')" class="help text-danger">{{ errors.first('nid') }}</span>
                        <span v-if="validateErrors.nid" class="help text-danger">{{validateErrors.nid[0] }}</span>
                    </div>
                    <div class="form-group col-md-3"  v-if="form.type==1">
                        <label>টিউবওয়েল : </label><br>
                        <label> <input type="radio" v-model="form.tube_well"  name="tube_well" value="আছে"> আছে </label>
                        <label> <input type="radio" v-model="form.tube_well"  name="tube_well" value="নাই"> নাই </label>
                    </div>
                    <div class="form-group col-md-3"  v-if="form.type==1">
                      <label>টয়লেট : </label><br>
                        <label> <input type="radio" v-model="form.toilet"  name="toilet" value="পাকা"> পাকা </label>
                        <label> <input type="radio" v-model="form.toilet"  name="toilet" value="কাচা"> কাচা </label>
                        <label> <input type="radio" v-model="form.toilet"  name="toilet" value="নাই"> নাই </label>
                    </div>

                </div>
                <div class="row" v-if="form.type==1">
                  <div class="form-group col-md-3">
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
                  <div class="form-group col-md-3">
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
                  <div class="form-group col-md-3">
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
                <div class="row">
                  <div class="form-group col-md-3">
                      <label for="house_ripe">বাড়ির ধরণ (পাকা ঘর)</label>
                      <input type="number" min="0" name="house_ripe" required v-model="form.house_ripe" id="house_ripe" placeholder="পাকা ঘরের সংখ্যা" class="form-control">
                  </div>
                  <div class="form-group col-md-3">
                      <label for="house_semi_ripe">বাড়ির ধরণ (আধা পাকা ঘর)</label>
                      <input type="number" min="0" name="house_semi_ripe" required v-model="form.house_semi_ripe" id="house_semi_ripe" placeholder="আধা পাকা ঘরের সংখ্যা" class="form-control">
                  </div>
                  <div class="form-group col-md-3">
                      <label for="house_bhite_paka">বাড়ির ধরণ (ভিটে পাকা ঘর)</label>
                      <input type="number" min="0" name="house_bhite_paka" required v-model="form.house_bhite_paka" id="house_bhite_paka" placeholder="ভিটে পাকা ঘরের সংখ্যা" class="form-control">
                  </div>
                  <div class="form-group col-md-3">
                      <label for="house_unripe">বাড়ির ধরণ (কাঁচা ঘর)</label>
                      <input type="number" min="0" name="house_unripe" required v-model="form.house_unripe" id="house_unripe" placeholder="কাঁচা ঘরের সংখ্যা" class="form-control">
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
                      <input type="number" min="0" v-model="form.tax_due" name="tax_due" id="tax_due" placeholder="বকেয়া কর" :class="{'form-control': true, 'text-danger': errors.has('tax_due') }">
                      <span v-show="errors.has('tax_due')" class="help text-danger">{{ errors.first('tax_due') }}</span>
                      <span v-if="validateErrors.tax_due" class="help text-danger">{{validateErrors.tax_due[0] }}</span>
                  </div>
                  <div class="form-group col-md-3">
                      <label for="others_bill_details">অন্যান্য বিলের নাম</label>
                      <input type="text" v-model="form.others_bill_details" name="others_bill_details" id="others_bill_details" placeholder="অন্যান্য বিলের নাম" class="form-control">
                  </div>
                  <div class="form-group col-md-3">
                      <label for="others_bill">অন্যান্য বিল</label>
                      <input type="number" min="0" v-model="form.others_bill" name="others_bill" id="others_bill" placeholder="অন্যান্য বিল" :class="{'form-control': true, 'text-danger': errors.has('others_bill') }">
                  </div>
                </div>

                <div class="form-group">
                    <button type="submit" class="btn btn-light px-5"><i class="fa fa-save"></i> সাবমিট </button>
                </div>
                </form>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>

