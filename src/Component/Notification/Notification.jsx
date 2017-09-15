import React from 'react';
import NotificationDiv from './NotificationDiv.jsx'

class Notification extends React.Component {

	render() {
		if (this.props.errorList.length > 0) {
			// console.log(this.props.errorList);
			return (<div style={{zIndex: 0,}}>
				{
					this.props.errorList.map((i, iterator) => {
						// console.log(i);
						return <NotificationDiv type={i.type} key={iterator}>{i.message}</NotificationDiv>;
					}
					)
				}
			</div>)
		} else {
			return <span style = {{display:'none'}}></span>
		}
	}
}

export default Notification;