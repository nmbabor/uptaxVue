import Api from '@/services/Api'

export default {

    smsHolding(id) {
        return Api().get('sms/holdings/' + id)
    },

}