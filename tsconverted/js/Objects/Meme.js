"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _Meme_serveurRessourceUrl, _Meme_image;
class Meme {
    constructor(serveurRessourceUrl = '/memes') {
        _Meme_serveurRessourceUrl.set(this, undefined);
        this.id = undefined;
        this.imageId = -1;
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
            svg.setAttribute('viewBox', typeof this.image === 'object' && this.image.w && this.image.h ? `0 0 ${this.image.w} ${this.image.h}` : '0 0 1000 1000');
            if (this.image && this.image.href) {
                const img = document.createElementNS('http://www.w3.org/2000/svg', 'image');
                img.setAttribute('x', 0);
                img.setAttribute('y', 0);
                img.setAttributeNS('http://www.w3.org/1999/xlink', 'href', '/img/' + this.image.href);
                svg.append(img);
            }
            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', this.x);
            text.setAttribute('y', this.y);
            text.style.textDecoration = this.underline ? 'underline' : 'none';
            text.style.fontStyle = this.underline ? 'italic' : 'normal';
            text.style.fontWeight = this.fontWeight;
            text.style.fontSize = this.fontSize;
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
        this.save = () => {
        };
        __classPrivateFieldSet(this, _Meme_serveurRessourceUrl, serveurRessourceUrl, "f");
    }
}
_Meme_serveurRessourceUrl = new WeakMap(), _Meme_image = new WeakMap();
//# sourceMappingURL=Meme.js.map