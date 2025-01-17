import actionTypes from '../constants/actionTypes';
import runtimeEnv from '@mars/heroku-js-runtime-env'
const env = process.env;

function moviesFetched(movies) {
    return {
        type: actionTypes.FETCH_MOVIES,
        movies: movies
    }
}

function movieFetched(movie) {
    return {
        type: actionTypes.FETCH_MOVIE,
        selectedMovie: movie
    }
}

function movieSet(movie) {
    return {
        type: actionTypes.SET_MOVIE,
        selectedMovie: movie
    }
}

export function reviewSet(review) {
    return {
        type: actionTypes.SET_REVIEW,
        review: review
    }
}

export function setMovie(movie) {
    return dispatch => {
        dispatch(movieSet(movie));
    }
}


export function fetchMovie(movieID) {

    return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/movies/${movieID}?reviews=true`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            mode: 'cors'
        }).then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            //console.log("response.json", response.json());
            return response.json()
        }).then((res) => {
            dispatch(movieFetched(res[0]));
        }).catch((e) => console.log(e));
    }
}

export function fetchMovies() {

    return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/movies?reviews=true`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            mode: 'cors'
        }).then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json()
        }).then((res) => {
            dispatch(moviesFetched(res));
        }).catch((e) => console.log(e));
    }
}

export function submitReview(data) {

    return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/review`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify(data),
            mode: 'cors'
        }).then((response) => {
            console.log("response", response);
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json()
        }).then((res) => {
            console.log("response", res);
            dispatch(reviewSet(res));
            localStorage.setItem('movieID', data.movieID);
            localStorage.setItem('name', data.name);
            localStorage.setItem('review', data.quote);
            localStorage.setItem('rating', data.rating);
            dispatch(fetchMovie(data.movieID));
        }).catch((e) => console.log(e));
    }
}