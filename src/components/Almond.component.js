import React, { Component } from 'react';
import { Animated, TouchableWithoutFeedback, Easing } from 'react-native';

import './../assets/Almond.css';

class Almond extends Component {
    _fall = () => {
        this.animatedFall.start(({ finished }) => {
            /* completion callback */
            if(finished) {
                this.props.destroycallback(this.props.id);
            }
        });
    }

    _fadeOut = () => {
        // Will change fadeAnim value to 0 in 5 seconds
        Animated.timing(this.state.fadeAnim, {
          toValue: 0,
          duration: 500
        }).start();
    };

    _scale = () => {
        Animated.timing(this.state.scaleAnim, {
            toValue: 10,
            duration: 500
        }).start(({ finished }) => {
            if(finished) {
                this.props.catchcallback(this);
            }
        });
    };

    _catch = () => {
        this._fadeOut();
        this._scale();
    }

    _updateSpeed = (speed, isPlaying) => {
        let currentY = this.state.moveAnim.__getValue().y;
        this.setState({duration: this.getFallDuration(window.innerHeight - currentY, speed)});

        if (isPlaying) {
            this.animatedFall = Animated.timing(this.state.moveAnim, {
                toValue: {x: this.props.startx, y: window.innerHeight},
                duration: this.state.duration,
                easing: Easing.linear,
                useNativeDriver: true
            })
            this.animatedFall.start(({ finished }) => {
                /* completion callback */
                if(finished) {
                    this.props.destroycallback(this.props.id);
                }
            });
        }
    }

    _stop = () => {
        this.animatedFall.stop()
    }

    _play = () => {
        this.animatedFall = Animated.timing(this.state.moveAnim, {
            toValue: {x: this.props.startx, y: window.innerHeight},
            duration: this.state.duration,
            easing: Easing.linear,
            useNativeDriver: true
        })
        this.animatedFall.start(({ finished }) => {
            /* completion callback */
            if(finished) {
                this.props.destroycallback(this.props.id);
            }
        });
    }

    getFallDuration = (distance, speed) => {
        let duration = Math.floor((distance / speed)*1000);
        return duration;
    }

    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            fadeAnim: new Animated.Value(1),
            scaleAnim: new Animated.Value(1),
            moveAnim: new Animated.ValueXY({x: this.props.startx, y: -1*props.size}),
            duration: this.props.duration
        };

        this.animatedFall = Animated.timing(this.state.moveAnim, {
            toValue: {x: this.props.startx, y: window.innerHeight},
            duration: this.state.duration,
            easing: Easing.linear,
            useNativeDriver: true
        })
    }

    componentDidMount() {
        this._fall();
    }

    render() {
        return (
            <div className="almond">
                <TouchableWithoutFeedback onPress={this._catch}>
                    <Animated.View
                        style={[
                            {
                                opacity: this.state.fadeAnim,
                                position: 'absolute',
                                width: parseFloat(this.props.size),
                                height: parseFloat(this.props.size),
                                transform: [
                                    {
                                      scale: this.state.scaleAnim,
                                    },
                                ]
                            },
                            this.state.moveAnim.getLayout()
                        ]}
                    >
                    </Animated.View>
                </TouchableWithoutFeedback> 
            </div>
          )
    }
}

export default Almond;