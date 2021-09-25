<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <h1>List view</h1>
            </div>
        </div>
        <div class="filters">
            {{ genre }}
            <select v-model="genre">
                <option value="">Please select genre</option>
                <option v-for="option in genreOptions" :value="option.value">
                    {{ option.text }}
                </option>
            </select>
            <input v-model="name" placeholder="Name" />
            <button class="btn" @click="searchMovies()">Search</button>
        </div>
        <template v-for="movie in movies">
            <div class="row">
                <div class="col-12 col-md-4"><img :src="movie.image" /></div>
                <div class="col-12 col-md-8">
                    <div>
                        <router-link :to="'/movie/' + movie.id">{{ movie.name }}</router-link>
                    </div>
                    <div v-html="movie.description"></div>
                    <div>
                        <router-link :to="'/movie/' + movie.id" class="btn">Read more</router-link>
                    </div>
                    <sessions :movie-id="movie.id"></sessions>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        data() {
            return {
                movies: [],
                name: '',
                genre: '',
                genreOptions: [
                    { text: 'ACTION', value: '0' },
                    { text: 'ADVENTURES', value: '1' },
                    { text: 'COMEDY', value: '2' },
                    { text: 'DRAMA', value: '3' },
                    { text: 'HORROR', value: '4' },
                    { text: 'WESTERNS', value: '5' }
                ]
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
                        alert('Something went wrong: ListView : getMovies');
                    });
            },
            searchMovies: function () {
                let self = this,
                params = '?';
                if (self.name) {
                    params += 'name=' + self.name + '&';
                }

                if (self.genre) {
                    params += 'genres=' + self.genre;
                    console.log('genre', self.genre);
                }

                console.log(params);

                axios.get('https://cinema-api-test.y-media.io/v1/movies' + params)
               //axios.get('https://cinema-api-test.y-media.io/v1/movies?genres=comedy')
                    .then(response => {
                        let data = response.data;

                        self.movies = data.data;
                        this.$store.commit('updateMovies', data.data);
                    })
                    .catch(e => {
                        alert('Something went wrong: ListView : getMovies');
                    });
            }
        },
        mounted() {

        },
        created() {
            this.getMovies();
        },
        watch: {

        }
    }
</script>
