import React from "react"
import Numeral from "react-numeral"

const Transactions = (props) => {
        
    //////////////////////////
    // Constants
    //////////////////////////
    
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const coinData = props.coinData
    //////////////////////////
    // Functions
    //////////////////////////
    
    function convertDate (date) {
        const month = monthNames[date.getMonth()]
        const day = date.getDate()
        const year = date.getFullYear()
        const newDate = `${day} ${month}, ${year}`
        return newDate
    }

    let dateArray = []
    const d1 = new Date()
    const today = convertDate(d1)
    const d2 = new Date()
    let yesterday = convertDate(new Date(d2.setDate(d2.getDate() - 1)))
    const transDates = props.transactions.map((item, index) => {
        const date = new Date(String(item.createdAt))
        let newDate = convertDate(date)
        if (newDate === today) {
            newDate = "Today"
        } else if (newDate === yesterday) {
            newDate = "Yesterday"
        }
        dateArray.unshift(newDate)
        return ({
            date: newDate,
            data: item,
        })
    })

    dateArray = [... new Set(dateArray)]

    let transDisplay = dateArray.map((item, index) => {
        const arr = []
        for (let i=0; i < transDates.length; i += 1) {
            if (transDates[i].date === item) {
                arr.unshift(transDates[i].data)
            }
        }
        return ({
            date: item,
            data: arr
        })
    })

    console.log(transDisplay)
    transDisplay = transDisplay.map((item, index) => {
        const transactions = item.data.map((item2, index2) => {
            const coinBoughtData = coinData.find((item3, index3) => {
                console.log("item2:", item2)
                console.log("item3", item3);
                return item2.coinBought.toLowerCase() === item3.symbol.toLowerCase()
            })
            const coinSoldData = coinData.find((item3, index3) => {
                return item2.coinSold.toLowerCase() === item3.symbol.toLowerCase()
            })
            return (
                <div className="transaction" key={index}>
                    <div className="transaction-item">
                        <h6 style={{'color': 'green'}}><Numeral value={item2.boughtAmount} format={'+0,0.[000000]'} /> {item2.coinBought}</h6>
                        <div className="image-cont">
                            <img className="coin-logo" src={coinBoughtData.image} alt={`${coinBoughtData.id} logo`} />
                        </div>
                    </div>
                    <i className="fas fa-exchange-alt"></i>
                    <div className="transaction-item">
                        <h6 style={{'color': 'red'}}><Numeral value={item2.soldAmount * -1} format={'0,0.[000000]'} /> {item2.coinSold}</h6>
                        <div className="image-cont">
                            <img className="coin-logo" src={coinSoldData.image} alt={`${coinSoldData.id} logo`} />
                        </div>
                    </div>
                </div>
            )
        })
        return (
            <div className="transaction-date-cont">
                <h4>{item.date}</h4>
                {transactions}
            </div>
        )
    })

    //////////////////////////
    // Render
    //////////////////////////

    return (
        <div id="transactions-page">
            <div className="page-header">
                <h3>Transactions</h3>
                <p>Edit</p>
            </div>
            {transDisplay}
        </div>
    )
}

export default Transactions