<script>
import AreaService from '@/services/AreaService'
import $ from "jquery";
export default {
  name: 'Users',
  data () {
    return {
      divisions: [],
      districts: [],
      upazila: [],
      unions: [],
      village: [],
      form:{
        division_id:'',
        district_id:'',
        upazila_id:'',
        union_id:'',
        bn_name:'',
        name:'',
        word:''
      }
    }
  },
  mounted () {
    
    this.getData()
  },

  methods: {
    async validateBeforeSubmit() {
      this.$validator.validateAll()
        .then((resp)=>{
          if (!resp){
            return
          }
          else if (resp){
            AreaService.villageStore(this.form).then(success=>{
              this.$swal({
                type: 'success',
                title: 'সফল ভাবে সংযোজন হয়েছে',
                showConfirmButton: false,
                timer: 1500
              })
              this.$router.push({ name: 'village' })
              this.form.name= ''
              this.form.bn_name= ''
              this.form.word= ''
              this.loadVillage();
              $('.close').click()
              
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
    async update(data) {
      this.$validator.validateAll()
        .then(resp=>{
          if (resp){
            AreaService.villageUpdate(data,data.id)
              .then(success=>{
                this.$swal({
                  type: 'success',
                  title: 'সফল ভাবে আপডেট হয়েছে।',
                  showConfirmButton: false,
                  timer: 1500
                })
                $('.close').click()
              })
              .catch(err=>{
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
          console.log('catch')
        })
    },
    async getData () {
      
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
       if(this.form.upazila_id!==''){
        const allData = await AreaService.unions(this.form.upazila_id)
        this.unions = allData.data
       }else{
         this.unions = []
       }
    },
    async loadVillage (){
       if(this.form.union_id!==''){
        const allData = await AreaService.villageLoad(this.form.union_id)
        this.village = allData.data
       }else{
         this.village = []
       }
       
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
                        <div class="card-title">গ্রাম সমূহ 
                            <div class="pull-right">
                              
                      <!-- Button trigger modal -->
                      <button v-if="form.union_id!==''" type="button" class="btn btn-xs btn-light waves-effect waves-light m-1" data-toggle="modal" data-target="#myModal">
                        <i class="fa fa-plus-circle"></i> নতুন সংযোজন
                      </button>

                      <!-- Modal -->
                      <div class="modal fade" id="myModal">
                        <div class="modal-dialog">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h5 class="modal-title"> নতুন গ্রাম সংযোজন </h5>
                              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>
                            <div class="modal-body">
                                <form  method="POST" @submit.prevent="validateBeforeSubmit">
                                  <div class="form-group">
                                    <label for="input-1">বাংলা নাম</label>
                                    <input type="text" class="form-control" v-model="form.bn_name" id="input-1" placeholder="বাংলা নাম">
                                  </div>
                                  <div class="form-group">
                                    <label for="input-2">ইংরেজি নাম</label>
                                    <input type="text" class="form-control" v-model="form.name" id="input-2" placeholder="ইংরেজি নাম">
                                  </div>
                                  <div class="form-group">
                                    <label for="input-3">ওয়ার্ড নাম্বার</label>
                                    <input type="number" class="form-control" v-model="form.word" id="input-3" placeholder="ওয়ার্ড">
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
                        </div>
                        <div class="row">
                           <div class="col-md-3">
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
                          <div class="col-md-3">
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
                          <div class="col-md-3">
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
                          <div class="col-md-3">
                              <div class="form-group">
                                  <label class="col-md-12"> ইউনিয়ন </label>
                                  <div class="col-md-12">
                                      <select class="form-control" v-model="form.union_id" @change="loadVillage()">
                                        <option value=""> -ইউনিয়ন নির্বাচন করুন- </option>
                                        <option v-for="(data,i) in unions" :key="i" :value="data.id"> {{data.bn_name}} </option>
                                      </select>
                                  </div>
                              </div>
                          </div>
                        </div>
                       <div class="table-responsive">
                         <table class="table table-striped" v-if="village.length>0">
                            <thead>
                                <tr>
                                <th scope="col">নাম</th>
                                <th scope="col">ইংরেজি নাম</th>
                                <th scope="col"> ওয়ার্ড</th>
                                <th scope="col">এডিট</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(data,index) in village" :key="index">
                                    <td>{{data.bn_name}}</td>
                                    <td>{{data.name}}</td>
                                    <td>{{data.word}}</td>
                                    <td> <!-- Button trigger modal -->
                      <button type="button" class="btn btn-xs btn-light waves-effect waves-light m-1" data-toggle="modal" :data-target="'#myModal'+data.id">
                        <i class="fa fa-edit"></i>
                      </button>

                      <!-- Modal -->
                      <div class="modal fade" :id="'myModal'+data.id">
                        <div class="modal-dialog">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h5 class="modal-title">গ্রাম আপডেট </h5>
                              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>
                            <div class="modal-body">
                                <form  method="POST" @submit.prevent="update(data)">
                                  <div class="form-group">
                                    <label for="input-1">বাংলা নাম</label>
                                    <input type="text" class="form-control" v-model="data.bn_name" id="input-1" placeholder="বাংলা নাম">
                                  </div>
                                  <div class="form-group">
                                    <label for="input-2">ইংরেজি নাম</label>
                                    <input type="text" class="form-control" v-model="data.name" id="input-2" placeholder="ইংরেজি নাম">
                                  </div>
                                  <div class="form-group">
                                    <label for="input-3"> ওয়ার্ড</label>
                                    <input type="number" class="form-control" v-model="data.word" id="input-3" placeholder="ওয়ার্ড">
                                  </div>
                                  
                                  <div class="form-group">
                                    <button type="submit" class="btn btn-light px-5"><i class="fa fa-save"></i> আপডেট </button>
                                    
                                  </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div> </td>
                                    <td> </td>
                                </tr>
                            </tbody>
                            </table>
                       </div>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
