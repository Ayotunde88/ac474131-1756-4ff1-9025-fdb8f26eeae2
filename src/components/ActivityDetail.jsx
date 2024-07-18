// import react hooks
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// create react class
const ActivityDetail = () => {
    const { callid } = useParams();
    const navigate = useNavigate();
    const apiBaseUrl = "https://aircall-backend.onrender.com";

    const [call, setCall] = useState(null);
    const dateoptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const timeOptions = { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
    const handlegoback = () => {
        navigate(-1);
    }
    // fetch  call data from api
    useEffect(() => {
        const fetchCall = async () => {
            try {
                const response = await fetch(`${apiBaseUrl}/activities/${callid}`);
                if (response.status !== 200) {
                    throw new Error('Failed to fetch call details');
                }
                const callData = await response.json();
                setCall(callData);
            } catch (error) {
                console.error('Error fetching call details:', error);
            }
        };

        fetchCall();
    }, [callid]);

    if (!call) {
        return <div>Loading...</div>;
    }
    // update call details by archiving call
    const handleArchiving = async (callId) => {
        try {
            const response = await fetch(`${apiBaseUrl}/activities/${callId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ is_archived: true }),
            });

            if (!response.ok) {
                throw new Error(`Failed to archive call`);
            }
            else {
                alert("Call Archived successfully")
            }

            const updatedData = await response.json();
        } catch (error) {
            console.error('Error archiving call:', error);
        }
    };
    // update call details by unarchiving call
    const handleUnArchiving = async (callId) => {
        try {
            const response = await fetch(`${apiBaseUrl}/activities/${callId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ is_archived: false }),
            });

            if (!response.ok) {
                throw new Error(`Failed to archive call`);
            }
            else {
                alert("Call Unarchived successfully")
            }
            const updatedData = await response.json();
        } catch (error) {
            console.error('Error archiving call:', error);
        }
    };
    // Display call details
    return (
        <div className="">
            <div className="justify-content-center">
                <div className="text-center avatar">
                    <div className='' onClick={handlegoback}>
                        <i className='fa fa-arrow-left mt-3 ml-3' style={{ float: "left", fontSize: "16px", color: "#7b7b7b" }}></i>
                    </div>
                    <img
                        src="https://imgs.search.brave.com/00GYl8QM6AQvLVJBjwIfbc7k9GDqm8Aw81QVAPU7ErM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA1LzAwLzU0LzI4/LzM2MF9GXzUwMDU0/Mjg5OF9McFlTeTRS/R0FpOTVhRGltM1RM/dFNnQ05VeE5sT2xj/TS5qcGc"
                        alt="Avatar"
                        className="rounded-circle mb-4 mt-4"
                        style={{ width: '100px', height: '100px' }}
                    />
                </div>
                <h4 className="mb-3">{call.from}</h4>
                <ul className="w-100">
                    <li className="list-group-item">
                        <strong>Call Type:</strong> {call.call_type}
                    </li>
                    <li className="list-group-item">
                        <strong>Direction:</strong> {call.direction}
                    </li>
                    <li className="list-group-item">
                        <strong>To:</strong> {call.to}
                    </li>
                    <li className="list-group-item">
                        <strong>Via:</strong> {call.via}
                    </li>
                    <li className="list-group-item">
                        <strong>Duration:</strong> {call.duration} seconds
                    </li>
                    <li className="list-group-item">
                        <strong>Created At:</strong> {new Date(call.created_at).toLocaleDateString('en-US', dateoptions)} at {new Date(call.created_at).toLocaleTimeString('en-US', timeOptions)}
                    </li>
                    {/* <li className="list-group-item">
                        <strong>Status:</strong> {call.is_archived ? 'Archived' : 'Active'}
                    </li> */}
                </ul>
                {call.is_archived === true ? (<div className='mt-4' style={{ float: "right" }}>
                    <button onClick={() => {
                        handleUnArchiving(callid)
                    }} className='text-left archive-button unarchive-call-button' style={{}}><i className="fas fa-archive"></i> Unrchive Call</button>
                </div>) : (<div className='mt-4' style={{ float: "right" }}>
                    <button onClick={() => {
                        handleArchiving(callid)
                    }} className='text-left archive-button archive-call-button' style={{}}><i className="fas fa-archive"></i> Archive Call</button>
                </div>)}

            </div>
        </div>
    );
};

export default ActivityDetail;
