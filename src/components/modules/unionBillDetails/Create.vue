<script>
import HoldingsService from '@/services/HoldingsService'
import UnionBillDetails from '@/services/UnionBillDetails'
export default {
  name: 'UnionBillDetails',
  data () {
    return {
        unions: [],
        village: [],
      form: {
        union_id:this.$union_id,
        chairman_name:'',
        chairman_mobile:'',
        email:'',
        bank_name:'',
        branch_name:'',
        bill_start_date:'',
        bill_end_date:'',
        signature:'',
        logo:'',
        details:''
      },
      signatureUrl: '',
      logoUrl: '',
      validateErrors: [],
    }
  },
  mounted(){

    this.getData()

  },
  methods: {
    async getData(){
      const unionData = await HoldingsService.unions();
      this.unions = unionData.data;
      const data = await UnionBillDetails.show(this.$union_id)
      if(data!=''){
        this.form = data.data
         this.signatureUrl = this.$baseUrl+data.data.signature
         this.logoUrl = this.$baseUrl+data.data.logo
      }
    },
    selectFile () {
        this.form.signature = this.$refs.signature.files[0]
        this.signatureUrl = URL.createObjectURL(this.form.signature)
      },
    selectLogo () {
        this.form.logo = this.$refs.logo.files[0]
        this.logoUrl = URL.createObjectURL(this.form.logo)
      },


    async validateBeforeSubmit() {
      this.$validator.validateAll()
        .then((resp)=>{
          if (!resp){
            return
          }
          else if (resp){

            let day = new Date(this.form.bill_start_date).getDate()
              let month = new Date(this.form.bill_start_date).getMonth()+1
              if(month<10){
                month = '0'+month
              }
              if(day<10){
                day = '0'+day
              }
              let year = new Date(this.form.bill_start_date).getFullYear()
              let date = year+'-'+month+'-'+day
              this.form.bill_start_date = date
              // bill_end_date
             day = new Date(this.form.bill_end_date).getDate()
               month = new Date(this.form.bill_end_date).getMonth()+1
              if(month<10){
                month = '0'+month
              }
              if(day<10){
                day = '0'+day
              }
               year = new Date(this.form.bill_end_date).getFullYear()
               date = year+'-'+month+'-'+day
              this.form.bill_end_date = date
            let formData = new FormData()
            for (let key in this.form) {
              formData.append(key, this.form[key])
            }

            UnionBillDetails.store(formData).then(success=>{

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
                <div class="card-title"> ইউনিয়ন পরিষদ তথ্য সংযোজন
                    <div class="pull-right">
                      <!-- <router-link tag="a" to="/holdings" class="btn btn-xs btn-light waves-effect waves-light m-1"><i class="fa fa-list"></i> সকল হোল্ডিং </router-link> -->
                    </div>
                </div>
                <hr>
                <form method="POST" @submit.prevent="validateBeforeSubmit" enctype="multipart/form-data">

                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="col-md-12 no-padding"> ইউনিয়ন </label>
                                <div class="col-md-12 no-padding">
                                    <select class="form-control" required v-model="form.union_id">
                                    <option value=""> -ইউনিয়ন নির্বাচন করুন- </option>
                                    <option v-for="(data,i) in unions" :key="i" :value="data.id"> {{data.bn_name}} </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="col-md-12 no-padding"> চেয়ারম্যানের নাম  </label>
                                <div class="col-md-12 no-padding">
                                  <input type="text" name="chairman_name" v-model="form.chairman_name" v-validate="'required'" :class="{'form-control': true, 'text-danger': errors.has('chairman_name') }">
                                  <span v-show="errors.has('chairman_name')" class="help text-danger">{{ errors.first('chairman_name') }}</span>
                                  <span v-if="validateErrors.chairman_name" class="help text-danger">{{validateErrors.chairman_name[0] }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="col-md-12 no-padding"> চেয়ারম্যান মোবাইল নাম্বার  </label>
                                <div class="col-md-12 no-padding">
                                  <input type="number" name="chairman_mobile" min="0" v-model="form.chairman_mobile" v-validate="'required'" :class="{'form-control': true, 'text-danger': errors.has('chairman_mobile') }">
                                  <span v-show="errors.has('chairman_mobile')" class="help text-danger">{{ errors.first('chairman_mobile') }}</span>
                                <span v-if="validateErrors.chairman_mobile" class="help text-danger">{{validateErrors.chairman_mobile[0] }}</span>

                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="row">
                          <div class="form-group col-md-4">
                            <label for="email">ইমেইল</label>
                            <input type="text" name="email" v-model="form.email" id="email" placeholder="ইমেইল" :class="{'form-control': true, 'text-danger': errors.has('email') }">
                            <span v-show="errors.has('email')" class="help text-danger">{{ errors.first('email') }}</span>
                            <span v-if="validateErrors.email" class="help text-danger">{{validateErrors.email[0] }}</span>
                          </div>
                          <div class="form-group col-md-4">
                            <label for="bank_name">ব্যাংকের নাম</label>
                            <input type="text" name="bank_name" v-model="form.bank_name" id="bank_name" placeholder="ব্যাংকের নাম"  :class="{'form-control': true, 'text-danger': errors.has('bank_name') }">
                            <span v-show="errors.has('bank_name')" class="help text-danger">{{ errors.first('bank_name') }}</span>
                            <span v-if="validateErrors.bank_name" class="help text-danger">{{validateErrors.bank_name[0] }}</span>
                          </div>
                          <div class="form-group col-md-4">
                            <label for="branch_name"> ব্রাঞ্চের নাম</label>
                            <input type="text" name="branch_name" v-model="form.branch_name" id="branch_name" placeholder="ব্রাঞ্চের নাম"  :class="{'form-control': true, 'text-danger': errors.has('branch_name') }">
                            <span v-show="errors.has('branch_name')" class="help text-danger">{{ errors.first('branch_name') }}</span>
                            <span v-if="validateErrors.branch_name" class="help text-danger">{{validateErrors.branch_name[0] }}</span>
                        </div>
                      </div>
                    
                        <div class="row">
                          <div class="form-group col-md-3">
                              <label for="input-2"> বিল শুরু তারিখ </label>
                              <vuejs-datepicker type="date" format="dd-MM-yyyy" :input-class="{'form-control': true, 'text-danger': errors.has('bill_start_date') }" v-validate="'required'" name="bill_start_date"  v-model="form.bill_start_date" placeholder=" বিল শুরু তারিখ"></vuejs-datepicker>
                              <span v-show="errors.has('bill_start_date')" class="help text-danger">{{ errors.first('bill_start_date') }}</span>
                              <span v-if="validateErrors.bill_start_date" class="help text-danger">{{validateErrors.bill_start_date[0] }}</span>
                          </div>
                          <div class="form-group col-md-3">
                                <label for="input-2"> বিল শেষ তারিখ </label>
                                <vuejs-datepicker type="date" format="dd-MM-yyyy" :input-class="{'form-control': true, 'text-danger': errors.has('bill_end_date') }" v-validate="'required'" name="bill_end_date"  v-model="form.bill_end_date" placeholder="বিল শেষ তারিখ"></vuejs-datepicker>
                                <span v-show="errors.has('bill_end_date')" class="help text-danger">{{ errors.first('bill_end_date') }}</span>
                                <span v-if="validateErrors.bill_end_date" class="help text-danger">{{validateErrors.bill_start_date[0] }}</span>
                          </div>
                          <div class="form-group col-md-6">
                            <label for="details"> সৌজন্যে </label>
                            <input type="text" name="details" v-model="form.details" id="details" placeholder="সৌজন্যে" :class="{'form-control': true, 'text-danger': errors.has('details') }">
                            <span v-show="errors.has('details')" class="help text-danger">{{ errors.first('details') }}</span>
                            <span v-if="validateErrors.details" class="help text-danger">{{validateErrors.details[0] }}</span>
                        </div>
                    </div>
                    <div class="row">
                      <div class="col-md-3">
                        <div class="form-group">
                          <label class="col-md-12">ইউনিয়ন লগো </label>
                          <div class="col-md-12">
                            <label class="upload_photo upload client_logo_upload square">
                              <!--  -->
                              <img id="image_load" v-if="logoUrl" :src="logoUrl">
                              <i class="upload_hover fa fa-camera"></i>
                              <input type="file"  ref="logo" @change="selectLogo()" style="display:none" name="logo">
                            </label>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-4">
                        <div class="form-group">
                          <label class="col-md-12">চেয়ারম্যান স্বাক্ষর</label>
                          <div class="col-md-12">
                            <label class="upload_photo upload client_logo_upload">
                              <!--  -->
                              <img id="image_load" v-if="signatureUrl" :src="signatureUrl">
                              <i class="upload_hover fa fa-camera"></i>
                              <input type="file"  ref="signature" @change="selectFile()" style="display:none" name="signature">
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                   
                <div class="form-group">
                    <button type="submit" @click="validateBeforeSubmit" class="btn btn-light px-5"><i class="fa fa-save"></i> সাবমিট </button>
                </div>
                </form>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>

