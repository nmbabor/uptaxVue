import Api from '@/services/Api'

export default {
    registers(form) {
        return Api().get('tl-report/registers', { params: form })
    },

    singleLicence(form) {
        return Api().get('tl-report/single-licence', { params: form })
    },
    licenceVerify(form) {
        return Api().get('trade-licence-verify', { params: form })
    },

    
    allHoldings(form) {
        return Api().get('report/all-holdings', { params: form })
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
    holdingType() {
        return Api().get('holding-types')
    },
}