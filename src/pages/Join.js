import React, {useState, useRef} from 'react';
import ImageBox from '../partials/ImageBox.js';
import HeaderText from '../partials/HeaderText.js';
import HorizontalHeadingRule from '../partials/HorizontalHeadingRule.js';
import joinData from '../data/join.yaml';
import RestClient from '../services/RestClient.js';
import silhouette from '../images/182silhouette.svg';

const Join = () => {
    const formRef = useRef();
    let timeoutElapsed = false;
    let sentStarted = false;
    let [sentEmail, setSentEmail] = useState(false);

    //anti-spam
    window.setTimeout(() => timeoutElapsed = true, 4000);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(sentStarted || !timeoutElapsed)
            return;
        
        const cmd = e.target.querySelector('button');
        cmd.disabled = true;        
        sentStarted = true;

        const getValues = (key) => [...e.target[key]].filter(c => c.checked).map(c => c.value);
        
        const postData = {
            name: e.target.name.value,
            email: e.target.email.value,
            phone: e.target.phone.value,
            username: e.target.username.value,
            certificate: e.target.certificate.value,
            instructor: getValues('instructor[]'),
            ratings: getValues('ratings[]'),
            message: e.target.message.value
        };

        try
        {
            await RestClient.doPost('contact-us', postData);
            setSentEmail(true);
        }catch(e) {
            sentStarted = false;
            cmd.disabled = false;
            alert("Unable to send e-mail. Please try again later.");
        }
    }

    return (<>
       <div className="row no-gutters">
            <ImageBox image="rocky39N">
                <HeaderText
                    title="Join"
                    detail="Send us a message and we will get back to you shortly."
                />   
            </ImageBox>
        </div>
        <div className="row no-gutters pt-3">
            <div className="d-flex flex-column flex-md-row">
                <div className="bg-white col-12 col-md-6 px-2 pb-2">
                    {!sentEmail && <>
                        <HorizontalHeadingRule title="Contact Us"/>
                        {joinData.alert && <div className="alert alert-warning" role="alert">
                            {joinData.alert} 
                        </div>}
                        <form ref={formRef} onSubmit={handleSubmit} autoComplete="off">
                            <input type="text" id="username" name="username" data-honey placeholder="Username"/>
                            <div className="form-group">
                                <label htmlFor="name" className="fw-bold">Your Name</label>
                                <input type="text" className="form-control" id="name" name="name" placeholder="Name" required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email" className="fw-bold">E-Mail Address</label>
                                <input type="email" className="form-control" id="email" name="email" placeholder="E-Mail" required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone" className="fw-bold">Phone Number</label>
                                <input type="tel" className="form-control" id="phone" name="phone" placeholder="Phone Number" required/>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <label className="fw-bold">Highest Pilot Certificate</label>
                                </div>
                                {Object.entries(joinData.certificates.pilot).map(([key, cert]) => (<div key={key} className="col-6 col-md-3">
                                    <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="certificate" id={`certificate-${key}`} value={cert}/>
                                        <label className="form-check-label" htmlFor={`certificate-${key}`}>{cert}</label>
                                    </div>
                                </div>))}
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <label className="fw-bold">Instructor Certificates</label>
                                </div>
                                {Object.entries(joinData.certificates.instructor).map(([key, cert]) => (<div key={key} className="col-6 col-md-3">
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="checkbox" name="instructor[]" id={`instructor-${key}`} value={cert}/>
                                        <label className="form-check-label" htmlFor={`instructor-${key}`}>{cert}</label>
                                    </div>
                                </div>))}
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <label className="fw-bold">Additional Ratings</label>
                                </div>
                                {Object.entries(joinData.ratings).map(([key, rating]) => (<div key={key} className="col-6 col-md-3">
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="checkbox" name="ratings[]" id={`rating-${key}`} value={rating}/>
                                        <label className="form-check-label" htmlFor={`rating-${key}`}>{rating}</label>
                                    </div>
                                </div>))}
                            </div>
                            <div className="form-group">
                                <label className="fw-bold">Message</label>
                                <textarea className="form-control" name="message" rows="9" required></textarea>
                            </div>
                            <div className="form-group mb-0">
                                <button type="submit" className="btn btn-primary form-control">Submit</button>
                            </div>
                        </form>
                    </>}
                    {sentEmail && <div className="text-center">
                            <h3>Thank you for your interest!<br/>Someone will be in contact with you soon!</h3>
                            <img src={silhouette} style={{width: "144px"}}/>
                        </div>
                    }
                </div>
                <div className="bg-white col-12 col-md-6 px-2">
                    <HorizontalHeadingRule title="Testimonials"/>
                    <div className="row no-gutters">
                        {joinData.testamonials.map((testimonial, i) => (<div key={i} className="col-12 col-sm-6">
                            <div className="m-1 p-1 bg-light">
                                <p className="drop-cap">{testimonial.text} —&nbsp;{testimonial.from.replace(' ', '\u00A0')}</p>
                            </div>
                        </div>))}
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default Join;