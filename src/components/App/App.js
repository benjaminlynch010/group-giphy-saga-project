import React from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom/cjs/react-router-dom';
import Search from '../Search/Search';
import Favorites from '../Favorites/Favorites';




function App(props) {
  return (
    <div>
      <Router>
        <h1>Giphy Search!</h1>

        <Route path='/' exact>
          <Search />
        </Route>


        <Route path='/favorites' exact>
          <Favorites />
        </Route>

      </Router>
    </div>
  );
}

export default App;
