<script>
import UserService from '@/services/UserService'
import AreaService from '@/services/AreaService'
import vSelect from 'vue-select'
export default {
  name: 'editUser',
  data () {
    return {
      form: {},
      validateErrors: [],
      divisions: [],
      districts: [],
      upazila: [],
      unions: [],
    }
  },
  mounted () {
    this.getData()
    this.district()
    this.loadUpazila()
    this.union()
  },
  components: {
    'v-select': vSelect
  },
  methods: {
    async getData () {
      const response = await UserService.show(this.$route.params.id)
      this.form = response.data.user
      this.form.unions = response.data.unions
      
      const division = await AreaService.divisions()
      this.divisions = division.data
      this.district ()
    },
    async district (){
      if(this.form.division_id!==''){
        const district = await AreaService.districts(this.form.division_id)
        this.districts = district.data
      }else{
        this.districts = []
      }
      this.loadUpazila ()
    },
    async loadUpazila (){
      if(this.form.district_id!==''){
        const allData = await AreaService.upazila(this.form.district_id)
        this.upazila = allData.data
      }else{
        this.upazila = []
      }
      this.union()
    },
    async union (){
      let allUnions = []
      let union = []
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
        .then(resp=>{
          if (resp){
            let formData = new FormData()
            /* Add the form data we need to submit */
            for (let key in this.form) {
              formData.append(key, this.form[key])
            }
            
            UserService.update(this.form,this.$route.params.id)
              .then(success=>{
                console.log(success.data)
                this.$swal({
                  type: 'success',
                  title: 'Data Successfully Updated',
                  showConfirmButton: false,
                  timer: 1500
                })
                //this.$router.push({ name: 'users' })
              })
              .catch(err=>{
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
          console.log('catch')
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
                <div class="card-title">User Edit
                    <div class="pull-right">
                      <router-link tag="a" to="/users" class="btn btn-xs btn-light waves-effect waves-light m-1"><i class="fa fa-list"></i> View All </router-link>
                    </div>
                </div>
                <hr>
                <form  method="POST" @submit.prevent="validateBeforeSubmit" enctype="multipart/form-data">
                    <div class="row">
                        <div class="form-group col-md-6">
                            <label for="input-1">Name</label>
                            <input type="text" name="name" required v-model="form.name" id="input-1" placeholder="Enter Your Name" v-validate="'required'" :class="{'form-control': true, 'text-danger': errors.has('name') }">
                            <span v-show="errors.has('name')" class="help text-danger">{{ errors.first('name') }}</span>
                            <span v-if="validateErrors.name" class="help text-danger">{{validateErrors.name[0] }}</span>
                        </div>
                        <div class="form-group col-md-6">
                            <label for="input-2">Email</label>
                            <input type="text" required v-model="form.email" name="email" id="input-2" placeholder="Enter Your Email Address" v-validate="'required'" :class="{'form-control': true, 'text-danger': errors.has('email') }">
                            <span v-show="errors.has('email')" class="help text-danger">{{ errors.first('email') }}</span>
                            <span v-if="validateErrors.email" class="help text-danger">{{validateErrors.email[0] }}</span>
                        </div>
                    </div>
                <div class="row">
                    <div class="form-group col-md-6">
                        <label for="input-3">Mobile</label>
                        <input type="number" min="0" required v-model="form.mobile" name="mobile" id="input-3" placeholder="Enter Your Mobile Number" v-validate="'required|min:11'" :class="{'form-control': true, 'text-danger': errors.has('mobile') }">
                        <span v-show="errors.has('mobile')" class="help text-danger">{{ errors.first('mobile') }}</span>
                        <span v-if="validateErrors.mobile" class="help text-danger">{{validateErrors.mobile[0] }}</span>
                    </div>
                    <div class="form-group col-md-6">
                        <label for="address">Address</label>
                        <input type="text" v-model="form.address" name="address" id="address" placeholder="Enter Your Address" v-validate="'required'" :class="{'form-control': true, 'text-danger': errors.has('address') }">
                        <span v-show="errors.has('address')" class="help text-danger">{{ errors.first('address') }}</span>
                        <span v-if="validateErrors.address" class="help text-danger">{{validateErrors.address[0] }}</span>
                        
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
                          <div class="col-md-4 no-padding">
                              <div class="form-group">
                                  <label class="col-md-12"> স্ট্যাটাস </label>
                                  <div class="col-md-12">
                                   <select class="form-control" v-model="form.status">
                                        <option value="1"> একটিভ </option>
                                        <option value="0"> ইনএকটিভ </option>
                                    </select>
                                  </div>
                              </div>
                          </div>
                        </div>
                    <div class="form-group">
                        <button type="submit" class="btn btn-light px-5"><i class="fa fa-save"></i> Update</button>
                    </div>
                </form>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>

