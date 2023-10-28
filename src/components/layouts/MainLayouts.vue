<template>
    <div>
      <div v-if="$route.name!='login'">
        <!-- Start wrapper-->
            <sidebar></sidebar>
            
            </div>
            <topbar></topbar>
            <div class="clearfix"></div>
            <div class="content-wrapper">
                <div class="container-fluid" style="min-height:790px">
                    <router-view :key="$route.fullPath"></router-view>
                </div>
            </div>
            <!--Start Back To Top Button-->
            <a href="javaScript:void();" class="back-to-top"><i class="fa fa-angle-double-up"></i> </a>
            <!--End Back To Top Button-->
            
            <!--Start footer-->
            <footer class="footer">
            <div class="container">
                <div class="text-center">
                Copyright © 2019 Code Planners
                </div>
            </div>
            </footer>
        
        
        
        </div>
</template>

<script>
import Topbar from '@/components/includes/Topbar'
import Sidebar from '@/components/includes/Sidebar'
export default {
    name: 'MainLayouts',
    data () {
      return{

      }
    },
    
    mounted(){
     
    },
    components:{
      'topbar' : Topbar,
      'sidebar': Sidebar,
    },
}
</script>
