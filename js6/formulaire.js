import Images from './Objects/Images.js';
import Image from './Objects/Image.js';
import Meme from './Objects/Meme.js';

import {loadPageByPromise} from './communFunctions.js'

import {images, currentMeme} from './constantes.js'

export default class VueFormulaire{
    #vueHref='create.html';
    domRefElement=undefined;
    meme=undefined;
    #nodeSelector=undefined;
    constructor(nodeSelector='#wrapper'){
        this.#nodeSelector=nodeSelector;
    }
    #addEvents=()=>{}
    #loadingContent=()=>{

    }
    loadPage=(domRefWrapper)=>{
        const promiseImage=Images.fetch();
        const promiseHTMLTemplate=loadPageByPromise(this.#vueHref);
        Promise.all([promiseHTMLTemplate,promiseImage])
            .then(arrayRessources=>{
                const container=arrayRessources[0];
                images=arrayRessources[1];
                
                this.#loadingContent();

                this.domRefElement=document.querySelector(this.#nodeSelector);
                this.domRefElement.innerHTML='';
                container.childNodes.forEach(elem=>this.domRefElement.append(elem));
            });
    }
    changeMemeValue=(partialMemeData,evt)=>{}
    onsubmitForm=(evt)=>{}
}