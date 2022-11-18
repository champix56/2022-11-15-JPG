"use strict";
var _VueFormulaire_vueHref, _VueFormulaire_addEvents;
class VueFormulaire {
    constructor() {
        _VueFormulaire_vueHref.set(this, 'create.html');
        this.domRefElement = undefined;
        this.meme = undefined;
        _VueFormulaire_addEvents.set(this, () => { });
        this.loadPage = (domRefWrapper) => { };
        this.changeMemeValue = (partialMemeData, evt) => { };
        this.onsubmitForm = (evt) => { };
    }
}
_VueFormulaire_vueHref = new WeakMap(), _VueFormulaire_addEvents = new WeakMap();
//# sourceMappingURL=formulaire.js.map