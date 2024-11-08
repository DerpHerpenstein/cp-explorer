// Issuances.js
import React, { useState } from 'react';
import IframeModal from '../modals/iframeModal';

const Issuances = ({ apiEndpoint }) => {

    const [loading, setLoading] = useState(false);
    const [issuancesJson, setIssuancesJson] = useState({});

    const onRefresh = async () => {
        setLoading(true);
        try{
            let response = await fetch(apiEndpoint + "issuances");
            setIssuancesJson(await response.json());
        }
        catch(e){
            console.log(e);
        }

        setLoading(false);
    }

    return (
        <div className="mt-4 p-4 bg-white shadow rounded">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Recent Issuances</h2>
                <button
                    className={`${loading ? "bg-blue-300" : "bg-blue-500 hover:bg-blue-600"} text-white px-4 py-2 rounded`}
                    onClick={onRefresh}
                    disabled={loading}
                >
                    {loading ? 'Loading...' : 'Refresh'}
                </button>
            </div>
            <div>
                <table className="w-full table-fixed text-left">
                    <thead>
                        <tr>
                        <th className="px-4 py-2 w-1/12">Block</th>
                        <th className="px-4 py-2 w-2/12">Asset Name</th>
                        <th className="px-4 py-2 w-2/12">Quantity</th>
                        <th className="px-4 py-2 w-2/12">Event</th>
                        <th className="px-4 py-2 w-2/12">Description</th>
                        <th className="px-4 py-2 w-1/12">Status</th>
                        <th className="px-4 py-2 w-2/12">View</th>
                        </tr>
                    </thead>
                    <tbody>
                    {issuancesJson?.result?.map((item, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                                <td className="px-4 py-2 break-words">{item.block_index}</td>
                                <td className="px-4 py-2">{item.asset}</td>
                                <td className="px-4 py-2 text-right">{item.quantity}</td>
                                <td className="px-4 py-2 break-words">{item.asset_events}</td>
                                <td className="px-4 py-2 break-words">{item.description}
                                    {item.description.toLowerCase().includes("stamp:") ? 
                                        <IframeModal buttonText="StampVerse.io" iframeUrl={"https://www.stampverse.io/stamp/A96343524030498580"}></IframeModal>
                                        : ""
                                    }
                                </td>
                                <td className="px-4 py-2 break-words">{item.status}</td>
                                <td className="px-4 py-2 ">
                                    <IframeModal buttonText="Horizon" iframeUrl={"https://explorer.unspendablelabs.com/assets/" + item.asset}></IframeModal>
                                    <IframeModal buttonText="Tokenscan.io" iframeUrl={"https://tokenscan.io/asset/" + item.asset}></IframeModal>
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        </div>
    );
  };
  
  export default Issuances;
