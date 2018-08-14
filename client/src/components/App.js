import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import BlogList from './BlogList';
import NewBlog from './NewBlog';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div>
        <Header />
          <BrowserRouter>
            <div>
              <Route exact path="/" component={Landing} />
              <div className="container">
                <Route exact path="/blogs" component={BlogList} />
                <Route path="/blogs/new" component={NewBlog} />
              </div>
            </div>
          </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
