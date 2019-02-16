import React, { Component } from 'react';
import './App.css';
import Calendar from './components/calendar';
import Modal from './components/Modal/Modal'

const style = {
	position: "relative",
	margin: "50px auto"
}

class App extends Component {
	state = {
		show:false
	}

	onDayClick = (e, day) => {
		return this.showModal();
	}

	showModal = () => {
		this.setState({
			...this.state,
			show: !this.state.show
		})
	}
  render() {
    return (
      <div className="App">
				<Calendar style={style} width="400px" 
				onDayClick={(e, day) => this.onDayClick(e, day)}/>

				<input type="button"
					onClick={this.showModal}
					value="" />
				<Modal
					 onClose={this.showModal}
					 show={this.state.show}>
				</Modal>
      </div>
    );
  }
}

export default App;
