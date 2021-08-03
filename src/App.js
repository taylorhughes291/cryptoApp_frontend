import './App.sass';
import {useEffect, useState} from "react"
import {Switch, Route} from "react-router-dom"
import Login from "./pages/Login"
import CreateAccount from "./pages/CreateAccount"
import Home from "./pages/Home"
import Wallet from "./pages/Wallet"
import Coins from "./pages/Coins"
import Transactions from "./pages/Transactions"
import Exchange from "./pages/Exchange"
import Nav from "./components/Nav"
import {withRouter, Redirect} from 'react-router-dom'
import logo from './assets/logo.png'
import dollar from "./assets/pngfind.com-bling-png-2896086.png"



function App (props) {

  ///////////////////////////////
  // Constants
  ///////////////////////////////

  const url = process.env.REACT_APP_BACKENDURL
  const [user, setUser] = useState("")
  const [wallet, setWallet] = useState({
    name: "",
    password: "",
    username: "",
    coins: [{
          coin: "",
          amount: ""
    }],
    transactions: []
  })
  const [transactions, setTransactions] = useState([{
    userID: "",
    coinSold: "",
    soldAmount: 0,
    coinBought: "",
    boughtAmount: 0
  }])
  const [coins, setCoins] = useState([])

  ///////////////////////////////
  // Functions
  ///////////////////////////////
  const getLogin = (username, password) => {
    fetch(url + '/users/login/' + username + '/' + password)
    .then((response) => response.json())
    .then((data) => {
      setUser(data);
      if (data.status === 200)
      {
        setUser(data.data.wallet.user)
        props.history.push('/home')
      } else if (data.status === 409) {
        alert('username does not exist')
        props.history.push('/create')
      } else if (data.status === 403) {
        alert('username or password is WRONG!')
      }
      

    })
  }

  //handle create for the form
const handleCreate = (newUser) => {
  fetch(url + "/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser)
  }).then((response) => response.json())
  .then((data) =>  {
    if(data.status === 200)
    {
    setUser(data.data.user)
    props.history.push('/home')
  
  } else if (data.status === 403) {
    alert('username already exists')
    props.history.push('/login')
  }

  })
};
  const getDbData = () => {
    const url = process.env.REACT_APP_BACKENDURL
    const getUrl = url + "/wallets/" + user
    fetch(getUrl)
    .then((response) => (response.json()))
    .then((data) => {
      setWallet(data.data.wallet)
      setTransactions(data.data.transactions)
    })
  }

  const getApiData = () => {
    const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    fetch(url)
    .then((response) => (response.json()))
    .then((data) => {
      const coinArray = data
      coinArray.push({
        id: "US Dollar",
        symbol: "USD",
        image: dollar,
        name: "US Dollar"
      })
      setCoins(coinArray)
    })
  }

  ///////////////////////////////
  // Render
  ///////////////////////////////

  useEffect(() => {
    console.log("test body")
    if (user === "") {
      document.body.classList.add('animate')
    } else {
      document.body.classList.remove('animate')
    }
  }, [])

  return (
    <div className={props.location.pathname === "/login" || props.location.pathname === "/create" ? "App" : "App logged-in"}>
      <img className="logo" src={logo} alt="paper-hand logo"/>
      <Switch>
        <Route
          exact path="/"
        >
          <Redirect to="/login" />
        </Route>
        <Route
          path="/login"
        >
          <Login 
            setUser={setUser}
            getLogin={getLogin}
          />
        </Route>
        <Route
          path="/create"
        >
          <CreateAccount 
            setUser={setUser}
            handleCreate={handleCreate}
          />
        </Route>
        <Route
          path="/home"
        >
          <Home 
            wallet={wallet}
            coins={coins}
            getDbData={getDbData}
            getApiData={getApiData}
          />
        </Route>
        <Route
          path="/wallet"
        >
          <Wallet 
            wallet={wallet}
            coins={coins}
            transactions={transactions}
          />
        </Route>
        <Route
          path="/coins"
        >
          <Coins 
            coins={coins}
          />
        </Route>
        <Route
          path="/transactions"
        >
          <Transactions 
            transactions={transactions}
            coinData={coins}
          />
        </Route>
        <Route
          path="/exchange"
        >
          <Exchange 
            coins={coins}
            wallet={wallet}
            user={user}
            url={url}
          />
        </Route>
      </Switch>
        <div className={props.location.pathname === "/login" || props.location.pathname === "/create" ? "hidden nav" : "nav"}>
          <Nav 
          />
        </div>
    </div>
  );
}

export default withRouter(App);
