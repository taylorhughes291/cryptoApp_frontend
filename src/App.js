import './App.sass';
import {useEffect, useState, createContext} from "react"
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

export const GlobalCtx = createContext(null)

function App (props) {

  ///////////////////////////////
  // Constants
  ///////////////////////////////

  const url = process.env.REACT_APP_BACKENDURL
  const [gState, setGState] = useState({
    token: ""
  })
  const [user, setUser] = useState("")
  const [wallet, setWallet] = useState({
    user: "",
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

    //handle create for the form
  const handleCreate = (newUser) => {
    fetch(url + "/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser)
    }).then((response) => response.json())
    .then((data) =>  {
      console.log(data)
      if(data.status === 200){
        window.localStorage.setItem("token", JSON.stringify(data.accessToken))
        setGState({
          ...gState,
          token: data.accessToken
        })
        setUser(data.userID)
        props.history.push('/home')
      } else if (data.status === 403) {
        alert('username already exists')
        props.history.push('/login')
      }
    })
  };

  function getLogin(username, password) {
    console.log("logging in");
    fetch(url + '/users/login/' + username + '/' + password)
    .then((response) => response.json())
    .then((data) => {
      if (data.status === 200)
      {
        window.localStorage.setItem("token", JSON.stringify(data.accessToken))
        setUser(data.userID)
        setGState({
          ...gState,
          token: data.accessToken
        })
        props.history.push('/home')
      } else if (data.status === 409) {
        alert('username does not exist')
        props.history.push('/create')
      } else if (data.status === 403) {
        alert('username or password is wrong')
      }
    })
  }



  const getDbData = () => {
    const url = process.env.REACT_APP_BACKENDURL
    const getUrl = url + "/wallets/"
    fetch(getUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `bearer ${gState.token}`
      }
    })
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
        name: "US Dollar",
        current_price: 1
      })
      setCoins(coinArray)
    })
  }

  ///////////////////////////////
  // Render
  ///////////////////////////////

  useEffect(() => {
    const token = JSON.parse(window.localStorage.getItem("token"))
    if (token) {
      setGState({
        ...gState,
        token
      })
    } else {
      props.history.push("/login")
    }
  }, [])

  useEffect(() => {
    if (gState.token !== "") {
      getDbData()
      getApiData()
    }
  }, [])

  useEffect(() => {
    if (user === "") {
      document.body.classList.add('animate')
    } else {
      document.body.classList.remove('animate')
    }
  }, [])

  return (
    <GlobalCtx.Provider value={{gState, setGState}}>
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
    </GlobalCtx.Provider>
  );
}

export default withRouter(App);
