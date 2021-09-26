<template>
    <div class="container detail-view">
        <div class="row">
            <div class="col-12">
                <h1 class="my-3">{{ movie.name }}</h1>
                <router-link class="btn btn-primary btn-smk mb-5" to="/">Go to list view</router-link>
            </div>
        </div>
        <div class="row movie mb-5">
            <div class="col-12 col-md-4">
                <img class="movie__image d-block mb-3 mb-md-0" :src="movie.image" />
            </div>
            <div class="col-12 col-md-8">
                <div v-html="movie.description" class="mb-3"></div>
                <sessions v-if="movie.id" :movie-id="movie.id"></sessions>
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
                movieId: null
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
                        alert('Something went wrong: DetailView : getMovieById');
                    });
            }
         },
        mounted() {
            let id = this.$route.params.id;
            this.getMovieById(id);
        },
        created() {

        },
        watch: {

        }
    }
</script>
