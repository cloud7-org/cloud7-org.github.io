class Color {
    static get start() { return  {r: 255, g: 254, b: 235 }; }
    static get no() { return{ r: 240, g: 120, b: 146 }; }
    static get yes() { return{ r: 164, g: 198, b: 175 }; }
}

const c172 = {
    gridLayout: {
        rows: 3,
        cols: 3
    },
    padding:{
        width: 100,
        height: 100
    },
    elements: [
        { id: 'c172', type: 'round-rectangle', label: 'Cessna\n172', row: 0, col: 1, ...Color.start},
        { id: 'ppl', type: 'diamond', label: 'Pilot holds\na Private Pilot\nor more adavanced\ncertificate?', row: 1, col: 1},
        { id: 'student', type: 'diamond', label: 'Is the pilot\na Student\nOwner?', row: 2, col: 1},
        { id: 'no', type: 'round-rectangle', label: 'Cannot\nCheckout', row: 2, col: 2, ...Color.no},
        { id: 'yes', type: 'round-rectangle', label: 'Can\nCheckout', row: 2, col: 0, ...Color.yes},
        { source: 'c172', target: 'ppl', label: '' },
        { source: 'ppl', target: 'student', label: 'No' },
        { source: 'student', target: 'no', label: 'No' },
        { source: 'ppl', target: 'yes', label: 'Yes', taxiDirection: 'horizontal', taxiTurn: '100%' },
        { source: 'student', target: 'yes', label: 'Yes' }
    ]
};


const c182 = {
    gridLayout: {
        rows: 4,
        cols: 3
    },
    padding:{
        width: 150,
        height: 100
    },
    elements: [
        //start
        { id: 'c182', type: 'round-rectangle', label: 'Cessna\n182', row: 0, col: 1, ...Color.start},
        { id: 'ppl', type: 'diamond', label: 'Pilot holds\na Private Pilot\nor more adavanced\ncertificate?', row: 1, col: 1},
        
        //left
        { id: '100hrs', type: 'rectangle', label: 'Has ≥ 100Hrs PIC', row: 1, col: 0 },
        { id: 'pic', type: 'rectangle', label: 'Has ≥ 5Hrs PIC\nin a C182Q', row: 2, col: 0},

        //right
        { id: 'chief', type: 'rectangle', label: 'Recommended by\norg. CFI & Chief Pilot', row: 1, col: 2},
        { id: 'training', type: 'rectangle', label: 'Completed a course\nof dual training\nprescribed by\nthe Chief Pilot.', row: 2, col: 2 },

        //Decision
        { id: 'decision-left', type: 'diamond', label: 'Are both\nrequirements\nsatisfied?', row: 3, col: 0 },
        { id: 'decision-right', type: 'diamond', label: 'Are both\nrequirements\nsatisfied?', row: 3, col: 2 },

        //ends
        { id: 'no', type: 'round-rectangle', label: 'Cannot\nCheckout', row: 2, col: 1, ...Color.no},
        { id: 'yes', type: 'round-rectangle', label: 'Can\nCheckout', row: 3, col: 1, ...Color.yes},

        //edges
        { source: 'c182', target: 'ppl', label: '' },
        { source: 'ppl', target: '100hrs', label: 'Yes' },
        { source: 'ppl', target: 'chief', label: 'Yes' },
        { source: 'ppl', target: 'no', label: 'No' },
        { source: '100hrs', target: 'pic', label: 'And' },
        { source: 'pic', target: 'decision-left', label: '' },
        { source: 'chief', target: 'training', label: 'And' },
        { source: 'training', target: 'decision-right', label: '' },
        { source: 'decision-right', target: 'no', label: 'No', curveStyle: 'bezier' },
        { source: 'decision-left', target: 'no', label: 'No', curveStyle: 'bezier' },
        { source: 'decision-right', target: 'yes', label: 'Yes' },
        { source: 'decision-left', target: 'yes', label: 'Yes' }
    ]
};

