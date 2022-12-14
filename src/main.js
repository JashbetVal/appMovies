const api = axios.create({
    baseURL :  'http://api.themoviedb.org/3/',
    headers : {
        'Content-Type' : 'application/json;charset=utf-8',
    },
    params: {
        'api_key' : API_KEY,
    },
});



//Utils

function createMovies(movies,container){
    container.innerHTML=""; //Limpia el HTML

    movies.forEach(movie => {
        //const trendingPreviewMoviesConteiner = document.querySelector('#trendingPreview .trendingPreview-movieList');
        
         const movieContainer = document.createElement('div');
         movieContainer.classList.add('movie-container');
         movieContainer.addEventListener('click',() => {
            location.hash ="#movie=" + movie.id;
         });
 
         const movieImg = document.createElement('img');
         movieImg.classList.add ('movie-img');
         movieImg.setAttribute('alt', movie.title);
         movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300/'+ movie.poster_path,);
         
         movieContainer.appendChild(movieImg);
         container.appendChild(movieContainer);
 
     });

}

function createCategories(categories,container){
    
    container.innerHTML =""; // Ayuda a poner este elemento vacio para evitar doble carga de elementos
    
    categories.forEach(category => {
    
        const categoryContainer = document.createElement('div');
        categoryContainer.classList.add('category-container');

        const categoryTitle = document.createElement('h3');
        categoryTitle.classList.add ('category-title');
        categoryTitle.setAttribute('id','id' + category.id);
        categoryTitle.addEventListener('click',()=>{
            location.hash='#category='+category.id + "-"+ category.name;
        });
        const categoryTitleText = document.createTextNode(category.name)    
        
        categoryTitle.appendChild(categoryTitleText);
        categoryContainer.appendChild(categoryTitle);
        container.appendChild(categoryContainer);

    });

}



// Llamado a la API
async function getTrendingMoviesPreview(){
    const {data} = await api('trending/movie/day');
    const movies = data.results; 
   
    createMovies(movies, trendingMoviesPreviewList);
}

async function getCategegoriesPreview(){
    const {data} = await api ('genre/movie/list');
    const categories = data.genres;
    
    createCategories(categories,categoriesPreviewList);
}

async function getMoviesByCategory(id){

    const {data}=await api ('discover/movie',{
        params: {
            with_genres: id,
        },
    });
const movies = data.results;
createMovies(movies,genericSection);

}


async function getMoviesBySearch(query){
    
    const {data}=await api ('/search/movie',{
        params: {
            query,
        },
    });
const movies = data.results;
createMovies(movies,genericSection);
}

async function getTrendingMovies(){
    const {data} = await api('trending/movie/day');
    const movies = data.results; 
   

    createMovies(movies, genericSection);
}

async function getMovieById(movieId) {
    const {data } = await api('movie/'+ movieId );
    const movies = data.results; 
   
    const movieImgUrl ='https://image.tmdb.org/t/p/w300/' + data.poster_path;

    headerSection.style.background = 
    `url(${movieImgUrl})`; 

    //console.log(movieId);

    movieDetailTitle.textContent = data.title;
    movieDetailDescription.textContent = data.overview;
    movieDetailScore.textContent = data.vote_average;

    createCategories(data.genres,movieDetailCategoriesList);
    pelisRelacionadas(movieId);
}

async function pelisRelacionadas(movieId){

    const {data } = await api('movie/'+ movieId+'/recommendations');
    const movies = data.results; 
    createMovies(movies, relatedMoviesContainer );

}
