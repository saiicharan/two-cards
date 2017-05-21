import React from 'react';
import _ from 'lodash';

const Field = ({ updateSelectedPlayer, updatePlayerBalance, players }) => {
  let fields = _.map(players, (player, index) => {
  return (
    <li className="player" key={index}>
      <p>Player: {_.startCase(player.name)}</p>
      <p>Balance: ₹{player.balance}</p>
      <input type="number" onChange={(e) => updateSelectedPlayer(parseInt(e.target.value), index)} value={player.amtValue} />
      <div className="button profit" onClick={() => updatePlayerBalance('profit', index)}>Profit</div>
      <div className="button loss" onClick={() => updatePlayerBalance('loss', index)}>Loss</div>
    </li>
    )
  })
  return (
    <ul className="player-container">
      {fields}
    </ul>
  )
}

export default Field;