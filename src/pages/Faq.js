import React from 'react';
import ImageBox from '../partials/ImageBox.js';
import HeaderText from '../partials/HeaderText.js';
import HorizontalHeadingRule from '../partials/HorizontalHeadingRule.js';
import Markdown from '../partials/Markdown.js';
import faqData from '../data/faq.yaml';

const FaqItem = (props) => {
    const {title, href, children} = props;
    return (<div id={href} className="pb-3">
        <HorizontalHeadingRule title={title} headerLevelElement="h4"/>
        {children}
    </div>);
}

const Faq = () => {
    return <>
        <div className="row no-gutters">
            <ImageBox image="N735LL">
                <HeaderText
                    title="FAQ"
                    detail="Frequenty Asked Questions"
                />   
            </ImageBox>
        </div>
        <div className="bg-white mt-3">
            <div className="row no-gutters p-3">
                <div className="col-12">
                    <ul>
                        {faqData.map((item, i) => <li key={i}><a href={`#${item.href}`}>{item.title}</a></li>)}
                    </ul>
                    {faqData.map((item, i) => <FaqItem key={i} title={item.title} href={item.href}>
                        <Markdown>{item.body}</Markdown>
                        <a href="#top">Back to Top</a>
                    </FaqItem>)}
                    </div>
            </div>
        </div>
    </>
}

export default Faq;