import React, { Component } from 'react';
import '../ui-toolkit/css/nm-cx/main.css';

//App Imports
import { WaitSpinner } from '../components/waitSpinner';

class PlayerCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            playerUserName: '',
            errorText: '',
            showWaitSpinner: false,
        }

        //bindings
        this.handleInputDidChange = this.handleInputDidChange.bind(this);
        this.handleWaitSpinner = this.handleWaitSpinner.bind(this);
        this.handleError = this.handleError.bind(this);
    }

    handleInputDidChange (event) {
        //console.log("Entering playerCard.handleInputDidChange");
        let localInputChange = event.target.value;
        let localInputName = event.target.name;
        //console.log("playerCard.handleInputDidChange for " + localInputName + " | Updated Value: " + localInputChange);
        this.setState({[localInputName]: localInputChange});

        //clear error state when user starts entering a new user name
        if (this.state.errorText !== '')
        {
            this.setState({errorText: ''});
        }
        //console.log("Leaving playerCard.handleInputDidChange");
    }

    handleWaitSpinner(displayTheWaitSpinner) {
        console.log("Entering playerCard.handleWaitSpinner - Bool Value is: ", displayTheWaitSpinner);
        this.setState({showWaitSpinner: displayTheWaitSpinner});
        console.log("Leaving playerCard.handleWaitSpinner");
    }

    handleError(errorEncountered) {
        console.log("Entering playCard.handleError"); //debug
        
        //wipe the incorrect player user name
        this.setState({playerUserName: '',
                       errorText: errorEncountered});
        
        console.log("Leaving playCard.handleError"); //debug
    }

   handleGetUserClick() {
       console.log("Entering playCard.handleGetUserClick");
        this.props.getPlayerData(this.state.playerUserName, this.handleWaitSpinner, this.props.setPlayerData, this.handleError);
       console.log("Leaving playCard.handleGetUserClick");
   }

    render() {
        //figure out what's in props
        //console.log("Player Card Props: ", this.props);

        return (
            <div className="card padding-medium" >
                <div className="row text-center">
                    <h2>Player {this.props.playerCardName}</h2>
                </div>
                {this.state.showWaitSpinner ?
                    <WaitSpinner />
                :
                    <div>
                        <div className="row text-center">
                            <div className="small-3 columns text-left">
                                Github Username: 
                            </div>
                            <div className="small-9 columns text-right">
                                <input type="text" name="playerUserName" onChange={this.handleInputDidChange} value={this.state.playerUserName} placeholder="Enter a GitHub Username" />
                            </div>
                        </div>
                        <div className="row text-center" style={{color: "red"}}>
                            {this.state.errorText}
                        </div>
                        <div className="row" style={{paddingLeft: "20px", paddingRight: "20px"}}>
                            <button className="button btn-cta expand" onClick={() => this.handleGetUserClick()} disabled={!this.state.playerUserName}>Get User</button>
                        </div>
                    </div>
                }
            </div>
        ); //End of Return

    } //End of Render()

} //end of PlayerCard

export default PlayerCard;