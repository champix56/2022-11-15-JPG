var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _VueFormulaire_vueHref, _VueFormulaire_nodeSelector, _VueFormulaire_container, _VueFormulaire_currentMeme, _VueFormulaire_renderCurrent, _VueFormulaire_ongenericinput, _VueFormulaire_addEvents, _VueFormulaire_loadingContent;
import Images, { images } from './Objects/Images.js';
import Image from './Objects/Image.js';
import Meme, { currentMeme } from './Objects/Meme.js';
import { loadPageByPromise } from './communFunctions.js';
export default class VueFormulaire {
    constructor(nodeSelector = '#wrapper') {
        _VueFormulaire_vueHref.set(this, 'create.html');
        this.domRefElement = undefined;
        this.meme = undefined;
        _VueFormulaire_nodeSelector.set(this, undefined);
        _VueFormulaire_container.set(this, undefined);
        _VueFormulaire_currentMeme.set(this, new Meme());
        _VueFormulaire_renderCurrent.set(this, () => {
            this.domRefElement.querySelector('svg').replaceWith(__classPrivateFieldGet(this, _VueFormulaire_currentMeme, "f").renderSvg());
        });
        _VueFormulaire_ongenericinput.set(this, (evt) => {
            evt.stopPropagation();
            const name = evt.target.name;
            __classPrivateFieldGet(this, _VueFormulaire_currentMeme, "f")[name] = evt.target.value;
            __classPrivateFieldGet(this, _VueFormulaire_renderCurrent, "f").call(this);
            //console.log(this.#currentMeme);
        }
        /**
         * add form events
         * ATTENTION: must html form elements must be already loaded in this.#container
         */
        );
        /**
         * add form events
         * ATTENTION: must html form elements must be already loaded in this.#container
         */
        _VueFormulaire_addEvents.set(this, () => {
            //gestion input text / number avec gestion generique d'event
            /*this.#container.querySelector('#meme_titre').addEventListener('input',this.#ongenericinput);
           this.#container.querySelector('#meme_text').addEventListener('input', this.#ongenericinput);
           this.#container.querySelector('#meme_x').addEventListener('input', this.#ongenericinput);
           this.#container.querySelector('#meme_y').addEventListener('input', this.#ongenericinput);
           this.#container.querySelector('#meme_fontSize').addEventListener('input', this.#ongenericinput);
           this.#container.querySelector('#meme_fontWeight').addEventListener('input', this.#ongenericinput);
           this.#container.querySelector('#meme_color').addEventListener('input', this.#ongenericinput);*/
            //gestion des events sur tous les inputs selectionnés par querySelectorAll  
            __classPrivateFieldGet(this, _VueFormulaire_container, "f")
                .querySelectorAll('form input[type=text],form input[type=number],form input[type=color]')
                .forEach(e => { e.addEventListener('input', __classPrivateFieldGet(this, _VueFormulaire_ongenericinput, "f")); });
            __classPrivateFieldGet(this, _VueFormulaire_container, "f").querySelector('select').addEventListener('change', evt => {
                __classPrivateFieldGet(this, _VueFormulaire_currentMeme, "f").setImage(Number(evt.target.value), images);
                __classPrivateFieldGet(this, _VueFormulaire_renderCurrent, "f").call(this);
            });
            __classPrivateFieldGet(this, _VueFormulaire_container, "f").querySelector('form').addEventListener('submit', evt => {
                evt.preventDefault();
                __classPrivateFieldGet(this, _VueFormulaire_currentMeme, "f").save();
            });
        });
        _VueFormulaire_loadingContent.set(this, () => {
            const select = __classPrivateFieldGet(this, _VueFormulaire_container, "f").querySelector('select');
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
        });
        this.loadPage = () => {
            const promiseImage = Images.fetch();
            const promiseHTMLTemplate = loadPageByPromise(__classPrivateFieldGet(this, _VueFormulaire_vueHref, "f"));
            Promise.all([promiseHTMLTemplate, promiseImage])
                .then(arrayRessources => {
                __classPrivateFieldSet(this, _VueFormulaire_container, arrayRessources[0], "f");
                images.replaceContentImagesArray(arrayRessources[1]);
                console.log(images);
                __classPrivateFieldGet(this, _VueFormulaire_loadingContent, "f").call(this);
                __classPrivateFieldGet(this, _VueFormulaire_addEvents, "f").call(this);
                this.domRefElement = document.querySelector(__classPrivateFieldGet(this, _VueFormulaire_nodeSelector, "f"));
                this.domRefElement.innerHTML = '';
                __classPrivateFieldGet(this, _VueFormulaire_container, "f").childNodes.forEach(elem => this.domRefElement.append(elem));
            });
        };
        this.changeMemeValue = (partialMemeData, evt) => { };
        this.onsubmitForm = (evt) => { };
        __classPrivateFieldSet(this, _VueFormulaire_nodeSelector, nodeSelector, "f");
    }
}
_VueFormulaire_vueHref = new WeakMap(), _VueFormulaire_nodeSelector = new WeakMap(), _VueFormulaire_container = new WeakMap(), _VueFormulaire_currentMeme = new WeakMap(), _VueFormulaire_renderCurrent = new WeakMap(), _VueFormulaire_ongenericinput = new WeakMap(), _VueFormulaire_addEvents = new WeakMap(), _VueFormulaire_loadingContent = new WeakMap();
//# sourceMappingURL=formulaire.js.map