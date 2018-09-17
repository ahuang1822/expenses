import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import './Category.css';

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submittedCategory: false
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    
  }

  goHome = (event) => {
    event.preventDefault();
    browserHistory.push('/')
  }

  render() {
    return this.state.submittedCategory ? null : (
      <div className="everything">
        <div className="input">
          <form onSubmit={this.handleSubmit}>
            <label>
              Category:
              <input type="text" name="category" />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
        <div className="home-button">
          <button onClick={this.goHome}>Home</button>
        </div>        
      </div>
    );
  }
}

export default Category;