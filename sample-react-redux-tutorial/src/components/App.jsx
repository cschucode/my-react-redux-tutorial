import React from 'react'

import DatePicker from './DatePicker.tsx';
import RelapseList from './RelapseList.jsx';
import RelapseButton from './RelapseButton.jsx';
import TimeDisplay from './TimeDisplay.jsx';

const App = () => (
  <div className="row">
    <div className="col-md-4">
      <h3>Sober</h3>
      <DatePicker />
    </div>
    <div className="col-md-4">
      <TimeDisplay />
    </div>
    <div className="col-md-4">
      <h3>Relapses</h3>
      <RelapseList />
      <RelapseButton />
    </div>
  </div>
);

export default App;
