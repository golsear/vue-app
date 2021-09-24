<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <router-link to="/">Go to list view</router-link>
                <h1>{{ movie.name }}</h1>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <div><img :src="movie.image" /></div>
                <div>{{ movie.description }}</div>
                <div v-html="movie.additional"></div>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <button @click="getMovieSessions()">Sessions</button>
            </div>
            <div v-if="sessions">
                <template v-for="(session, key) in sessions">{{ key }}
                    <div>
                        <label>
                            <span>{{ session.showdate | formatDate}}</span>
                            <input type="radio" name="session" :value="session.showdate"
                                   v-model="selectedSessionn"/>
                            <span class="checkmark"></span>
                        </label>
                        <div>
                            <template v-for="(daytime) in daytimeStrToArr(session.daytime)">
                                <label>
                                    <span>{{ daytime }}</span>
                                    <input type="radio" :name="'selectedDaytime' + key" :value="daytime"
                                           v-model="selectedDaytime[key]"/>
                                    <span class="checkmark"></span>
                                </label>
                            </template>
                        </div>
                    </div>

                </template>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        props: [],
        data() {
            return {
                movie: {},
                sessions: [],
                selectedSessionn: '',
                selectedDaytime: []
            }
        },
        methods: {
            getMovieById: function (id) {
                let self = this;

                axios.get('https://cinema-api-test.y-media.io/v1/movies?movie_id=' + id)
                    .then(response => {
                        let data = response.data;

                        self.movie = data.data[0];
                    })
                    .catch(e => {
                        alert('Something went wrong: getMovieById');
                    });
            },
            getMovieSessions: function () {
                let self = this;

                axios.get('https://cinema-api-test.y-media.io/v1/movieShows?movie_id=' + self.movie.id)
                    .then(response => {
                        let data = response.data;

                        self.sessions = data.data[self.movie.id];
                        console.log(self.sessions);
                    })
                    .catch(e => {
                        alert('Something went wrong: getMovieSessions');
                    });
            },
            daytimeStrToArr: function (str) {
                let arr = str.split(";");
                return arr;
            },
            clearSelectedDaytime: function () {
                let selectedIndex = null;
                for (var i=0; i < this.sessions.length; i++) {
                    if (this.sessions[i]['showdate'] !== this.selectedSessionn) {
                        console.log(i);
                        selectedIndex = i;
                        this.selectedDaytime[i] = false;
                    }
                }

                console.log('selected', this.selectedSessionn, this.selectedDaytime[selectedIndex]);
            }
         },
        mounted() {

        },
        created() {
            let id = this.$route.params.id;
            this.getMovieById(id);
        },
        watch: {
            selectedSessionn: function (val) {
                this.clearSelectedDaytime();
            },
            selectedDaytime: function (val) {
                console.log(val);
            }
        }
    }
</script>
