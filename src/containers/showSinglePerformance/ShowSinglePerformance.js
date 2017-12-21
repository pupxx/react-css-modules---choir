import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import * as actions from "../../store/actions";

import Aux from "../../hoc/Aux";

class ShowSinglePerformance extends Component {
  renderPieces() {
    return this.props.performance.pieces.map((piece, i) => {
      return <li key={i}>{piece.piecetitle}</li>;
    });
  }

  render() {
    const {
      attending,
      perfname,
      perfdate,
      perftime,
      menattire,
      womenattire,
      pieces
    } = this.props.performance;
    console.log(this.props.performance);
    return (
      <Aux>
        <h5>{perfname}</h5>
        <h5>{moment(perfdate).format("LL")}</h5>
        <h5>{perftime}</h5>
        <h5>{menattire}</h5>
        <h5>{womenattire}</h5>
        <div>
          <h5>Pieces</h5>
          <ul>{this.renderPieces()}</ul>
        </div>
        <h5>
          {attending ? (
            <button> Unfortunately I will NOT be able to attend.</button>
          ) : (
            <button>Notify Choir Director that I Will be attending.</button>
          )}
        </h5>
      </Aux>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    performance: state.performanceList[ownProps.match.params.id]
  };
}

export default connect(mapStateToProps, actions)(ShowSinglePerformance);
