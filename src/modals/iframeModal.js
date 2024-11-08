import React, { useState, useEffect } from 'react';

const IframeModal = ({buttonText , iframeUrl}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [sandboxValue, setSandboxValue] = useState("");
    const [iframeKey, setIframeKey] = useState(0);
  
    const openModal = () => setIsOpen(true);
    const closeModal = () => {
        setSandboxValue("");
        setIsOpen(false)
    };
 
    useEffect(() => {
      if (isOpen) {
        const iframe = document.querySelector('iframe');
        iframe.onload = () => setIsLoading(false);
      }
    }, [isOpen]);
  
    return (
      <div>
        <button className="mx-1 my-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded" onClick={openModal}>{buttonText}</button>
  
        {isOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-2 pt-14 rounded-lg shadow-lg relative w-11/12 h-5/6">
                {sandboxValue == "" ? (
                    <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
                        <span className='mr-5'> Not loading properly?</span>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" 
                            onClick={ () => {
                                setSandboxValue("allow-scripts allow-same-origin")
                                setIframeKey(iframeKey+1);
                            }}>
                            Allow External Content from {buttonText}
                        </button>
                    </div>
                )
                : 
                (   
                    <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
                        External content from {buttonText} allowed
                    </div>
                )
                }
                <button className="absolute top-2 right-2 text-gray-500" onClick={closeModal}>
                    &times;
                </button>
              {isLoading && <div className="absolute inset-0 flex items-center justify-center">Loading...</div>}
              <div className="relative h-full">
                <iframe
                    src={iframeUrl}
                    key={iframeKey}
                    title={iframeUrl}
                    className="w-full h-full"
                    style={{ display: isLoading ? 'none' : 'block', /*pointerEvents: 'none'*/ }}
                    sandbox={sandboxValue}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

export default IframeModal;