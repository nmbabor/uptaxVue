import Api from '@/services/Api'

export default {
    index(form) {
        return Api().get('trade-licence', { params: form })
    },
    
    taxGenerate(params) {
        return Api().get('trade-licence/create', { params })
    },
    store(params) {
        return Api().post('trade-licence', params)
    },

    update(params, id) {
        return Api().put('trade-licence/' + id, params)
    },

    show(id,params=null) {
        return Api().get('trade-licence/' + id, { params })
    },
    delete(id) {
        return Api().delete('trade-licence/' + id)
    },
    unions() {
        return Api().get('holding/unions')
    },
}