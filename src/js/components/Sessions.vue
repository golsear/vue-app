<template>
    <div class="sessions">
        <div class="form-inline mb-2">
            <button @click="getMovieSessions(movieId)" class="btn btn-info mb-3 mr-3">Sessions</button>
            <router-link class="btn btn-info mb-3" v-if="selectedSessionn && selectedDaytime" :to="'/showPlaces/' + movieId + '/' + selectedDaytime + '/' + selectedSessionn">Check for free places</router-link>
        </div>


        <div v-if="sessions">
            <template v-for="(session, key) in sessions">
                <div class="mt-2">
                    <label class="app-radio">
                        <span class="app-radio__label">{{ session.showdate | formatDate}}</span>
                        <input type="radio" name="session" :value="session.showdate"
                               v-model="selectedSessionn"/>
                        <span class="app-radio__checkmark"></span>
                    </label>
                    <div class="form-inline" v-if="session.showdate == selectedSessionn">
                        <template v-for="(daytime) in daytimeStrToArr(session.daytime)">
                            <label class="app-radio mr-3 mb-3">
                                <span class="app-radio__label">{{ daytime }}</span>
                                <input type="radio" :name="'selectedDaytime' + key" :value="daytime"
                                       v-model="selectedDaytimeArr[key]"/>
                                <span class="app-radio__checkmark"></span>
                            </label>
                        </template>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        props: {
            movieId: {
                type: Number,
                required: true
            }
        },
        data() {
            return {
                sessions: [],
                selectedSessionn: '',
                selectedSessionnIndex: null,
                selectedDaytimeArr: []
            }
        },
        methods: {
            getMovieSessions: function (id) {
                let self = this;

                axios.get('https://cinema-api-test.y-media.io/v1/movieShows?movie_id=' + id)
                    .then(response => {
                        let data = response.data;

                        self.sessions = data.data[id];
                    })
                    .catch(e => {
                        alert('Something went wrong: Sessions: getMovieSessions');
                    });
            },
            findIndexByProperty(data, key, value) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i][key] == value) {
                        return i;
                    }
                }
                return -1;
            },
            daytimeStrToArr: function (str) {
                let arr = str.split(";");
                return arr;
            },
            clearSelectedDaytime: function () {
                for (var i=0; i < this.sessions.length; i++) {
                    if (this.sessions[i]['showdate'] !== this.selectedSessionn) {
                        this.selectedDaytimeArr[i] = false;
                    } else {
                        this.selectedSessionnIndex = i;
                    }
                }
            }
        },
        mounted() {

        },
        created() {

        },
        computed: {
            selectedDaytime: function () {
                return this.selectedDaytimeArr[this.selectedSessionnIndex];
            }
        },
        watch: {
            selectedSessionn: function () {
                this.clearSelectedDaytime();
            }
        }
    }
</script>
