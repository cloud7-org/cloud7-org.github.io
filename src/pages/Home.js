import React from 'react';
import ImageBox from '../partials/ImageBox.js';
import HeaderText from '../partials/HeaderText.js';
import FieldSet from '../partials/FieldSet.js';
import getFleetData from '../services/Fleet.js';

const Home = () => {
    return (<>
        <div className="row no-gutters">
            <ImageBox image="header">
                <HeaderText
                    title="Twin City Cloud 7"
                    detail="With a fleet of six meticulously maintained and updated Cessna aircraft, the Minneapolis flying orginization Cloud 7 is based at the Flying Cloud Airport (KFCM) in Eden Prairie, MN.  Cloud 7 is the perfect place for new pilots through seasoned career pilots."
                />   
            </ImageBox>
        </div>
        <div className="row no-gutters pt-3">
            <ImageBox image="fleet">
                <FieldSet title="Our Fleet">
                    <div className="d-flex h-100">
                        <div className="p-2 align-self-end w-100">
                            <table className="table overlay text-white text-center m-0">
                                <thead>
                                    <tr className="fw-bold">
                                        <td className="p-1">Aircraft</td>
                                        <td className="p-1">Speed (kts)</td>
                                        <td className="p-1">Range (NM)</td>
                                        <td className="p-1">Owner Hourly Cost/HR</td>
                                        <td className="p-1">Cost/NM</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[...getFleetData()].map((plane, key) => {
                                        return <tr key={key}>
                                            <td className="p-1">{plane.tailNumber}</td>
                                            <td className="p-1">{plane.speed}</td>
                                            <td className="p-1">{plane.range}</td>
                                            <td className="p-1">{plane.rate}</td>
                                            <td className="p-1">{plane.costPerNm}</td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </FieldSet>
            </ImageBox>
        </div>
        <div className="row no-gutters pt-3">
            <ImageBox image="meetingroom">
                <FieldSet title="Our Facilities">
                    <div className="d-flex h-100 justify-content-end">
                        <div className="p-2 align-self-end">
                            <div className="overlay text-white p-2">
                                <div>We own two hangars at Flying Cloud Airport that include the following features:</div>
                                    <ul>
                                        <li>A Heated Maintenance Bay</li>
                                        <li>A Meeting Room Equipped With:
                                            <ul>
                                                <li>Internet &amp; Wi-Fi</li>
                                                <li>Computer</li>
                                                <li>Television</li>
                                                <li>Whiteboard</li>
                                            </ul>
                                        </li>
                                    </ul>
                                    <div>A perfect place for your flight briefing, planning, and training!</div>
                            </div>
                        </div>
                    </div>
                </FieldSet>
            </ImageBox>
        </div>
    </>);
}

export default Home;