import React, {Component} from 'react';
import Utils from '../Utils';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'react-bootstrap';

export class TransactionOptionsModal extends Component{
    constructor(props){
        super(props);
        this.state={
            options: [],
            selected: undefined
        };
        this.onSelect = this.onSelect.bind(this);
        this.onConfirm = this.onConfirm.bind(this);
    }

    componentDidMount(){
       this.populateOptions();
    }

     onSelect(selected){
         this.setState({selected})
     }

    onConfirm(){
        this.props.onSelectTransactionExample(this.state.selected);
    }

    render(){
        const options = this.state.options;
        const selected = this.state.selected;
        return(
            <Modal show={true} onHide={this.props.onCloseTransactionOptionsModal}>
                <Modal.Header closeButton>
                <Modal.Title>My Transactions</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="list-group">
                        {options.map(option => 
                        <button type="button" className={`list-group-item list-group-item-action ${selected == option.value ? 'active' : ''}`} key={option.value} onClick={this.onSelect.bind(this, option.value)}>{option.label}</button>
                        )}
                        
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" className="btn btn-primary" onClick={this.onConfirm}>Confirm</button>
                    <button type="button" className="btn btn-secondary" onClick={this.props.onCloseTransactionOptionsModal}>Close</button>
                </Modal.Footer>
            </Modal>
            
        );
    }

    async populateOptions(){
        const response = await Utils.fetchAuth('/transactions/options');
        if(response.ok){
            const options = await response.json();
            this.setState({options});
        }
    }
}