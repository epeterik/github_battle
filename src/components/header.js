import React, { Component } from 'react';
import { 
    Link
    } from 'react-router-dom';
import '../ui-toolkit/css/nm-cx/main.css';

class Header extends Component {
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
        console.log("Header Props: ", this.props);

        return (
            <div className="row">   
                <div className="small-6 columns">
                    <h1>
                        GitHub Battle
                    </h1>
                </div>
                <div className="small-6 columns text-right">
                    {this.props.location.pathname !== "/rankings" ?
                     <div><b><Link to="/">Battle</Link></b> | <Link to="/rankings">Rankings</Link></div>
                     :
                     <div><Link to="/">Battle</Link> | <b><Link to="/rankings">Rankings</Link></b></div>
                    }
                </div>
            </div>
        ); //End of Return

    } //End of Render()

} //end of Header

export default Header;