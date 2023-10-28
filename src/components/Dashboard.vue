<script>
export default {
  name: "Dashboard",
  beforeRouteEnter(to, from, next) {
    if(from.name=='login'){
      setTimeout(()=>{
        location.reload(true)
      },200)
    }
    next()
  },
   data () {
      return{
        keyword:''
      }
   },
    mounted () {
    
  },
   methods: {
       
     async search(){
        if(this.keyword.length>0){
          this.$router.push({path: "/search?keyword="+this.keyword})
        }
      },
    }
}
</script>

<template>
    <div>
    <br>
        <h3 class="text-center">{{$union_name}} ইউনিয়ন পরিষদ হোল্ডিং ট্যাক্স ডিজিটালাইজেশন সিস্টেমে আপনাকে স্বাগতম</h3>
        
      <div class="row search-dashboard">
        <div class="col-sm-2"></div>
        <div class="col-sm-8">
          <h5 class="text-center">মোবাইল নাম্বার বা হোল্ডিং নং কিংবা নাম লিখে সার্চ করুন</h5>
          <form method="GET" @submit.prevent="search" class="search-bar" style="margin-top: 15px;">
            <input type="text" class="form-control" v-model="keyword" name="keyword" placeholder="নাম বা হোল্ডিংনং লিখুন">
            <a @click="search"><i class="icon-magnifier"></i></a>
          </form>
        </div>
      </div>

      
    </div>
</template>
