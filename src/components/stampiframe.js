import React, { useState, useEffect } from 'react';

const StampIframe = ({assetId, iframeUrl}) => {

  
    return (
        <div className="relative w-full h-64 overflow-hidden">
            <iframe
                src={iframeUrl}
                key={assetId}
                title={iframeUrl}
                sandbox="allow-scripts allow-same-origin"
                className="absolute top-0 left-0 w-full h-full"
                style={{ objectFit: 'contain' }}
            />
        </div>
    );
  };

export default StampIframe;