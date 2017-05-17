var React = require("react");
var ListItem = require("./listitem.js");

var ApptsList = React.createClass({
	getInitialState: function() {
		return {
			apptsData: [
				{
					"petName": "Buffy",
					"owner": "Peter",
					"date": "10/05/2017",
					"aptNotes": "Test text is here 1"
				},
				{
					"petName": "Wooffy",
					"owner": "John",
					"date": "22/04/2017",
					"aptNotes": "Test text is here 2"
				},
				{
					"petName": "ScoobyDoo",
					"owner": "Anna",
					"date": "01/03/2017",
					"aptNotes": "Test text is here 3"
				}
			],
			toggleForm: false
		}

	},

	// componentWillMount: function() {
	// 	this.getAjaxData();
	// },

	// getAjaxData: function() {

	// 	var request = new XMLHttpRequest();
	// 	request.onreadystatechange = function() {
	// 		if(request.readyState == 4 && request.status == 200) {
	// 			var resp = request.responseText;
	// 			var arr = JSON.parse(resp);
	// 			this.setState({apptsData: arr});
	// 			console.log(arr);
	// 		}
	// 	}.bind(this);
		
	// 	request.open("GET", "appdata.json", true);
	// 	request.send();

	// },

	setData: function() {
		var petName = this.refs.setpetname.value;
		var ownerName = this.refs.setowner.value;
		var date = this.refs.setdate.value;
		var aptNotes = this.refs.setnote.value;
		var newData = {
			"petName": petName,
			"owner": ownerName,
			"date": date,
			"aptNotes": aptNotes
		};
		var arr = this.state.apptsData;
		arr.push(newData);
		this.setState({apptsData: arr});

		this.refs.setpetname.value = "";
		this.refs.setowner.value = "";
		this.refs.setdate.value = "";
		this.refs.setnote.value = "";

	},

	showForm: function() {
		this.setState({toggleForm: !this.state.toggleForm})
	},

	delAppointment: function(index) {
		var arr = this.state.apptsData;
		arr.splice(index, 1);
		this.setState({apptsData: arr});
	},

	render: function() {
		var apts = this.state.apptsData.map(function(item, index) {
			return (
					<ListItem  petName={item.petName} owner={item.owner} date={item.date} aptNotes={item.aptNotes} key={index + item.owner} del={this.delAppointment} appIndex={index} />
				)			
		}.bind(this));
		return (
			<div>
				<div className="header">
					<div className="addAppointment" onClick={this.showForm}>+ Add appointment</div>
					<div className="hideBlock" style={ {display: this.state.toggleForm ? "block" : "none"} }>
						<div>
							<label>Pet Name </label>
							<input ref="setpetname" type="text" placeholder="Pet's Name" />
						</div>
						<div>
							<label>Pet Owner </label>
							<input ref="setowner" type="text" placeholder="Owner's Name" />
						</div>
						<div>
							<label>Date </label>
							<input ref="setdate" type="text" placeholder="mm/dd/yyyy"/>
						</div>
						<div>
							<label>Apt. Notes </label>
							<textarea ref="setnote" placeholder="Appointment's Notes"></textarea>
						</div>
						<button className="add" onClick={this.setData}>Add Appointment</button>
					</div>
				</div>
				<div className="appts">
					{apts}
				</div>
			</div>
		);
	}
});

module.exports = ApptsList;