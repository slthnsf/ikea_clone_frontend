import axios from 'axios';
// import { Button } from 'bootstrap';
import React from 'react';
import { Collapse, Input } from 'reactstrap';
import { URL_API } from './helper';
import { Button } from 'reactstrap'
import { connect } from 'react-redux'
import { getProductAction, updateCart, authLogin } from '../actions'
import { getCart } from '../actions'
import { Link } from 'react-router-dom'

class ProductDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            detail: [],
            thumbnail: 0,
            openType: false,
            qty: 1,
            type: "",
            selectedType: {}
        }
    }

    componentDidMount() {
        this.getProductDetail()
    }

    getProductDetail = () => {
        console.log("CEK", this.props.location)
        axios.get(URL_API + `/products/get${this.props.location.search}`)
            .then(res => {
                console.log("detail product", res.data)
                this.setState({ detail: res.data[0] })
                console.log("DETAIL: ", this.state.detail)
            })
            .catch(err => {
                console.log(err)
            })
    }

    renderImage = () => {
        let { images } = this.state.detail
        return images.map((item, index) => {
            return (
                <img className="select-image mb-1" src={item.images} key={index}
                    onClick={() => this.setState({ thumbnail: index })}
                    style={{ borderBottom: this.state.thumbnail == index && "4px solid #407ab1" }} width="100%" />
            )
        })
    }

    incrementQty = () => {
        if (this.state.qty < this.state.selectedType.qty) {
            return this.setState({ qty: this.state.qty + 1 })
        } else {
            alert('Product out of stock')
        }
    }

    DecrementQty = () => {
        if (this.state.qty > 1) {
            return this.setState({ qty: this.state.qty - 1 })
        }
    }

    onBtCart = () => {
        console.log("cek cart", this.props.cart)
        if (this.state.selectedType.type) {
            let token = localStorage.getItem("tkn_id")
            const headers = {
                headers: {
                  'Authorization': `Bearer ${token}`
                }
              }
            let idtb_user = this.props.id
            let idtb_product = this.state.detail.idtb_product
            let idtb_product_stok = this.state.selectedType.idtb_product_stok
            let qty = this.state.qty
            let index = this.props.cart.findIndex(item => item.idtb_product_stok == idtb_product_stok)
            console.log("cek index", index)
            console.log({ idtb_user: idtb_user, idtb_product: idtb_product, idtb_product_stok: idtb_product_stok, qty: qty })
            if (index >= 0) {
                this.props.cart[index].qty += qty
                console.log("QTY", this.props.cart[index].qty)
                let found = this.props.cart.find(item => item.idtb_product_stok == idtb_product_stok)
                console.log("IDCART", found.idtb_cart)
                axios.patch(URL_API + `/transaction/update-qty`, {
                    qty: this.props.cart[index].qty, idtb_cart: found.idtb_cart
                }).then(res => {
                    console.log("Res Cart:", res.data)
                    this.props.getCart(this.props.id)
                }).catch(err => console.log(err))
            } else {
                axios.post(URL_API + '/transaction/post-cart', {
                    idtb_product, idtb_product_stok, qty
                }, headers)
                .then(res => {
                    console.log("Res Cart:", res.data)
                    this.props.getCart(this.props.id)
                }).catch(err => console.log(err))
            }

            // let images = this.state.detail.images
            // let nama = this.state.detail.nama
            // // let kategori = this.state.detail.kategori
            // let harga = this.state.detail.harga
            // let type = this.state.selectedType.type
            // let qty = this.state.qty
            // let total = harga * qty
            // console.log({idtb_product: idtb_product, nama: nama, harga: harga, qty: qty, type: type, total: total, images: images})
            // let index = this.props.cart.findIndex(item => item.nama == nama && item.type == type)
            // console.log("cek index", index)
            // if (index >= 0) {
            //     this.props.cart[index].qty += qty
            //     this.props.cart[index].total = this.props.cart[index].qty * harga
            // } else {
            //     let cart = { image: image, nama: nama, type: type, harga: harga, qty: qty, total: total }
            //     this.props.cart.push(cart)
            // }
            // axios.patch(URL_API + `/users/${this.props.id}`, {
            //     cart: this.props.cart
            // })
            //     .then(res => {
            //         console.log("Res Cart:", res.data)
            //         this.props.getProductAction()
            //     })
            //     .catch(err => console.log(err))
        } else {
            alert('Choose product type first')
        }
    }

    render() {
        return (
            <div className="row p-5">
                {
                    this.state.detail.idtb_product &&
                    <>
                        <div className="col-md-1">
                            {this.renderImage()}
                        </div>
                        <div className="col-md-7">
                            <img src={this.state.detail.images[this.state.thumbnail].images} width="70%" />
                        </div>
                        <div className="col-md-4">
                            <div style={{ borderBottom: "1.5px solid gray" }}>
                                <h4 style={{ fontWeight: "bolder" }}>{this.state.detail.nama}</h4>
                                {/* <h6 className="text-mute">{this.state.detail.kategori}</h6> */}
                                <h2 style={{ fontWeight: "bolder" }}>Rp. {this.state.detail.harga.toLocaleString()}</h2>
                            </div>
                            <div style={{ borderBottom: "1.5px solid gray" }}>
                                <span onClick={() => this.setState({ openType: !this.state.openType })}>Type: {this.state.selectedType.type}</span>
                                <Collapse isOpen={this.state.openType} innerRef={elemen => this.addStok = elemen} >
                                    {
                                        this.state.detail.stok.map((item, index) => {
                                            return (
                                                <div>
                                                    <Button onClick={() => this.setState({ type: item.type })} outline color="secondary" size="sm"
                                                        style={{ width: '100%', border: 'none', textAlign: 'left' }}
                                                        onClick={() => this.setState({ selectedType: item, qty: 1 })}
                                                    > {item.type} : {item.qty} </Button>
                                                </div>
                                            )
                                        })
                                    }
                                </Collapse>
                            </div>
                            <div className="d-flex justify-content-between align-item-center">
                                <span>Jumlah : </span>
                                <span style={{ width: '30%', display: 'flex', alignItems: 'center', border: '1px solid gray', height: '100%' }}>
                                    <span onClick={this.DecrementQty} class="material-icons" style={{ cursor: "pointer" }} >
                                        remove
                                    </span>
                                    {/* <span>{this.state.qty}</span> */}
                                    <Input size="sm" style={{ width: '50%', display: 'inline-block' }}
                                        innerRef={elemen => this.addQty = elemen} value={this.state.qty} />
                                    <span onClick={this.incrementQty} class="material-icons" style={{ cursor: "pointer" }}>
                                        add
                                    </span>
                                </span>
                            </div>
                            <div >
                                <Link className="btn btn-warning btn-lg btn-block" onClick={() => this.onBtCart(this.props.id)}
                                    style={{ fontWeight: 'bolder', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                    to={
                                        {
                                            pathname: `/shopping-cart/${this.props.id}`,
                                        }}>
                                    <span class="material-icons" >
                                        shopping_cart
                                    </span>
                                    <span> Tambah ke keranjang belanja</span></Link>
                                <Button outline color="secondary" size="lg" block style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <span class="material-icons">
                                        favorite_border
                                </span>
                                    <span> Tambah ke favorite</span>
                                </Button>
                            </div>
                        </div>
                    </>
                }
            </div>
        );
    }
}

const mapStateToProps = ({ authReducer }) => {
    return {
        id: authReducer.idtb_user,
        cart: authReducer.cart
    }
}

export default connect(mapStateToProps, { getProductAction, getCart, updateCart, authLogin })(ProductDetail);