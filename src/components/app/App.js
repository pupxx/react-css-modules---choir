import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Layout from '../layout/Layout';
import About from '../about/About'
import PerformanceList from '../../containers/performance_list/PerformanceList';

// import classes from './app.css';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
            <Route path="/" component={About} />
            <Route path="/" component={PerformanceList} />
        </Layout>
      </div>
    )
  }
}

export default App;