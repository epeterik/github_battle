import React, { Component } from 'react';
import '../ui-toolkit/css/nm-cx/main.css';

//package imports
import { connect } from "react-redux";

//App Imports
import { WaitSpinner } from '../components/waitSpinner';
import { getListOfPlayers } from '../actions/actions';

class PlayerRankings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            errorText: '',
            showWaitSpinner: false
        }

        //bindings
        this.handleWaitSpinner = this.handleWaitSpinner.bind(this);
        this.handleError = this.handleError.bind(this);
    }

    handleWaitSpinner(displayTheWaitSpinner) {
        console.log("Entering playerCard.handleWaitSpinner - Bool Value is: ", displayTheWaitSpinner);
        this.setState({showWaitSpinner: displayTheWaitSpinner});
        console.log("Leaving playerCard.handleWaitSpinner");
    }

    handleError(errorEncountered) {
        console.log("Entering playCard.handleError"); //debug
        
        //wipe the incorrect player user name
        this.setState({errorText: errorEncountered});
        
        console.log("Leaving playCard.handleError"); //debug
    }

    componentDidMount() {
        console.log("Entering componentDidMount"); //debug
        this.props.getListOfPlayers(this.handleWaitSpinner, this.handleError);
        console.log("Leaving componentDidMount"); //debug
    }

    sortArrayByCalculatedGitHubScore(firstElement, secondElement) {
        return secondElement.githubScore - firstElement.githubScore
    }

    mapArrayOutputForUsersListDisplay(userObject, arrayIndex) {

        return (
            <tr key={"gitHubBattleUserRow" + arrayIndex} >
                <td key={"gitHubBattleUserNumberCol" + arrayIndex} >
                    {arrayIndex + 1}
                </td>
                <td key={"gitHubBattleUserAvatarCol" + arrayIndex} className="text-center" >
                    <div className="row">
                        <img key={"gitHubBattleUserAvatarImg" + arrayIndex} alt={"user avatar " + arrayIndex} src={userObject.avatar_url} height="200px" width="200px" />
                    </div>
                    <div className="text-center">
                        {userObject.name}
                    </div>
                </td>
                <td key={"gitHubBattleUserScoreCol" + arrayIndex}>
                    <h2>Score: {userObject.githubScore}</h2>
                </td>
            </tr>
        );

    }

    render() {
        //figure out what's in props
        console.log("PlayerRankings Props: ", this.props);

        //pulled NM scrollable table from UI Toolkit:
        //   https://uitk.learnvest.com/v/1.18.5/style-guide/tables.html</p>

        //get local path for links
        //let localPath = this.props.match.path;
        //console.log(localPath);

        //sort to new array list of users based on their calculated GitHub score
        let localSortedGitHubPlayersList = this.props.listOfGitHubBattlePlayers.slice().sort(this.sortArrayByCalculatedGitHubScore)

        return (
            <div>
                <div className="card">
                    {this.state.showWaitSpinner ?
                        <WaitSpinner />
                        :    
                        <div>
                            <h2>Rankings</h2>
                            {this.state.errorText}
                            <table className="table scrollable" summary="This table is for displaying the historical results of past GitHub user battles" >
                                <thead>
                                    <tr>
                                        <th width="30px">No.</th>
                                        <th width="300px">Avatar</th>
                                        <th width="600px">Score!</th>
                                    </tr>
                                </thead>
                                <tbody style={{height: "600px"}}>
                                    {localSortedGitHubPlayersList.map(this.mapArrayOutputForUsersListDisplay)}
                                </tbody>
                            </table>
                        </div>
                    }                    
                </div>
            </div>
        );

    }

}

const mapStateToProps = (state) => {
    return {
        listOfGitHubBattlePlayers: state.gitHubBattleParticipants
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
      return {
            getListOfPlayers: (waitFlag, errorFunction) => {
                dispatch(getListOfPlayers(waitFlag, errorFunction)); 
        } 
      };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(PlayerRankings);