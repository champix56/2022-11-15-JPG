var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _a, _Images_restPath;
import Image from './Image.js';
import REST_ADR from '../constantes.js';
export default class Images extends Array {
    constructor() {
        super();
        /**
         * replace content of this with this with external list
         * @param {Images} imageArray filled images list array
         */
        this.replaceContentImagesArray = (imageArray) => {
            this.splice(0);
            imageArray.map(i => {
                this.push(i);
            });
            return this;
        };
        /**
         * get element in array by id
         * @param {number|string} id id of element to find can be number type or number in string type
         * @returns {Image|undefined} element found with id or undefined if nor found
         */
        this.get = (id) => {
            return this.find((img) => Number(img.id) === Number(id));
        };
        /**
         * json output of images array instance
         */
        this.toJsonStr = () => {
            return JSON.parse(this);
        };
        /**
         * convert generic json string contains array {id?:numner,w:number,h:number}[] to Images array instance
         * @param {string} jsonStr jsonstring from rest server not converted that contains array of images
         */
        this.parseJsonStr = (jsonStr) => {
            arr = JSON.parse(jsonStr);
            if (!Array.isArray(arr))
                return;
            return this.convertGenericArray(arr);
        };
        /**
         * convert generic array [] to Images array instance
         * @param {Array<{id?:numner,w:number,h:number}>} arr array from rest server freshly converted
         */
        this.convertGenericArray = (arr) => {
            if (!Array.isArray(arr))
                return;
            arr.map(e => {
                const img = new Image();
                Object.assign(img, e);
                this.push(img);
            });
            return this;
        };
    }
}
_a = Images;
_Images_restPath = { value: '/images' };
/**
 * fetch GET from rest server and return Images typed Promise form sync
 * @param {string|undefined} path ressource base path on server def: /images
 * @param {string|undefined} baseUrl server base url (not finish by /) def.: REST_ADR
 * @return {Promise<Images>} promise for sync with others loading
 */
Images.fetch = (path = __classPrivateFieldGet(_a, _a, "f", _Images_restPath), baseUrl = REST_ADR) => {
    return fetch(`${baseUrl}${path}`).then(r => r.json()).then(arr => {
        const retList = new Images();
        return retList.convertGenericArray(arr);
    });
};
;
export const images = new Images();
//# sourceMappingURL=Images.js.map