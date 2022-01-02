import React from 'react';
import knownPictures from "../data/knownPictures.yaml"

const KnownPicture = (props) => {
    const {className, alt, image} = props;

    if(!knownPictures[image])
        return <div>Key {image} not found</div>

    return <picture>
        <source srcSet={`/images/${image}.webp`} type="image/webp" />
        <source srcSet={`/images/${image}.jp2`} type="image/jp2" />
        <img className={className} alt={alt} src={`/images/${image}.jpg`} {...knownPictures[image]}/>
    </picture>
}

export default KnownPicture;