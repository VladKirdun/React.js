var React = require("react");

class Item extends React.Component {
	constructor(props) {
		super(props),
		this.state = {
			img: "",
			name: "",
			cost: 0
		}
	}

	componentWillMount(){
		this.setState({img: this.props.img});
		this.setState({name: this.props.name});
		this.setState({cost: this.props.cost});
	}

	render() {
		return(
			<div className="product">
				<img src={this.state.img}/>
				<div className="hideDiv">
					<h3>{this.state.name}</h3>
					<span>{this.state.cost}</span>
				</div>
			</div>
		);
	}
}

module.exports = Item;