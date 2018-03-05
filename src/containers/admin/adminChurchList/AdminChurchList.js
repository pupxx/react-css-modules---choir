import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import classes from "./adminChurchList.css";
import styles from "../adminLayout/adminLayout.css";

import * as actions from "../../../store/actions";
import Aux from "../../../hoc/Aux";
import { Table } from "semantic-ui-react";
import LoaderWithText from "../../../components/UI/loaders/LoaderWithText";
import _ from "lodash";
import Confirm from "../../../components/UI/confirm/Confirm";
import SearchBar from "../../../components/searchBar/SearchBar";
import PopUp from "../../../components/UI/popup/PopUp";
import Modal from "../../../components/UI/modal/Modal";

class AdminChurchList extends Component {
  state = {
    column: null,
    direction: null,
    renderModal: false
  };

  componentWillReceiveProps() {
    this.setState({ items: _.map(this.props.churchList) });
  }

  componentDidMount() {
    this.props.fetchChurchs();
  }

  renderHeaders() {
    const headers = ["Ward/Branch", "Address", "Phone"];
    const columnNames = ["churchname", "address", "phone"];
    return headers.map((el, i) => {
      return (
        <Table.HeaderCell
          key={i}
          textAlign={"center"}
          sorted={
            this.state.column === columnNames[i] ? this.state.direction : null
          }
          onClick={this.handleSort(columnNames[i])}
        >
          <h6>{el}</h6>
        </Table.HeaderCell>
      );
    });
  }

  renderRows() {
    return _.map(
      this.state.items,
      ({
        id,
        churchname,
        churchaddress1,
        churchaddress2,
        churchcity,
        churchprov,
        churchzip,
        churchphone
      }) => (
        <Table.Row key={id}>
          <Table.Cell value={id}>
            <PopUp
              position="top left"
              trigger={<h6>{churchname}</h6>}
              name={<div>{churchname}</div>}
              content={
                <div>
                  <div className={classes.DeleteEdit}>
                    <h6 className={classes.H6}>
                      <Link to={`/admin/admin-landing/edit-ward-branch/${id}`}>
                        edit
                      </Link>
                    </h6>
                    <h6
                      className={styles.Delete}
                      onClick={e =>
                        this.renderModal({
                          id,
                          churchname
                        })
                      }
                    >
                      delete
                    </h6>
                  </div>
                </div>
              }
            />
          </Table.Cell>
          <Table.Cell>
            {churchaddress1} {churchaddress2} {churchcity} {churchprov}{" "}
            {churchzip}
          </Table.Cell>
          <Table.Cell>{churchphone}</Table.Cell>
        </Table.Row>
      )
    );
  }

  searchChurchName(event) {
    var updatedList = _.map(this.props.churchList);
    updatedList = updatedList.filter(function(item) {
      return (
        item.churchname
          .toLowerCase()
          .search(event.target.value.toLowerCase()) !== -1
      );
    });
    this.setState({ items: updatedList });
  }

  searchCity(event) {
    var updatedList = _.map(this.props.churchList);
    updatedList = updatedList.filter(function(item) {
      return (
        item.churchcity
          .toLowerCase()
          .search(event.target.value.toLowerCase()) !== -1
      );
    });
    this.setState({ items: updatedList });
  }

  handleSort = clickedColumn => () => {
    const { column, items, direction } = this.state;
    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        items: _.sortBy(items, [clickedColumn]),
        direction: "ascending"
      });
      return;
    }
    this.setState({
      items: items.reverse(),
      direction: direction === "ascending" ? "descending" : "ascending"
    });
  };

  renderModal(churchToDelete) {
    this.setState({ churchToDelete });
    this.state.renderModal
      ? this.setState({ renderModal: false })
      : this.setState({ renderModal: true });
  }

  render() {
    let classnames = `ui medium label ${styles.Blue}`;
    if (!this.props.churchList) {
      return <LoaderWithText />;
    } else if (this.state.renderModal) {
      return (
        <Modal size="small" renderModal={this.renderModal.bind(this)}>
          <Confirm
            content={
              <h6>
                Are you sure you want to delete{" "}
                <strong>{this.state.churchToDelete.churchname}?</strong>
              </h6>
            }
            confirmButtonText="Confirm"
            // confirmAction={this.deleteMember.bind(this)}
            cancelAction={this.renderModal.bind(this)}
            cancelButtonText="Cancel"
          />
        </Modal>
      );
    } else {
      return (
        <Aux>
          <div>
            <hr />
          </div>
          <div className={classes.TableLinksWrapper}>
            <div className={classes.TableWrapper}>
              <form className={classes.Form}>
                <div className={classes.Inputs}>
                  <div className={classes.SearchBarWrapper}>
                    <SearchBar
                      title="Search Ward/Branch"
                      handleSearch={e => this.searchChurchName(e)}
                    />
                  </div>
                  <div className={classes.SearchBarWrapper}>
                    <SearchBar
                      title="Search City"
                      handleSearch={e => this.searchCity(e)}
                    />
                  </div>
                </div>
              </form>
              <Table
                className="ui small compact striped celled fixed sortable table"
                color={"yellow"}
              >
                <Table.Header>
                  <Table.Row>{this.renderHeaders()}</Table.Row>
                </Table.Header>
                <Table.Body>{this.renderRows()}</Table.Body>
              </Table>
            </div>
            <div className={classes.QuickLinksWrapper}>
              <Link to="k" className={classnames}>
                <i class="fas fa-plus" /> Ward/Branch
              </Link>
            </div>
          </div>
        </Aux>
      );
    }
  }
}

const mapStateToProps = state => ({
  churchList: state.churchs
});

export default connect(mapStateToProps, actions)(AdminChurchList);