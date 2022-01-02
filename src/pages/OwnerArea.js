import React, { useState, useEffect } from 'react';
import BlobDownloadLink from '../partials/BlobDownloadLink.js';
import Markdown from '../partials/Markdown.js';
import HorizontalHeadingRule from '../partials/HorizontalHeadingRule.js';
import WebsiteApi from '../services/WebsiteApi.js';
import ownerAreaContent from '../data/ownerAreaContent.yaml'
import silhouette from '../images/182silhouette.svg';
import './OwnerArea.css';

import folderClosed from '../images/folderClosed.svg';
import folderOpen from '../images/folderOpen.svg';
import fileIcon from '../images/file.svg';

const sortFn = (l, r) => {
    if(l.children && !r.children)
        return -1;
    
    if(!l.children && r.children)
        return 1;

    return l.name.localeCompare(r.name);
}

const Icon = (props) => {
    const {svg} = props;
    return <img src={svg} style={{height: "1em"}}/>
}

const File = (props) =>{
    const {name, fileId, contentType} = props;
    return <li><Icon svg={fileIcon}/> <BlobDownloadLink href={`file/${fileId}`} contentType={contentType} download={name}>{name}</BlobDownloadLink></li>
}

const Folder = (props) => {
    const {current, canClose} = props;
    const sorted = [...current.children].sort(sortFn);

    const [isOpen, setIsOpen] = useState(canClose === false);

    return (<li><Icon svg={isOpen ? folderOpen : folderClosed }/> <span className={canClose === false ? '' : 'btn-link cursor-pointer'} onClick={() => canClose !== false && setIsOpen(!isOpen)}>{current.name}</span>
        {isOpen && <ul>
            {sorted.map((item, i) => {
                if(item.children)          
                    return <Folder key={i} current={item}/>;
                
                return <File key={i} name={item.name} fileId={item.id} contentType={item.contentType}/>;
            })}
        </ul>}
    </li>);
}

const OwnerArea = () => {
    const [fileTree, setFileTree] = useState(null);

    useEffect(() => {
        const getFileTree = async () => { 
            const fileTree = await WebsiteApi.getFileTree();
            setFileTree(fileTree);
        };
        
        if(!fileTree)
            getFileTree();
     });

     return (<div className="owner-area bg-white mt-3 flex-fill">
         {!fileTree && <div className="text-center">
            <img alt="loading" src={silhouette} className="flying-animation w-25 pt-5"/>
         </div>}
         {fileTree && <div className="p-2">
         {ownerAreaContent.motd && <>
            <HorizontalHeadingRule title="PIREP"/>
            <Markdown>
                {ownerAreaContent.motd}
            </Markdown>
         </>}
         <HorizontalHeadingRule title="Files"/>
            {fileTree.folders.length && <ul>
                {fileTree.folders.map((folder, i) => <Folder key={i} current={folder} canClose={false}/>)}
            </ul>}
         </div>}
     </div>);
}

export default OwnerArea;