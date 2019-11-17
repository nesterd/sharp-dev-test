import React, {Component} from 'react';

export class SortLink extends Component{
    constructor(props){
        super(props);
        this.state = {
            sortBy: undefined
        };
        this.onSort = this.onSort.bind(this);

    }

    componentDidMount(){
        if(this.props.currentSort !== undefined && this.props.sortBy !== undefined && this.props.currentSort.startsWith(this.props.sortBy)){
            const sortBy = this.props.sortBy;
            this.setState({sortBy});
        }
    }

    onSort(){
        if(this.props.currentSort === undefined || !this.props.currentSort.startsWith(this.props.sortBy) || this.props.currentSort.endsWith('asc')){
            this.props.onSort(this.props.sortBy + '-desc');
        }
        else{
            this.props.onSort(this.props.sortBy + '-asc');
        }
    }

    render(){
        let className = 'fas fa-sort';
        if(this.props.currentSort !== undefined && this.props.currentSort.startsWith(this.props.sortBy)){
            if(this.props.currentSort.endsWith('asc')){
                className += '-up';
            }
            if(this.props.currentSort.endsWith('desc')){
                className += '-down';
            }
        }
        // if(this.state.sortBy !== undefined){
        //     if(this.state.sortBy.endsWith('asc')){
        //         className += '-up';
        //     }
        //     if(this.state.sortBy.endsWith('desc')){
        //         className += '-down';
        //     }
        // }
        return(
            <button onClick={this.onSort} className='btn btn-link'><i className={className}></i></button>
        );
    }
}