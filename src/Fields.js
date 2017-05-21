import React from 'react';
import _ from 'lodash';

const Field = ({ updateSelectedPlayer, updatePlayerBalance, players }) => {
  let fields = _.map(players, (player, index) => {
  return (
    <div key={index}>
      <p>{_.startCase(player.name)}</p>
      <p>player balance is {player.balance}</p>
      <input type="number" onChange={(e) => updateSelectedPlayer(parseInt(e.target.value), index)} value={player.amtValue} />
      <button onClick={() => updatePlayerBalance('profit', index)}>Profit</button>
      <button onClick={() => updatePlayerBalance('loss', index)}>Loss</button>
    </div>
    )
  })
  return (
    <div>
      {fields}
    </div>
  )
}

export default Field;