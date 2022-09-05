import Api from '@/services/Api'

export default {
    holding(form) {
        return Api().get('report/holdings', { params: form })
    },
    allHoldings(form) {
        return Api().get('report/all-holdings', { params: form })
    },
    singleHolding(form) {
        return Api().get('report/single-holding', { params: form })
    },
    dueTax(form) {
        return Api().get('report/due-tax', { params: form })
    },
    dailyTax(form) {
        return Api().get('report/daily-tax', { params: form })
    },
    prevTaxCollection(form) {
        return Api().get('report/prev-tax-collection', { params: form })
    },
    currentTaxCollection(form) {
        return Api().get('report/current-tax-collection', { params: form })
    },
    unions() {
        return Api().get('holding/unions')
    },
    years() {
        return Api().get('years')
    },
}