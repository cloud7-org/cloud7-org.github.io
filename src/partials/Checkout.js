import React, { useEffect } from 'react';
import cytoscape from 'cytoscape';

const toHsl = ({r, g, b}) => {
    const rPrime = r / 255.0;
    const gPrime = g / 255.0;
    const bPrime = b / 255.0;

    const cMax = Math.max(rPrime, gPrime, bPrime);
    const cMin = Math.min(rPrime, gPrime, bPrime);
    const delta = cMax - cMin;
    let h = 0;

    if(delta === 0) 
        h = 0;
    else if(cMax === rPrime)
        h = ((gPrime - bPrime) / delta) % 6;
    else if(cMax === gPrime)
        h = ((bPrime - rPrime) / delta) + 2;
    else
        h = ((rPrime - gPrime) / delta) + 4;

    h *= 60;

    const l = (cMax + cMin) / 2;
    const s = delta === 0 ? 0 : (delta / (1 - Math.abs(2 * l - 1)));

    return {h, s, l};
}

const Checkout = (props) => {
    const { checkoutData } = props; 
    const graphRef = React.useRef();
    const measureRef = React.useRef();

    const {gridLayout, padding} = checkoutData;

    const calcTextSize = (text) => {
        measureRef.current.textContent = text;
        const {width, height} = measureRef.current.getBoundingClientRect();
        return {width, height};
    }

    const calcElementData = ({id, type, label, row, col, r = 215, g = 232, b = 249}) => {
        let { width, height } = calcTextSize(label);

        if(type === 'circle') {
            height = width = Math.max(width, height);
            type = 'ellipse';
        }
        else if(type === 'square') {
            height = width = Math.max(width, height);
            type = 'rectangle';
        } 
        
        switch(type){
            case 'diamond':
                width *= 1.66;
                height *= 1.66;
                break;
            case 'round-rectangle':
                width *= 1.5;
                height *= 1.5;
                break;
            default:
                width *= 1.25;
                height *= 1.25;
                break;
        }

        const {h, s, l} = toHsl({r, g, b});
        const data = { id,  type, label, width, height, row, col, backgroundColor: `rgb(${r}, ${g}, ${b})`, borderColor: `hsl(${h}, ${s* 100}%, ${(l - 0.10) * 100}%)` };
        return { data, position: {x: col / gridLayout.cols, y: row / gridLayout.rows}, locked: true, grabbable: false };
    }        

    const calcEdgeData = ({source, target, label, curveStyle = 'taxi', taxiDirection = 'auto', taxiTurn = '20px', xOffset = '0px', yOffset = '0px'})=> {
        return { data: { id: `${source}-${target}`, source, target, label, curveStyle, taxiDirection, taxiTurn, xOffset, yOffset } };
    }    

    const getElements = () => checkoutData.elements.map(e => e.id ? calcElementData(e) : calcEdgeData(e));    

    useEffect(() => {
        let cy = null;
        let graphElement = graphRef.current;
        const onResize = () => {
            const { width } = graphElement.getBoundingClientRect();
            graphElement.style.height = `${Math.min(canvasHeight, (width / canvasWidth) * canvasHeight)}px`
            cy?.resize().fit();
        };

        const elements = getElements();

        let tallest = 0;
        let widest = 0;
        for(const node of elements.filter(n => n.data.row !== undefined)) {
            widest = Math.max(widest, node.data.width);
            tallest = Math.max(tallest, node.data.height);
        }        

        const canvasWidth = widest * gridLayout.cols + padding.width;
        const canvasHeight = tallest * gridLayout.rows + padding.height;
        
        window.addEventListener('resize', onResize);

        graphElement.style.width = `${canvasWidth}px`;
        graphElement.style.height = `${canvasHeight}px`;
        const bounds = graphElement.getBoundingClientRect();

        for(const node of elements.filter(n => n.data.row !== undefined)) {
            node.position.x = (node.position.x * bounds.width) + widest * 0.5;
            node.position.y = (node.position.y * bounds.height) + tallest * 0.5;
        }

        cy = cytoscape({
            container: graphElement,
            userZoomingEnabled: false,
            userPanningEnabled: false,
            layout:{
                name: 'preset',
                fit: false
            },
            style: [{
                'selector': 'node',
                'style': {
                    'shape': 'data(type)',
                    'label': 'data(label)',
                    'height': 'data(height)',
                    'width': 'data(width)',
                    'text-wrap': 'wrap',
                    'text-valign' : 'center', 
                    'text-halign' : 'center',
                    'font-size': '15px',
                    'border-width': 4,
                    'border-color': 'data(borderColor)',
                    'background-color': 'data(backgroundColor)'
                  }
            }, {
                'selector': 'edge',
                'style': {
                    'label': 'data(label)',
                    'font-size': '15px',
                    'curve-style': 'data(curveStyle)',
                    'target-arrow-shape': 'triangle',
                    'source-endpoint': '0% 0%',
                    'taxi-direction': 'data(taxiDirection)',
                    'taxi-turn': 'data(taxiTurn)'
                  }
            }, {
                'selector': 'edge[label]',
                'style': {
                    'text-background-color': 'white',
                    'text-background-opacity': 0.8,
                    'text-margin-x': 'data(xOffset)',
                    'text-margin-y': 'data(yOffset)'
                  }
            }],
            elements
          });
          graphElement.style.maxWidth = `${canvasWidth}px`;
          graphElement.style.width = '100%';
          graphElement.style.margin = 'auto'
          
          onResize();
          return () => window.removeEventListener('resize', onResize);
    })

    return <>
        <span ref={measureRef} className="measure-ref position-absolute"></span>
        <div ref={graphRef}></div>
    </>
}

export default Checkout;