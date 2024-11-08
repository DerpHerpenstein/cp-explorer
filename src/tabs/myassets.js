// MyAssets.js
import React, { useState } from 'react';
import IframeModal from '../modals/iframemodal';
import StampIframe from '../components/stampiframe';

const MyAssets = ({ walletState, apiEndpoint }) => {

    const [loading, setLoading] = useState(false);
    const [assetsJson, setAssetsJson] = useState({});
    const [showStamps, setShowStamps] = useState(false);

    const onRefresh = async () => {
        setLoading(true);
        try{
            let response = await fetch(apiEndpoint + `addresses/${walletState.walletAddress}/balances?verbose=true`);
            setAssetsJson(await response.json());

        }
        catch(e){
            console.log(e);
        }

        setLoading(false);
    }

    return (
        <div className="mt-4 p-4 bg-white shadow rounded">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">My assets</h2>
                <label>
                    <input type="checkbox" checked={showStamps} onChange={() => setShowStamps(!showStamps)} />
                    View Stamp Content (recursive stamps will execute javascript from stampverse)
                </label>
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
                            <th className="px-4 py-2 w-3/12">Asset</th>
                            <th className="px-4 py-2 w-1/12">Quantity</th>
                            <th className="px-4 py-2 w-4/12">Description</th>
                            <th className="px-4 py-2 w-2/12">View</th>
                            <th className="px-4 py-2 w-2/12"></th>
                        </tr>
                    </thead>
                    <tbody>
                    {assetsJson?.result?.map((item, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                                <td className="px-4 py-2 break-words">{item?.asset}
                                    {showStamps? <StampIframe assetId={item?.asset} iframeUrl={"https://www.stampverse.io/s/"+item?.asset}> </StampIframe> : ""}
                                </td>
                                <td className="px-4 py-2 break-words">{item?.quantity}</td>
                                <td className="px-4 py-2 break-words"> {item?.asset_info?.description}
                                    {item?.asset_info?.description?.toLowerCase().includes("stamp:") ? 
                                        <IframeModal buttonText="StampVerse.io" iframeUrl={"https://www.stampverse.io/stamp/"+item?.asset}></IframeModal>
                                        : ""
                                    }
                                </td>
                                <td className="px-4 py-2 ">
                                    <IframeModal buttonText="Horizon" iframeUrl={"https://explorer.unspendablelabs.com/assets/" + item.asset}></IframeModal>
                                    <IframeModal buttonText="Tokenscan.io" iframeUrl={"https://tokenscan.io/asset/" + item.asset}></IframeModal>
                                </td>
                                <td className="px-4 py-2 break-words">
                                    
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
  
  export default MyAssets;