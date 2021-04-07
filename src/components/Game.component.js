import React, { Component } from 'react';
import { BsPlayFill, BsPauseFill } from "react-icons/bs";

import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/App.css';
import AlmondGameEngine from '../engine/AlmondGameEngine';
import Almond from './Almond.component';

class Game extends Component {

  engine = new AlmondGameEngine();

  _catchAlmond = (almond) => {
    if(this.play) {
      let currentScore = this.state.score;
      this.setState({score: currentScore + this.engine.getScore(almond.props.size)});
      this.removeAlmond(almond.props.id);
    }
  }

  _destroyAlmond = (id) => {
    this.removeAlmond(id);
  }

  _generateAlmond = () => {

    let settings = this.engine.generateNewAlmond();
    let almondRef = React.createRef();
    let newAlmond = <Almond 
        key={settings.id}
        id={settings.id}
        size={settings.diameter} 
        startx={settings.startX} 
        duration={this.state.duration} 
        ref={almondRef}
        callback={this._catchAlmond}
        destroycallback={this._destroyAlmond}
        catchcallback={this._catchAlmond}
    />
    let almonds = [...this.state.almonds, newAlmond];
    this.setState({almonds: almonds});
  }

  _handleSpeedChange = (e) => {
    let newVal = parseInt(e.target.value);
    this.setState({speed: newVal});
    let duration = this.engine.getFallDuration(window.innerHeight, this.state.speed);
    this.setState({duration: duration});
    this._updateFallDuration();
  }

  _updateWindowSize = (e) => {
    this._updateFallDuration();
    this.engine.updateDimensions()
  }

  _updateFallDuration = () => {
    this.state.almonds.forEach((almond) => {
      almond.ref.current._updateSpeed(this.state.speed, this.play);
    });
  }

  _setConsoleHeight = () => {
    this.setState({ style: {height: this.engine.windowHeight} });
  }

  _togglePlay = () => {
    this.play = !this.play;
    if (this.play) {
      this.setState({playStatus: this.pauseButton});
      this.setState({showoverlay: "overlay hidden"});
    } else {
      this.setState({playStatus: this.playButton});
      this.setState({showoverlay: "overlay"})
    }

    this.state.almonds.forEach((almond) => {
      if (this.play) {
        almond.ref.current._play();
      } else {
        almond.ref.current._stop();
      }
    });
  }

  removeAlmond = (id) => {
    let almonds = this.state.almonds.filter((almond) => {
        return almond.key !== id
    });

    this.setState({almonds: almonds});
  }

  constructor(props){
    super(props)

    this._togglePlay = this._togglePlay.bind(this);
    this.playButton = <a href="#" class="btn btn-outline-success btn-lg" onClick={this._togglePlay}><BsPlayFill/></a>;
    this.pauseButton = <a href="#" class="btn btn-lg btn-outline-danger" onClick={this._togglePlay}><BsPauseFill/></a>;
    this.play = true;

    this.state = { 
      style: {height: 0}, 
      speed: 50, 
      duration: 14640, // default value, with speed
      almonds: [], 
      deleteAlmondIds: [],
      score: 0,
      playStatus: this.pauseButton,
      showoverlay: "overlay hidden"
    };
  }

  componentDidMount() {
    this.engine.updateDimensions();
    this._setConsoleHeight();
    // window.addEventListener('resize', this._updateWindowSize);

    // start timer to generate almonds
    this._updateFallDuration();
    this._generateAlmond();
    let that = this;
    setInterval(function(){
      if (that.play) {
        that._generateAlmond();
      }
    }, 1000);

    // setInterval(function(){
    //   that._clearAlmonds();
    // }, 5000);

    // for(let i = 0; i< 10; i++){
    //   this._generateAlmond();
    // }
  }
  componentWillUnmount() {
    // window.removeEventListener('resize', this._updateWindowSize);
  }

  render() {
    return (
      <div className="container main">
          <div className="row">
            <div className="col-md-6"></div>
            <div className="col-md-6 text-right score">Score: {this.state.score}</div>
          </div>
          <div className="container" id="main-game" ref={this.containerRef} style={this.state.style}>
            <div className={this.state.showoverlay}></div>
            <div id="almonds">
              {this.state.almonds}
            </div>
          </div>
          <div className="row"><br/></div>
          <div className="row">
            <div className="col-md-6">
              {this.state.playStatus}
            </div>
            <div className="col-md-6 text-right">
              <div className="range">
                <label for="speed">Volume (between 10 and 100)</label>
                <br></br>
                <input 
                  type="range" 
                  id="speed" 
                  name="speed" 
                  min={10} 
                  max={100} 
                  step={1} 
                  value={this.state.speed}
                  onChange={this._handleSpeedChange.bind(this)}
                  />
              </div>
            </div>
          </div>
      </div>

    );
  }
}

export default Game;
