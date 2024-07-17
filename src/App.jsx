import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header.jsx';

import PhoneMenu from './components/menu.jsx';
import PhoneTabs from './components/tabs.jsx';
import ActivityDetail from './components/ActivityDetail.jsx';

const App = () => {
  return (
    <Router>
      <div className='container'>
        <Header />
        <Routes>
          <Route path="/" element={<PhoneTabs />} />
          <Route path="/activitydetails/:callid" element={<ActivityDetail />} />
        </Routes>
        <PhoneMenu />
      </div>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));

export default App;
