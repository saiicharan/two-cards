import React, { Component } from 'react';
import _ from 'lodash';
import update from 'immutability-helper';
import Field from './Fields';
import logo from './two.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      baseAmt: null,
      bankBalance: 0,
      players: []
    }
    this.addPlayer = this.addPlayer.bind(this);
    this.updateName = this.updateName.bind(this);
    this.onBaseAmtChange = this.onBaseAmtChange.bind(this);
    this.updatePlayerBalance = this.updatePlayerBalance.bind(this);
    this.updateSelectedPlayer = this.updateSelectedPlayer.bind(this);
  }

  initializeBankBalance(status, amount) {
    let bankBalance = this.state.players.length * this.state.baseAmt;
    this.setState({ bankBalance });
  }

  updateBankBalance(status, amount) {
    let bankBalance = this.state.bankBalance;
    if(amount < this.state.bankBalance) {
      status === 'profit' ? this.setState({ bankBalance: bankBalance - amount }) : this.setState({ bankBalance: bankBalance + amount })
    }
  }

  onPlayerCountChange(e) {
    this.setState({ playerCount: e.target.value }, this.initializeBankBalance);
  }

  onBaseAmtChange(e) {
    this.setState({ baseAmt: e.target.value}, this.initializeBankBalance);
  }

  updateName(e) {
    this.setState({ name: e.target.value });
  }

  updatePlayer() {
    let players = _.union(this.state.players, [{id: Date.now(), name: this.state.name, amtValue: 0}]);
    this.setState({ name: "", players }, this.initializeBankBalance);
  }

  updatePlayerBalance(status, index) {
    let player = _.cloneDeep(this.state.players[index]);
    let playerAmt = _.get(player, 'amtValue', 0);
    let playerBalance = _.get(player, 'balance', 0);
    let newBalance = null;
    if(playerAmt < this.state.bankBalance) {
      newBalance = status === 'profit' ? parseInt(playerBalance + playerAmt) : parseInt(playerBalance - playerAmt);
    }
    this.setState(update(this.state, {players: {[index]: {balance: {$set: newBalance}, amtValue: {$set: 0}}}}), () => {
      this.updateBankBalance(status, playerAmt);
    });
  }

  updateSelectedPlayer(amount, index) {
    this.setState(update(this.state, {players: {[index]: {amtValue: {$set: amount}}}}));
  }

  addPlayer() {
    if(!_.isEmpty(this.state.name))
      this.setState({ name: this.state.name }, this.updatePlayer);
  }

  handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      this.addPlayer();
    }
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
        <input type="text" value={this.state.name} id="player-name" onChange={this.updateName} onKeyPress={this.handleKeyPress}/>
        <button onClick={this.addPlayer}> Add </button>
        </div>
        <div>
        <label htmlFor="base-amt"> Enter the base amount</label>
        <input type="number" id="base-amt" onChange={this.onBaseAmtChange} />
        </div>
        <p>Current Bank balance: {this.state.bankBalance}</p>
        <Field players={this.state.players}
               updatePlayerBalance={this.updatePlayerBalance}
               updateSelectedPlayer={this.updateSelectedPlayer} />
      </div>
    );
  }
}

export default App;
