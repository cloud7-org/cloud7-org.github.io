import React, { useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import 'animate.css';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle';
import EventDispatcher from '../services/EventDispatcher.js';
import WebsiteApi from '../services/WebsiteApi.js';

function one(dom, event, callback) {
    function handler(e) {
        callback.call(this, e);
        this.removeEventListener(event, handler);
    }
    dom.addEventListener(event, handler); 
}  

const LoginModal = (props) => {
    const {jqId} = props;
    const modalRef = useRef();
    const formRef = useRef();
    const cmdLoginRef = useRef();
    const loginNameRef = useRef();
    const navigate = useNavigate();
    
    const login = async () => {
        const form = formRef.current;
        const honey = form.elements['login-nickname'].value;
        const username = form.elements['login-name'].value;
        const password = form.elements['login-password'].value;
        
        cmdLoginRef.current.disabled = true;

        if(!honey && await WebsiteApi.login(username, password)) {
            const modal = bootstrap.Modal.getOrCreateInstance(modalRef.current);
            modal.hide();
            EventDispatcher.trigger(EventDispatcher.LOGGED_IN);
            navigate('/owner/files');
        } else {
            modalRef.current.classList.add('animate__shakeX');
            one(modalRef.current, 'animationend', () => modalRef.current.classList.remove('animate__shakeX'));  
        }
        
        cmdLoginRef.current.disabled = false;
    }

    const submitOnEnter = (e) => {
        if (e.keyCode === 13 || e.which === 13)
            login();
    }

    useEffect(() => {
        const onShow = () => loginNameRef.current.focus();
        const onHide = () => formRef.current?.reset();
        modalRef.current.addEventListener('shown.bs.modal', onShow);
        modalRef.current.addEventListener('hidden.bs.modal', onHide);
        return () => {
            modalRef.current?.removeEventListener('shown.bs.modal', onShow);
            modalRef.current?.removeEventListener('hidden.bs.modal', onHide);
        }
    });    

    return <div className="modal fade animate__animated" ref={modalRef} id={jqId} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Owner Area Login</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <form ref={formRef} autoComplete="off">
                        <input type="text" id="login-nickname" name="login-nickname" data-honey placeholder="Gen. Akbar"/>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" className="form-control" ref={loginNameRef} id="login-name" name="name" placeholder="Name" autoComplete="off"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" id="login-password" name="password" placeholder="Password" autoComplete="off" onKeyPress={submitOnEnter}/>
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary" onClick={login} ref={cmdLoginRef}>Submit</button>
                </div>
            </div>
        </div>
    </div>
}

export default LoginModal;