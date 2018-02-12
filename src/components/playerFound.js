import React, { Component } from 'react';
import '../ui-toolkit/css/nm-cx/main.css';

class PlayerFound extends Component {
    constructor(props) {
        super(props);

        this.state = {
            //playerUserName: ''
        }

        //bindings
        //this.handleInputDidChange = this.handleInputDidChange.bind(this);
    }

    render() {
        //figure out what's in props
        console.log("Player Found Props: ", this.props);

        //create default value for user name display
        let playerGitHubNameToDisplay = "No Name Available";

        if (this.props.gitHubUserName !== null &&
            this.props.gitHubUserName !== undefined && 
            this.props.gitHubUserName.trim() !== "")
        {
            playerGitHubNameToDisplay = this.props.gitHubUserName.trim();
        }

        //create default icon for user icon/image display
        let localplayerGitHubAvatar = "https://cdn0.iconfinder.com/data/icons/users-android-l-lollipop-icon-pack/24/user-256.png */}"

        if (this.props.gitHubAvatarURL !== null &&
            this.props.gitHubAvatarURL !== undefined &&
            this.props.gitHubAvatarURL.trim() !== "")
        {
            localplayerGitHubAvatar = this.props.gitHubAvatarURL;
        }

        return (
            <div className="card padding-medium" >
                <div className="row text-center">
                    <img alt="generic person icon" src={localplayerGitHubAvatar} height="256" width="256" />
                </div>
                <div className="row text-center">
                    {playerGitHubNameToDisplay}
                </div>
            </div>
        ); //End of Return

    } //End of Render()

} //end of PlayerCard

export default PlayerFound;