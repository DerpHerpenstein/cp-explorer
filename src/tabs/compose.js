// MyAssets.js
import React, { useState } from 'react';
import IframeModal from '../modals/iframemodal';
import ComposeModal from '../modals/composemodal';

const Compose = ({ walletState, apiEndpoint }) => {

    const [loading, setLoading] = useState(false);
    const [showStamps, setShowStamps] = useState(false);
    const composeItems = [
        {
            name: "Dispenser Buy",
            form: "TBD"
        },
        {
            name: "Dispenser Close",
            form: "TBD"
        },
        {
            name: "Dispenser Open",
            form: "TBD"
        },
        {
            name: "Dividend",
            form: "TBD"
        },
        {
            name: "Fair Minter",
            form: "TBD"
        },
        {
            name: "Fair Mint",
            form: "TBD"
        },
        {
            name: "Issuance",
            form: "TBD"
        },
        {
            name: "MPMA",
            form: "TBD"
        },
        {
            name: "Send",
            form: "TBD"
        },
        {
            name: "Send with BTC",
            form: "TBD"
        },
        {
            name: "Sweep",
            form: "TBD"
        },
    ]

    return (
        <div className="mt-4 p-4 bg-white shadow rounded">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Compose Counterparty Transaction</h2>
            </div>
            <div className="grid grid-cols-4 gap-4">
                {composeItems?.map((item, index) => (
                    <div>
                        <ComposeModal buttonText={item?.name} form={item?.form}></ComposeModal>
                    </div>
                    
                ))}
            </div>
        </div>
    );
  };
  
  export default Compose;