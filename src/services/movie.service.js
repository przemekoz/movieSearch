'use strict';

export class MovieService {

    constructor() {
        this.apiKey = '22be462e6d3de1dbab03d1ca50847b5a';
    }

    getTrends() {
        return fetch(`http://api.themoviedb.org/3/discover/movie?api_key=${this.apiKey}&sort_by=popularity.desc`);
    }

    getSuggestionsSource() {
        return `http://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=`;
    }

}