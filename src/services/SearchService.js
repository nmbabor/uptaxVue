import Api from '@/services/Api'

export default {

    search(form) {
        return Api().get('search', { params: form })
    },

}