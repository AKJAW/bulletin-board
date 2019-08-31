import React from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';
import { Motion, spring } from 'react-motion';
import styles from './NotificationDiv.css.js';

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

NotificationDiv.propTypes = {
	type: PropTypes.string.isRequired,
	children: PropTypes.string.isRequired,
};

export default Radium(NotificationDiv);