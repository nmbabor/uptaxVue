<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header card-info">
            <div class="card-btn pull-right">
              <router-link tag="a" to="/holdings/create" class="btn btn-xs btn-light waves-effect waves-light m-1"><i class="fa fa-plus-circle"></i> নতুন সংযোজন </router-link>
            </div>
            <h4 class="card-title"> সকল হোল্ডিংস</h4>
          </div>
          <div class="card-body table-responsive">
            <div class="row">
              <div class="col-md-4">
                <label> <input type="radio" @change="getData()" value="0" name="type" v-model="type"> সকল </label>
                <label> <input type="radio" @change="getData()" value="1" name="type" v-model="type"> আবাসিক </label>
                <label> <input type="radio" @change="getData()" value="2" name="type" v-model="type"> বানিজ্যিক </label>
              </div>
            </div>
            <div class="rows">
              <div class="col-sm-4 pull-right">
              <v-text-field
                v-model="search"
                append-icon="search"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </div>
            <v-data-table
              :headers="headers"
              :items="allData"
              sort-field="amount" sort-desc="true"
              :search="search"
              :pagination.sync="pagination"
              class="elevation-1"
            >
              <template slot="items" slot-scope="props">
                <td> {{props.item.holding_no}} </td>
                <td> {{props.item.owner_name}} </td>
                <td> {{props.item.mobile}} </td>
                <td><span v-if="props.item.type==1">আবাসিক </span> <span v-else=""> বানিজ্যিক </span> </td>
                <td> {{props.item.union.bn_name}} </td>
                <td> {{props.item.word}} </td>
                <td> {{props.item.village.bn_name}} </td>
                <td width="12%">
                   <router-link class="btn btn-action btn-edit btn-xs btn-info" v-bind:to="{ name: 'editHolding', params: { id: props.item.id } }"> <i class="fa fa-edit"></i></router-link> <button class="btn btn-action btn-xs btn-danger" @click="deleteData(props.item.id)"><i class="fa fa-trash"></i></button>
                </td>
              </template>
              <v-alert slot="no-results" :value="true" color="error" icon="warning">
                আপনার সার্চ "{{ search }}" পাওয়া যায় না
              </v-alert>
            </v-data-table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import HoldingsService from '@/services/HoldingsService'
export default {
  name: 'Hondings',
  data () {
    return {
      allData: [],
      type:0,
      search: '',
      pagination: {},
      headers: [
        {
          text: 'হোল্ডিং নাম্বার',
          align: 'left',
          value: 'holding_no',sortable: false
        },
        { text: 'মালিক', value: 'owner_name' ,sortable: false},
        { text: 'মোবাইল নাম্বার', value: 'mobile',sortable: false },
        { text: 'ধরণ', value: 'type',sortable: false },
        { text: 'ইউনিয়ন', value: 'union.bn_name',sortable: false },
        { text: 'ওয়ার্ড নাম্বার', value: 'word',sortable: false },
        { text: 'গ্রাম', value: 'village.bn_name',sortable: false },
        { text: 'একশন', value: 'id',sortable: false },
      ],
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    async getData () {
      const response = await HoldingsService.index(this.type)
      this.allData = response.data
    },
    async deleteData (id) {
      const $this = this
      $this.$swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(function (result) {
        if (result.value) {
          HoldingsService.delete(id)
          $this.getData()
        }
      })
    }
  }
}
</script>
<style>
  .btn-action.btn-edit i{font-size: 8px;}
  .btn-action i{font-size: 9px;}
  .btn-action.btn-xs{float: left;font-size: 9px;margin: 1px;}
</style>
