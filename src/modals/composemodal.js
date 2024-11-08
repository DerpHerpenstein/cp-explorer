import React, { useState, useEffect } from 'react';

const ComposeModal = ({buttonText , form}) => {
    const [isOpen, setIsOpen] = useState(false);
  
    const openModal = () => setIsOpen(true);
    const closeModal = () => { setIsOpen(false) };
 
    useEffect(() => {
      if (isOpen) {
        //const iframe = document.querySelector('iframe');
        //iframe.onload = () => setIsLoading(false);
      }
    }, [isOpen]);
  
    return (
      <div>
        <button className="mx-1 my-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full" onClick={openModal}>{buttonText}</button>
  
        {isOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-2 pt-14 rounded-lg shadow-lg relative w-11/12 h-5/6">
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
                  {buttonText}
                </div>
                <button className="absolute top-2 right-2 text-gray-500" onClick={closeModal}>
                    &times;
                </button>
                {form}
            </div>
          </div>
        )}
      </div>
    );
  };

export default ComposeModal;