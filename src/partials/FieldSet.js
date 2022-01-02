import React, {useEffect, useState} from 'react';
import { v4 as uuidv4 } from 'uuid';
import EventDispatcher from '../services/EventDispatcher.js';
import MeasureText from '../services/MeasureText.js';

//Only works under an element with a set size cause there's a reason HTML fieldset isn't well supported.
const FieldSet = (props) => {
  const {title, children, strokeWidth = 4, borderGap = 8, color = 'white'} = props;
  const [bounds, setBounds] = useState({width: 0, height: 0});
  const {width: textWidth, height: textHeight, fontSize} = MeasureText.calc(title, 'h3');
  const borderOffset = borderGap - (strokeWidth * 0.5);
  const borderTopOffset = (textHeight * 0.5) + borderOffset;
  const borderWidth = bounds.width - borderOffset * 2;
  const borderHeight = bounds.height - borderOffset - borderTopOffset;
  const titleLeftOffset = borderGap * 4;
  const htmlArea = {
    x: borderOffset + (strokeWidth * 0.5),
    y: borderTopOffset + (strokeWidth * 0.5),
    width: borderWidth - borderGap * 0.5,
    height: borderHeight - borderGap * 0.5 
  };
  const maskId = uuidv4();
  const divRef = React.useRef();

  useEffect(() => {
    const onResize = () => {
        const {width, height} = divRef.current.getBoundingClientRect();
        if(bounds.width !== width || bounds.height !== height)
          setBounds({width, height});
    };

    EventDispatcher.listen(EventDispatcher.MEDIA_CHANGED, onResize);
    onResize();
    return () => EventDispatcher.deafen(EventDispatcher.MEDIA_CHANGED, onResize);
  });

  return <div ref={divRef} className="position-absolute absolute-fill">
    {borderWidth > 0 && borderHeight > 0 && <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${bounds.width} ${bounds.height}`}>
      <defs>
        <filter id="field-set-shadow">
          <feDropShadow dx="0.2" dy="0.4" stdDeviation="0.2"/>
        </filter>
      </defs>
      <mask id={maskId}>
        <rect x="0" y="0" width={bounds.width} height={bounds.height} fill="#DDDDDD" />
        <rect x={titleLeftOffset} y={borderTopOffset - textHeight * 0.5} width={textWidth} height={textHeight} fill="black" />
      </mask>

      <rect x={borderOffset} 
            y={borderTopOffset} 
            width={borderWidth} 
            height={borderHeight} 
            rx="0" 
            stroke={color} 
            fill="transparent" 
            mask={`url(#${maskId})`}
            style={{strokeWidth, filter: 'url(#field-set-shadow)'}}/>

      <text x={titleLeftOffset} 
            y={borderTopOffset} 
            alignmentBaseline="middle" 
            style={{fill: color, filter: 'url(#field-set-shadow)', fontSize}}>{title}</text>
      
      <foreignObject {...htmlArea} fill="red">
      <div xmlns="http://www.w3.org/1999/xhtml" className="h-100">
        {children}
      </div>
      </foreignObject>
    </svg>}
  </div>
}

export default FieldSet;