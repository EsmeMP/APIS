const URL_BASE = 'https://rickandmortyapi.com/api';
// const body = document.querySelector('body');
const divCharacters = document.querySelector('.characters');
//PARA OBTENER DATOS DE UNA API: Ocupamos la funcion 
// fetch
const divButtons = document.querySelector('.buttons');

function createCard(character){
    const div = document.createElement('div');
    const html = `
    <img src="${character.image}" alt="" width="200px">
    <div>
    <h3>${character.name}</h3>
    <p> ${character.status}: ${character.species}</p>
    <p>Location</p>
    <p>${character.location.name}</p>
    <p>Origen:</p>
    <p>${character.origin.name}</p>
    `;
    div.innerHTML = html;
    div.className = 'card';
    return div;
}

function createCards(characters){
    divCharacters.innerHTML = '';
    characters.forEach(c =>{
        divCharacters.appendChild(createCard(c));
    })
}

let page = 1;
function createButton(){
    divButtons.innerHTML = '';
    const button = document.createElement('button');
    button.innerText ='Siguiente';
    button.className= 'btn';
    button.setAttribute('data-id', page + 1);
    divButtons.appendChild(button);
}
createButton();

function getCharacters(page=1){
    return fetch(URL_BASE + '/character/?page=' + page)

}
// fetch(URL_BASE + '/character')
//     .then(result => result.json())
//     .then(data => {
//         const characters = data.results;
//         createCards(characters);
//     });

getCharacters()
    .then(result => result.json())
    .then(data => {
        const characters = data.results;
        createCards(characters);
    })

divButtons.addEventListener('click', (e)=>{
    if(e.target.classList.contains('btn')){
        const n_page = e.target.getAttribute('data-id');
        getCharacters(n_page)
            .then(result => result.json())
            .then(data => {
                const characters = data.results;
                createCards(characters);
                page++;
                createButton();
    })
    }
});

async function getC(pages=1) {
    try{
        const result = await fetch(URL_BASE + '/character?/pages=' + page);
        const data = await result.json()
        const characters = data.results;
        createCards(characters);
    }catch(error){

    }
}
getCharacters()

divButtons.addEventListener('click', (e)=>{
    if(e.target.classList.contains('btn')){
        const n_page = e.target.getAttribute('data-id');
        getCharacters(n_page);
        page++;
        createButton();
    }
});


async function getCharactersByGender(pages=1) {
    try{
        const result = await fetch(URL_BASE + '/character/?gender=' + gender);
        const data = await result.json()
        const characters = data.results;
        createCards();
    }catch(error){

    }
}
getCharacters(gender)

divButtons.addEventListener('click', (e)=>{
    if(e.target.classList.contains('btn')){
        const n_page = e.target.getAttribute('data-id');
        getCharacters(n_page);
        page++;
        createButton();
    }
});

document.querySelector('#gender')
    .addEventListener('change', (e) => {
        getCharactersByGender(e.target.value);
    })