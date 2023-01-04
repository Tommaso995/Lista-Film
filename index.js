const SESSION = '__lista_film__';

const titolo = document.querySelector('#inputTitolo');
const durata = document.querySelector('#inputDurata');
const data = document.querySelector('#inputData');
const button = document.querySelector('#aggiungi');
const form = document.querySelector('form');
const durTot = document.querySelector('#durata')
const risultato = document.querySelector('#lista');

let lista = [];

const controlSess = localStorage.getItem(SESSION);

if (controlSess){
    lista =  JSON.parse(controlSess);

    totale();

    list();
}

form.addEventListener('submit', function(event){
    //blocco l'azione predefinita del form
    event.preventDefault();

    const tit = titolo.value.trim();
    const dur = durata.value.trim();
    const dat = data.value.trim();

    addfilm(tit, dur, dat);

    form.reset();

    titolo.focus();
});

function addfilm(tit, dur, dat){

    const film = {
        tit,
        dur: Number(dur),
        dat,
    };

    lista.push(film);
    console.log(lista);

    localStorage.setItem(SESSION, JSON.stringify(lista));

    totale();


    list();
}

function totale (){
    let total = 0;

    for (let i = 0; i <lista.length; i++){
        total += lista[i].dur;
    }

    durTot.innerText = formattazioneOre(total);
}

function formattazioneOre (ore){
    return ore.toFixed(2) + ' ore';
}

function list(){
    risultato.innerHTML = '';

    for (let i = 0; i<lista.length; i++){
        const listElement = createElementList(i);
        risultato.innerHTML += listElement;
    }


    setDeleteButton();
}


function createElementList(i){
    const lista1 = lista[i];

    return `  
    <div id="listaJ">  
    <div class="col-10 gift-info">
        <h3><strong>${lista1.tit}</strong></h3>
            <p>${lista1.dat}</p>
    </div>
    <div class="col-1 gift-price"><strong>${formattazioneOre(lista1.dur)}</strong></div>
    <div class="col-1">
    <button class="form-control gift-button" id="rimuovi" data-index="${i}">❌</button>
    </div>
    </div>`;
}

function setDeleteButton(){

    const deleteButton = document.querySelectorAll('.gift-button');

    for (let i=0; i< deleteButton.length; i++){
        const button = deleteButton[i];

        button.addEventListener('click', function(){
            const index = button.dataset.index;

            removeList(index);
        });
    }
}

function removeList(index){

    lista.splice(index,1);

    localStorage.setItem(SESSION, JSON.stringify(lista));



    totale();
    list();
}