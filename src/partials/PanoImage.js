import React, { useEffect } from 'react';
import knownPictures from "../data/knownPanoPictures.yaml"
import EventDispatcher from '../services/EventDispatcher';
import './PanoImage.css';
import * as THREE from 'three';

const piOver180 = Math.PI / 180;

const PanoImage = (props) => {
    const {image, initalLat, initalLon, children} = props;
    const containerRef = React.useRef();

    let camera = null, scene = null, renderer = null, hClearUserInteracting = null, onPointerDownMouseX = 0, onPointerDownMouseY = 0, onPointerDownLon = 0, onPointerDownLat = 0;

    let isUserInteracting = false, lon = initalLon || 0, lat = initalLat || 0, phi = 0, theta = 0;
    
    let eventsAddedTo = null;

    if(!knownPictures[image])
        return <div>Key {image} not found</div>

    const init = (container) => {
        const {width, height} = containerRef.current.getBoundingClientRect();
        camera = new THREE.PerspectiveCamera( 75, width / height, 1, 1100 );
        camera.target = new THREE.Vector3( 0, 0, 0 );
    
        scene = new THREE.Scene();
    
        let geometry = new THREE.SphereGeometry( 500, 60, 40 );
        geometry.scale( -1, 1, 1 );
    
        let material = new THREE.MeshBasicMaterial( {
            map: new THREE.TextureLoader().load( `images/pano/${knownPictures[image].src}` )
        } );
    
        let mesh = new THREE.Mesh( geometry, material );
    
        scene.add( mesh );
    
        renderer = new THREE.WebGLRenderer();
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize(width, height );
        container.appendChild( renderer.domElement );
    
        containerRef.current.style.touchAction = 'none';
        containerRef.current.addEventListener('pointerdown', onPointerDown);
        containerRef.current.addEventListener('wheel', onMouseWheel);
        eventsAddedTo = containerRef.current;
    }
    
    function onPointerDown( event ) {

        if ( event.isPrimary === false ) return;

        if(hClearUserInteracting){
            clearTimeout(hClearUserInteracting);
            hClearUserInteracting = null;
        }

        isUserInteracting = true;

        onPointerDownMouseX = event.clientX;
        onPointerDownMouseY = event.clientY;

        onPointerDownLon = lon;
        onPointerDownLat = lat;

        eventsAddedTo.addEventListener( 'pointermove', onPointerMove );
        eventsAddedTo.addEventListener( 'pointerup', onPointerUp );

    }

    function onPointerMove(event) {

        if ( event.isPrimary === false ) return;

        lon = ( onPointerDownMouseX - event.clientX ) * 0.1 + onPointerDownLon;
        lat = ( event.clientY - onPointerDownMouseY ) * 0.1 + onPointerDownLat;

    }

    function onPointerUp(event) {

        if ( event.isPrimary === false ) return;

        hClearUserInteracting = setTimeout(() => {
            isUserInteracting = false;
            hClearUserInteracting = null;
        }, 1000);

        eventsAddedTo.removeEventListener('pointermove', onPointerMove );
        eventsAddedTo.removeEventListener('pointerup', onPointerUp );

    }
    
    const onMouseWheel = (event) => {
        event.preventDefault();
        camera.fov += event.deltaY * 0.05;
        camera.fov = Math.min(100, Math.max(50, camera.fov));
        camera.updateProjectionMatrix();
    }
    
    const animate = (event) => {
        requestAnimationFrame( animate );
        update();
    }
    
    const update = () => {
        if ( isUserInteracting === false )
            lon += 0.1;
    
        lat = Math.max( -85, Math.min( 85, lat ) );
        phi = (90 - lat) * piOver180;
        theta = lon * piOver180;
    
        camera.target.x = 500 * Math.sin( phi ) * Math.cos( theta );
        camera.target.y = 500 * Math.cos( phi );
        camera.target.z = 500 * Math.sin( phi ) * Math.sin( theta );
    
        camera.lookAt( camera.target );
    
        renderer.render( scene, camera );
    }

    useEffect(() => {
        if(!camera && containerRef.current) {
            init(containerRef.current);
            animate();
        }
        const onResize = () => {
            const {width, height} = containerRef.current.getBoundingClientRect();
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        
            renderer.setSize( width, height );
        };
    
        EventDispatcher.listen(EventDispatcher.MEDIA_CHANGED, onResize);
        onResize();
        return () => {
            eventsAddedTo.removeEventListener( 'pointerdown', onPointerDown );
            eventsAddedTo.removeEventListener( 'wheel', onMouseWheel );
            EventDispatcher.deafen(EventDispatcher.MEDIA_CHANGED, onResize);
        };
      });

    return (<div className="position-relative" style={knownPictures[image].style}>
        <div ref={containerRef} className="w-100 h-100"></div>
        <div className="position-absolute absolute-gutter-fill pano-image">
            {children}
        </div>
    </div>);
}

export default PanoImage;