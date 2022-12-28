import rates from "../data/rates.yaml"
import {byPlane, byType} from "../services/Fleet.js"

class Rates {
    static perHour = (typeOrTailNumber) => {
        const src = typeOrTailNumber[0] === 'N' ? rates.byPlane : rates.byType;
        let value = src[typeOrTailNumber];
        if(value.toString().includes("."))
            value = value.toFixed(2);

        return `$${value}`;
    }

    static perNM = (typeOrTailNumber) => {
        const rSrc = typeOrTailNumber[0] === 'N' ? rates.byPlane : rates.byType;
        const fSrc = typeOrTailNumber[0] === 'N' ? byPlane : byType;

        const rate = rSrc[typeOrTailNumber];
        const timeFor1Nm = 1 / fSrc[typeOrTailNumber].speed;
        return `$${(timeFor1Nm * rate).toFixed(2)}`;
    }

    static get fuelReimbursement() { return rates.orginization.fuelReimbursement; }
    static get monthlyFixed() { return rates.orginization.monthlyFixed; }
    static get sharePrice() { return rates.orginization.sharePrice; }
}

export default Rates;