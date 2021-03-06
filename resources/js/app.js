/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue').default;

/**
 * Bootstrap Vue
 */
import {
    BootstrapVue, BIcon, BIconBoxArrowRight, BIconPerson, BIconEnvelope, BIconReceipt, BIconBarChart, BIconList
} from 'bootstrap-vue';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(BootstrapVue);
Vue.component('BIcon', BIcon);
Vue.component('BIconBoxArrowRight', BIconBoxArrowRight);
Vue.component('BIconPerson', BIconPerson);
Vue.component('BIconEnvelope', BIconEnvelope);
Vue.component('BIconReceipt', BIconReceipt);
Vue.component('BIconBarChart', BIconBarChart);
Vue.component('BIconList', BIconList);

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component('invitation-list', require('./components/InvitationList').default);
Vue.component('delete-account-form', require('./components/DeleteAccountForm').default);
Vue.component('account-update-password-form', require('./components/AccountUpdatePasswordForm').default);
Vue.component('account-update-email-form', require('./components/AccountUpdateEmailForm').default);
Vue.component('receipt-list', require('./components/ReceiptList').default);
Vue.component('notification-list', require('./components/NotificationList').default);
Vue.component('notification-icon', require('./components/NotificationIcon').default);
Vue.component('loading-submit-button', require('./components/LoadingSubmitButton').default);
Vue.component('loading-link', require('./components/LoadingLink').default);
Vue.component('doughnut-chart', require('./components/DoughnutChart').default);
Vue.component('dashboard', require('./components/Dashboard').default);
Vue.component('store-image', require('./components/StoreImage').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    data() {
        return {
            newNotification: null,
            visibleNotificationSidebar: false,
            loadingNav: false,
            loadingContent: false
        }
    },
    methods: {
        notificationSidebarShown() {
            this.newNotification = false;
            this.visibleNotificationSidebar = true;
        },
        notificationSidebarHidden() {
            this.visibleNotificationSidebar = false;
        },
        clickNavItem(href) {
            this.loadingNav = true;
            setTimeout(function(){document.location.href = href;},50);
        },
        handleContentLoading(value) {
            this.loadingContent = value;
        },
        logoutNav() {
            this.loadingNav = true;
            setTimeout(function(){
                document.getElementById('logout-form').submit();
            },250);
        }
    }
});
