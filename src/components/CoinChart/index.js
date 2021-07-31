import React from "react"
import "./index.css"
import Numeral from "react-numeral"


const CoinChart = (props) => {

    ///////////////////////
    // Constants
    ///////////////////////

    ///////////////////////
    // Functions
    ///////////////////////

    const loaded = () => {
        const coinArray = props.coins.slice(0,4)
        const coins = coinArray.map((item, index) => {
            return (
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
            )
        })

        ///////////////////////
        // Render
        ///////////////////////

        return (
            <div className="coin-chart">
                {coins}
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

export default CoinChart