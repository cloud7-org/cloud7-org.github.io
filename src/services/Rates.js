import rates from "../data/rates.yaml"
import {byPlane, byType} from "../services/Fleet.js"

class Rates {
    static perHour = (typeOrTailNumber) => {
        var src = typeOrTailNumber[0] === 'N' ? rates.byPlane : rates.byType;
        return `$${src[typeOrTailNumber]}`;
    }

    static perNM = (typeOrTailNumber) => {
        var rSrc = typeOrTailNumber[0] === 'N' ? rates.byPlane : rates.byType;
        var fSrc = typeOrTailNumber[0] === 'N' ? byPlane : byType;

        const rate = rSrc[typeOrTailNumber];
        const timeFor1Nm = 1 / fSrc[typeOrTailNumber].speed;
        return `$${(timeFor1Nm * rate).toFixed(2)}`;
    }

    static get fuelReimbursement() { return rates.orginization.fuelReimbursement; }
    static get monthlyDues() { return rates.orginization.monthlyDues; }
    static get sharePrice() { return rates.orginization.sharePrice; }
}

export default Rates;