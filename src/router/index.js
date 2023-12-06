import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const baseRoutes = [
    { path: '/', name: 'Dashboard', meta: { layout: 'main', parent: 'Dashboard' }, component: require('@/components/Dashboard').default },
    { path: '/unions', name: 'unions', meta: { parent: 'Unions' }, component: require('@/components/primaryInfo/unions/Index').default },
    { path: '/village', name: 'village', meta: { parent: 'Village' }, component: require('@/components/primaryInfo/village/Index').default },
    { path: '/bazar', name: 'bazar', meta: { parent: 'Bazar' }, component: require('@/components/primaryInfo/bazar/index').default },
    { path: '/holdings/create', name: 'createHolding', meta: { parent: 'Holding' }, component: require('@/components/modules/holding/Create').default },
    { path: '/tax-generate', name: 'taxGenerate', meta: { parent: 'Holding' }, component: require('@/components/modules/holding/Generate').default },
    { path: '/holdings', name: 'holding', meta: { parent: 'Holding' }, component: require('@/components/modules/holding/allHolding').default },
    { path: '/holdings/:id/edit', name: 'editHolding', meta: { parent: 'Holding' }, component: require('@/components/modules/holding/Edit').default },
    { path: '/union-bill-details', name: 'createUnionBill', meta: { parent: 'Union Bill Details' }, component: require('@/components/modules/unionBillDetails/Create').default },
    { path: '/tax-collection/create', name: 'taxCreate', meta: { parent: 'Tax Collection' }, component: require('@/components/modules/tax/Create').default },
    { path: '/tax-collection', name: 'taxCollection', meta: { parent: 'Tax Collection' }, component: require('@/components/modules/tax/Index').default },
    { path: '/tax-collection/:id', name: 'taxCollectionView', meta: { parent: 'Tax Collection' }, component: require('@/components/modules/tax/View').default },

    { path: '/report/holding-registers', name: 'holdingSearch', meta: { parent: 'Holdings Search' }, component: require('@/components/modules/reports/holdingRegisters').default },
    { path: '/report/due-tax', name: 'dueTax', meta: { parent: 'Due Tax' }, component: require('@/components/modules/reports/dueTax').default },
    { path: '/bill-report-list', name: 'billReportList', meta: { parent: 'Bill Reports List' }, component: require('@/components/modules/reports/billReportList').default },
    { path: '/bill-report', name: 'billReports', meta: { parent: 'Bill Reports' }, component: require('@/components/modules/reports/billReports').default },
    { path: '/personal-details', name: 'personalDetails', meta: { parent: 'ব্যক্তিগত প্রতিবেদন' }, component: require('@/components/modules/reports/personalDetails').default },
    { path: '/report/daily-tax', name: 'dailyTax', meta: { parent: 'Daily Tax' }, component: require('@/components/modules/reports/dailyCollection').default },
    { path: '/report/due-tax-collection', name: 'DueCollction', meta: { parent: 'Due Tax Collection' }, component: require('@/components/modules/reports/taxCollection/dueCollection').default },

    { path: '/report/current-tax-collection', name: 'CurrentCollction', meta: { parent: 'Current Tax Collection' }, component: require('@/components/modules/reports/taxCollection/currentCollection').default },
    { path: '/union-top-sheet', name: 'UnionTopSheet', meta: { parent: 'Reports' }, component: require('@/components/modules/topsheet/UnionTopSheet').default },

    { path: '/users', name: 'users', meta: { parent: 'Users' }, component: require('@/components/primaryInfo/users/Index').default },
    { path: '/users/create', name: 'user-create', meta: { parent: 'Users' }, component: require('@/components/primaryInfo/users/Create').default },
    { path: '/users/:id/password', name: 'user-password', meta: { parent: 'Users' }, component: require('@/components/primaryInfo/users/Password').default },
    { path: '/users/:id/edit', name: 'editUser', meta: { parent: 'Settings', submenu: 'true', breadcrumb: 'Edit User' }, component: require('@/components/primaryInfo/users/Edit').default },
    { path: '/login', name: 'login', meta: { layout: 'login' }, component: require('@/components/Login').default },
    { path: '/coming', name: 'coming', meta: { layout: 'main' }, component: require('@/components/coming').default },
    { path: '/search', name: 'search', meta: { parent: 'Search' }, component: require('@/components/search').default },

    { path: '/sms/holdings', name: 'smsHolding', meta: { parent: 'Holdings Search' }, component: require('@/components/modules/sms/holdings').default },

    { path: '/trade-licence/create', name: 'createTradeLicence', meta: { parent: 'TradeLicence' }, component: require('@/components/modules/tradeLicence/Create').default },
    { path: '/trade-licence-fee-generate', name: 'feeGenerateTradeLicence', meta: { parent: 'TradeLicence' }, component: require('@/components/modules/tradeLicence/Generate').default },
    { path: '/trade-licence', name: 'tradeLicence', meta: { parent: 'TradeLicence' }, component: require('@/components/modules/tradeLicence/allLicence').default },
    { path: '/trade-licence/:id/edit', name: 'editTradeLicence', meta: { parent: 'TradeLicence' }, component: require('@/components/modules/tradeLicence/Edit').default },
    //Trade licence Reports
    { path: '/tl-report/register', name: 'TradeLicenceRegister', meta: { parent: 'TradeLicence' }, component: require('@/components/modules/tradeLicence/reports/registers').default },
    { path: '/trade-licence-print', name: 'tradeLicencePrint', meta: { parent: 'TradeLicence' }, component: require('@/components/modules/tradeLicence/reports/licencePrint').default },
    { path: '/trade-licence-details', name: 'tradeLicenceDetails', meta: { layout: 'login' }, component: require('@/components/modules/tradeLicence/reports/tradeLicenceDetails').default },

    // Trade license tax collection
    { path: '/license-tax-collection/create', name: 'licenseTaxCreate', meta: { parent: 'Tax Collection' }, component: require('@/components/modules/tradeLicence/collection/Create').default },
    { path: '/license-tax-collections', name: 'licenseTaxCollection', meta: { parent: 'Tax Collection' }, component: require('@/components/modules/tradeLicence/collection/Index').default },
    { path: '/license-tax-collection/:id', name: 'licenseTaxCollectionView', meta: { parent: 'Tax Collection' }, component: require('@/components/modules/tradeLicence/collection/View').default },

]
const routes = baseRoutes
const router = new Router({
    mode: 'history',
    routes
})
router.beforeEach((to, from, next) => {
    if (localStorage.getItem('token') !== null || to.path === '/login' || to.path === '/trade-licence-details') {
        next()
    } else {
        next('/login')
    }
})

export default router