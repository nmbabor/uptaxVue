import Api from '@/services/Api'

export default {
    unionStore(params) {
        return Api().post('unions', params)
    },
    update(params, id) {
        return Api().put('unions/' + id, params)
    },
    villageStore(params) {
        return Api().post('village', params)
    },
    villageUpdate(params, id) {
        return Api().put('village/' + id, params)
    },
    divisions() {
        return Api().get('area/divisions')
    },
    districts(id) {
        return Api().get('area/districts/'+id)
    },
    upazila(id) {
        return Api().get('area/upazila/'+id)
    },
    unions(id) {
        return Api().get('area/unions/'+id)
    },
    village(id) {
        return Api().get('area/village/'+id)
    },
    villageLoad(id) {
        return Api().get('village?id='+id)
    },
}