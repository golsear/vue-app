<template>
    <div class="container show-places">
        <div class="row">
            <div class="col-12">
                <h1 class="my-3">Show places</h1>
                <div class="form-inline mb-2">
                    <router-link class="btn btn-primary btn-smk mr-3 mb-3" to="/">Go to list view</router-link>
                    <router-link class="btn btn-primary btn-smk mr-3 mb-3" :to="'/movie/' + $route.params.id">Go to movie</router-link>
                </div>
            </div>
        </div>
        <div class="row movie mb-5">
            <div class="col-12 col-md-4">
                <img class="movie__image d-block mb-3 mb-md-0" :src="movie.image" />
            </div>
            <div class="col-12 col-md-8">
                <h2 class="d-inline-block mb-3">{{ movie.name }}</h2>
                <div v-html="movie.description" class="mb-3"></div>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <div>Day: {{ $route.params.showdate | formatDate}}</div>
                <div>Time: {{ $route.params.daytime }}</div>
                <div>Seat: {{ seats }}</div>
                <button :disabled="!seat.length" @click="bookPlace()" class="btn btn-primary my-3">Book a place</button>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <template v-for="(row, key) in places">
                    <div class="text-center mb-3">
                        <div class="mb-3">Row: {{ row[0].row }}</div>
                        <template v-for="(seatObj, seatKey) in row[1]">
                            <label class="app-radio mr-3 mb-3">
                                <span class="app-radio__label">{{ seatObj.seat }}</span>
                                <input type="checkbox"
                                       :disabled="!seatObj.is_free"
                                       :id="'seat_' + row[0].row + '_' + seatObj.seat"
                                       :value="'seat_' + row[0].row + '_' + seatObj.seat"
                                       v-model="seat"/>
                                <span class="app-radio__checkmark"></span>
                            </label>
                        </template>
                    </div>
                </template>
                <button :disabled="!seat.length" @click="bookPlace()" class="btn btn-primary mb-5">Book a place</button>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        props: {

        },
        data() {
            return {
                places: [],
                seat: [],
                movie: {},
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
                        alert('Something went wrong: ShowPlaces : getMovieById');
                    });
            },
            checkForFreePlaces: function () {
                let self = this;

                axios.get('https://cinema-api-test.y-media.io/v1/showPlaces?movie_id=' + self.movieId + '&daytime=' + self.selectedDaytime + '&showdate=' + self.selectedSessionn)
                    .then(response => {
                        let data = response.data;

                        self.places = data.data;
                    })
                    .catch(e => {
                        alert('Something went wrong: ShowPlaces: checkForFreePlaces');
                    });
            },
            bookPlace: function () {
                let data = this.bookPlaceData,
                    self = this;

                /*data = {
                    movie_id: 61,
                    row: 9,
                    seat: 8,
                    showdate: "2021-06-27",
                    daytime: "10:50"
                };*/


                //axios.get('https://cinema-api-test.y-media.io/v1/bookPlace?movie_id=' + self.$route.params.id + '&daytime=' + self.$route.params.daytime + '&showdate=' + self.$route.params.showdate)
                //axios.get('https://cinema-api-test.y-media.io/v1/bookPlace?movie_id=61&daytime=10:50&showdate=2021-06-27')
                axios.post('http://cinema-api-test.y-media.io/v1/bookPlace', data[0])
                    .then(response => {
                        console.log(response);
                    })
                    .catch(e => {
                        alert('Something went wrong: ShowPlaces : bookPlace');
                        console.log(e);
                    });
            },

        },
        mounted() {
            let id = this.$route.params.id;

            this.checkForFreePlaces();
            this.getMovieById(id);
        },
        created() {

        },
        computed: {
            bookPlaceData: function () {
                let data = [];

                for (var i = 0; i < this.seat.length; i++) {
                    let seatArr = this.seat[i].split("_");

                    data.push({
                        movie_id: +this.$route.params.id,
                        row: +seatArr[1],
                        seat: +seatArr[2],
                        showdate: this.$route.params.showdate,
                        daytime: this.$route.params.daytime
                    });
                }

                return data;
            },
            seats: function () {
                let seats = '';

                for (var i = 0; i < this.seat.length; i++) {
                    let seatArr = this.seat[i].split("_");

                    if ( i > 0 ) {
                        seats += ', ';
                    }

                    seats += 'Row ' + seatArr[1] + ' Seat ' + seatArr[2];
                }

                return seats;
            }
        },
        watch: {

        }
    }
</script>
