import React, {Component} from 'react';
import Utils from '../Utils.js';
import { Link } from 'react-router-dom';
import Time from 'react-time-format'
import {SortLink} from './SortLink';

export class Transactions extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading: true,
            transactions: [],
            errors: [],
            currentSort: undefined
        };
        this.onSort = this.onSort.bind(this);
    }

    componentDidMount(){
        this.populateTransactions();
    }
    
    onSort(currentSort){
        this.setState({currentSort}, () => this.populateTransactions());
    }

    static renderTransactions(transactions, currentSort, onSort) {
        
        return (
            <div>
                <div className="float-right" style={{marginBottom: '5px'}}>
                    <Link className='btn btn-primary' to='/create-transaction' >Create</Link>
                </div>
                
                {/* <div >
                    <nav className="navbar navbar-light bg-light">
                        <form className="form-inline">
                            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                        </form>
                    </nav>    
                </div> */}
                                           
                
                <table className='table table-striped'>
                    <thead>
                    <tr>
                        <th>Date, Time <SortLink sortBy='Time' currentSort={currentSort} onSort={onSort}/></th>
                        <th>Correspondent  <SortLink sortBy='CorrespondentName' currentSort={currentSort} onSort={onSort}/></th>
                        <th>Amount  <SortLink sortBy='Amount' currentSort={currentSort} onSort={onSort}/></th>
                        <th>Total Account  <SortLink sortBy='CurrentAccountAmount' currentSort={currentSort} onSort={onSort}/></th>
                    </tr>
                    </thead>
                    <tbody>
                    {transactions.map(transaction =>
                        <tr key={transaction.id}>
                        <td><Time value={transaction.time} format='DD.MM.YYYY hh:mm' /></td>
                        <td>{transaction.correspondentName}</td>
                        <td>{transaction.amount} pw.</td>
                        <td>{transaction.currentAccountAmount} pw.</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        );
      }

      render() {
        let contents = this.state.loading
          ? <p><em>Loading...</em></p>
          :
          <div>
            {this.state.errors.length != 0 ?
                <ul>
                    {this.state.errors.map(error => <li>error: {error}</li>)}
                </ul>
                : null
            }
            {
                Transactions.renderTransactions(this.state.transactions, this.state.currentSort, this.onSort)
            }
          </div> 
          
    
        return (
            <div>
                <h1>Transactions</h1>
                {contents}
            </div>
        );
      }

    async populateTransactions(){
        const sorting = this.state.currentSort;
        const url = '/transactions' + (sorting === undefined ? '' : '?sorting=' + sorting);
        const response = await Utils.fetchAuth(url);
        if(response.ok){
            const transactions = await response.json();
            this.setState({transactions, loading: false})
        }
        else{
            if(response.status === 401){
                window.location.href = '/login';
            }            
        }
    }
}