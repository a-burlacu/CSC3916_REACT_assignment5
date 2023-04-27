import React, { Component } from 'react';

class Search extends Component {
    state = {searchValue: '',
    };

    handleSearchInput = (e) => {
        this.setState({searchValue: e.target.value});
    };

    handleSearchClick = () => {
        this.props.onSearch(this.state.searchValue);
    };

    render() {
        return (
            <div>
                <input type='text' placeholder= "Search Movies..." onChange={this.handleSearchInput} value={this.state.searchValue} />
                <button onClick={this.handleSearchClick}>Search</button> 
            </div>
        );
    }
}

export default Search;