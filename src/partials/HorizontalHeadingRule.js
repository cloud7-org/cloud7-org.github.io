import React, {useEffect, useState} from 'react';
import { v4 as uuidv4 } from 'uuid';
import EventDispatcher from '../services/EventDispatcher.js';
import MeasureText from '../services/MeasureText.js';

//Only works under an element with a set size cause there's a reason HTML fieldset isn't well supported.
const HorizontalHeadingRule = (props) => {
  const {title, titleLeftOffset = 32, strokeWidth = 2, color = 'rgb(var(--bg-blue))', headerLevelElement = 'h3'} = props;
  const [boundsWidth, setBoundsWidth] = useState(0);
  const {width: textWidth, height: textHeight, fontSize} = MeasureText.calc(title, headerLevelElement);
  const ruleOffset = (strokeWidth * 0.5);
  const ruleTopOffset = (textHeight * 0.5) + ruleOffset;
  const ruleLength = boundsWidth - ruleOffset * 2;

  const maskId = uuidv4();
  const divRef = React.useRef();

  useEffect(() => {
    const onResize = () => {
        const {width} = divRef.current.getBoundingClientRect();
        if(boundsWidth !== width)
            setBoundsWidth(width);
    };

    EventDispatcher.listen(EventDispatcher.MEDIA_CHANGED, onResize);
    onResize();
    return () => EventDispatcher.deafen(EventDispatcher.MEDIA_CHANGED, onResize);
  });

  return <div ref={divRef}>
    {ruleLength > 0 && <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${boundsWidth} ${textHeight + 4}`}>
      <mask id={maskId} maskUnits="userSpaceOnUse">
        <rect x="0" y="0" width={boundsWidth} height={textHeight} fill="white" />
        <rect x={titleLeftOffset} y={ruleTopOffset - textHeight * 0.5} width={textWidth} height={textHeight + 4} fill="black" />
      </mask>

      <polyline points={`${ruleOffset},${ruleTopOffset} ${ruleOffset + ruleLength},${ruleTopOffset}`}
            style={{stroke: color, strokeWidth}}
            mask={`url(#${maskId})`}/>

      <text x={titleLeftOffset} 
            y={ruleTopOffset} 
            fill={color}
            dominantBaseline="middle" 
            style={{fontSize}}>{title}</text>
    </svg>}
  </div>
}

export default HorizontalHeadingRule;