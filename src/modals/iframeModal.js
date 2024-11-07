import React, { useState, useEffect } from 'react';

const IframeModal = ({buttonText , iframeUrl}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
  
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);
  
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
            <div className="bg-white p-4 rounded-lg shadow-lg relative w-11/12 h-5/6">
              <button className="absolute top-2 right-2 text-gray-500" onClick={closeModal}>
                &times;
              </button>
              {isLoading && <div className="absolute inset-0 flex items-center justify-center">Loading...</div>}
              <iframe
                src={iframeUrl}
                title="Modal Iframe"
                className="w-full h-full"
                style={{ display: isLoading ? 'none' : 'block' }}
              />
            </div>
          </div>
        )}
      </div>
    );
  };

export default IframeModal;