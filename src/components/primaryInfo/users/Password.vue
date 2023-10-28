<script>
import UserService from '@/services/UserService'
export default {
  name: 'PasswordChange',
  data () {
    return {
        data:{
            name:'',
            email:''    
        },
      form: {
        password: '',
        password_confirmation: '',
        id:this.$route.params.id
      },
      validateErrors: [],
    }
  },
  mounted(){
    this.getData()
  },
  methods: {
   async getData () {
      const response = await UserService.show(this.$route.params.id)
      this.data = response.data.user
      console.log(this.data)
    },
    async validateBeforeSubmit() {
        this.$validator.validateAll()
          .then(resp=>{
            if (resp){
              UserService.passChange(this.form)
                .then(success=>{
                  this.$swal({
                    type: 'success',
                    title: 'Password Successfully Updated',
                    showConfirmButton: false,
                    timer: 1500
                  })
                  this.$router.push({ name: 'users' })
                })
                .catch(err=>{
                  this.validateErrors=err.response.data
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
                <div class="card-title">User Password Change
                    <div class="pull-right">
                      <router-link tag="a" to="/users" class="btn btn-xs btn-light waves-effect waves-light m-1"><i class="fa fa-list"></i> View All </router-link>
                    </div>
                </div>
                <hr>
                <form  method="POST" @submit.prevent="validateBeforeSubmit">
                <div class="row">
                        <div class="form-group col-md-6">
                            <label for="input-1">Name: </label>
                            <span> {{data.name}} </span><br>
                            <label for="input-1">Email: </label>
                            <span> {{data.email}} </span>
                        </div>
                    </div>
                <div class="row">
                    <div class="form-group col-md-7">
                        <label for="input-4">New Password</label>
                        <input type="password" required v-model="form.password" name="password" id="input-4" placeholder="Enter New Password" v-validate="'required|min:8'" :class="{'form-control': true, 'text-danger': errors.has('password') }" ref="password">
                        <span v-show="errors.has('password')" class="help text-danger">{{ errors.first('password') }}</span>
                        <span v-if="validateErrors.password" class="help text-danger">{{validateErrors.password[0] }}</span>
                    </div>
                    <br>
                    <div class="form-group col-md-7">
                        <label for="input-5">Confirm Password</label>
                        <input type="password" required v-model="form.password_confirmation" v-validate="'required|confirmed:password'" name="password_confirmation" class="form-control" id="input-5" placeholder="Confirm Password" data-vv-as="password">
                         <span v-show="errors.has('password_confirmation')" class="help text-danger">{{ errors.first('password_confirmation') }}</span>
                        <span v-if="validateErrors.password_confirmation" class="help text-danger">{{validateErrors.password_confirmation[0] }}</span>
                    </div>
                </div>
                <div class="form-group">
                    <button type="submit" class="btn btn-light px-5"><i class="fa fa-save"></i> Change Password</button>
                </div>
                </form>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>

