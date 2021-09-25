import "../scss/index.scss";
import "bootstrap";
import moment from 'moment';

import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import ListView from './components/ListView.vue';
import DetailView from './components/DetailView.vue';
import Sessions from './components/Sessions.vue';
import ShowPlaces from './components/ShowPlaces.vue';

Vue.use(VueRouter);
Vue.use(Vuex);

Vue.component('list-view', ListView);
Vue.component('detail-view', DetailView);
Vue.component('sessions', Sessions);
Vue.component('show-places', ShowPlaces);

Vue.filter('formatDate', function (value) {
    if (value) {
        return moment(String(value)).format('DD.MM.YYYY');
    }
});


// Register globals.
// - TODO: register through the 'webpack.ProvidePlugin'.
window.Vue = Vue;


const routes = [
    { path: '/', component: ListView },
    { path: '/movie/:id', component: DetailView },
    { path: '/showPlaces/:id/:daytime/:showdate', component: ShowPlaces }

];

const store = new Vuex.Store({
    state: {
        movies: []
    },
    mutations: {
        updateMovies (state, movies) {
            state.movies = movies;
        }
    }
});

const router = new VueRouter({
    routes
});

const app = new Vue({
    router,
    store: store
}).$mount('#app');