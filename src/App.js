import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
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

const makeRoute = (item, i) => <Route key={i} exact={item.path === '/'} path={item.path} element={item.element}/>;

const links = Navigation.main.map((item, i) => <NavLink key={i} className="nav-item nav-link" to={item.path} data-toggle="collapse" data-target=".navbar-collapse.show">{item.name}</NavLink>);
const routes = Navigation.main.map(makeRoute);

const PublicFooter = () => {
  const location = useLocation();
  const navigate = useNavigate();
  if(location.pathname.toLocaleLowerCase().startsWith('/owner'))
    return '';

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
  });

  return (
    <Router>
      <header id="top" className="lift">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand" href="/"><img src={logo} height="40"/></a>
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
            <Route element={<Navigate to="/" />}/>
          </Routes>
        </div>
      </div>
      <PublicFooter/>
    </Router>
  )
}

export default App
