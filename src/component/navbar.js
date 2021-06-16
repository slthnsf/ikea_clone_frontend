import React from 'react';
import {
    Collapse, Navbar, NavbarBrand, NavbarToggler, Nav, NavItem, NavLink,
    UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem,
    Input, InputGroup, InputGroupAddon, Dropdown, Button, Badge
} from 'reactstrap';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { authLogout } from '../actions'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

//functional component
class NavbarComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buka: false,
            openSearch: false,
            dataSearch: [],
            qty: 0,
            openDropdownCart: false,
        }
    }

    toggle = () => {
        this.setState({ buka: !this.state.buka })
    }

    handleSearch = () => {
        if (this.search.value == "") {
            this.setState({ openSearch: false, dataSearch: [] })
        } else {
            let dataSearch = this.props.products.filter(item => item.nama.toLowerCase().includes(this.search.value.toLowerCase()))
            this.setState({ openSearch: dataSearch.length > 0 ? true : false, dataSearch })
        }
    }

    printSearch = () => {
        return this.state.dataSearch.map((item, index) => {
            return <DropdownItem>{item.nama}</DropdownItem>
        })
    }

    totalQty = () => {
        return this.props.cart.map((item, index) => {
            return item.qty
        }).reduce((a, b) => a + b, 0)
    }

    showCart = () => {
        this.setState({ openDropdownCart: !this.state.openDropdownCart })
    }

    printShowCart = () => {
        return this.props.cart.map((item, index) => {
            return (
                <DropdownItem><img src={item.images[0].images} height="20vh" /> {item.nama} x {item.qty}</DropdownItem>
            )
        })
    }

    render() {
        console.log(this.state.dataSearch, this.state.openSearch)
        return (
            <div className="container-fluid">
                <div style={{ fontSize: "14px" }}>
                    <ul type="none" className="d-flex m-2" style={{ justifyContent: 'space-between', color: 'blue' }}>
                        <li><Link className="nav-link active" to="" style={{ color: '#95a5a6', }}>Indonesia</Link></li>
                        <li><Link className="nav-link active" to="" style={{ color: '#95a5a6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span class="material-icons">
                                language
                        </span>
                            Bahasa</Link></li>
                        <li><Link className="nav-link active" to="" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span class="material-icons">
                                place
                        </span>
                            Informasi Toko</Link></li>
                        <li><Link className="nav-link active" to="" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span class="material-icons">
                                favorite_border
                            </span>
                            Kebijakan Pengembalian</Link></li>
                        <li><Link className="nav-link active" to="">IKEA Bisnis</Link></li>
                        <li><Link className="nav-link active" to="" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span class="material-icons">
                                place
                            </span>
                            Lacak Pengiriman Online</Link></li>
                        <li><Link className="nav-link active" to="">Program Perencanaan</Link></li>
                        <li><Link className="nav-link active" to="/login">Masuk atau Daftar </Link></li>
                    </ul>
                </div>
                <Navbar expand="md" style={{ backgroundColor: this.props.role == "admin" ? '#74b9ff' : "#FFFFFF" }}>
                    <NavbarBrand>
                        <Link to="/">
                            <img src="https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/logos/IKEA_logo.svg"
                                width="100px" />
                        </Link>
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.buka} navbar>
                        <Nav className="mr-auto" navbar>
                            <NavItem>
                                <Link to="/products" className="nav-link" href="/produk/" style={{ color: 'gray', fontWeight: 'bold' }}>Products</Link>
                            </NavItem>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret style={{ color: 'gray', fontWeight: 'bold' }}>
                                    Category
                            </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>
                                        Option 1
                                </DropdownItem>
                                    <DropdownItem>
                                        Option 2
                                </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>
                                        Reset
                                </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                        <InputGroup size="sm" style={{ width: '15%' }} >
                            <Input placeholder="search" onChange={this.handleSearch} innerRef={el => this.search = el} />
                            <InputGroupAddon addonType="append">
                                <Dropdown isOpen={this.state.openSearch} >
                                    <DropdownToggle className="btn btn-primary btn-sm material-icons">
                                        search
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                        {this.printSearch()}
                                    </DropdownMenu>
                                </Dropdown>
                            </InputGroupAddon>
                        </InputGroup>
                        <div className="d-flex">
                            <span className="material-icons m-1">
                                shopping_cart
                            </span>
                            <h5>
                                <Dropdown isOpen={this.state.openDropdownCart} toggle={this.showCart}>
                                    <DropdownToggle color="warning" className="m-auto" size="sm" >
                                        {this.totalQty()}
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                        {this.printShowCart()}
                                    </DropdownMenu>
                                </Dropdown>
                            </h5>
                        </div>
                        <div>

                            {
                                this.props.username &&

                                <UncontrolledDropdown>
                                    <DropdownToggle DropdownToggle nav caret style={{ color: 'gray' }}>
                                        Hello, {this.props.username}
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                        {
                                            this.props.role == "User" ?
                                                <>
                                                    <DropdownItem>
                                                        <Link to={
                                                            {
                                                                pathname: `/shopping-cart/${this.props.id}`,
                                                            }} style={{ textDecoration: "none", color: "black" }}>
                                                            Cart
                                                    </Link>

                                                    </DropdownItem>
                                                    <DropdownItem>
                                                        <Link to={
                                                            {
                                                                pathname: `/check-out/${this.props.id}`,
                                                            }} style={{ textDecoration: "none", color: "black" }}>
                                                            History
                                                    </Link>

                                                    </DropdownItem>
                                                </> :
                                                <>
                                                    <DropdownItem>
                                                        <Link to="/product-management" style={{ textDecoration: "none", color: "black" }}>
                                                            Product Management
                                                    </Link>
                                                    </DropdownItem>
                                                    <DropdownItem>
                                                        <Link to="/history-admin" style={{ textDecoration: "none", color: "black" }}>
                                                            Transaction Management
                                                    </Link>
                                                    </DropdownItem>
                                                </>
                                        }

                                        <DropdownItem divider />
                                        <DropdownItem onClick={this.props.authLogout}>
                                            Logout
                                            </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            }
                        </div>
                        {/* <div className="d-flex">
                            <span className="material-icons m-1">
                                shopping_cart
                            </span>
                            <h5>
                                <Dropdown isOpen={this.state.openDropdownCart} toggle={this.showCart}>
                                    <DropdownToggle color="warning" className="m-auto" size="sm" >
                                        {this.totalQty()}
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                        {this.printShowCart()}
                                    </DropdownMenu>
                                </Dropdown> 
                            </h5>
                        </div> */}
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

const mapStateToProps = ({ authReducer, productReducers }) => {
    return {
        username: authReducer.username,
        id: authReducer.idtb_user,
        role: authReducer.role,
        cart: authReducer.cart,
        products: productReducers.products_list
    }
}

export default connect(mapStateToProps, { authLogout })(NavbarComp);