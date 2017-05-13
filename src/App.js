import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerCount: null,
      baseAmt: null,
      bankBalance: 0
    }
    this.onPlayerCountChange = this.onPlayerCountChange.bind(this);
    this.onBaseAmtChange = this.onBaseAmtChange.bind(this);
  }

  updateBankBalance() {
    let bankBalance = this.state.playerCount * this.state.baseAmt;
    this.setState({ bankBalance });
  }

  onPlayerCountChange(e) {
    this.setState({ playerCount: e.target.value }, this.updateBankBalance);
  }

  onBaseAmtChange(e) {
    this.setState({ baseAmt: e.target.value}, this.updateBankBalance);
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Two Cards</h2>
        </div>
        <div>
        <label htmlFor="player-count"> Enter the number of players</label>
        <input type="number" id="player-count" onChange={this.onPlayerCountChange} />
        </div>
        <div>
        <label htmlFor="base-amt"> Enter the base amount</label>
        <input type="number" id="base-amt" onChange={this.onBaseAmtChange} />
        </div>
        <p>Current Bank balance: {this.state.bankBalance}</p>
      </div>
    );
  }
}

export default App;
