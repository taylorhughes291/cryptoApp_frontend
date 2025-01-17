import React from "react"
import "./index.css"
import {withRouter, Link} from 'react-router-dom'

const Nav = (props) => {

    return (
        <nav className = 'navBar'>
            <ul>
                <div className={props.location.pathname === "/home" ? "nav-item-cont selected" : "nav-item-cont"}>
                    <Link
                        to="/home"
                    >
                        <i className="fas fa-home fa-2x"></i>
                        <li>Home</li>
                    </Link>
                </div>
                <div className={/\/wallet/.test(props.location.pathname) ? "nav-item-cont selected" : "nav-item-cont"}>
                    <Link
                        to="/wallet"
                    >
                        <i className="fas fa-wallet fa-2x"></i>
                        <li>Wallet</li>
                    </Link>
                </div>
                <div className="nav-item-cont">
                    <Link
                        to="/exchange"
                    >
                        <div className="plus-cont">
                            <li>+</li>
                        </div>
                    </Link>
                </div>
                <div className={props.location.pathname === "/transactions" ? "nav-item-cont selected" : "nav-item-cont"}>
                    <Link
                        to="/transactions"
                    >
                        <i className="fas fa-bars fa-2x"></i>
                        <li>Transactions</li>
                    </Link>
                </div>
                <div className={/\/coins/.test(props.location.pathname) ? "nav-item-cont selected" : "nav-item-cont"}>
                    <Link
                        to="/coins"
                    >
                        <i className="fas fa-coins fa-2x"></i>
                        <li>Coins</li>
                    </Link>
                </div>
            </ul>
        </nav>
    )
}

export default withRouter(Nav)