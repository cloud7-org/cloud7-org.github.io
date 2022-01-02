import React from 'react';
import KnownPicture from './KnownPicture';

const ImageBox = (props) => {
    const {image, children} = props;
    return (<div className="position-relative">
        <KnownPicture className="w-100" alt="background" image={image}/>
        <div className="position-absolute absolute-gutter-fill">
            {children}
        </div>
    </div>);
}

export default ImageBox;