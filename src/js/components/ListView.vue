<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <h1>List view</h1>
                <button @click="getMovie()">Get movie</button>
                <button @click="getMovieSessions()">Get movie sessions</button>
            </div>
        </div>
        <template v-for="movie in movies">
            <div class="row">
                <div class="col-12 col-md-4"><img :src="movie.image" /></div>
                <div class="col-12 col-md-8">
                    <router-link :to="'/movie/' + movie.id">{{ movie.name }}</router-link>
                    <router-link :to="'/movie/' + movie.id" class="btn">Read more</router-link>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        props: [],
        data() {
            return {
                movies: [],
                loadingComplete: false
            }
        },
        methods: {
            getMovies: function () {
                let self = this;

                axios.get('https://cinema-api-test.y-media.io/v1/movies')
                    .then(response => {
                        let data = response.data;

                        self.movies = data.data;
                        this.$store.commit('updateMovies', data.data);

                    })
                    .catch(e => {
                        alert('Something went wrong: getMovies');
                    });
            },
            getMovie: () => {
                let name = 'Битва';
                //axios.get('https://cinema-api-test.y-media.io/v1/movies?movie_id=54')
                axios.get('https://cinema-api-test.y-media.io/v1/movies?name=' + name)
                    .then(response => {
                        let data = response.data;

                        console.log('movie', data.data );
                    })
                    .catch(e => {
                        alert('Something went wrong: getMovie');
                    });
            },
            getMovieSessions: () => {
                axios.get('https://cinema-api-test.y-media.io/v1/movieShows?movie_id=54')
                    .then(response => {
                        let data = response.data;

                        console.log('movie', data.data );
                    })
                    .catch(e => {
                        alert('Something went wrong: getMovie');
                    });
            }
        },
        mounted() {

        },
        created() {
            let storedMovies = this.$store.state.movies;
            console.log('STORED MOVIES', storedMovies);

            if (!storedMovies.length) {
                console.log('GET MOVIES');
                this.getMovies();
            } else {
                console.log('GET STORED MOVIES');
                this.movies = storedMovies;
            }
        },
        watch: {

        }
    }
</script>
