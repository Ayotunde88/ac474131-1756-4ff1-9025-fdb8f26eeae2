import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Archive = () => {
    const navigate = useNavigate();
    const dateoptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }
    const timeOptions = {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    };
    const apiBaseUrl = "https://aircall-backend.onrender.com";
    const [activities, setActivities] = useState([]);

    const fetchArchivedCalls = async () => {
        try {
            const response = await fetch(`${apiBaseUrl}/activities`);
            if (response.status !== 200) {
                throw new Error('Failed to fetch activities');
            }
            const responsedata = await response.json();
            setActivities(responsedata);
        } catch (error) {
            console.error('Error fetching activities:', error);

        }
    };

    useEffect(() => {
        fetchArchivedCalls();
    }, [activities]);
    const handleAnotherCallDetails = (callId) => {
        navigate(`/activitydetails/${callId}`);
    }
    const archivedCalls = activities.filter(call => call.is_archived);
    return (
        <div>
            <div className="row">
                <div className="col-6">
                    {/* <h2>Activity Feed</h2> */}
                </div>
                <div className="col-6">
                    <button onClick={() => {

                    }} className='text-left archive-button' style={{}}><i className="fas fa-archive"></i> Unarchive Calls</button>
                </div>
            </div>
            <ul className='activity-container'>
                {archivedCalls.length === 0 ? (
                    <li>No archived calls</li>
                ) : (
                    archivedCalls.map(call => (
                        <li key={call.id} onClick={() => {
                            handleAnotherCallDetails(call.id)
                        }}>
                            <div className='created_at'>
                                <span>{new Date(call.created_at).toLocaleDateString('en-US', dateoptions)}</span>
                            </div>
                            <div className='activity-feed'>
                                <div className="row">
                                    <div className='col-3'>
                                        <span className='call-direction'>
                                            {call.direction === "inbound" ? (
                                                <div>
                                                    <i className="fas fa-arrow-down" style={{ fontSize: "10px", color: "green" }}></i>
                                                    <div>
                                                        <i className="fas fa-phone" style={{ marginLeft: "3px", marginTop: "-10px", color: "orangered" }}></i>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div>
                                                    <i className="fas fa-arrow-up" style={{ fontSize: "10px", color: "red" }}></i>
                                                    <div>
                                                        <i className="fas fa-phone" style={{ marginLeft: "3px", marginTop: "-10px", color: "orangered" }}></i>
                                                    </div>
                                                </div>
                                            )}
                                        </span>
                                    </div>
                                    <div className='col-6'>
                                        <div>
                                            <span className='call-from'>{call.from}</span>
                                        </div>
                                        <div>
                                            <span className='call-to'>Dialed {call.to}</span>
                                        </div>
                                    </div>
                                    <div className="col-3">
                                        <span className='call-time'>{new Date(call.created_at).toLocaleTimeString('en-US', timeOptions)}</span>
                                    </div>
                                </div>
                                <div className='row' style={{ float: "right" }}>
                                    <div className="col">
                                        {/* <span className='call-via'>{call.via}</span>
                        <span className='call-call_type' style={{
                          color:
                            call.call_type === 'missed' ? 'red' :
                            call.call_type === 'answered' ? 'green' :
                            call.call_type === 'voicemail' ? 'orange' : 'black'
                        }}>{call.call_type}</span> */}
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default Archive;
