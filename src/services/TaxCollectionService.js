import Api from '@/services/Api'

export default {
    index(form) {
        return Api().get('tax-collection', { params: form })
    },
    store(params) {
        return Api().post('tax-collection', params)
    },

    update(params, id) {
        return Api().put('tax-collection/' + id, params)
    },

    show(id,form) {
        return Api().get('tax-collection/' + id, { params: form })
    },
    delete(id,year) {
        return Api().delete('tax-collection/' + id, { params: {year} })
    },
    holding(form) {
        return Api().get('tax-collection/create', { params: form })
    },
    singleHolding(id,form) {
        return Api().get('tax/single-holding/' + id, { params: form })
    },
    unions() {
        return Api().get('holding/unions')
    },
    years() {
        return Api().get('years')
    },
    
}