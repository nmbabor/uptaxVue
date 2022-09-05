<script>
import UserService from '@/services/UserService'
import AreaService from '@/services/AreaService'
import vSelect from 'vue-select'
export default {
  name: 'Registration',
  data () {
    return {
      form: {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        mobile: '',
        address: '',
        unions:[],
        division_id:'',
        district_id:'',
        upazila_id:''
      },
      validateErrors: [],
      divisions: [],
      districts: [],
      upazila: [],
      unions: [],
      
    }
  },
  mounted(){
    this.getData()
  },
   components: {
    'v-select': vSelect
  },
  methods: {
    async getData(){
       const division = await AreaService.divisions()
      this.divisions = division.data
    },
     async district (){
      if(this.form.division_id!==''){
        const district = await AreaService.districts(this.form.division_id)
        this.districts = district.data
      }else{
        this.districts = []
      }
    },
    async loadUpazila (){
      if(this.form.district_id!==''){
        const allData = await AreaService.upazila(this.form.district_id)
        this.upazila = allData.data
      }else{
        this.upazila = []
      }
      
    },
    async union (){
      let union = []
      let allUnions = []
       if(this.form.upazila_id!==''){
        const allData = await AreaService.unions(this.form.upazila_id)
        allUnions = allData.data
       }
       for(let data of allUnions){
         union.push({label:data.bn_name,value:data.id})
       }
       this.unions = union
    },
    async validateBeforeSubmit() {
      
      this.$validator.validateAll()
        .then((resp)=>{
          if (!resp){
            return
          }
          else if (resp){
            let formData = new FormData()
            /* Add the form data we need to submit */
            for (let key in this.form) {
              formData.append(key, this.form[key])
            }
            UserService.store(this.form).then(success=>{
              this.$swal({
                type: 'success',
                title: 'Registration Successfully Done',
                showConfirmButton: false,
                timer: 1500
              })
              
              this.$router.push({ name: 'users' })
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
                <div class="card-title"> ইউজার তৈরি
                    <div class="pull-right">
                      <router-link tag="a" to="/users" class="btn btn-xs btn-light waves-effect waves-light m-1"><i class="fa fa-list"></i> সকল ইউজার </router-link>
                    </div>
                </div>
                <hr>
                <form method="POST" @submit.prevent="validateBeforeSubmit" enctype="multipart/form-data">
                    <div class="row">
                        <div class="form-group col-md-6">
                            <label for="input-1">নাম</label>
                            <input type="text" name="name" required v-model="form.name" id="input-1" placeholder="নাম" v-validate="'required'" :class="{'form-control': true, 'text-danger': errors.has('name') }">
                            <span v-show="errors.has('name')" class="help text-danger">{{ errors.first('name') }}</span>
                            <span v-if="validateErrors.name" class="help text-danger">{{validateErrors.name[0] }}</span>
                        </div>
                        <div class="form-group col-md-6">
                            <label for="input-2">ইমেইল</label>
                            <input type="text" required v-model="form.email" name="email" id="input-2" placeholder="ইমেইল এড্রেস" v-validate="'required'" :class="{'form-control': true, 'text-danger': errors.has('email') }">
                            <span v-show="errors.has('email')" class="help text-danger">{{ errors.first('email') }}</span>
                            <span v-if="validateErrors.email" class="help text-danger">{{validateErrors.email[0] }}</span>
                        </div>
                    </div>
                <div class="row">
                    <div class="form-group col-md-6">
                        <label for="input-3">মোবাইল নাম্বার</label>
                        <input type="number" min="0" required v-model="form.mobile" name="mobile" id="input-3" placeholder="মোবাইল নাম্বার" v-validate="'required|min:11'" :class="{'form-control': true, 'text-danger': errors.has('mobile') }">
                        <span v-show="errors.has('mobile')" class="help text-danger">{{ errors.first('mobile') }}</span>
                        <span v-if="validateErrors.mobile" class="help text-danger">{{validateErrors.mobile[0] }}</span>
                    </div>
                    <div class="form-group col-md-6">
                        <label for="address">ঠিকানা</label>
                        <input type="text" v-model="form.address" name="address" id="address" placeholder="ঠিকানা" v-validate="'required'" :class="{'form-control': true, 'text-danger': errors.has('address') }">
                        <span v-show="errors.has('address')" class="help text-danger">{{ errors.first('address') }}</span>
                        <span v-if="validateErrors.address" class="help text-danger">{{validateErrors.address[0] }}</span>
                        
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-md-6">
                        <label for="input-4">পাসওয়ার্ড</label>
                        <input type="password" required v-model="form.password" name="password" id="input-4" placeholder="পাসওয়ার্ড" v-validate="'required|min:8'" :class="{'form-control': true, 'text-danger': errors.has('password') }" ref="password">
                        <span v-show="errors.has('password')" class="help text-danger">{{ errors.first('password') }}</span>
                        <span v-if="validateErrors.password" class="help text-danger">{{validateErrors.password[0] }}</span>
                    </div>
                    <div class="form-group col-md-6">
                        <label for="input-5">পাসওয়ার্ড নিশ্চিত করুন</label>
                        <input type="password" required v-model="form.password_confirmation" v-validate="'required|confirmed:password'" name="password_confirmation" class="form-control" id="input-5" placeholder="পাসওয়ার্ড নিশ্চিত করুন" data-vv-as="password">
                         <span v-show="errors.has('password_confirmation')" class="help text-danger">{{ errors.first('password_confirmation') }}</span>
                        <span v-if="validateErrors.password_confirmation" class="help text-danger">{{validateErrors.password_confirmation[0] }}</span>
                    </div>
                </div>
                
                <div class="row">
                           <div class="col-md-4 no-padding">
                              <div class="form-group">
                                  <label class="col-md-12"> ডিভিশন </label>
                                  <div class="col-md-12">
                                      <select class="form-control" v-model="form.division_id" @change="district()">
                                        <option value=""> -ডিভিশন নির্বাচন করুন- </option>
                                        <option v-for="(data,i) in divisions" :key="i" :value="data.id"> {{data.bn_name}} </option>
                                      </select>
                                  </div>
                              </div>
                          </div>
                          <div class="col-md-4 no-padding">
                              <div class="form-group">
                                  <label class="col-md-12"> জেলা </label>
                                  <div class="col-md-12">
                                      <select class="form-control" v-model="form.district_id" @change="loadUpazila()">
                                        <option value=""> -জেলা নির্বাচন করুন- </option>
                                        <option v-for="(data,i) in districts" :key="i" :value="data.id"> {{data.bn_name}} </option>
                                      </select>
                                  </div>
                              </div>
                          </div>
                          <div class="col-md-4 no-padding">
                              <div class="form-group">
                                  <label class="col-md-12"> উপজেলা </label>
                                  <div class="col-md-12">
                                      <select class="form-control" v-model="form.upazila_id" @change="union()">
                                        <option value=""> -উপজেলা নির্বাচন করুন- </option>
                                        <option v-for="(data,i) in upazila" :key="i" :value="data.id"> {{data.bn_name}} </option>
                                      </select>
                                  </div>
                              </div>
                          </div>
                          <div class="col-md-8 no-padding">
                              <div class="form-group">
                                  <label class="col-md-12"> ইউনিয়ন </label>
                                  <div class="col-md-12">
                                    <v-select class="form-multiple-select" placeholder="ইউনিয়ন নির্বাচন করুন" v-model="form.unions" :options="unions"></v-select>
                                      
                                  </div>
                              </div>
                          </div>
                        </div>
                <div class="form-group">
                    <button type="submit" class="btn btn-light px-5"><i class="icon-lock"></i> Register</button>
                </div>
                </form>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>

