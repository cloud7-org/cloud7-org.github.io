import Rates from '../services/Rates.js';
import fleet from '../data/fleet.yaml';

const {byPlane, byType} = fleet;

for(const key of Object.keys(byPlane)){
    let plane = byPlane[key];
    let {speed} = plane;
    plane = {...plane, ...plane["<<"]}
    delete plane["<<"];
    if(speed)
        plane.speed = speed;
    byPlane[key] = plane;
}

function* getFleetData() {
    for(const tailNumber of Object.keys(byPlane)) {
        const { speed, range, name, type } = byPlane[tailNumber];
        const { year } = byPlane[tailNumber];
        const rate = Rates.perHour(tailNumber);
        const costPerNm = Rates.perNM(tailNumber);
        yield {tailNumber, name, year, type, speed, range, rate, costPerNm}; 
    }
}

export default getFleetData;
export {byPlane, byType};