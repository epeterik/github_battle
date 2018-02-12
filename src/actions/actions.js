
//Package imports
import axios from 'axios';

//App Imports
import { SET_PLAYER_ONE, 
         SET_PLAYER_TWO,
         RESET_PLAYERS,
         UPATE_RANKINGS } from './types';

export function updatePlayerRankings(returnedListOfParticipants) {
    return {
        type: UPATE_RANKINGS,
        payload: returnedListOfParticipants
    }
}

export function getListOfPlayers (waitFlag, errorFunction)
{
    console.log("Entering getListOfPlayers");

    //specify local mockAPI path
    let mockAPIPath = "http://5a82002b2f37a900124ecc92.mockapi.io/githubBattleUserHistory/";

    return (dispatch) => {
        //set state var to turn on the loading/wait spinner
        dispatch(() => waitFlag(true));

        //get list of users that have been in the Battle!!
        axios.get(mockAPIPath)
            .then((response) => {
                //Success!! :)
                console.log("List of GitHub Battle participants! - response: ", response);

                //set state var to turn off wait spinner
                dispatch(() => waitFlag(false));

                //update store with list of users
                dispatch(updatePlayerRankings(response.data));
            })
            .catch((error) => {
                //Failure!
                console.log("FAILED to get list of GitHub Battle participants :( - error: ", error);

                //set state var to turn off wait spinner
                dispatch(() => waitFlag(false));

                //update state indicating error
                //doesn't matter what the payload is, will be tested in city weather for contents
                dispatch(() => errorFunction('Error pushing user to MockAPI, Try Again'));
            })

    } //end return

} //end of pushPlayerToMockAPI

function pushPlayerToMockAPI (playerData, waitFlag, successFunction, errorFunction)
{
    console.log("Entering pushPlayerToMockAPI");

    let mockAPIPath = "http://5a82002b2f37a900124ecc92.mockapi.io/githubBattleUserHistory/";

    return (dispatch) => {

        //create local object for data to send to MockAPI
        let localGitHubScoreObject = {
            id: playerData.id,
            name: playerData.name,
            avatar_url: playerData.avatar_url,
            githubScore: playerData.playerScore
        };

        console.log(localGitHubScoreObject);

        axios.post(mockAPIPath, localGitHubScoreObject)
            .then((response) => {
                //Success!! :)
                console.log("Pushed user to mockAPI - response: ", response);

                //set state var to turn off wait spinner
                dispatch(() => waitFlag(false));

                //update store with list of users
                dispatch(() => successFunction(playerData));
            })
            .catch((error) => {
                //Failure!
                console.log("FAILED to pushed user to mockAPI - error: ", error);

                //set state var to turn off wait spinner
                dispatch(() => waitFlag(false));

                //update state indicating error
                //doesn't matter what the payload is, will be tested in city weather for contents
                dispatch(() => errorFunction('Error pushing user to MockAPI, Try Again'));
            })

    } //end return

} //end of pushPlayerToMockAPI

export function getPlayerData (playerName, waitFlag, successFunction, errorFunction)
{
    console.log("Entering getPlayerData");
    
      //construct query string to send to GitHub based on user input
      let userQueryString = "https://api.github.com/users/" + playerName;
      
      return (dispatch) => {
        //set wait spinner
        dispatch(() => waitFlag(true));

        //make axios call to OpenWeatherAPI to get city weather data back
        axios.get(userQueryString)
            .then((response) => {
                console.log("User data returned in THEN response: ", response);

                //FIX: do null name correction in returned GitHub data
                if (response.data.name === null)
                {
                    response.data.name = response.data.login;
                }

                //Calc Time Saver... Do score calc here
                let currentPlayerScore = (response.data.public_repos + response.data.followers) * 12;
                response.data = {...response.data, playerScore: currentPlayerScore};

                //update mockAPI
                dispatch(pushPlayerToMockAPI (response.data, waitFlag, successFunction, errorFunction));

                //set state var to turn off wait spinner
                //dispatch(() => waitFlag(false));

                //update store with list of users
                //dispatch(() => successFunction(response.data));
            })
            .catch((error) => {
                console.log("Error encountered: ", error);

                //set state var to turn off wait spinner
                dispatch(() => waitFlag(false));

                //update state indicating error
                //doesn't matter what the payload is, will be tested in city weather for contents
                dispatch(() => errorFunction('GitHub User Name Does Not Exist, Try Again'));
            })

    } //end return

} //end getPlayerData

export function setPlayerOne(playerData) {
        return {
            type: SET_PLAYER_ONE,
            payload: playerData
        }
}

export function setPlayerTwo(playerData) {
    return {
        type: SET_PLAYER_TWO,
        payload: playerData
    }
}

export function resetPlayerData() {
    return {
        type: RESET_PLAYERS,
        payload: {}
    }
}

