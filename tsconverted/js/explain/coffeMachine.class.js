"use strict";
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
var _MachineACafe_tempOfWaterMax, _MachineACafe_allumagePompe, _MachineACafe_allumageResistance;
class MachineACafe {
    constructor(volumeMaxBacAEau, volumeMaxCafe) {
        //private avec #
        _MachineACafe_tempOfWaterMax.set(this, void 0);
        //public
        this.niveauEau = 0;
        this.volumeCafeCoule = 0;
        this.volumePoudreCafe = 0;
        _MachineACafe_allumagePompe.set(this, () => {
            console.log('allumage pompe a eau');
            this.volumeCafeCoule = this.niveauEau;
            this.niveauEau = 0;
        });
        _MachineACafe_allumageResistance.set(this, () => {
            console.log('allumage resistance chauffante');
        }
        //public section 
        );
        //public section 
        this.cleanMachine = () => {
            console.log('netoyyage de la machine', this);
            this.niveauEau = 0;
            this.volumePoudreCafe = 0;
            this.volumeCafeCoule = 0;
        };
        this.allumage = () => {
            console.log('allumage general de la machine', this);
            __classPrivateFieldGet(this, _MachineACafe_allumageResistance, "f").call(this);
            ///attente
            __classPrivateFieldGet(this, _MachineACafe_allumagePompe, "f").call(this);
        };
        this.bacEauMax = volumeMaxBacAEau;
        this.volumeMaxCafe = volumeMaxCafe;
        __classPrivateFieldSet(this, _MachineACafe_tempOfWaterMax, 65, "f");
    }
}
_MachineACafe_tempOfWaterMax = new WeakMap(), _MachineACafe_allumagePompe = new WeakMap(), _MachineACafe_allumageResistance = new WeakMap();
function MachineACafeFactory(volumeBacMax, VolumeVerreMax) {
    return new MachineACafe(volumeBacMax, VolumeVerreMax);
}
let machine = new MachineACafe(1.5, 1.7);
let machineByFactory = MachineACafeFactory(1.5, 2);
//update des valeurs public de l'objets 
machine.volumeCafeCoule = 0;
machine.volumePoudreCafe = 1.0;
machine.niveauEau = 1.0;
//execution de fonction public
machine.allumage();
console.log(machine);
console.log('%c%s', 'color:red;font-size:32pt', 'passage à la dosette');
/**
 *
 */
class MachineADosette extends MachineACafe {
    /**
     *
     * @param {*} vbacmax
     * @param {*} vvolmax
     */
    constructor(vbacmax, vvolmax) {
        super(vbacmax, vvolmax);
        /*
        //equiv de decl par function
        function dd(d){}
        dd=function(){}
        */
        this.chargerDosette = (d) => {
            this.volumePoudreCafe = d.vcafe;
            //innaccessible this.#allumageResistance();
            //innaccessible super.#allumageResistance();
        };
    }
}
class Dosette {
    constructor() {
        this.vcafe = 0.3;
    }
}
const machineD = new MachineADosette(1.5, 0.3);
machineD.chargerDosette(new Dosette());
machine.allumage();
console.log(machineD);
//# sourceMappingURL=coffeMachine.class.js.map