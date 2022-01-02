import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import EventDispatcher from '../services/EventDispatcher.js';
import ImageBox from '../partials/ImageBox.js';
import HorizontalHeadingRule from '../partials/HorizontalHeadingRule.js'
import HeaderText from '../partials/HeaderText.js';
import VisuallySatisfyingLinkSection from '../partials/VisuallySatisfyingLinkSection.js';
import getFleetData from '../services/Fleet.js';
import planningLinks from '../data/planningLinks.yaml';
import LoginModal from '../partials/LoginModal.js';
import WebsiteApi from '../services/WebsiteApi.js';

const ownerArea = 'Owner Area';
const jqId = 'loginModal';

const NewWindowLink = (props) => {
    const {alt, href, children} = props;
    return <a target="_blank" rel="noreferrer" alt={alt} href={href}>
        {children}
    </a>
}

const PlanningLink = (props) => {
    const {alt, href, linkText} = props;
    return <NewWindowLink alt={alt} href={href}>
            {linkText}
    </NewWindowLink>
}

const TrackLink = (props) => {
    const {tailNumber} = props;
    return <NewWindowLink alt={`Track ${tailNumber}`} href={`https://flightaware.com/live/flight/${tailNumber}`}>
            {tailNumber}
   </NewWindowLink>;
}

const Owners = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(WebsiteApi.canAccess);
    const navigate = useNavigate();
    
    useEffect(() => {
        const callback = () => setIsLoggedIn(WebsiteApi.canAccess);
        EventDispatcher.listen(EventDispatcher.LOGGED_IN, callback);
        return () => EventDispatcher.deafen(EventDispatcher.LOGGED_IN, callback);
    });

    return (<>
        <LoginModal jqId={jqId}/>
        <div className="row no-gutters">
            <ImageBox image="panel">
                <HeaderText
                    title="Owners"
                    detail="Public resources for your next flight, and tools to watch our the progress of the flights in progress by our aircraft."
                />   
            </ImageBox>
        </div>
        <div className="row no-gutters pt-3">
            <div className="d-flex p-2 flex-column flex-lg-row">
                <div className="bg-white col-12 col-lg-4 p-2">
                    <HorizontalHeadingRule title="Scheduling"/>
                    <hr/>
                    <VisuallySatisfyingLinkSection links={[
                        {left: <NewWindowLink alt="Schedule Master" href="https://my.schedulemaster.com">Schedule Master</NewWindowLink>, right: 'Schedule aircraft'}
                    ]}/>
                    <hr/>
                </div>
                <div className="bg-white col-12 col-lg-3 p-2">
                    <HorizontalHeadingRule title="Flight Tracking"/>
                    <hr/>
                        <VisuallySatisfyingLinkSection links={
                            [...getFleetData()].map((a) => {return {left: TrackLink({tailNumber: a.tailNumber}), right: `'${a.year} ${a.type}`}})
                        }/>
                    <hr/>
                </div>
                <div className="bg-white col-12 col-lg-5 p-2">
                    <HorizontalHeadingRule title="Flight Planning"/>
                    <hr/>
                    <VisuallySatisfyingLinkSection links={
                        planningLinks.map((l, i) => {return {left: PlanningLink({href: l.href, alt: l.label, linkText: l.label}), right: l.detail}})
                    }/>
                    <hr/>
                    <div className="text-center">
                        {!isLoggedIn && <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#${jqId}`}>
                            {ownerArea} Login
                        </button>}
                        {isLoggedIn && <button type="button" className="btn btn-primary" onClick={() => navigate('/owner/files')}>
                            To {ownerArea}
                        </button>}
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default Owners;