import Api from '@/services/Api'

export default {
    profile() {
        return Api().get('user')
    },
}