const c210 = {
    gridLayout: {
        rows: 5,
        cols: 4
    },
    padding:{
        width: 50,
        height: 150
    },
    elements: [
        { id: 'c210', type: 'round-rectangle', label: 'Cessna\n210', row: 0, col:0, ...Color.start},

        //Common start
        { id: 'instrument', type: 'rectangle', label: 'Instrument\nrated?', row: 0, col: 1 },
        { id: 'lower-checkouts', type: 'rectangle', label: 'Checked out\nin the 172 & 182?', row: 0, col: 2 },
        { id: 'decision-first', type: 'diamond', label: 'Are both\nrequirements\nsatisfied?', row: 1, col: 2 },

        //By Hours (left)
        { id: '250Hrs', type: 'diamond', label: 'Has ≥\n250 hours\nPIC', row: 1, col: 1},
        
        { id: 'retract', type: 'rectangle', label: 'Has ≥ 25 hours\nin aircraft\nwith retractable gear', row: 1, col: 0},
        { id: 'make-model', type: 'rectangle', label: 'Has ≥ 10 hours in\nsame make and model', row: 2, col: 0},
        { id: 'decision-hours', type: 'diamond', label: 'Are both\nrequirements\nsatisfied?', row: 3, col: 0 },

        { id: '10Hrs-instr', type: 'diamond', label: 'Has 10 hours\ntraining including 15\ntakeoffs & landings', row: 2, col: 1},

        //Endorsement Way (right)
        { id: 'chief', type: 'rectangle', label: 'Recommended by\norg. CFI & Chief Pilot', row: 1, col: 3},
        { id: 'training', type: 'rectangle', label: 'Completed a course\nof dual training\nprescribed by\nthe Chief Pilot.', row: 2, col: 3 },
        { id: 'decision-endorsement', type: 'diamond', label: 'Are both\nrequirements\nsatisfied?', row: 3, col: 3 },

        { id: 'no', type: 'round-rectangle', label: 'Cannot\nCheckout', row: 2, col: 2, ...Color.no},
        { id: 'yes', type: 'round-rectangle', label: 'Can\nCheckout', row: 3, col: 1, ...Color.yes},
        { id: 'alt-no', type: 'round-rectangle', label: 'Cannot\nCheckout', row: 4, col: 0, ...Color.no},

        //edges
        { source: 'c210', target: 'instrument', label: '' },
        { source: 'instrument', target: 'lower-checkouts', label: 'And' },
        { source: 'lower-checkouts', target: 'decision-first', label: '' },
        { source: 'decision-first', target: 'no', label: 'No' },

        { source: 'decision-first', target: '250Hrs', label: 'Yes' },
        { source: '250Hrs', target: 'no', label: 'No', curveStyle: 'bezier' },
        { source: '250Hrs', target: 'retract', label: 'Yes, and', xOffset: '-20px' },
        { source: '250Hrs', target: '10Hrs-instr', label: 'Yes, and' },
        
        { source: 'retract', target: 'make-model', label: 'And' },
        { source: 'make-model', target: 'decision-hours', label: '' },
        { source: 'decision-hours', target: 'alt-no', label: 'No' },
        { source: 'decision-hours', target: 'yes', label: 'Yes' },

        { source: '10Hrs-instr', target: 'yes', label: 'Yes' },
        { source: '10Hrs-instr', target: 'no', label: 'No' },

        { source: 'decision-first', target: 'chief', label: 'Yes' },
        { source: 'chief', target: 'training', label: 'And' },
        { source: 'chief', target: 'decision-endorsement', label: '' },
        { source: 'decision-endorsement', target: 'yes', label: 'Yes', taxiDirection: 'vertical', taxiTurn: '100%' },
        { source: 'decision-endorsement', target: 'no', label: 'No', curveStyle: 'bezier' },
    ]
};

const checkouts = { c172, c182, c210 }
export default checkouts;