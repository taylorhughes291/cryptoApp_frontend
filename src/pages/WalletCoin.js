import React from "react";
import { useEffect } from "react";
import {Link} from "react-router-dom"
import Plotly from "plotly.js/dist/plotly";
import Numeral from "react-numeral"

const WalletCoin = (props) => {

    ///////////////////////
    // Constants
    ///////////////////////

    const selectedCoin = props.selectedCoin
    const walletData = props.wallet
    const coinData = props.coins
    const transactionData = props.transactions

    const wallet = walletData.coins.find((item, index) => {
        return (
            item.coin.toLowerCase() === selectedCoin.toLowerCase()
        )
    })
    const coin = coinData.find((item, index) => {
        return (
            item.symbol.toLowerCase() === selectedCoin.toLowerCase()
        )
    })
    const transactions = transactionData.filter((item, index) => {
        return (
            item.coinSold.toLowerCase() === selectedCoin.toLowerCase() || item.coinBought.toLowerCase() === selectedCoin.toLowerCase()
        )
    })

    ///////////////////////
    // Functions
    ///////////////////////
    
    useEffect(() => { 
        getCoindata()
        .then((graphData) => {
            totalChart(graphData);
        });
    }, []);

    const apiCall = async(url) => {
        let response = await fetch(url);
        let data = await response.json();
        return data;
    };
    
    
    const getCoindata = async() => {
            
        const response = await apiCall(`https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart?vs_currency=usd&days=1&interval=1m`)
        
        const data = {price:[], volume:[], time:[]};
        for (const item of response.prices) {
          data.time.push(item[0]);
          data.price.push(item[1]);
        }
        for (const item of response.total_volumes) {
          data.volume.push(item[1]);
        }
    
        return data;
    };
    
      
    useEffect(() => {getCoindata()}, [])


    const totalChart = (data) => {
		const priceChart = {
            x: data.time.map((time)=> new Date(time)),
            y: data.price,
            type: "scatter",
            mode: "lines",
			xaxis: "x",
            yaxis: "y1",
            line: {
            color: "rgb(242, 169, 0)"
            },
        };
    
		
		let layout = {
            height: 200,
            autosize: true,
            margin: {
                l: 5,
                r: 5,
                b: 5,
                t: 5,
                pad: 5
            },
            
			xaxis: {
                // autotick: true,
                tickfont: { 
                    color: '#949FB4',
                    family: 'poppins',
                    size: 11
                },
                tickangle: 'auto',
                ticks: '',
                tickwidth: 5,
                ticklen: 8,
                tickcolor: 'rgb(0, 255, 255)',
                tickformat: '%H:%m',
                showticklabels: true,
                automargin: true,
			},
			yaxis: {
                // autotick: true,
                tickfont: { 
                    color: '#949FB4',
                    family: 'poppins',
                    size: 11
                },
                tickangle: 'auto',
                ticks: '',
                tickwidth: 5,
                ticklen: 8,
                tickcolor: '#949FB4',
                tickprefix: '$',
                showticklabels: true,
                anchor: "x",
                automargin: true,
			},
            paper_bgcolor: '#FFFFFF',
		};
    var allChart = [priceChart];
    var config = {
        responsive: true,
        displayModeBar: false,
        staticPlot: true
    }
	Plotly.react("cryptoChart", allChart, layout, config);
	};


    const transactionDisplay = transactions.map((item, index) => {
        const coinBoughtData = coinData.find((item2, index2) => {
            return item.coinBought.toLowerCase() === item2.symbol.toLowerCase()
        })
        const coinSoldData = coinData.find((item2, index2) => {
            return item.coinSold.toLowerCase() === item2.symbol.toLowerCase()
        })
        console.log(coinSoldData);
        return (
            <div className="transaction" key={index}>
                <div className="transaction-item">
                    <h6 style={{'color': 'green'}}><Numeral value={item.boughtAmount < 100 ? item.boughtAmount : Math.round(item.boughtAmount*100)/100} format={'+0,0.[000000]'} /> {item.coinBought}</h6>
                    <div className="image-cont">
                        <img className="coin-logo" src={coinBoughtData.image} alt={`${coinBoughtData.id} logo`} />
                    </div>
                </div>
                <i className="fas fa-exchange-alt"></i>
                <div className="transaction-item">
                    <h6 style={{'color': 'red'}}><Numeral value={item.soldAmount < 100 ? (item.soldAmount * -1) : Math.round(item.soldAmount * -100)/100} format={'0,0.[000000]'} /> {item.coinSold}</h6>
                    <div className="image-cont">
                        <img className="coin-logo" src={coinSoldData.image} alt={`${coinSoldData.id} logo`} />
                    </div>
                </div>
            </div>
        )
    })

    ///////////////////////
    // Render
    ///////////////////////

    return (
        <>
            <div className="page-header">
                <Link
                    to="/wallet"
                >
                    <i class="fas fa-chevron-left"></i>
                </Link>
                <h3>{coin.name}</h3>
            </div>
            <div className="wallet-coin-price-cont coin-data">
                <p>{coin.name} owned:</p>
                <h4><Numeral value={wallet.amount} format={"0,0.[000000]"} /> {coin.symbol.toUpperCase()}</h4>
            </div>
            <div className="wallet-coin-amount-cont coin-data">
                <p>Amount in USD:</p>
                <h4>= <Numeral value={wallet.amount * coin.current_price} format={"$0,0[.]00"} /></h4>
            </div>
            <div className="wallet-coin-amount-cont coin-data">
                <p>Price of {coin.name}:</p>
                <h4><Numeral value={coin.current_price} format={"$0,0[.]00"} /></h4>
            </div>
            <div id="cryptoChart"></div>
            <h4>Transactions</h4>
            {transactionDisplay}
        </>
    )
}

export default WalletCoin


  