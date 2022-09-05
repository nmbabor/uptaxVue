<script>
import UserService from '@/services/UserService'
export default {
  name: 'Users',
  data () {
    return {
      users: []
    }
  },
  mounted () {

    this.getData()
  },

  methods: {

    async getData () {
      const response = await UserService.index()
      this.users = response.data
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
                        <div class="card-title">Users
                            <div class="pull-right">

                      <router-link tag="a" to="/users/create" class="btn btn-xs btn-light waves-effect waves-light m-1"><i class="fa fa-plus-circle"></i> নতুন সংযোজন </router-link>
                    </div>
                        </div>
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Mobile</th>
                                <th scope="col">Password</th>
                                <th scope="col">Status</th>
                                <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(data,index) in users" :key="index">
                                    <td>{{index+1}}</td>
                                    <td>{{data.name}}</td>
                                    <td>{{data.email}}</td>
                                    <td>{{data.mobile}}</td>
                                    <td><router-link class="btn btn-warning btn-xs" v-bind:to="{ name: 'user-password', params: { id: data.id } }"> Password </router-link></td>
                                    <td><i v-if="data.status==1" class="fa fa-check-circle text-success"></i>
                                    <i class="fa fa-times-circle-o text-danger"  v-else></i></td>
                                    <td> <router-link class="btn btn-xs btn-light waves-effect waves-light m-1" v-bind:to="{ name: 'editUser', params: { id: data.id } }"> <i class="fa fa-edit"></i></router-link> </td>
                                    <td> </td>
                                </tr>
                            </tbody>
                            </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
