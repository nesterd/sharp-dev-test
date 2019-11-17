import React, {Component} from 'react';
import {ChangePasswordModal} from './ChangePasswordModal'
import Utils from '../Utils';
import Errors from './Errors';

export class AccountManage extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: undefined,
            name: undefined,
            amount: undefined,
            changePasswordModalIsOpend: false,
            errors: []
        };
        this.onChangeName = this.onChangeName.bind(this);
        this.openChangePasswordModal = this.openChangePasswordModal.bind(this);
        this.closeChangePasswordModal = this.closeChangePasswordModal.bind(this);
        this.confirm = this.confirm.bind(this);
    }

    componentDidMount(){
        this.populateAccountData();
    }

    onChangeName(event){
        this.setState({name: event.target.value});
    }

    openChangePasswordModal(){
        this.setState({changePasswordModalIsOpend: true});
    }

    closeChangePasswordModal(){
        this.setState({changePasswordModalIsOpend: false});
    }

    render(){
        const changePasswordModalIsOpend = this.state.changePasswordModalIsOpend;
        const errors = this.state.errors;
        const contents = this.state.loading
          ? <p><em>Loading...</em></p>
          : <div>
                <Errors errors={errors} />
                <form>
                    <div className="form-group row">
                        <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Email</label>
                        <div className="col-sm-4">
                        <input type="text" readOnly className="form-control-plaintext" id="staticEmail" value={this.state.email}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="staticAmount" className="col-sm-2 col-form-label">Amount</label>
                        <div className="col-sm-4">
                        <input type="text" readOnly className="form-control-plaintext" id="staticAmount" value={this.state.amount + ' parrot wings'}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="inputName" className="col-sm-2 col-form-label">Name</label>
                        <div className="col-sm-4">
                        <input type="text" className="form-control" id="inputName" placeholder="name" value={this.state.name} onChange={this.onChangeName}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="offset-2 col-4">
                            <button type="button" onClick={this.confirm} className="btn btn-primary" style={{marginRight: "5px"}}>Confirm</button>
                        </div>
                    </div>
                </form>
                <p>
                    <button type="button" className="btn btn-link" onClick={this.openChangePasswordModal}>change password</button>
                </p>
                {changePasswordModalIsOpend ?
                    <ChangePasswordModal onCloseChangePasswordModal={this.closeChangePasswordModal} />
                    : null
                }
            </div>
        return(
            <div>
                <h1>Manage your account</h1>
                {contents}
            </div>
        );
    }

    async confirm(){
        debugger;
        const response = await Utils.fetchAuth('/users', 'PUT', {name: this.state.name});
        if(response.ok){
            //alert('data saved successfully');
            window.location.href = '/account-manage';
        }
    }

    async populateAccountData(){
         const response = await Utils.fetchAuth('/users/account-info');
         if(response.ok){
             const accountInfo = await response.json();
             this.setState({email: accountInfo.email, name: accountInfo.name, amount: accountInfo.currentAmount});
         }
    }
}