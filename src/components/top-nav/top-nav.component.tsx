import React from 'react';
import {Link} from 'react-router-dom';

const TopNavComponent = () => {
    return (
        <nav
            style={{
                borderBottom: "solid 1px",
                paddingBottom: "1rem"
            }}
        >
            <Link to="/">Home</Link> |{" "}
            <Link to="/one">Route 1</Link> |{" "}
            <Link to="/two">Route 2</Link>
        </nav>
    )
}

export default TopNavComponent;
