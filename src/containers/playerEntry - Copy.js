import React, { Component } from 'react';
import '../ui-toolkit/css/nm-cx/main.css';

//package imports
import { connect } from "react-redux";

//App Imports
import { WaitSpinner } from '../components/waitSpinner';
import { getPlayerData, setPlayerOne } from '../actions/actions';

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
        console.log("PlayerEntry Props: ", this.props);

        //get local path for links
        //let localPath = this.props.match.path;
        //console.log(localPath);

        return (
            <div className="card padding-medium">
                <div className="row">
                    <div className="small-6 columns">
                        <div className="card padding-medium" >
                            <div className="row text-center">
                                <h2>Player One</h2>
                            </div>
                            <div className="row text-center">
                                <div className="small-3 columns text-left">
                                    Github Username: 
                                </div>
                                <div className="small-9 columns text-right">
                                    <input type="text" name="playerOneValue" onChange={this.handleInputDidChange} value={this.state.playerOneValue} />
                                </div>
                            </div>
                            <div className="row text-center">
                                some error text here??
                            </div>
                            <div className="row" style={{paddingLeft: "20px", paddingRight: "20px"}}>
                                <button className="button btn-cta expand" onClick={() => this.handleGetUserClick()}>Get User</button>
                                {this.state.showWaitSpinner ? <WaitSpinner /> : ""}
                            </div>
                        </div>
                    </div>
                    <div className="small-6 columns">
                        <div className="card padding-medium">
                            <div className="row text-center">
                                <h2>Player Two</h2>
                            </div>
                            <div className="row text-center text-left">
                                <div className="small-3 columns">
                                    Github Username: 
                                </div>
                                <div className="small-9 columns text-right" >
                                    <input type="text" name="playerTwoValue" onChange={this.handleInputDidChange} value={this.state.playerTwoValue} />
                                </div>
                            </div>
                            <div className="row text-center">
                                some error text here??
                            </div>
                            <div className="row" style={{paddingLeft: "20px", paddingRight: "20px"}}>
                                <button className="button btn-cta expand" >Get User</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    &nbsp;
                </div>
                <div className="row">
                    <div className="small-12 columns">
                        <button className="button btn-cta expand">Conditional Render this button!!</button>
                    </div>
                </div>
            </div>
        );

    }

}

const mapStateToProps = (state) => {
    return {
        //listOfProducts: state.productList
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
      return {
            getPlayerData: (playerName, waitFlag, successFunction, errorFunction) => {
                dispatch(getPlayerData(playerName, waitFlag, successFunction, errorFunction)); 
        },
        setPlayerOneData: (playerData) => {
            dispatch(setPlayerOne(playerData));
        }
      };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(PlayerEntry);