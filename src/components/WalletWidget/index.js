import React from "react"
import "./index.css"
import Numeral from "react-numeral"

const WalletWidget = (props) => {

    ///////////////////////
    // Constants
    ///////////////////////



    ///////////////////////
    // Functions
    ///////////////////////

    const loaded = () => {
        const coinArray = props.wallet.coins.slice(0, 3)
        const coins = coinArray.map((item, index) => {
            let coinData = [...props.coins]
            coinData = coinData.find((coinItem, coinIndex) => {
                return (
                        item.coin.toLowerCase() === coinItem.symbol.toLowerCase()
                    )
                })
            return (
                <div 
                    key={index}
                    className="wallet-widget-cont entry"
                >
                    <div className="img-name-cont">
                        <div className={item.coin === "USD" ? "img-cont usd-img" : "img-cont"}>
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
                    <div className="coin-price">
                        <h4><Numeral value={item.amount} format={"0,0.[000000]"} /> {item.coin}</h4>
                        {item.coin !== "USD" && <p>= <Numeral value={item.amount * coinData.current_price} format={"$0,0[.]00"} /></p>}
                    </div>
                </div>
            )
        })
        ///////////////////////
        // Render
        ///////////////////////

        return (
            <div className="wallet-widget">
                {coins}
            </div>
        )
    }

    const loading = () => {
        return (
            <>
            </>
        )
    }

    return (props.coins.length > 0 && props.wallet.user !== "") ? loaded() : loading()

}

export default WalletWidget