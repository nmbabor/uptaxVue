import Api from '@/services/Api'

export default {
    index(form) {
        return Api().get('holdings', { params: form })
    },
    unions() {
        return Api().get('holding/unions')
    },
    taxGenerate(params) {
        return Api().get('holdings/create', { params })
    },
    store(params) {
        return Api().post('holdings', params)
    },

    update(params, id) {
        return Api().put('holdings/' + id, params)
    },

    show(id,params=null) {
        return Api().get('holdings/' + id, { params })
    },
    delete(id) {
        return Api().delete('holdings/' + id)
    },
}