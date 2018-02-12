import React, { Component } from 'react';
import { 
  BrowserRouter,
  Route
  } from 'react-router-dom';

//import CSS
import './ui-toolkit/css/nm-cx/main.css';
import './css/custom.css'

//app imports
import PlayerEntry from './containers/playerEntry';
import BattlePlayers from './containers/battlePlayers';
import PlayerRankings from './containers/playerRankings';
import Header from './components/header';

class App extends Component {

  render() {
    
    return (
      <BrowserRouter>
        <div className="bg-off-white padding-medium">
          <Route path="/" component={ Header }  />
          <div className="row">
              <Route exact path="/" component={ PlayerEntry }  />
              <Route exact path="/results" component={ BattlePlayers } />
              <Route exact path="/rankings" component={ PlayerRankings } />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
