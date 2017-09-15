import React from 'react';
import Radium from 'radium';
import styles from './NotificationDiv.css.js';
import {Motion, spring,} from 'react-motion';

class NotificationDiv extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			height:-30,
		}
		setTimeout(function() { this.setState({height: 0}); }.bind(this), 1);
	}

	render() {
		return(
			<Motion style={{x: spring(this.state.height)}}>
				{({x}) =>
					// children is a callback which should accept the current value of
					// `style`
					<div style={[{
						WebkitTransform: `translate3d(0, ${x}px, 0)`,
						transform: `translate3d(0, ${x}px, 0)`,
					}, styles[this.props.type], styles.div]}>
						{this.props.children}
					</div>
				}
			</Motion>
		)
	}
}

export default Radium(NotificationDiv);