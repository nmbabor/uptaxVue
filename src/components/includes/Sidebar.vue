<script>
import UserService from '@/services/UserService'
export default {
  name:"Sidebar",
  data() {
    return {
      profile:{
        name:'',
        email:'',
      },
      permissions:[]
    }
  },
  mounted() {
    this.profile.name= localStorage.getItem("name");
    this.profile.email= localStorage.getItem("email");
    this.getPermissions();
  },
 methods: {
    async getPermissions (){
      const permission = await UserService.permissions();
      this.permissions = permission.data
    }
  }

}
</script>

<template>
    <div>
        <!--Start sidebar-wrapper-->
   <div id="sidebar-wrapper" data-simplebar="" data-simplebar-auto-hide="true">
     <div class="brand-logo">
       <router-link class="router-link" tag="a" to="/" >
        <img src="/static/assets/images/logo-icon.png" class="logo-icon" alt="logo icon">
       <h5 class="logo-text">UP Tax BD</h5>
       </router-link>

   </div>
   <div class="user-details" style="display:none">
	  <div class="media align-items-center user-pointer collapsed" data-toggle="collapse" data-target="#user-dropdown">
	    <div class="avatar"><img class="mr-3 side-user-img" src="/static/assets/images/profile.jpg" alt="user avatar"></div>
	     <div class="media-body">
	     <h6 class="side-user-name">{{this.profile.name}}</h6>
	    </div>
       </div>
	   <div id="user-dropdown" class="collapse">
		  <ul class="user-setting-menu">
            <li><a href="javaScript:void();"><i class="icon-user"></i>  My Profile</a></li>
            <li><a href="javaScript:void();"><i class="icon-settings"></i> Setting</a></li>
			<li><a href="javaScript:void();"><i class="icon-power"></i> Logout</a></li>
		  </ul>
	   </div>
      </div>
   <ul class="sidebar-menu do-nicescrol">
      <li class="sidebar-header">মেইন মেনু</li>
      <li>
        <a href="javaScript:void();" class="waves-effect">
          <i class="zmdi zmdi-view-dashboard"></i> <span>হোল্ডিং</span><i class="fa fa-angle-left pull-right"></i>
        </a>
        <ul class="sidebar-submenu">
          <li><router-link class="router-link" tag="a" to="/holdings/create"><i class="zmdi zmdi-long-arrow-right"></i> নতুন সংযোজন  </router-link></li>
          <li><router-link class="router-link" tag="a" to="/holdings"><i class="zmdi zmdi-long-arrow-right"></i> হোল্ডিং সমূহ  </router-link></li>

        </ul>
      </li>
      <li>
        <a href="javaScript:void();" class="waves-effect">
          <i class="zmdi zmdi-view-dashboard"></i> <span>ট্রেড লাইসেন্স</span><i class="fa fa-angle-left pull-right"></i>
        </a>
        <ul class="sidebar-submenu">
          <li><router-link class="router-link" tag="a" to="/trade-licence/create"><i class="zmdi zmdi-long-arrow-right"></i> নতুন সংযোজন  </router-link></li>
          <li><router-link class="router-link" tag="a" to="/trade-licence"><i class="zmdi zmdi-long-arrow-right"></i> ট্রেড লাইসেন্স সমূহ  </router-link></li>

        </ul>
      </li>
      <li>
        <a href="javaScript:void();" class="waves-effect">
          <i class="zmdi zmdi-view-dashboard"></i> <span>ট্যাক্স</span><i class="fa fa-angle-left pull-right"></i>
        </a>
        <ul class="sidebar-submenu">
          <li><router-link class="router-link" tag="a" to="/tax-collection/create"><i class="zmdi zmdi-long-arrow-right"></i> ট্যাক্স সংগ্রহ  </router-link></li>
          <li><router-link class="router-link" tag="a" to="/tax-collection"><i class="zmdi zmdi-long-arrow-right"></i> সংগৃহীত ট্যাক্স সমূহ  </router-link></li>
          <li><router-link class="router-link" tag="a" to="/tax-generate"><i class="zmdi zmdi-long-arrow-right"></i> ট্যাক্স জেনেরাট  </router-link></li>
          <li style="display:none"><router-link class="router-link" tag="a" to="/coming"><i class="zmdi zmdi-long-arrow-right"></i> ট্যাক্স রেট  </router-link></li>

        </ul>
      </li>
      <li>
        <a href="javaScript:void();" class="waves-effect">
          <i class="zmdi zmdi-view-dashboard"></i> <span>রিপোর্টস</span><i class="fa fa-angle-left pull-right"></i>
        </a>
        <ul class="sidebar-submenu">
          <li><router-link class="router-link" tag="a" to="/report/holdings"><i class="zmdi zmdi-long-arrow-right"></i> ধার্য্য রেজিষ্ট্রার  </router-link></li>
          <li><router-link class="router-link" tag="a" to="/bill-report-list"><i class="zmdi zmdi-long-arrow-right"></i> বিল প্রতিবেদন  </router-link></li>
          <li><router-link class="router-link" tag="a" to="/report/due-tax"><i class="zmdi zmdi-long-arrow-right"></i> বকেয়া প্রতিবেদন  </router-link></li>
          <li><router-link class="router-link" tag="a" to="/bill-report"><i class="zmdi zmdi-long-arrow-right"></i> সিঙ্গেল বিল </router-link></li>
          <li><router-link class="router-link" tag="a" to="/union-top-sheet"><i class="zmdi zmdi-long-arrow-right"></i> ইউনিয়ন টপশিট  </router-link></li>
          <li>
            <a href="javaScript:void();"><i class="zmdi zmdi-long-arrow-right"></i> কর আদায় <i class="fa fa-angle-left pull-right"></i></a>
            <ul class="sidebar-submenu menu-open" style="display: none;">
              <li><router-link class="router-link" tag="a" to="/tax-collection"><i class="zmdi zmdi-dot-circle-alt"></i> কর আদায়ের রেজিষ্টার </router-link></li>
              <li><router-link class="router-link" tag="a" to="/report/due-tax-collection"><i class="zmdi zmdi-dot-circle-alt"></i> বকেয়া কর আদায়   </router-link></li>
              <li><router-link class="router-link" tag="a" to="/report/current-tax-collection"><i class="zmdi zmdi-dot-circle-alt"></i> হাল কর আদায়   </router-link></li>
               <li><router-link class="router-link" tag="a" to="/report/daily-tax"><i class="zmdi zmdi-dot-circle-alt"></i> দৈনিক কর আদায়   </router-link></li>
            </ul>
          </li>

          <li class="active" style="display:none">
            <a href="javaScript:void();"><i class="zmdi zmdi-dot-circle-alt"></i> Level One <i class="fa fa-angle-left pull-right"></i></a>
            <ul class="sidebar-submenu menu-open" style="display: none;">
              <li><a href="javaScript:void();"><i class="zmdi zmdi-dot-circle-alt"></i> Level Two</a></li>
              <li class="">
                <a href="javaScript:void();"><i class="zmdi zmdi-dot-circle-alt"></i> Level Two <i class="fa fa-angle-left pull-right"></i></a>
                <ul class="sidebar-submenu" style="display: none;">
                  <li><a href="javaScript:void();"><i class="zmdi zmdi-dot-circle-alt"></i> Level Three</a></li>
                  <li><a href="javaScript:void();"><i class="zmdi zmdi-dot-circle-alt"></i> Level Three</a></li>
                </ul>
              </li>
            </ul>
          </li>

        </ul>
      </li>
      <li>
        <a href="javaScript:void();" class="waves-effect">
          <i class="fa fa-comment"></i> <span> এস এম এস </span><i class="fa fa-angle-left pull-right"></i>
        </a>
        <ul class="sidebar-submenu">
          <li><router-link class="router-link" tag="a" to="/sms/holdings"><i class="zmdi zmdi-long-arrow-right"></i> সকল রেজিষ্ট্রার </router-link></li>
        
        </ul>
      </li>
      <li>
        <a href="javaScript:void();" class="waves-effect">
          <i class="zmdi zmdi-view-dashboard"></i> <span> সেটিংস </span><i class="fa fa-angle-left pull-right"></i>
        </a>
        <ul class="sidebar-submenu">
          <li><router-link class="router-link" tag="a" to="/union-bill-details"><i class="zmdi zmdi-long-arrow-right"></i> ইউনিয়ন তথ্য </router-link></li>
          <li v-if="$type==1"><router-link class="router-link" tag="a" to="/unions"><i class="zmdi zmdi-long-arrow-right"></i> ইউনিয়ন  </router-link></li>
          <li v-if="$type==1"><router-link class="router-link" tag="a" to="/village"><i class="zmdi zmdi-long-arrow-right"></i> গ্রাম </router-link></li>
          <li v-if="$type==1"><router-link class="router-link" tag="a" to="/bazar"><i class="zmdi zmdi-long-arrow-right"></i> বাজার </router-link></li>
          <li v-if="$type==1"><router-link class="router-link" tag="a" to="/users"><i class="zmdi zmdi-long-arrow-right"></i> ইউজার</router-link></li>
        </ul>
      </li>
    </ul>

   </div>
   <!--End sidebar-wrapper-->
    </div>
</template>
