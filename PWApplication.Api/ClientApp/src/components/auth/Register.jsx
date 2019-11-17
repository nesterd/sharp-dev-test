import React, {Component} from 'react';
import Utils from '../../Utils'
import Errors from '../Errors';

export class Register extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: undefined,
            name: undefined,
            password: undefined,
            confirmPassword: undefined,
            errors: []
        };
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
        this.register = this.register.bind(this);
    }

    componentDidMount(){
        Utils.clearAuth();
    }

    onChangeEmail(event){
        this.setState({email: event.target.value})
    }

    onChangeName(event){
        this.setState({name: event.target.value})
    }

    onChangePassword(event){
        this.setState({password: event.target.value})
    }

    onChangeConfirmPassword(event){
        this.setState({confirmPassword: event.target.value})
    }

    render(){
        const errors = this.state.errors
        return(
            <div className="container">
                <div className="row justify-content-md-center">
                    <div className="col-6 custom-login-form">
                        <h1>Register</h1>
                        <Errors errors={errors}/>
                        
                        <form >
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Email</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control"  placeholder="email@example.com" onChange={this.onChangeEmail} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label  className="col-sm-2 col-form-label">Name</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control"  placeholder="your name" onChange={this.onChangeName} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Password</label>
                                <div className="col-sm-10">
                                    <input type="password" className="form-control" autoComplete="new-password"  placeholder="Password" onChange={this.onChangePassword} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label  className="col-sm-2 col-form-label">Confirm Password</label>
                                <div className="col-sm-10">
                                    <input type="password" className="form-control"  placeholder="Confirm Password" onChange={this.onChangeConfirmPassword} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="offset-2 col-10">
                                    <button type="button" onClick={this.register} className="btn btn-primary">Register</button>
                                </div>
                            </div>
                            
                            
                        </form>
                    </div>
                </div>
            </div>
            
        );
    }

    async register(){
        this.setState({errors: []});
        const email = this.state.email;
        const name = this.state.name;
        const password = this.state.password;
        const confirmPassword = this.state.confirmPassword;
        const response = await fetch('/account/register',{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, name, password, confirmPassword})
        })
        const responseContent = await response.json();
        if(response.ok){
            Utils.saveAuth(responseContent.access_token);
            window.location.href = '/welcome'
        }
        else{
            this.setState({errors: Utils.getErrors(responseContent)});
        }
    }
}