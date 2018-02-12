
//App Imports
import { SET_PLAYER_ONE, 
         SET_PLAYER_TWO,
         RESET_PLAYERS,
         UPATE_RANKINGS } from '../actions/types'

    //reducer
export const reducer = (state, action) => {

    console.log("Entering Reducer");

    switch (action.type) {
    case SET_PLAYER_ONE: 
        console.log("reducer - SET_PLAYER_ONE");
        state = {...state, 
                 playerOneData: action.payload};
        return state; 
    case SET_PLAYER_TWO: 
        console.log("reducer - SET_PLAYER_TWO");
        state = {...state, 
                 playerTwoData: action.payload};
        return state; 
    case RESET_PLAYERS: 
        console.log("reducer - RESET_PLAYERS");
        state = {...state, 
                 playerOneData: undefined,
                 playerTwoData: undefined};
        return state; 
    case UPATE_RANKINGS: 
        console.log("reducer - UPATE_RANKINGS");
        state = {...state, 
                 gitHubBattleParticipants: action.payload}
        return state; 
    default: //if no case is caught, return the current unmodified state
        console.log("reducer - default");
        return state; 

    } //end switch

} //end of reducer

//only exporting one element as the default element
export default reducer;