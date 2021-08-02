import React from "react";
import { useState, useEffect } from "react";
import Plotly from "plotly.js/dist/plotly";
import {Link} from "react-router-dom"
import Numeral from "react-numeral"

const CoinsCoin = (props) => {
    ///////////////////////
    // Constants
    ///////////////////////
    const selectedCoin = props.selectedCoin
    const coinData = props.coins
    const coin = coinData.find((item, index) => {
        return (
            item.symbol.toLowerCase() === selectedCoin.toLowerCase()
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

    ///////////////////////
    // Render
    ///////////////////////
    return (
        <>
            <div className="page-header">
                <Link
                    to="/coins"
                >
                    <i class="fas fa-chevron-left"></i>
                </Link>
                <h3>{coin.name}</h3>
            </div>
            <div className="wallet-coin-price-cont coin-data">
                <p>Price of {coin.name}:</p>
                <h4><Numeral value={coin.current_price} format={"$0,0[.]00"} /></h4>
            </div>
            <div className="wallet-coin-amount-cont coin-data">
                <p>% Change (24 Hours)</p>
                <h4><Numeral value={coin.price_change_percentage_24h/100} format={"0.000%"} /></h4>
            </div>
            <div className="wallet-coin-amount-cont coin-data">
                <p>24 Hour High:</p>
                <h4><Numeral value={coin.high_24h} format={"$0,0[.]00"} /></h4>
            </div>
            <div className="wallet-coin-amount-cont coin-data">
                <p>24 Hour Low:</p>
                <h4><Numeral value={coin.low_24h} format={"$0,0[.]00"} /></h4>
            </div>
            <div id="cryptoChart"></div>
        </>
    )
}
export default CoinsCoin