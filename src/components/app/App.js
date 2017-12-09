import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as actions from "../../store/actions";

import Layout from "../layout/Layout";
import About from "../about/About";
import PerformanceList from "../../containers/performance_list/PerformanceList";
import Rehearsals from "../../containers/rehearsals/Rehearsals";
import Signup from "../../components/auth/signup/Signup";
import Signin from "../../components/auth/signin/Signin";
import Signout from "../../components/auth/signout/Signout";
import Profile from "../../containers/profile/Profile";
import MemberLanding from "../../containers/memberLanding/MemberLanding";
import requireAuth from "../../hoc/auth/require_authentication";

// import classes from './app.css';

class App extends Component {
  componentWillMount() {
    if (this.props.authenticated) this.props.history.push("/member/landing");
  }

  renderAboutandPerformances() {
    return (
      <div>
        <About />
        <PerformanceList />
      </div>
    );
  }

  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route
              path="/member/landing"
              component={requireAuth(MemberLanding)}
            />
            <Route path="/profile" component={requireAuth(Profile)} />
            <Route path="/signin" component={Signin} />
            <Route path="/signup" component={Signup} />
            <Route path="/signout" component={Signout} />
            <Route path="/rehearsals" component={Rehearsals} />
            <Route path="/" render={this.renderAboutandPerformances} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps, actions)(App);
