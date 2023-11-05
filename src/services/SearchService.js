import Api from '@/services/Api'

export default {

    search(form) {
        return Api().get('search', { params: form })
    },
    searchTradeLicence(form) {
        return Api().get('search-trade-licence', { params: form })
    },

}