//package imports
import React, { Component } from 'react';
import { connect } from "react-redux";
import { 
    Link
    } from 'react-router-dom';

//CSS imports
import '../ui-toolkit/css/nm-cx/main.css';
import '../css/custom.css';

//App Imports
import { resetPlayerData } from '../actions/actions';

class BattlePlayers extends Component {
    constructor(props) {
        super(props);

        this.state = {
          //  cityName: '',
          //  cityImageUrl: ''
        }

        //bindings
        //this.handleInputDidChange = this.handleInputDidChange.bind(this);
    }

    componentDidMount() {
        console.log("Entering componentDidMount"); //debug
        //this.props.displayCityWeather();
        console.log("Leaving componentDidMount"); //debug
    }

    render() {
        //figure out what's in props
        console.log("BattlePlayers Props: ", this.props);

        //create local var for players - saves on having to type this.props
        let localPlayerOne = this.props.playerOneData;
        let localPlayerTwo = this.props.playerTwoData;

        //handle situation if user randomly navigated here -
        //  no player data to use, guide them back to home/base "/"
        if (localPlayerOne === undefined || localPlayerTwo === undefined)
        {
            return (
                <div className="card padding-medium">
                    <div className="row text-center">
                        <h3>You haven't selected any players yet!</h3>
                        <p>Please follow the link below to select some players</p>
                    </div>
                    <div className="row text-center">
                        <Link to="/">Click here to select players to battle!</Link>
                    </div>
                </div>
            );
        }

        //now that we know we have data, calc and compare!
        let localPlayerOneScore = localPlayerOne.playerScore; //(localPlayerOne.public_repos + localPlayerOne.followers) * 12;
        let localPlayerTwoScore = localPlayerTwo.playerScore; //(localPlayerTwo.public_repos + localPlayerTwo.followers) * 12;

        return (
            <div className="card padding-medium">
                <div className="row">
                    <div className="small-6 columns" style={{paddingLeft: "25px"}}>
                        <div className="row">
                            <h2 className="winningPlayer">1st Place</h2>
                        </div>
                        <div className="row winningPlayer">
                            {localPlayerOneScore > localPlayerTwoScore ?
                                <p>{localPlayerOne.name + " (Score: " + localPlayerOneScore + ")"}</p>
                                :
                                <p>{localPlayerTwo.name + " (Score: " + localPlayerTwoScore + ")"}</p>
                            }
                        </div>
                        <div className="row">
                            <h2 className="losingPlayer">2nd Place</h2>
                        </div>
                        <div className="row losingPlayer">
                            {localPlayerOneScore > localPlayerTwoScore ?
                                <p>{localPlayerTwo.name + " (Score: " + localPlayerTwoScore + ")"}</p>
                                :
                                <p>{localPlayerOne.name + " (Score: " + localPlayerOneScore + ")"}</p>
                            }
                        </div>
                    </div>
                    <div className="small-6 columns">
                        <div className="card padding-medium text-center">
                            <div className="row">
                                {localPlayerOneScore > localPlayerTwoScore ?
                                    <img alt="player one avatar" src={localPlayerOne.avatar_url} height="256" width="256" />
                                    :
                                    <img alt="player two avatar" src={localPlayerTwo.avatar_url} height="256" width="256" />
                                }
                            </div>
                            <div className="row text-center">
                                {localPlayerOneScore > localPlayerTwoScore ?
                                    <h3>{localPlayerOne.name}</h3>
                                    :
                                    <h3>{localPlayerTwo.name}</h3>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    &nbsp;
                </div>
                <div className="row">
                    <div className="small-12 columns text-center">
                        <Link to="/"><button className="button btn-cta" onClick={this.props.newBattle}>Reset</button></Link>
                    </div>
                </div>
            </div>
        );

    }

}

const mapStateToProps = (state) => {
    return {
        playerOneData: state.playerOneData,
        playerTwoData: state.playerTwoData
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
      return {
            newBattle: () => {
                dispatch(resetPlayerData()); 
        } 
      };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(BattlePlayers);