import React from 'react';
const HeaderText = (props) => {
    const {title, detail} = props;
    return <div className="text-white shadowed-text position-absolute bottom-0 w-100">
        <h1 className="m-0 px-2 fade-to-dark">{title}</h1>
        <div className="px-2 faded-dark">{detail}</div>
    </div> 
}

export default HeaderText;