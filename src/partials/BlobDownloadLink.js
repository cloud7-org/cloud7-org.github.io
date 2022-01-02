import React, { useState } from 'react';
import WebsiteApi from '../services/WebsiteApi.js';
import LoadingDots from './LoadingDots.js';

const BlobDownloadLink = (props) => {
    const { href, download, children, contentType } = props;
    const [isDownloading, setIsDownloading] = useState(false); 
    const link = document.createElement('a');
    link.download = download;
    
    const downloadFile = async () => {
        setIsDownloading(true);
        const data = window.URL.createObjectURL(new Blob([await WebsiteApi.downloadToBlob(href)], {type: contentType}));
        link.href = data;
        link.click();
        setTimeout(() => window.URL.revokeObjectURL(data), 100);
        setIsDownloading(false);
    }

    return <div className="d-inline-block"><span className="btn-link cursor-pointer" onClick={downloadFile}>{children}</span> {isDownloading && <LoadingDots/>}</div>;
}

export default BlobDownloadLink;