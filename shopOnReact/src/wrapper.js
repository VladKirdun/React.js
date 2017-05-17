var React = require("react");
var Item = require("./item.js");

class Wrapper extends React.Component {
	constructor(props) {
		super(props),
		this.state = {
			items: [
							{
								"img" : "images/apple.jpg",
								"name" : "Apple",
								"cost" : 150
							},
							{
								"img" : "images/banana.jpg",
								"name" : "Banana",
								"cost" : 200
							},
							{
								"img" : "images/orange.jpg",
								"name" : "Orange",
								"cost" : 180
							},
							{
								"img" : "images/mango.jpg",
								"name" : "Mango",
								"cost" : 230
							},
							{
								"img" : "images/hurma.jpg",
								"name" : "Hurma",
								"cost" : 250
							},
							{
								"img" : "images/grape.jpg",
								"name" : "Grape",
								"cost" : 170
							},
							{
								"img" : "images/lemon.jpg",
								"name" : "Lemon",
								"cost" : 140
							},
							{
								"img" : "images/kivi.jpg",
								"name" : "Kivi",
								"cost" : 190
							},
							{
								"img" : "images/grapefruit.jpg",
								"name" : "Grapefruit",
								"cost" : 210
							}
						],
			sort: true,
			currentCost: 300,
			currentName: '',
			minNum: 0,
			maxNum: 9,
			flag: true
		}
	}

	componentWillMount() {
		this.getAjaxData();
	}

	getAjaxData() {
		var request = new XMLHttpRequest();
		request.onreadystatechange = function() {
			if(request.readyState == 4 && request.status == 200) {
				var resp = request.responseText;
				var arr = JSON.parse(resp);
				this.setState({items: arr});
			}
		}.bind(this);
		
		request.open("GET", "items.json", true);
		request.send();
	}

	sortOnName(arr) {		
		arr.sort(function(a, b){
			if(a.name > b.name){
				return 1
			}
			else {
				return -1
			}
		});
	}

	sortOnCost(arr) {
		arr.sort(function(a, b){
			if(a.cost > b.cost){
				return 1
			}
			else {
				return -1
			}
		});
	}

	selectSort(e){
		if(e.target.selectedIndex == 0) {
			this.setState({sort: true});
		}
		else {
			this.setState({sort: false});
		}
		//this.setState({sort: !this.state.sort});
	}

	buttonFuncOne(){
		this.setState({minNum: 0, maxNum: 3});
	}

	buttonFuncTwo(){
		this.setState({minNum: 3, maxNum: 6});
	}

	buttonFuncThree(){
		this.setState({minNum: 6, maxNum: 9});
	}

	showFullList(){
		this.setState({minNum: 0, maxNum: 9});
	}

	filterMaxPrice(arr){
    var newarr = arr.filter(function(item){
      return item.cost <= this.state.currentCost;
    }.bind(this))
    return newarr
  }

  filterName(arr){
    var newarr = arr.filter(function(item){
      return item.name.toLowerCase().includes(this.state.currentName);
    }.bind(this))
    return newarr
  }

  getValue(e){
  	this.setState({flag: true});
    var currentValue = e.target.value;
    this.setState({currentCost: currentValue});
  }

  getName(e){
  	this.setState({flag: false});
    var currentName = e.target.value.toLowerCase();
    this.setState({currentName: currentName});
  }

	render() {

		var arrItems =  this.state.items;
		if(this.state.sort) {			
			this.sortOnName(arrItems);
		}
		else { 			
			this.sortOnCost(arrItems);
		};
		var newArr;
		if(this.state.flag){
			newArr = this.filterMaxPrice(arrItems);
		}
		else{
			newArr = this.filterName(arrItems);
		}
		
		return(	
			<div>
				<nav>
					<ul>
						<li onClick={this.buttonFuncOne.bind(this)}>1</li>
						<li onClick={this.buttonFuncTwo.bind(this)}>2</li>
						<li onClick={this.buttonFuncThree.bind(this)}>3</li>
					</ul>
				</nav>
				<div className="wrapper">
					<aside>
						<h2>Search</h2>
						<input className="getName" type="text" placeholder="search..." onChange={this.getName.bind(this)}/>
						<h2>Price</h2>
						<input onChange= {this.getValue.bind(this)} type="range" min="100" max="300" value={this.state.currentCost}/>
						<input className="sort" type="text" value={this.state.currentCost}/>
						<h2>Sort</h2>
						<select onChange={this.selectSort.bind(this)}>
							<option>By Name</option>
							<option>By Cost</option>
						</select>
						<button onClick={this.showFullList.bind(this)}>Show Full List</button>
					</aside>
					<main>
						{
							newArr.map( (item, index) => {
								if(index >= this.state.minNum && index < this.state.maxNum){
									return (
										<Item img={item.img} name={item.name} cost={item.cost} key={item.cost}/>
									)
								}
							})
						}
					</main>
				</div>	
			</div>	
		)
	}
}

module.exports = Wrapper;