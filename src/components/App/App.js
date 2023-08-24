import React from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom/cjs/react-router-dom';
import Search from '../Search/Search';





function App(props) {
  return (
    <div>
      <Router>
        <h1>Giphy Search!</h1>

        <Route path='/' exact>
          <Search />
        </Route>

      </Router>
    </div>
  );
}

export default App;
