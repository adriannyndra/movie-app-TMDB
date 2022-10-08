/* inisialisasi API ke variabel*/
const API_KEY = 'api_key=7bd4ba386addb6d59d68fe73e949ae42';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?' + API_KEY;

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
getMovies(API_URL);


/*mengambil data film dari TMDB API*/
function getMovies(url) {
    fetch(url).then(res => res.json()).then(data => {
        showMovies(data.results);
    })
}


/*menunjukan data pada page*/
function showMovies(data) {
    main.innerHTML = '';
    /*loop thru the array to get the data*/
    data.forEach(movie => {
        const{title, poster_path, vote_average, overview} = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie')
        movieEl.innerHTML = `
        <img src="${IMG_URL + poster_path}" alt="${title}">

        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getColor(vote_average)}">${vote_average}</span>
        </div>

        <div class="overview">

            <h3>Overview</h3>
            ${overview}
        </div>
        
        `

        main.appendChild(movieEl)
    })
}


/*fungsi warna rating dynamic (mengikuti skor rating)*/
function getColor(vote) {
    if (vote>= 8){
        return 'green'
    } else if (vote >= 5) {
        return 'orange'
    } else {
        return 'red'
    }     
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if(searchTerm) {
        getMovies(searchURL+'&query='+searchTerm)
    } else {
        getMovies(API_URL);
    }
})