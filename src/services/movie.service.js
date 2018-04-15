'use strict';

export class MovieService {

    getTrends() {
        return fetch('http://api.themoviedb.org/3/discover/movie?api_key=22be462e6d3de1dbab03d1ca50847b5a&sort_by=popularity.desc');
    }

    getSuggestions() {
        console.log('get suggestions...')
    }

}