var React = require("react");

var ListItem = React.createClass({

	delThisApp: function() {
		this.props.del(this.props.appIndex);
	},
	
	render: function() {
		return (
			<div className="eachItem">
				<button className="clearAppointment" onClick={this.delThisApp}>x</button>
				<h1>{this.props.petName}</h1>
				<p>{this.props.owner}</p>
				<p>{this.props.date}</p>
				<p>{this.props.aptNotes}</p>
			</div>
		);
	}
});

module.exports = ListItem;