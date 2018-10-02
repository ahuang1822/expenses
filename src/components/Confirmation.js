import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import '../Confirmation.css';

class Confirmation extends Component {
  
  goHome = (event) => {
    event.preventDefault();
    browserHistory.push('/');
  }

  goBack = (event) => {
    event.preventDefault();
    browserHistory.push('/description')
  }

  onSubmit = (event) => {
    event.preventDefault();
    // updateGoogleSheet();
    browserHistory.push('/submit');
  }

  updateGoogleSheet = () => {
    const sheetID = 
      '1_ia6uzIWp_3sE8lfxfK9cc0n9VeokISWDiCLWQJTBjE';
    
  }

  render() {
    console.log('PROPS: ', this.props);
    return (
      <div className="everything">
        <div className="input">
          <form onSubmit={this.onSubmit}>
            <label>
              <h5>
              Did you really just spend {this.props.amount} on {this.props.description} ({this.props.category})?
              </h5>
            </label>
            <input className="btn btn-success" type="submit" value="Yes" />
          </form>
        </div>
        <div className="home-button">
          <button className="btn btn-danger" onClick={this.goBack}>Back</button>
        </div>        
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    category: state.expense.category,
    description: state.expense.description,
    amount: state.expense.amount
  }
}

export default connect(mapState, null)(Confirmation);

