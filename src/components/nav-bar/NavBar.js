import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { MenuItems} from "./MenuItems";

class NavBar extends Component {

    render() {
        return(
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="/">FGAC</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        {MenuItems.map((item, index) => {
                            return (
                                <li key={index} className="nav-item">
                                    <Link className="nav-link" to={item.url}>
                                        {item.title}
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </nav>
        )
    }
}

export default NavBar
