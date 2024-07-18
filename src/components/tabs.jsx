// import react hooks
import React, { useState } from 'react';
import ActivityFeed from './ActivityFeed.jsx';
import Archive from './Archive.jsx';

// create react class
const PhoneTabs = () => {
    const [activeTab, setActiveTab] = useState('home');

    // handle table switching
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    // display tabs
    return (
        <div className="">
            <div className="row">
                <div className="col-4">
                    <h2 style={{ marginTop: "10px" }}>Activity Feed</h2>
                </div>
                <div className="col-8">
                    <ul className="nav nav-tabs">
                        <li className="nav-item">
                            <a
                                className={`nav-link ${activeTab === 'home' ? 'active' : ''}`}
                                onClick={() => handleTabClick('home')}
                            >
                                Inbox
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className={`nav-link ${activeTab === 'archive' ? 'active' : ''}`}
                                onClick={() => handleTabClick('archive')}
                            >
                                Archived Calls
                            </a>
                        </li>
                        {/* <li className="nav-item">
                    <a 
                        className={`nav-link ${activeTab === 'contact' ? 'active' : ''}`} 
                        onClick={() => handleTabClick('contact')}
                    >
                        Contact
                    </a>
                    </li> */}
                    </ul>
                </div>
            </div>
            <div className="tab-content mt-3">
                {activeTab === 'home' && (
                    <ActivityFeed />
                )}
                {activeTab === 'archive' && (
                    <div className="tab-pane fade show active">
                        <Archive />

                    </div>
                )}

            </div>
        </div>
    );
};

export default PhoneTabs;
