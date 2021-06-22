import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MyHeatMap from './components/layout/MyHeatMap';
import AppNavBar from './components/layout/AppNavBar';
import ResidencesList from './components/residences/ResidencesList';
import ResidenceForm from './components/residences/ResidenceForm';

class App extends Component {
  render() {
    return (
        <div className="wrapper">
            <Router>
              <AppNavBar/>
              <Switch>
                <Route path='/' exact={true} component={MyHeatMap}/>
                <Route path='/residences' exact={true} component={ResidencesList}/>
                <Route path='/residences/:id' component={ResidenceForm}/>
              </Switch>
            </Router>
        </div>
    )
  }
}

export default App;
