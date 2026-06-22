import 'bootstrap/dist/css/bootstrap.css';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.js';
import './App.css'
import React, {useEffect, useState} from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Navigate,
  Route,
  NavLink,
  useLocation,
  useNavigate
} from "react-router-dom";

import './services/MediaChangedEventManager.js'
import './services/RestClient.js'

import EventDispatcher from './services/EventDispatcher';
import WebsiteApi from './services/WebsiteApi';
import Navigation from './services/Navigation';
import logo from './images/c7logo.svg';

const makeRoute = (item, i) => <Route key={i} path={item.path} element={item.element}/>;

// Collapse the mobile navbar when a link is tapped. We do this programmatically
// instead of via Bootstrap's data-bs-toggle, because that data API calls
// preventDefault() on the click and would block React Router navigation.
const collapseNav = () => {
  const nav = document.getElementById('navbarNav');
  if (nav && nav.classList.contains('show'))
    bootstrap.Collapse.getOrCreateInstance(nav).hide();
};

const links = Navigation.main.map((item, i) => <NavLink key={i} className="nav-item nav-link" to={item.path} onClick={collapseNav}>{item.name}</NavLink>);
const routes = Navigation.main.map(makeRoute);

const PublicFooter = () => {
  const location = useLocation();
  const navigate = useNavigate();
  if(location.pathname.toLocaleLowerCase().startsWith('/owner'))
    return null;

  return <footer className="text-center font-weight-bold">
    <p className="pt-3">Any Questions?</p>
    <button type="button" className="btn btn-outline-grass" onClick={() => navigate('/join')}>Contact Us!</button>
    <p className="pt-3">And someone will get back to you.</p>
  </footer>
}

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(WebsiteApi.canAccess);

  useEffect(() => {
    const callback = () => setIsLoggedIn(WebsiteApi.canAccess);
    EventDispatcher.listen(EventDispatcher.LOGGED_IN, callback);
    return () => EventDispatcher.deafen(EventDispatcher.LOGGED_IN, callback);
  }, []);

  return (
    <Router>
      <header id="top" className="lift">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand" href="/"><img src={logo} height="40" alt="Twin City Cloud 7"/></a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav">
              {links}
            </ul>
          </div>
        </div>
      </nav>
      </header>
      <div className="main-content d-flex flex-fill">
        <div className="container d-flex flex-column">
          <Routes>
            {routes}
            {isLoggedIn && Navigation.ownerArea.map(makeRoute)}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
      <PublicFooter/>
    </Router>
  )
}

export default App
