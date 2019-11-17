import React, {Component} from 'react';
import Utils from '../../Utils'
import Errors from '../Errors';

export class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: undefined,
            password: undefined,
            errors: []
        };
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.login = this.login.bind(this);
    }

    componentDidMount(){
        //Utils.clearAuth();
    }

    onChangeEmail(event){
        this.setState({email: event.target.value})
    }

    onChangePassword(event){
        this.setState({password: event.target.value})
    }

    render(){
        const errors = this.state.errors;
        return(
            <div className="container">
                <div className="row justify-content-md-center">
                    <div className="col-6 custom-login-form">
                        <h1>Login</h1>
                        <Errors errors={errors}/>
                        <form>
                            <div className="form-group row">
                                <label  className="col-sm-2 col-form-label">Email</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control"  placeholder="email@example.com" onChange={this.onChangeEmail} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label  className="col-sm-2 col-form-label">Password</label>
                                <div className="col-sm-10">
                                    <input type="password" className="form-control" placeholder="Password" onChange={this.onChangePassword} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="offset-2 col-10">
                                    <button type="button" onClick={this.login} className="btn btn-primary">Login</button>
                                </div>
                            </div>
                            
                            
                        </form>
                    </div>
                </div>
            </div>
            
        );
    }

    async login(){
        this.setState({errors: []});
        const email = this.state.email;
        const password = this.state.password;
        const response = await fetch('/account/login',{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        })
        const responseContent = await response.json();
        if(response.ok){
            Utils.saveAuth(responseContent.access_token);
            window.location.href = '/transaction-list'
            //return <Redirect to='/transactions'/>
        }
        else{
            const errorsJson = responseContent;
            this.setState({errors: Utils.getErrors(errorsJson)});
        }
    }
}