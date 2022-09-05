<script>
import UserService from '@/services/UserService'
export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: '',
		info: '',
		error:0,
		lodder:false,
    }
  },
  mounted () {
    this.getData()
    if (localStorage.getItem('token') != null) {
      this.$router.go(-1)
    }
  },
  methods: {
    async getData(){

    },
    async login () {
		this.lodder = true;
      await UserService.login({
        email: this.email,
        password: this.password
      }).then(res => {
				localStorage.setItem('id', res.data.id)
				localStorage.setItem('name', res.data.name)
				localStorage.setItem('email', res.data.email)
				localStorage.setItem('union_id', res.data.union_id)
				localStorage.setItem('union_name', res.data.union_name)
				localStorage.setItem('year', res.data.year)
				localStorage.setItem('type', res.data.type)
        localStorage.setItem('token', res.data.token)
        this.$router.push({path: '/'})
      }).catch(error => {
		  this.lodder =false;
		this.error = 1;
		console.log(error.response)

      })
    }
  }
}
</script>
<template>
    <div>
        <!-- start loader -->


<!-- Start wrapper-->
 <div class="loader-wrapper"><div class="lds-ring"><div></div><div></div><div></div><div></div></div></div>
	<div class="card card-authentication1 mx-auto my-5">
		<div class="card-body">
		 <div class="card-content p-2">
		 	<div class="text-center">
		 		<img src="/static/assets/images/logo-icon.png" alt="logo icon">
		 	</div>
		  <div class="card-title text-uppercase text-center py-3">Sign In</div>
		    <form id="inputForm" @submit.prevent="login">
			  <div class="form-group">
			  <label for="exampleInputUsername" class="sr-only">Username</label>
			   <div class="position-relative has-icon-right">
				  <input type="email" v-model="email" id="exampleInputUsername" class="form-control input-shadow" placeholder="Enter Your Email">
				  <div class="form-control-position">
					  <i class="icon-user"></i>
				  </div>
			   </div>
			  </div>
			  <div class="form-group">
			  <label for="exampleInputPassword" class="sr-only">Password</label>
			   <div class="position-relative has-icon-right">
				  <input type="password" v-model="password" id="exampleInputPassword" class="form-control input-shadow" placeholder="Enter Password">
				  <div class="form-control-position">
					  <i class="icon-lock"></i>
				  </div>
			   </div>
				 <span class="text-danger" v-if="this.error==1">These credentials do not match.</span>
			  </div>
			<div class="form-row" style="display:none">
			 <div class="form-group col-6">
			   <div class="icheck-material-white">
                <input type="checkbox" id="user-checkbox" checked="" />
                <label for="user-checkbox">Remember me</label>
			  </div>
			 </div>
			 <div class="form-group col-6 text-right">
			  <a href="authentication-reset-password.html">Reset Password</a>
			 </div>
			</div>
			 <button type="submit" class="btn btn-light btn-block"><i v-if="lodder" class="fa fa-spinner fa-spin"></i> Sign In</button>

			 </form>
		   </div>
		  </div>
		  <div class="card-footer text-center py-3">
		    <p class="text-warning mb-0">Developed By @ <a href="http://codeplanners.com"> Code Planners</a></p>
		  </div>
	     </div>
     </div>
</template>
