import React from 'react';
import { Router, Route } from 'react-router';
import Calendar from '../../components/calendar/Calendar';
import { createBrowserHistory } from "history";

const customHistory = createBrowserHistory();

const App = (props) => {
  return (
    <Router history={customHistory}>
      <Route path="/" component={Calendar} />
    </Router>
  );
}

export default App;
