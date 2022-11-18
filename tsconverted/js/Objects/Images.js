"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _a, _Images_restPath;
class Images extends Array {
    constructor() {
        super();
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
            arr.map(e => {
                const img = new Image();
                img.h = e.h;
                img.w = e.w;
                img.href = e.href;
                img.id = e.id;
                this.push(img);
            });
            return this;
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
                img.h = e.h;
                img.w = e.w;
                img.href = e.href;
                img.id = e.id;
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
//# sourceMappingURL=Images.js.map