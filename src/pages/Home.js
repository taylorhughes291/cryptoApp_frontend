import React from "react"
import WalletWidget from "../components/WalletWidget"
import CoinChart from "../components/CoinChart"
import {Link} from "react-router-dom"

const Home = (props) => {

    ////////////////////////
    // Constants
    ////////////////////////

    ////////////////////////
    // Functions
    ////////////////////////

    ////////////////////////
    // Render
    ////////////////////////

    return (
        <div id="home">
            <div className="home-wallet home-header">
                <h3>Wallet</h3>
                <Link
                    to="/wallet"
                >
                    <p>See All</p>
                </Link>
            </div>
            <WalletWidget 
                wallet={props.wallet}
                coins={props.coins}
            />
            <div className="home-coin-chart home-header">
                <h3>Coin Chart</h3>
                <Link
                    to="/coins"
                >
                    <p>See All</p>
                </Link>
            </div>
            <CoinChart 
                coins={props.coins}
                wallet={props.wallet}

            />
        </div>
    )
}

export default Home