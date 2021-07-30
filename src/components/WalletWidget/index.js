import React from "react"
import dollar from "../../assets/pngfind.com-bling-png-2896086.png"
import "./index.css"

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
            coinData.push({
                id: "US Dollar",
                symbol: "USD",
                image: dollar,
            })
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
                        <h4>{Math.round(item.amount*1000000)/1000000} {item.coin}</h4>
                        {item.coin !== "USD" && <p>= ${Math.round(item.amount * coinData.current_price*100)/100}</p>}
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

    return (props.coins.length > 0 && props.wallet.name !== "") ? loaded() : loading()

}

export default WalletWidget