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
var _Meme_serveurRessourceUrl, _Meme_image, _Meme_uploadOnRest;
import REST_ADR from '../constantes';
export default class Meme {
    constructor(serveurRessourceUrl = '/memes') {
        _Meme_serveurRessourceUrl.set(this, undefined);
        this.id = undefined;
        this.imageId = -1;
        //imageId = -1;
        _Meme_image.set(this, undefined);
        this.fontSize = 10;
        this.fontWeight = "500";
        this.text = "";
        this.x = 0;
        this.y = 7;
        this.color = '#ACACAC';
        this.underline = false;
        this.italic = false;
        this.titre = "";
        this.renderSvg = () => {
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('height', '100%');
            svg.setAttribute('width', '100%');
            svg.setAttribute('viewBox', typeof __classPrivateFieldGet(this, _Meme_image, "f") === 'object' && __classPrivateFieldGet(this, _Meme_image, "f").w && __classPrivateFieldGet(this, _Meme_image, "f").h ? `0 0 ${__classPrivateFieldGet(this, _Meme_image, "f").w} ${__classPrivateFieldGet(this, _Meme_image, "f").h}` : '0 0 1000 1000');
            if (__classPrivateFieldGet(this, _Meme_image, "f") && __classPrivateFieldGet(this, _Meme_image, "f").href) {
                const img = document.createElementNS('http://www.w3.org/2000/svg', 'image');
                img.setAttribute('x', '0');
                img.setAttribute('y', '0');
                img.setAttributeNS('http://www.w3.org/1999/xlink', 'href', '/img/' + __classPrivateFieldGet(this, _Meme_image, "f").href);
                svg.append(img);
            }
            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', this.x.toString());
            text.setAttribute('y', this.y.toString());
            text.style.textDecoration = this.underline ? 'underline' : 'none';
            text.style.fontStyle = this.underline ? 'italic' : 'normal';
            text.style.fontWeight = this.fontWeight;
            text.style.fontSize = this.fontSize + 'px';
            text.style.fill = this.color;
            text.innerHTML = this.text;
            svg.append(text);
            return svg;
        };
        this.setImage = (imageId, imgList) => {
            const imgIdConverted = Number(imageId);
            if (!Number.isInteger(imgIdConverted)) {
                __classPrivateFieldSet(this, _Meme_image, undefined, "f");
                this.imageId = -1;
                return;
            }
            __classPrivateFieldSet(this, _Meme_image, imgList.find(img => img.id === imgIdConverted), "f");
            this.imageId = imgIdConverted;
        };
        /**
         * fetching fuction for saving
         * test if new (id exist) or not
         * @return {Promise<{}>}
         */
        _Meme_uploadOnRest.set(this, () => {
            return fetch(`${REST_ADR}${this.id !== undefined ? __classPrivateFieldGet(this, _Meme_serveurRessourceUrl, "f") + '/' + this.id : __classPrivateFieldGet(this, _Meme_serveurRessourceUrl, "f")}`, { body: JSON.stringify(this), method: this.id !== undefined ? 'PUT' : 'POST', headers: { "Content-Type": 'application/json' } })
                .then(r => r.json());
        }
        /**
         * post or update this meme
         * @return {Promise<I_Meme>}
         */
        );
        /**
         * post or update this meme
         * @return {Promise<I_Meme>}
         */
        this.save = () => {
            let isNew = this.id !== undefined ? false : true;
            return __classPrivateFieldGet(this, _Meme_uploadOnRest, "f").call(this).then((m) => {
                if (isNew) {
                    this.id = m.id;
                    history.pushState('', '', '/creator/' + m.id);
                }
                return m;
            });
        };
        /**
         * clear meme value to return to ean empty meme with no id
         */
        this.clear = () => {
            this.id = undefined;
            this.imageId = -1;
            __classPrivateFieldSet(this, _Meme_image, undefined, "f");
            this.fontSize = 10;
            this.fontWeight = "500";
            this.text = "";
            this.x = 0;
            this.y = 7;
            this.color = '#ACACAC';
            this.underline = false;
            this.italic = false;
            this.titre = "";
        };
        __classPrivateFieldSet(this, _Meme_serveurRessourceUrl, serveurRessourceUrl, "f");
    }
}
_Meme_serveurRessourceUrl = new WeakMap(), _Meme_image = new WeakMap(), _Meme_uploadOnRest = new WeakMap();
;
export const currentMeme = new Meme();
//# sourceMappingURL=Meme.js.map