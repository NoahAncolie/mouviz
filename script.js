const form = document.getElementsByTagName('form')[0]

//OBSERVER IN JAVASCRIPT
const observer = new IntersectionObserver(entries => {
    entries.map(entry => {
        entry.target.classList.toggle('show', entry.isIntersecting)
        if (entry.isIntersecting) observer.unobserve(entry.target)
    })
    console.log(entries)
}, {
    threshold : 0.2,
    rootMargin : '-10px'
})
//END


const urlSearch = (searchString) => {
    return (searchString.toLowerCase().split(' ').join('+'))
}
const displayList = (movies) => {
    if (movies === undefined) {
        alert('You need to enter a valid movie name')
    }
    let list = document.getElementsByClassName('list')[0]
    if (list) {list.remove()}
    document.getElementsByTagName('body')[0].insertAdjacentHTML('beforeend', `<div class="list"></div>`)
    movies.map(movie => {
        document.getElementsByClassName('list')[0].insertAdjacentHTML('beforeend', `
            <div class="movie-listed" id="div${movie.imdbID}">
                <div class="movie-listed-img">
                    <img src="${movie.Poster}" alt="Poster of ${movie.Title}">
                </div>
                <div class="list-movie-infos">
                    <h2>${movie.Title}</h2>
                    <p>${movie.Year}</p><br><br><br>
                    <a href="#" id="${movie.imdbID}" class="call-to-action">More Infos</a><br>
                </div>
            </div>
        `)
        document.getElementById(movie.imdbID).addEventListener('click', function(){ getMoviePlot(movie.imdbID) })
        observer.observe(document.getElementById(`div${movie.imdbID}`))
    })
}

const options = {
    method: 'GET'
};
const getList = (e) => {
    e.preventDefault()
    url = `https://www.omdbapi.com/?s=${urlSearch(form.filmName.value)}&apikey=b9214093`
    fetch(url, options)
        .then((response) => { return response.json(); })
        .then((response) => { displayList(response.Search) })
        .catch((error) => { console.error(error); });
}

const getMoviePlot = (id = 'tt0222012') => {
    url = `https://www.omdbapi.com/?i=${id}&apikey=b9214093`
    fetch(url, {method: 'GET'})
        .then((response) => { return response.json() })
        .then((response) => { 
            console.log(response)
            let movieDiv = document.getElementsByClassName('movie-div')[0]
            if (movieDiv) { movieDiv.remove() }
            document.getElementsByTagName('body')[0].insertAdjacentHTML('beforeend', `
                <div class='movie-div'>
                    <div class='glass-div'>
                        <div class="movie-picture">
                            <img src="${response.Poster}" alt="poster of ${response.Title}">
                        </div>
                        <div class="movie-elements">
                            <div class="movie-text">
                                <h1>${response.Title}</h1>
                                <p>Realeased : ${response.Released}</p><br>
                                <p>${response.Plot}</p>
                            </div>
                        </div>
                        <div class="close-div">
                            <form action="" onsubmit="closeModal();">
                                    <input type="submit" class="close-modal" value="X">
                            </form>
                        </div>
                    </div>
                </div>
            `)
        })
        .catch((error) => { console.error(error) })
}

const closeModal = () => {
    document.getElementsByClassName('movie-div')[0].remove()
}