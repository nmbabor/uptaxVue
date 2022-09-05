import Api from '@/services/Api'

export default {
    index() {
        return Api().get('union-bill-details')
    },
    unions() {
        return Api().get('holding/unions')
    },
    store(params) {
        return Api().post('union-bill-details', params)
    },

    update(params, id) {
        return Api().put('union-bill-details/' + id, params)
    },

    show(id) {
        return Api().get('union-bill-details/' + id)
    },
    delete(id) {
        return Api().delete('union-bill-details/' + id)
    },
}