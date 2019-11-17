import React, {Component} from 'react';
import Unils from '../Utils';
import {TransactionOptionsModal} from './TransactionOptionsModal';
import Select from 'react-select';
import NumericInput from 'react-numeric-input';
import Utils from '../Utils';
import { Link } from 'react-router-dom';
import Errors from './Errors';
 
export class CreateTransaction extends Component{
    constructor(props){
        super(props);
        this.state = {
            loading: true,
            recipient: undefined,
            recipients: [],
            amount: 0,
            openModal: false,
            errors: []
        }
        this.onChangeRecipient = this.onChangeRecipient.bind(this);
        this.onChangeAmount = this.onChangeAmount.bind(this);
        this.create = this.create.bind(this);
        this.onSelectTransactionExample = this.onSelectTransactionExample.bind(this);
        this.closeTransactionOptionsModal = this.closeTransactionOptionsModal.bind(this);
        this.openTransactionOptionsModal = this.openTransactionOptionsModal.bind(this);
    }

    componentDidMount(){
        this.populateRecipients();
    }

    onChangeRecipient(selected){
        this.setState({recipient: selected});
    }

    onChangeAmount(amount){
        this.setState({amount});
    }

    openTransactionOptionsModal(){
        this.setState({openModal: true});
    }

    closeTransactionOptionsModal(){
        this.setState({openModal: false})
    }

    async onSelectTransactionExample(transactionExampleId){
        if(transactionExampleId !== undefined){
            const example = await this.getTransaction(transactionExampleId);
            const recipient = this.state.recipients.find(x => x.value == example.recipientId);
            if(example !== undefined){
                this.setState({recipient, amount: example.amount, openModal: false});
            }
        }
    }

    async getTransaction(transactionId){
        const response = await Utils.fetchAuth("/transactions/"+transactionId);
        if(response.ok){
            return await response.json();
        }
        else{
            return undefined;
        }
    }
    
    render() {
        const errors = this.state.errors;
        const recipient = this.state.recipient;
        const recipientOptions = this.state.recipients;
        const amount = this.state.amount;
        const openModal = this.state.openModal;
        const contents = this.state.loading
          ? <p><em>Loading...</em></p>
          :
          <div>
              <Errors errors={errors} />
              <p>
                  <button type="button" className="btn btn-link" onClick={this.openTransactionOptionsModal}>select another transaction as an example</button>
              </p>
            
            <form>
                <div className="form-group row">
                    <label htmlFor="recipient" className="col-sm-2 col-form-label">Recipient</label>
                    <div className="col-md-4 col-sm-8">
                        <Select value={recipient} options={recipientOptions} onChange={this.onChangeRecipient} />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Amount</label>
                    <div className="col-md-4 col-sm-8">
                        <NumericInput className="form-control" precision={2} value={amount} step={0.1} format={num => num + ' pw.'} onChange={this.onChangeAmount}/>
                    </div>
                </div>
                <div className="form-group row">
                    <div className="offset-2 col-4">
                        <Link className='btn btn-secondary float-right' to='/transactions' >Cancel</Link>
                        <button type="button" onClick={this.create} className="btn btn-primary float-right" style={{marginRight: "5px"}}>Create</button>
                    </div>
                </div>
            </form>
            {openModal ?
               <TransactionOptionsModal onSelectTransactionExample={this.onSelectTransactionExample} onCloseTransactionOptionsModal={this.closeTransactionOptionsModal}  />
               : null
            }
            
          </div> 
          
    
        return (
            <div>
                <h1>Creating transaction</h1>
                {contents}
            </div>
        );
      }
    
    async create(){     
        let errors = [];   
        if(this.state.recipient === undefined){
            errors.push('Recipient is required')
        }
        if(this.state.amount === undefined || this.state.amount == 0){
            errors.push('Amount is required')
        }
        if(errors.length > 0){
            this.setState({errors});
            return; 
        }
        this.setState({errors: []});
        const response = await Utils.fetchAuth('/transactions', 'POST', {recipientId: this.state.recipient.value, amount: this.state.amount});
        if(response.ok){
            window.location.href = '/transaction-list';
        }
        else{
            const errors = await response.json();
            this.setState({errors: Utils.getErrors(errors)});
        }
    }

    async populateRecipients(){
        const response = await Unils.fetchAuth('/users/recipients');
        if(response.ok){
            const recipients = await response.json();
            this.setState({recipients, loading: false});
        }
    }

}