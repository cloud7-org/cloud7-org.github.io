import React from 'react';
import './VisuallySatisfyingLinkSection.css'

const VisuallySatisfyingLinkSection = (props) => {
    const {links} = props;
    return <section className="visually-satisfying-link-section">
        <div>
            {links.map((l, i) => <div key={i}><span>{l.left}</span> — <span>{l.right}</span></div>)}
        </div>
    </section>
}

export default VisuallySatisfyingLinkSection;