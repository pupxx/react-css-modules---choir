import React, { Component } from 'react';
import Layout from '../layout/Layout'
import PerformanceList from '../../containers/performance_list/PerformanceList';

import classes from './app.css'

class App extends Component {
  render() {
    return (
      <div>
      <Layout>
        <PerformanceList />
      </Layout>

      </div>
    )
  }
}

export default App;