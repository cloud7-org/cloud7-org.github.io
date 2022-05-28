import Rates from '../services/Rates.js';
import fleet from '../data/fleet.yaml';

const {byPlane, byType} = fleet;

for(const key of Object.keys(byPlane)){
    let plane = byPlane[key];
    const {speed, type, engine, range} = plane;
    plane = {...plane, ...plane["<<"]}
    delete plane["<<"];
    if(speed)
        plane.speed = speed;

    if(type)
        plane.type = type;

    if(engine)
        plane.engine = engine;

    if(range)
        plane.range = range;

    byPlane[key] = plane;
}

function* getFleetData() {
    for(const tailNumber of Object.keys(byPlane)) {
        const { speed, range, name, type, engine } = byPlane[tailNumber];
        const { year } = byPlane[tailNumber];
        const rate = Rates.perHour(tailNumber);
        const costPerNm = Rates.perNM(tailNumber);
        yield {tailNumber, name, year, type, engine, speed, range, rate, costPerNm}; 
    }
}

export default getFleetData;
export {byPlane, byType};