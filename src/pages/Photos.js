import React from 'react';
import ImageBox from '../partials/ImageBox';
import FieldSet from '../partials/FieldSet';

const Photos = () => {
    return <div className="row">
        <ImageBox image="hangar">
            <FieldSet title="N54589 in our Maintance Hangar"/>  
        </ImageBox>
        <ImageBox image="gtn650">
            <FieldSet title="A GTN650 is in all our Aircraft"/>  
        </ImageBox>
        <ImageBox image="N96418">
            <FieldSet title="N96418 with the Comet Neowise"/>  
        </ImageBox>
        <ImageBox image="N761SP_profile">
            <FieldSet title="The Cessna 210 is a Cross Country Pickup Truck" color="gray"/> 
        </ImageBox>
    </div>
}

export default Photos;