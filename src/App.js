import './App.css';
import LandingPage from './pages/landingPage';
import React from 'react';
import { Route, Switch} from 'react-router-dom'
import NavbarComp from './component/navbar';
import FooterComp from './component/footer'
import Login from './pages/login'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser, faEnvelope, faLock, faEyeSlash, faEye, faPen, faTrash, faWindowClose, faSave, faShoppingCart} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { URL_API } from './pages/helper';
import { keepLogin, getProductAction } from './actions'
import { connect } from 'react-redux'
import ProductManagement from './pages/productManagement';
import NotFound from './pages/notFound';
import ProductsPage from './pages/productsPage';
import ProductDetail from './pages/productDetail';
import ShoppingCart from './pages/shoppingCart';
import CheckOut from './pages/checkOut';
import HistoryAdmin from './pages/historyAdmin';
import VerificationPage from './pages/verification';

library.add(faUser, faEnvelope, faLock, faEyeSlash, faEye, faPen, faTrash,  faWindowClose, faSave, faShoppingCart)

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      isOpen: false
     }
  }

  componentDidMount() {
    this.reLogin()
    this.props.getProductAction()
  }

  // getProducts = () => {
  //   axios.get(URL_API+ "/products")
  //   .then (res => {
  //     this.props.getProductAction(res.data)
  //   })
  //   .catch(err => {
  //     console.log("getProducts error:", err)
  //   })
  // }

  reLogin = () => {
    let token = localStorage.getItem("tkn_id")
    if (token) {
      const headers = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
      axios.post(URL_API + `/users/keep`, {}, headers)
        .then(res => {
          this.props.keepLogin(res.data)
        })
        .catch(err => {
          console.log("Keeplogin error :", err)
        })
    }
  }

  render() { 
    return ( 
      <div>
        <NavbarComp />
        <Switch>
        <Route path="/" component={LandingPage} exact />
        <Route path="/login" component={Login}/>
        <Route path="/products" component={ProductsPage}/>
        <Route path="/product-detail" component={ProductDetail}/>
        <Route path="/shopping-cart/:id" component={ShoppingCart}/>
        <Route path="/check-out" component={CheckOut}/>
        <Route path="/verification" component={VerificationPage}/>
        {
          this.props.role == "Admin" &&
          <>
            <Route path="/product-management" component={ProductManagement}/>
            <Route path="/history-admin" component={HistoryAdmin}/>
          </>
        }
        <Route path="*" component={NotFound}/>
        </Switch>
        <FooterComp />
      </div>
     );
  }
}
 
// inline condition
// 1. condition ? return true : return false (if else)
// 2. condition && return sama dengan satu kondisi saja (if saja)

const mapStateToProps = ({authReducer}) => {
  return {
    role: authReducer.role
  }
}

export default connect(mapStateToProps, {keepLogin, getProductAction})(App)
