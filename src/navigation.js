searchFormBtn.addEventListener('click', ()=>{
    location.hash = '#search='+ searchFormInput.value;

});

trendingBtn.addEventListener('click', ()=>{
    location.hash = '#trends='
});

arrowBtn.addEventListener('click', ()=>{
    //location.hash = '#home='
    window.history.back();
});

imgBtn.addEventListener('click',()=>{
    location.hash = '#home=';
});

window.addEventListener('DOMContentLoaded', navigator,false);
window.addEventListener('hashchange',navigator,false);


function navigator () {
    console.log({location});

    if(location.hash.startsWith('#trends')){
        trendsPage();
    }else if (location.hash.startsWith('#movie')){
        moviesDetailsPage();
    }else if (location.hash.startsWith('#category')){
        categoriesPage();
    }else if (location.hash.startsWith('#search')){
        searchPage();
    }else {
        homePage();
    }
}

function homePage(){
    
    headerSection.classList.remove('header-container--long');
    headerSection.style.background ='';
    arrowBtn.classList.add('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.remove ('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.remove('inactive');
    categoriesPreviewSection.classList.remove('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.add('inactive');

    window.scrollTo( 0, 0 );
    console.log("HOME!!!!!!");
    getTrendingMoviesPreview();
    getCategegoriesPreview();
}

function categoriesPage(){
    
    const [_,categoryData]=location.hash.split('='); //partimos el hash en 2, esta division es asi: ['#category' , 'id_name']
    const[categoryId , categoryName]=categoryData.split('-');

    headerSection.classList.remove('header-container--long');
    headerSection.style.background ='';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add ('inactive');
    headerCategoryTitle.classList.remove('inactive');
    headerCategoryTitle.innerHTML = categoryName;
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    

    console.log("CATEGORIES");
    window.scrollTo( 0, 0 );
    getMoviesByCategory(categoryId);
}

function moviesDetailsPage(){

    headerSection.classList.add('header-container--long');
    headerSection.style.background ='';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add ('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.remove('inactive');

    window.scrollTo( 0, 0 );
    console.log("DETAILS");
}

function searchPage(){

    headerSection.classList.remove('header-container--long');
    headerSection.style.background ='';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add ('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    window.scrollTo( 0, 0 );
    console.log('SEARCH');
    
    const [_,query]=location.hash.split('='); //partimos el hash en 2, esta division es asi: ['#category' , 'id_name']
    getMoviesBySearch(query);

}

function trendsPage(){

    headerSection.classList.remove('header-container--long');
    headerSection.style.background ='';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add ('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    headerCategoryTitle.innerHTML = 'Tendencias';
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    window.scrollTo( 0, 0 );
    console.log("TRENDS");

    getTrendingMovies();
}