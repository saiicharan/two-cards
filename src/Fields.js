import React from 'react';
import _ from 'lodash';

class Field extends React.Component {
	render() {
		let fields = _.map(this.props.players, (player, index) => {
			return (
				<div key={index}>
					<p>{player.name}</p>
					<input type="number" onChange={(e) => this.props.updatePlayerBalance(e.target.value, index)} />
				</div>
			)
		})
		return (
			<div>
			{fields}
			</div>
		)
	}
}

export default Field