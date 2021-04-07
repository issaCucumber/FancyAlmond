import React, { Component } from 'react';
import Intro from './components/Intro.component';
import Game from './components/Game.component';

class App extends Component {
  _startClick = () => {
    this.setState({start: true});
  };

  constructor(props) {
    super(props);
    this._startClick = this._startClick.bind(this);
    this.state = {start: false};
  }

  render() {
    let content = <Intro startgamecallback={this._startClick}/>
    if(this.state.start) {
      content = <Game />
    }
    return (
      <div>
        {content}
      </div>
    );
  }
}

export default App;
