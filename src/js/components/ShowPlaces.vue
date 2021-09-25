<template>
    <div>
        <div><router-link to="/">Go to list view</router-link></div>
        <h1>Show places</h1>
        <div>
            {{ $route.params.id }}
            {{ $route.params.daytime }}
            {{ $route.params.showdate }}
        </div>
        <div>
            <button :disabled="!seat.length" @click="bookPlace()" class="btn">Book a place</button>
            <template v-for="(row, key) in places">
                <div>
                    <div>{{ row[0].row }}</div>
                    <template v-for="(seatObj, seatKey) in row[1]">
                        <label>
                            <span>{{ seatObj.seat }} : {{ seatObj.is_free }}</span>
                            <input type="checkbox"
                                   :disabled="!seatObj.is_free"
                                   :id="'seat_' + row[0].row + '_' + seatObj.seat"
                                   :value="'seat_' + row[0].row + '_' + seatObj.seat"
                                   v-model="seat"/>
                            <span class="checkmark"></span>
                        </label>
                    </template>
                    <!--<label>
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
                    </div>-->
                </div>
            </template>
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
                seat: []
            }
        },
        methods: {
            checkForFreePlaces: function () {
                let self = this;

                axios.get('https://cinema-api-test.y-media.io/v1/showPlaces?movie_id=' + self.movieId + '&daytime=' + self.selectedDaytime + '&showdate=' + self.selectedSessionn)
                    .then(response => {
                        let data = response.data;

                        self.places = data.data;
                    })
                    .catch(e => {
                        alert('Something went wrong: Sessions: getMovieSessions');
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
                        alert('Something went wrong: bookPlace');
                        console.log(e);
                    });
            },

        },
        mounted() {
            this.checkForFreePlaces();
        },
        created() {

        },
        computed: {
            bookPlaceData: function () {
                let data = [];

                for (var i = 0; i < this.seat.length; i++) {
                    let seatArr = this.seat[i].split("_");
                    console.log(seatArr);
                    data.push({
                        movie_id: +this.$route.params.id,
                        row: +seatArr[1],
                        seat: +seatArr[2],
                        showdate: this.$route.params.showdate,
                        daytime: this.$route.params.daytime
                    });


                }

                return data;
            }
        },
        watch: {

        }
    }
</script>
