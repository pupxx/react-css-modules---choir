import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import _ from "lodash";
import * as actions from "../../store/actions";

import className from "./profile.css";

class Profile extends Component {
  componentDidMount() {
    this.props.fetchProfile();
    this.props.fetchMemberInfo();
  }

  render() {
    let memberProfile = _.map(this.props.profile)[0];
    let memberInfo = _.map(this.props.memberInfo)[0];
    let register = `alert alert-danger ${className.ClickToRegisterWrapper}`;
    if (!memberInfo) {
      return (
        <div className="ui active transition visible inverted dimmer">
          <div className="content">
            <div className="center">
              <div className="ui inverted text loader">...</div>
            </div>
          </div>
        </div>
      );
    } else if (memberInfo.firstname === "") {
      return (
        <div className={register}>
          <Link to="/member/register" className={className.ClickToRegister}>
            <h5>
              John 8:13: The Pharisees therefore said unto him, Thou
              bearest record of thyself; thy record is not true.
            </h5>
            <div>
              <h5>Please Click here to finish registration.</h5>
            </div>
          </Link>
        </div>
      );
    } else if (memberProfile) {
      const {
        firstname,
        lastname,
        address1,
        address2,
        city,
        prov,
        postal,
        phone,
        part
      } = memberInfo;
      const { churchname } = memberProfile;
      return (
        <div>
          <h1>
            {firstname} {lastname}
          </h1>
          <h6>{address1}</h6>
          <h6>{address2}</h6>
          <h6>
            {city}, {prov} {postal}
          </h6>
          <h6>{phone}</h6>
          <h6>{churchname}</h6>
          <h6>{part}</h6>
        </div>
      );
    } else {
      return <div>There was an error Please try again</div>;
    }
  }
}

function mapStateToProps(state) {
  return { profile: state.profile, memberInfo: state.memberInfo };
}

export default connect(mapStateToProps, actions)(Profile);
