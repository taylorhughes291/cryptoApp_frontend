import React, {useState, useContext} from "react"
import {withRouter} from "react-router-dom"
import {Link} from "react-router-dom"
import {GlobalCtx} from "../App"

const Exchange = (props) => {
    
    /////////////////////
    // Constants
    /////////////////////
    
    const [formData, setFormData] = useState({
        sellCoin: "",
        sellAmount: "",
        sellAvailable: 0,
        sellCoinName: "",
        sellPrice: 0,
        boughtCoin: "",
        boughtAmount: ""
    })
    const {gState} = useContext(GlobalCtx)

    /////////////////////
    // Functions
    /////////////////////
    
    let sellOptions = props.wallet.coins.filter((item, index) => {
        return (
            item.amount > 0
        )
    })
    sellOptions = sellOptions.map((item, index) => {
        return (
            <React.Fragment
                key={index}
            >
                <option
                    symbol={item.coin}
                    amount={item.amount}
                >{item.amount} {item.coin}</option>
            </React.Fragment>
        )
    })

    let buyOptions = props.coins.map((item, index) => {
        return (
            <React.Fragment
                key={index}
            >
                <option
                    price={item.current_price}
                    symbol={item.symbol}
                    name={item.name}
                >{item.name} ({item.symbol.toUpperCase()})</option>
            </React.Fragment>
        )
    })

    const handleSellChange = (event) => {
        if (event.target.name === "sellCoin") {
            const sellAttributes = event.target.selectedOptions[0].attributes
            let sellData = [...props.coins]
            sellData.push({
                symbol: "USD",
                current_price: 1
            })
            sellData = sellData.find((item, index) => {
                return (
                    item.symbol.toUpperCase() === sellAttributes.symbol.value.toUpperCase()
                )
            })
            setFormData({
                ...formData,
                [event.target.name]: event.target.value,
                sellCoinName: sellAttributes.symbol.value,
                sellAvailable: parseFloat(sellAttributes.amount.value),
                sellPrice: sellData.current_price
            })
        } else if (event.target.name === "sellAmount" && event.target.value > formData.sellAvailable) {
            alert(`Please enter a sell amount less than or equal to how much ${formData.sellCoin} you have available.`)
        } else {
            setFormData({
                ...formData,
                [event.target.name]: parseFloat(event.target.value),
    
            })
        }
    }

    const handleBuyChange = (event) => {
        const buyAttributes = event.target.selectedOptions[0].attributes
        const buyPrice = buyAttributes.price.value
        const buySymbol = buyAttributes.symbol.value.toUpperCase()

        setFormData({
            ...formData,
            boughtCoin: buySymbol,
            boughtAmount: parseFloat((formData.sellAmount*formData.sellPrice)/buyPrice),
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        fetch(props.url + '/transactions/', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `bearer ${gState.token}`
            },
            body: JSON.stringify({
                transaction: {
                    userID: props.user,
                    coinSold: formData.sellCoinName,
                    soldAmount: formData.sellAmount,
                    coinBought: formData.boughtCoin,
                    boughtAmount: formData.boughtAmount
                },
                wallet: props.wallet
            })
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.status === 200) {
                props.setResponseReceived(!props.responseReceived)
                props.history.push('/wallet')
            }
        })
    }

    /////////////////////
    // Render
    /////////////////////

    return (
        <div id="exchange-page">
            <div className="page-header">
                <Link
                    to="/home"
                >
                    <i class="fas fa-chevron-left"></i>
                </Link>
                <h3>Exchange</h3>
            </div>
            <div className="form-cont">
                <form
                    onSubmit={handleSubmit}
                >
                    <div className="sell-cont">
                        <h4>Sell:</h4>
                        <p>Choose Wallet:</p>
                        <select
                            name="sellCoin"
                            value={formData.sellCoin}
                            onChange={handleSellChange}
                        >
                            <option>Select Coin</option>
                            {sellOptions}
                        </select>
                        <p>You Pay:</p>
                        <input
                            type="number"
                            name="sellAmount"
                            value={formData.sellAmount}
                            onChange={handleSellChange}
                        ></input>
                        <p>= ${formData.sellAmount * formData.sellPrice}</p>
                    </div>
                    <div className="buy-cont">
                        <h4>Buy:</h4>
                        <p>Choose Wallet:</p>
                        <select
                            onChange={handleBuyChange}
                        >
                            <option>Select Coin</option>
                            {buyOptions}
                        </select>
                        <p>You Get:</p>
                        <input
                            value={formData.boughtAmount}
                            readOnly
                        ></input>
                        <p>= ${formData.boughtAmount ? (formData.sellAmount*formData.sellPrice) : 0}</p>
                    </div>
                    <input className="submit" type="submit" value="Exchange"></input>
                </form>
            </div>
        </div>
    )
}

export default withRouter(Exchange)