import React from 'react';
import PropTypes from 'prop-types';
import NotificationDiv from './NotificationDiv.jsx'

class Notification extends React.Component {
	render() {
		if (this.props.errorList.length > 0) {
			// console.log(this.props.errorList);
			return (<div style={{ zIndex: 0 }}>
				{
					this.props.errorList.map((i, iterator) => {
						// console.log(i);
						return <NotificationDiv type={i.type} key={iterator}>{i.message}</NotificationDiv>;
					}
					)
				}
			</div>)
		}

		return <span style={{ display:'none' }}/>

	}
}

Notification.propTypes = {
	errorList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Notification;