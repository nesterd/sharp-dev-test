import React, {Component} from 'react';
import Utils from '../Utils';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'react-bootstrap';
import Errors from './Errors';

export class ChangePasswordModal extends Component{
    constructor(props){
        super(props);
        this.state = {
            oldPassword: undefined,
            newPassword: undefined,
            confirmNewPassword: undefined,
            errors: []
        }
        this.confirm = this.confirm.bind(this);
        this.onChangeOldPassword = this.onChangeOldPassword.bind(this);
        this.onChangeNewPassword = this.onChangeNewPassword.bind(this);
        this.onChangeConfirmNewPassword = this.onChangeConfirmNewPassword.bind(this);
    }

    onChangeOldPassword(event){
        this.setState({oldPassword: event.target.value});
    }

    onChangeNewPassword(event){
        this.setState({newPassword: event.target.value});
    }

    onChangeConfirmNewPassword(event){
        this.setState({confirmNewPassword: event.target.value});
    }

    render(){
        return(
            <Modal show={true} onHide={this.props.onCloseChangePasswordModal}>
                <Modal.Header closeButton>
                <Modal.Title>Change your password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Errors errors={this.state.errors}/>
                        
                    <form >
                    <div className="form-group row">
                            <label className="col-sm-2 col-form-label">Old Password</label>
                            <div className="col-sm-10">
                                <input type="password" className="form-control" autoComplete="new-password"  placeholder="Old Password" onChange={this.onChangeOldPassword} />
                            </div>
                        </div>
                        
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label">New Password</label>
                            <div className="col-sm-10">
                                <input type="password" className="form-control" autoComplete="new-password"  placeholder="New Password" onChange={this.onChangeNewPassword} />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label  className="col-sm-2 col-form-label">Confirm New Password</label>
                            <div className="col-sm-10">
                                <input type="password" className="form-control"  placeholder="Confirm New Password" onChange={this.onChangeConfirmNewPassword} />
                            </div>
                        </div>
                        {/* <div className="form-group row">
                            <div className="offset-2 col-10">
                                <button type="button" onClick={this.confirm} className="btn btn-primary">Confirm</button>
                            </div>
                        </div> */}
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" className="btn btn-primary" onClick={this.confirm}>Confirm</button>
                    <button type="button" className="btn btn-secondary" onClick={this.props.onCloseChangePasswordModal}>Cancel</button>
                </Modal.Footer>
            </Modal>
        );
    }

    async confirm(){
        debugger;
        this.setState({errors: []});
        const oldPassword = this.state.oldPassword;
        const newPassword = this.state.newPassword;
        const confirmNewPassword = this.state.confirmNewPassword;
        const response = await Utils.fetchAuth('/account/password', 'PUT', {oldPassword, newPassword, confirmNewPassword});

        if(response.ok){
            this.props.onCloseChangePasswordModal();
        }
        else{
            const responseContent = await response.json();
            this.setState({errors: Utils.getErrors(responseContent)});
        }
    }
}