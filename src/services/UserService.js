import Api from '@/services/Api'

export default {
    index() {
        return Api().get('users')
    },
    roles() {
        return Api().get('users/roles')
    },
    store(params) {
        return Api().post('users', params)
    },

    update(params, id) {
        return Api().put('users/' + id, params)
    },

    show(id) {
        return Api().get('users/' + id)
    },
    delete(id) {
        return Api().delete('users/' + id)
    },
    login(params) {
        return Api().post('login', params)
    },
    passChange(params) {
        return Api().post('users/password', params)
    },
    profile() {
        return Api().get('user')
    },
}