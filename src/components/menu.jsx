import React, { useState, useEffect } from 'react';

const PhoneMenu = () => {
    const apiBaseUrl = "https://aircall-backend.onrender.com";
    const [activities, setActivities] = useState([]);

    const fetchCalls = async () => {
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
        fetchCalls();
    }, []);

    return (
        <div className=''>
            <div className='phone-menu'>
                <div className='row phone-menu-icons'>
                    <div className='col-4'>
                        <span>
                            <i className="fas fa-phone-alt" style={{ textAlign: "center", }}></i> <span style={{ color: "#fff", fontSize: "10px", background: "red", marginLeft: "-10px", marginTop: "-15px", borderRadius: "50%", padding: "3px" }}>{activities.length}</span>
                        </span>
                    </div>
                    <div className='col-4'>
                        <i className="fas fa-user-alt" style={{ textAlign: "center", }}></i>
                    </div>
                    <div className='col-4'>
                        <span className='fa-th-outer'>
                            <i className="fas fa-th" style={{ textAlign: "center", fontSize: "23px" }}></i>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PhoneMenu;
