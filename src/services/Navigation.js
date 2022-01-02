import React, { lazy, Suspense } from 'react';

const Home = lazy(() => import('../pages/Home.js'));
const About = lazy(() => import('../pages/About.js'));
const Photos = lazy(() => import('../pages/Photos.js'));
const Join = lazy(() => import('../pages/Join.js'));
const FAQ = lazy(() => import('../pages/Faq.js'));
const Owners = lazy(() => import('../pages/Owners.js'));
const OwnerArea = lazy(() => import('../pages/OwnerArea.js'));

const renderLoader = () => <p>Loading</p>;
const load = (element) => <Suspense fallback={renderLoader()}>{element}</Suspense>

class Navigation {
    static get main() {
        return [
            {name: 'Home', path: '/', element: load(<Home/>)},
            {name: 'About', path: '/about', element: load(<About/>)},
            {name: 'Photos', path: '/photos', element: load(<Photos/>)},
            {name: 'Join', path: '/join', element: load(<Join/>)},
            {name: 'FAQ', path: '/faq', element: load(<FAQ/>)},
            {name: 'Owners', path: '/owners', element: load(<Owners/>)}
        ];
    }

    static get ownerArea() {
        return [
            {name: 'Files', path: '/owner/files', element: load(<OwnerArea/>)}
        ];     
    }
}

export default Navigation;