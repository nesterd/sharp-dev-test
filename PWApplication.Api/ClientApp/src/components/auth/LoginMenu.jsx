import React, {Component, Fragment} from 'react';
import Utils from '../../Utils';
import { NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import '../NavMenu.css';

export class LoginMenu extends Component {

    constructor(props){
        super(props);
        this.state = {
            authenticated: false,
            userName: undefined,
            userAmount: undefined
        }
    }

    componentDidMount(){
        this.GetUserInfo();
    }

    logout(){
        Utils.clearAuth();
        window.location.href = '/';
    }

    render(){
        let content = this.state.authenticated ?

            <Fragment>
                <NavItem>
                    <NavLink tag={Link} className="text-dark" to='account-manage'>Hello {this.state.userName}</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink  className="text-success" >{this.state.userAmount} pw.</NavLink>
                </NavItem>
                
                <NavItem>
                    <NavLink tag={Link} className="text-dark" to='#' onClick={this.logout}>Logout</NavLink>
                </NavItem>
            </Fragment>
            
            :

            <Fragment>
                <NavItem>
                    <NavLink tag={Link} className="text-dark" to='login'>Login</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} className="text-dark" to='register'>Register</NavLink>
                </NavItem>
            </Fragment>
                        
        return(content);
    }

    async GetUserInfo(){
        const response = await Utils.fetchAuth('/users/info');
        if(response.ok){
            const userInfo = await response.json();
            this.setState({userName: userInfo.name, userAmount: userInfo.currentAmount, authenticated: true})
        }
    }
}