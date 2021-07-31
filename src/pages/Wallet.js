import React, {useState} from "react"
import {Button} from "reactstrap"
import {Link, Route, Switch} from "react-router-dom"
import dollar from "../assets/pngfind.com-bling-png-2896086.png"
import WalletCoin from "./WalletCoin"
import Numeral from "react-numeral"


const Wallet = (props) => {

    ///////////////////////
    // Constants
    ///////////////////////

    const [selectedCoin, setSelectedCoin] = useState("")

    ///////////////////////
    // functions
    ///////////////////////

    const handleSelect = (coin) => {
        setSelectedCoin(coin)
    }

    ///////////////////////
    // Render
    ///////////////////////

    const loaded = () => {
        const coins = props.wallet.coins.map((item, index) => {
            let coinData = [...props.coins]
            coinData = coinData.find((coinItem, coinIndex) => {
                return (
                        item.coin.toLowerCase() === coinItem.symbol.toLowerCase()
                    )
                })
            return (
                <Link
                    to={item.coin === "USD" ?  "/wallet" :`/wallet/${item.coin}`}
                    key={index}
                    className="entry-link"
                >
                    <div 
                        key={index}
                        className="wallet-widget-cont entry"
                        onClick={() => handleSelect(item.coin)}
                    >
                        <div className="img-name-cont">
                            <div className="img-cont">
                                <img 
                                    src={coinData.image} 
                                    alt={`${item.coin} logo`}
                                    className="coin-logo"
                                />
                            </div>
                            <div className="coin-name">
                                <h4>{item.coin}</h4>
                            </div>
                        </div>
                        <div className="price-info-cont">
                            <div className="coin-price">
                                <h4><Numeral value={item.amount} format={"0,0.[000000]"} /> {item.coin}</h4>
                                {item.coin !== "USD" && <p>= <Numeral value={item.amount * coinData.current_price} format={"$0,0[.]00"} /></p>}
                            </div>
                            <i className="fas fa-info-circle"></i>
                        </div>
                    </div>
                </Link>
            )
        })

        return (
            <div id="wallet-page">
                <Switch>
                    <Route
                        path="/wallet/:symbol"
                    >
                        <WalletCoin
                            wallet={props.wallet}
                            coins={props.coins}
                            selectedCoin={selectedCoin}
                            transactions={props.transactions}
                        />
                    </Route>
                    <Route
                        path="/wallet"
                    >
                        <div className="page-header">
                            <h3>Wallet</h3>
                            <p>Edit</p>
                        </div>
                        {coins}
                        <Link
                            to="/exchange"
                        >
                            <Button className="btn btn-med btn-danger btn-block">Add Wallet</Button>
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

    return (props.coins.length > 0 && props.wallet.name !== "") ? loaded() : loading()
}

export default Wallet