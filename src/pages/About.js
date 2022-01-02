import React  from 'react';
import ImageBox from '../partials/ImageBox.js';
import HeaderText from '../partials/HeaderText.js';
import HorizontalHeadingRule from '../partials/HorizontalHeadingRule.js';
import Rates from '../services/Rates.js';
import getFleetData from '../services/Fleet.js';
import KnownPicture from '../partials/KnownPicture.js';
import HotelLaneMap from '../partials/HotelLaneMap.js';

const About = () => {
    return <>
        <div className="row no-gutters">
            <ImageBox image="N65045">
                <HeaderText
                    title="About Us"
                    detail="Twin City Cloud 7, Inc. is Minnesota’s leading flying Club, founded in 1966 by seven pilots with one Skyhawk. The purpose then to now has been to provide well-equipped, professionally maintained aircraft at a reasonable cost per hour."
                />   
            </ImageBox>
        </div>
        <div className="row no-gutters pt-3">
            <div className="px-3">
                <div className="bg-white p-2">
                    <HorizontalHeadingRule title="History"/>
                    <p className="drop-cap">Through the years the officers, and directors have increased the owner’s equity while constantly improving the equipment to the present fleet of two Cessna 172 Skyhawks, two C182 Skylanes, and two C210 Centurions.</p>
                    <p>By utilizing the aircraft to the fullest, and by close control of maintenance without sacrificing quality, costs have been held to below what lesser equipped planes cost to rent from other sources.</p>
                    <p>Ownership varies. New faces appear while old ones leave. Of the ones that leave the most quoted reason for leaving the Club is relocation to another area. The number two reason for selling a share is the purchase of a private airplane by one or two people, a goal many would like to attain but with costs rising so rapidly ownership by way of a club is the only reasonable alternative. Rarely have we heard of anyone leaving because of dissatisfaction with the club or the equipment. In fact many who have left because of a move have rejoined when they returned to the Twin Cities which is the best testimonial we can think of.</p>
                    <HorizontalHeadingRule title="Location"/>
                    <p>Twin Cities Cloud 7 Flying Club is located at the Flying Cloud Airport in Eden Prairie, MN.</p>
                    <HotelLaneMap/>
                    <HorizontalHeadingRule title="Ownership Costs"/>
                    <p>Initial Fees: Equity Share – {Rates.sharePrice} (Please <a alt="Join" href="/join">Contact Us</a> to be placed on the waiting list)</p>
                    <p>Monthly dues – {Rates.monthlyDues}/month</p>
                    <p>Flight time is calculated on tach hours and the hourly rates are wet (includes fuel):</p>        
                    <table className="table">
                        <thead>
                            <tr className="fw-bold">
                                <td>Aircraft</td>
                                <td>Type</td>
                                <td>Rate/HR</td>
                            </tr>
                        </thead>
                        <tbody>
                            {[...getFleetData()].map((plane, key) => {
                                return <tr key={key}>
                                    <td>{plane.tailNumber}</td>
                                    <td>{plane.name}</td>
                                    <td>{plane.rate}</td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                    <p className="pt-2">Off field reimbursement rate is currently {Rates.fuelReimbursement}/gal.</p>
                    <div className="d-flex justify-content-center">
                        <KnownPicture image="N761SP_above"/>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default About;