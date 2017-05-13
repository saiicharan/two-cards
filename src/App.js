import React, { Component } from 'react';
import _ from 'lodash';
import Field from './Fields';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      baseAmt: null,
      bankBalance: 0,
      players: []
    }
    this.addPlayer = this.addPlayer.bind(this);
    this.updateName = this.updateName.bind(this);
    this.onBaseAmtChange = this.onBaseAmtChange.bind(this);
  }

  updateBankBalance() {
    let bankBalance = this.state.players.length * this.state.baseAmt;
    this.setState({ bankBalance });
  }

  onPlayerCountChange(e) {
    this.setState({ playerCount: e.target.value }, this.updateBankBalance);
  }

  onBaseAmtChange(e) {
    this.setState({ baseAmt: e.target.value}, this.updateBankBalance);
  }

  updateName(e) {
    this.setState({ name: e.target.value });
  }

  updatePlayer() {
    let players = _.union(this.state.players, [{id: Date.now(), name: this.state.name}]);
    this.setState({ name: "", players })
  }

  updatePlayerBalance(val, index) {
    console.log('val and index', val, index);
  }

  addPlayer() {
    this.setState({ name: this.state.name }, this.updatePlayer);
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Two Cards</h2>
        </div>
        <div>
        <label htmlFor="player-name"> Add a player</label>
        <input type="text" id="player-name" onChange={this.updateName} />
        <button onClick={this.addPlayer}> Add </button>
        </div>
        <div>
        <label htmlFor="base-amt"> Enter the base amount</label>
        <input type="number" id="base-amt" onChange={this.onBaseAmtChange} />
        </div>
        <p>Current Bank balance: {this.state.bankBalance}</p>

        <Field players={this.state.players}
               updatePlayerBalance={this.updatePlayerBalance} />
      </div>
    );
  }
}

export default App;
