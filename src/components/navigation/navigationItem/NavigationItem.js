import React from 'react';
// import { Link } from 'react-router-dom';


import classes from './navigationItem.css';


function navigationItem(props) {
    return (
        <li className={classes.NavigationItem}>
            <a to={props.link}
            className={props.active ? classes.active : null}>{props.children} <div>></div></a>
        </li>
    )
}

export default navigationItem;