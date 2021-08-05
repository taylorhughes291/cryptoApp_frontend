import React from "react"
import {Button} from "reactstrap"
import {Link, Route, Switch} from "react-router-dom"
import CoinsCoin from "./CoinsCoin"
import Numeral from "react-numeral"

const Coins = (props) => {
    ///////////////////////
    // Constants
    ///////////////////////


    ///////////////////////
    // functions
    ///////////////////////


    ///////////////////////
    // Render
    ///////////////////////

    const loaded = () => {
        const coins = props.coins.map((item, index) => {
            return (
                <Link
                    to={{
                        pathname: `/coins/${item.symbol.toUpperCase()}`,
                        state: {
                            selectedCoin: `${item.symbol}`
                        }
                    }}
                    key={index}
                >
                    <div 
                        key={index}
                        className="coin-chart-cont entry"
                    >
                        <div className="img-name-cont">
                            <div className="img-cont">
                                <img 
                                    src={item.image} 
                                    alt={`${item.name} logo`}
                                    className="coin-logo"
                                />
                            </div>
                            <div className="coin-name">
                                <h4>{item.name}</h4>
                                <p className={item.price_change_percentage_24h > 0 ? "positive" : "negative" }><Numeral value={item.price_change_percentage_24h/100} format={"0.000%"} /></p>
                            </div>
                        </div>
                        <div className="coin-price">
                            <h4><Numeral value={item.current_price} format={"$0,0.00"} /></h4>
                        </div>
                    </div>
                </Link>
            )
        })

        return (
            <div id="coin-page">
                <Switch>
                    <Route
                        path="/coins/:symbol"
                    >
                        <CoinsCoin
                            coins={props.coins}
                            transactions={props.transactions}
                        />
                    </Route>
                    <Route
                        path="/coins"
                    >
                        <div className="page-header">
                            <h3>Coins</h3>
                            <p>Edit</p>
                        </div>
                        {coins}
                        <Link
                            to="/exchange"
                        >
                            <Button>Purchase Coins</Button>
                        </Link>
                    </Route>

                </Switch>
            </div>
        )
    }

    const loading = () => {
        return (
            <h2>Loading...</h2>
        )
    }

    return props.coins.length > 0 ? loaded() : loading()
}


export default Coins