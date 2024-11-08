// Mempool.js
import React, { useState } from 'react';
import IframeModal from '../modals/iframeModal';

const Mempool = ({ apiEndpoint }) => {

    const [loading, setLoading] = useState(false);
    const [mempoolJson, setMempoolJson] = useState({});

    const onRefresh = async () => {
        setLoading(true);
        try{
            let response = await fetch(apiEndpoint + "mempool/events");
            setMempoolJson(await response.json());
        }
        catch(e){
            console.log(e);
        }

        setLoading(false);
    }

    return (
        <div className="mt-4 p-4 bg-white shadow rounded">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Latest Mempool</h2>
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
                        <th className="px-4 py-2 w-3/12">Event</th>
                        <th className="px-4 py-2 w-3/12">Tx Hash</th>
                        <th className="px-4 py-2 w-4/12">Params</th>
                        <th className="px-4 py-2 w-2/12">View</th>
                        </tr>
                    </thead>
                    <tbody>
                    {mempoolJson?.result?.map((item, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                                <td className="px-4 py-2 break-words">{item.event}</td>
                                <td className="px-4 py-2 break-words">{item.tx_hash}</td>
                                <td className="px-4 py-2 break-words">{JSON.stringify(item.params)}</td>
                                <td className="px-4 py-2 ">
                                    <IframeModal buttonText="Horizon" iframeUrl={"https://explorer.unspendablelabs.com/tx/" + item.tx_hash}></IframeModal>
                                    <IframeModal buttonText="Tokenscan.io" iframeUrl={"https://tokenscan.io/tx/" + item.tx_hash}></IframeModal>
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
  
  export default Mempool;
