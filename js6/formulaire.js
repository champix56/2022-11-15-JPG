import Images, { images } from './Objects/Images.js';
import Image from './Objects/Image.js';
import Meme, { currentMeme } from './Objects/Meme.js';

import { loadPageByPromise } from './communFunctions.js'


export default class VueFormulaire {
    #vueHref = 'create.html';
    domRefElement = undefined;
    meme = undefined;
    #nodeSelector = undefined;
    #container = undefined;
    #currentMeme = new Meme();
    constructor(nodeSelector = '#wrapper') {
        this.#nodeSelector = nodeSelector;
    }
    #ongenericinput=(evt)=>{
        evt.stopPropagation();
        const name=evt.target.name;
        this.#currentMeme[name] = evt.target.value;
        console.log(this.#currentMeme);
    }
    /**
     * add form events 
     * ATTENTION: must html form elements must be already loaded in this.#container
     */
    #addEvents = () => {        
        this.#container.querySelector('#meme_titre').addEventListener('input',this.#ongenericinput);
        this.#container.querySelector('#meme_text').addEventListener('input', this.#ongenericinput);
        this.#container.querySelector('#meme_x').addEventListener('input', this.#ongenericinput);
        this.#container.querySelector('#meme_y').addEventListener('input', this.#ongenericinput);
        this.#container.querySelector('#meme_fontSize').addEventListener('input', this.#ongenericinput);
        this.#container.querySelector('#meme_fontWeight').addEventListener('input', this.#ongenericinput);
        this.#container.querySelector('#meme_color').addEventListener('input', this.#ongenericinput);
    }
    #loadingContent = () => {
        const select = this.#container.querySelector('select');
        /*protection multi execution du chargement*/
        select.innerHTML = "";
        const noImg = document.createElement('option');
        noImg.value = -1;
        noImg.innerHTML = 'Aucune image';
        select.append(noImg);
        /*chargement de tous les options d'images*/
        images.map(e => {
            const o = document.createElement('option');
            o.value = e.id;
            o.innerHTML = e.titre;
            select.append(o);
        });
    }
    loadPage = () => {
        const promiseImage = Images.fetch();
        const promiseHTMLTemplate = loadPageByPromise(this.#vueHref);
        Promise.all([promiseHTMLTemplate, promiseImage])
            .then(arrayRessources => {
                this.#container = arrayRessources[0];
                images.replaceContentImagesArray(arrayRessources[1]);
                console.log(images);
                this.#loadingContent();
                this.#addEvents();
                this.domRefElement = document.querySelector(this.#nodeSelector);
                this.domRefElement.innerHTML = '';
                this.#container.childNodes.forEach(elem => this.domRefElement.append(elem));
            });
    }
    changeMemeValue = (partialMemeData, evt) => { }
    onsubmitForm = (evt) => { }
}