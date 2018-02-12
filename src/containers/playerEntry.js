import React, { Component } from 'react';
import '../ui-toolkit/css/nm-cx/main.css';

//package imports
import { connect } from "react-redux";
import { 
    Link
    } from 'react-router-dom';

//App Imports
import { getPlayerData, 
         setPlayerOne,
         setPlayerTwo } from '../actions/actions';
import PlayerCard from '../components/playerCard';
import PlayerFound from '../components/playerFound';

class PlayerEntry extends Component {
    constructor(props) {
        super(props);

        this.state = {
            playerOneValue: '',
            playerTwoValue: '',
            showWaitSpinner: false,

        }

        //bindings
        this.handleInputDidChange = this.handleInputDidChange.bind(this);
        this.handleWaitSpinner = this.handleWaitSpinner.bind(this);
        this.handleError = this.handleError.bind(this);
    }

    handleInputDidChange (event) {
        //console.log("Entering handleInputDidChange");
        let localInputChange = event.target.value;
        let localInputName = event.target.name;
        //console.log("handleInputDidChange for " + localInputName + " | Updated Value: " + localInputChange);
        this.setState({[localInputName]: localInputChange});
        //console.log("Leaving handleInputDidChange");
    }

    handleWaitSpinner(displayTheWaitSpinner) {
        console.log("Entering handleWaitSpinner - Bool Value is: ", displayTheWaitSpinner);
        this.setState({showWaitSpinner: displayTheWaitSpinner});
        console.log("Leaving handleWaitSpinner");
    }

    handleError() {
        alert("player not found");
    }

   handleGetUserClick() {
       console.log("Entering handleGetUserClick");
        this.props.getPlayerData(this.state.playerOneValue, this.handleWaitSpinner, this.props.setPlayerOneData, this.handleError);
       console.log("Leaving handleGetUserClick");
   }

    componentDidMount() {
        console.log("Entering componentDidMount"); //debug
        //this.props.displayCityWeather();
        console.log("Leaving componentDidMount"); //debug
    }

    render() {
        //figure out what's in props
        //console.log("PlayerEntry Props: ", this.props);

        //get local path for links
        //let localPath = this.props.match.path;
        //console.log(localPath);

        return (
            <div className="card padding-medium">
                <div className="row">
                    <div className="small-6 columns">
                        {this.props.playerOneData === undefined ?
                            <PlayerCard playerCardName="One" setPlayerData={this.props.setPlayerOneData} getPlayerData={this.props.getPlayerData} />
                        :
                            <PlayerFound gitHubUserName={this.props.playerOneData.name} gitHubAvatarURL={this.props.playerOneData.avatar_url} />
                        }
                    </div>
                    <div className="small-6 columns">
                        {this.props.playerTwoData === undefined ?
                            <PlayerCard playerCardName="Two" setPlayerData={this.props.setPlayerTwoData} getPlayerData={this.props.getPlayerData} />
                            :
                            <PlayerFound gitHubUserName={this.props.playerTwoData.name} gitHubAvatarURL={this.props.playerTwoData.avatar_url} />
                        }
                    </div>
                </div>
                <div className="row">
                    &nbsp;
                </div>
                <div className="row">
                    <div className="small-12 columns">
                    {this.props.playerOneData !== undefined && this.props.playerTwoData ?
                        <Link to="/results"><button className="button btn-cta expand">Battle!!</button></Link>
                        :
                        <div></div>
                    }
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
        getPlayerData: (playerName, waitFlag, successFunction, errorFunction) => {
            dispatch(getPlayerData(playerName, waitFlag, successFunction, errorFunction)); 
        },
        setPlayerOneData: (playerData) => {
            dispatch(setPlayerOne(playerData));
        },
        setPlayerTwoData: (playerData) => {
            dispatch(setPlayerTwo(playerData));
        }
      };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(PlayerEntry);