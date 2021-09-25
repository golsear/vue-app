<template>
    <div>
        <button @click="getMovieSessions(movieId)" class="btn">Sessions</button>
        <router-link v-if="selectedSessionn && selectedDaytime" :to="'/showPlaces/' + movieId + '/' + selectedDaytime + '/' + selectedSessionn">Check for free places</router-link>

        <div v-if="sessions">
            <template v-for="(session, key) in sessions">
                <div>
                    <label>
                        <span>{{ session.showdate | formatDate}}</span>
                        <input type="radio" name="session" :value="session.showdate"
                               v-model="selectedSessionn"/>
                        <span class="checkmark"></span>
                    </label>
                    <div v-if="session.showdate == selectedSessionn">
                        <template v-for="(daytime) in daytimeStrToArr(session.daytime)">
                            <label>
                                <span>{{ daytime }}</span>
                                <input type="radio" :name="'selectedDaytime' + key" :value="daytime"
                                       v-model="selectedDaytimeArr[key]"/>
                                <span class="checkmark"></span>
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
