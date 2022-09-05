import Api from '@/services/Api'

export default {
    index(form) {
        return Api().get('union-top-sheet', { params: form })
    },
    years() {
        return Api().get('years')
    },
}