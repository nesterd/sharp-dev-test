import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Utils from '../../Utils'

export class Welcome extends Component{
    constructor(props){
        super(props);
        this.state = {
            userName: undefined,
            userAmount: undefined,
            loading: true
        }
    }

    componentDidMount(){
        this.GetUserInfo();
    }

    render(){
        let contents = this.state.loading
          ? <p><em>Loading...</em></p>
          :
          <div>
            <h1>Hello, {this.state.userName || 'unknown....'}!</h1>
            <h3>Welcome to Parrot Wings, money transfer simulator.</h3>
            <p>Thanks for join us!</p>
            <p>You have just received {this.state.userAmount} parrot wings as bonus)))</p>
            <p>To start using application just press <Link to="/transaction-list">transactions</Link>!</p>
        </div>

        return(
            <div>
                {contents}
            </div>
        );
    }

    async GetUserInfo(){
        const response = await Utils.fetchAuth('/users/info');
        if(response.ok){
            const userInfo = await response.json();
            this.setState({userName: userInfo.name, userAmount: userInfo.currentAmount, loading: false})
        }
    }
}