import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/App.css';

class Intro extends Component {

  startGameClick = () => {
    this.props.startgamecallback();
  }  

  constructor(props) {
      super(props);
      this.props = props;
  }

  render() {
    return (
        <div className="container">
            <div className="intro">
                <div className="middle">
                    <h2 className="text-center">Fancy Almond</h2>
                    <p className="text-center"><button type="button" class="btn btn-secondary" onClick={this.startGameClick}>Start Game</button></p>
                </div>
            </div>
        </div>
    );
  }
}

export default Intro;