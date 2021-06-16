import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { Button, Table } from 'reactstrap';
import { Input } from 'reactstrap';
import { updateCart, deleteCart, getCart } from '../actions'
import { URL_API } from './helper';
import { Link } from "react-router-dom";
import { getProductAction, getDataCheckout, authLogin } from '../actions'


class ShoppingCart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            qty: 0,
            cart: [],
            message: "",
            display: "none",
            stok: [],
            detail: []
        }
    }


    incrementQty = (index) => {
        let { idtb_user, cart, updateCart } = this.props
        cart[index].qty += 1
        updateCart({ idtb_user, qty: cart[index].qty, idtb_cart: cart[index].idtb_cart })
    }

    DecrementQty = (index) => {
        let { idtb_user, cart, updateCart } = this.props
        cart[index].qty -= 1
        updateCart({ idtb_user, qty: cart[index].qty, idtb_cart: cart[index].idtb_cart })
    }


    getDataCart = () => {
        console.log("YUHUU", this.props.cart)
        return this.props.cart.map((item, index) => {
            return (
                <tr>
                    <td><img src={item.images[0].images} alt="..." width="200vw" /></td>
                    <td >
                        <div style={{ fontWeight: "bolder" }}>{item.nama}</div>
                        {/* <div>{item.kategori}</div> */}
                        <div>{item.type}</div>
                        <div><h4 style={{ fontWeight: "bolder" }}>{item.harga.toLocaleString()}</h4></div>
                    </td>
                    <td>
                        <span style={{ width: '30%', display: 'flex', alignItems: 'center', border: '1px solid gray', height: '100%' }}>
                            <span onClick={() => this.DecrementQty(index)} class="material-icons" >
                                remove
                                </span>
                            <Input size="sm" placeholder="qty" style={{ width: '50%', display: 'inline-block' }}
                                innerRef={elemen => this.addQty = elemen} value={item.qty} />
                            <span onClick={() => this.incrementQty(index)} class="material-icons">
                                add
                                </span>
                        </span>
                    </td>
                    <td style={{ fontWeight: "bolder" }}>
                        {(item.harga * item.qty).toLocaleString()}
                        <div>
                            <Button outline color="danger" style={{ border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => this.props.deleteCart(item, item.idtb_cart)}>
                                <span class="material-icons">
                                    delete_outline
                            </span>
                            Remove</Button>
                        </div>
                    </td>
                </tr>
            )
        })
    }


    onBtRemoveCart = () => {
        // this.props.cart.splice(0)
        let token = localStorage.getItem("tkn_id")
        const headers = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        axios.patch(URL_API + `/transaction/remove-cart`, headers)
            .then(res => {
                // this.props.updateCart()
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    totalQty = () => {
        return this.props.cart.map((item, index) => {
            return item.qty
        }).reduce((a, b) => a + b, 0)
    }

    totalHargaCart = () => {
        return this.props.cart.map((item, index) => {
            return (item.qty * item.harga)
        }).reduce((a, b) => a + b, 0)
    }

    getInvoice = () => {
        let inv = Date.now()
        let inv2 = inv.toString()
        let inv3 = parseInt(inv2.slice(0, 10))
        return `#INVOICE/${inv3}`
    }

    getDate = () => {
        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        return `${year}/${month}/${date}`
    }

    onBtCheckOut = () => {
        console.log("cart", this.props.cart)
        console.log("product", this.props.products)
        this.props.cart.forEach((item, index) => {
            this.props.products.forEach((value, idx) => {
                if (item.nama == value.nama) {
                    let idxStok = value.stok.findIndex(val => {
                        return val.type == item.type
                    })
                    console.log("idxSTok", idxStok)
                    value.stok[idxStok].qty -= item.qty
                    console.log("CEK", value.stok[idxStok].qty)
                    console.log("VALUEEE", value.stok)
                    let images = value.images
                    let nama = value.nama
                    let brand = value.brand
                    let deskripsi = value.deskripsi
                    let harga = value.harga
                    let stok = [
                        { "idtb_product_stok": value.stok[0].idtb_product_stok, "type": value.stok[0].type, "qty": value.stok[0].qty, "idtb_product": value.idtb_product },
                        { "idtb_product_stok": value.stok[1].idtb_product_stok, "type": value.stok[1].type, "qty": value.stok[1].qty, "idtb_product": value.idtb_product }]
                    console.log("CEK STOK", stok)
                    let tempDetail = this.state.detail
                    tempDetail.push({ idtb_product: value.idtb_product, idtb_product_stok: value.stok[idxStok].idtb_product_stok, idtb_cart: item.idtb_cart, qty: item.qty })
                    this.setState({ detail: tempDetail })

                    console.log("CEK PATCH", nama, brand, deskripsi, harga, images, stok)
                    console.log("idproduct", value.idtb_product)
                    console.log(`stok = [{idtb_product_stok = ${value.stok[0].idtb_product_stok}, type = ${value.stok[0].type}, qty = ${value.stok[0].qty}}, {idtb_product_stok = ${value.stok[1].idtb_product_stok}, type = ${value.stok[1].type}, qty = ${value.stok[1].qty}}]`)
                    axios.patch(URL_API + `/products/${value.idtb_product}`, {
                        nama, brand, deskripsi, harga, idtb_status: 1, images, stok
                    }).then(res => {
                        console.log("pengurangan products", res.data)

                    }).catch(err => console.log(err))


                }
            })
        });

        let token = localStorage.getItem("tkn_id")
            const headers = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        let detail = this.state.detail
        let invoice = this.getInvoice()
        // let date = this.getDate()
        let idtb_user = this.props.idtb_user
        let ongkir = 9000
        let total_payment = ongkir + this.totalHargaCart()
        console.log("TES", invoice, idtb_user, ongkir, total_payment, detail)
        axios.post(URL_API + `/transaction/post-transaction`, {
            invoice, ongkir, total_payment, detail
        }, headers).then(res => {
            console.log("POST", res.data)
            this.props.getDataCheckout(this.props.idtb_user)
            this.props.getCart(this.props.idtb_user)


        }).catch(err => console.log(err))


        // let id = this.props.id
        // let username = this.props.username
        // let totalPayment = this.totalHargaCart()
        // let dateCO = this.getDate()
        // let status = "UNPAID"
        // let cart = this.props.cart
        // console.log(id, username, totalPayment, dateCO, cart)
        // //4. axios.post => userTransactions
        // axios.post(URL_API + '/userTransactions', {
        //     id, username, totalPayment, dateCO, cart, status
        // })
        //     .then((res) => {
        //         this.onBtRemoveCart()
        //         if (this.props.cart.length === 0) {
        //             this.setState({ display: "block", message: "Berhasil Transaksi" })
        //         }
        //         // console.log("Respon Post UserTransaction", res.data)
        //         // this.props.getProductAction()
        //     })
        //     .catch(err => {
        //         console.log("ERROR POST", err)
        //     })
        // alert("Sukses")
        // //5. data userTransaction ditampilkan di historyPage user, transactionPage Admin
    }

    render() {
        return (
            <div className="contaier p-5">
                <h1 style={{ fontSize: '42px', textAlign: "center" }}>Shopping Cart</h1>
                <div >
                    <Table style={{ borderBottom: "1px solid #dfe6e9" }}>
                        <thead>
                            <tr>
                                <th></th>
                                <th style={{ width: '30vw' }}></th>
                                <th>Jumlah</th>
                                <th>Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.getDataCart()}
                        </tbody>
                    </Table>
                </div>
                <div className="container row p-5" style={{ alignContent: "center" }}>
                    <div className="col-md-6">
                        <div className="d-flex">
                            <span class="material-icons">
                                lock
                            </span>
                            <div>
                                <h5>Belanja Aman</h5>
                                <p>Kami menggunakan teknologi keamanan SSL terbaru untuk mengenkripsi semua informasi pribadi Anda.</p>
                            </div>
                        </div>
                        <div className="d-flex">
                            <span class="material-icons">
                                credit_card
                            </span>
                            <div>
                                <h5>Pilihan pembayaran</h5>
                                <p>Kami menerima semua kartu kredit dan debit serta metode pembayaran online.</p>
                            </div>
                        </div>
                        <div className="d-flex">
                            <span class="material-icons">
                                replay
                            </span>
                            <div>
                                <h5>Pengembalian 30 Hari</h5>
                                <p>Pengalaman menyenangkan Anda saat berbelanja di IKEA sangat penting bagi kami. Jika Anda merasa kurang puas dengan produk kami,
                                    Anda dapat menukarkannya atau mendapatkan pengembalian penuh dalam waktu 30 hari.</p>
                            </div>
                        </div>
                        <div className="d-flex">
                            <span class="material-icons">
                                email
                        </span>
                            <div>
                                <h5>Hubungi kami</h5>
                                <p>Jika ada pertanyaan terkait pesanan Anda,
                                    silakan periksa Bagian FAQ atau hubungi Layanan Pelanggan IKEA di 021 – 2985 3900 atau gunakan formulir hubungi kami. </p>
                            </div>
                        </div>

                    </div>
                    <div className="col-md-6">
                        <h6 style={{ fontWeight: "bolder" }}>Gunakan kode promo?</h6>
                        <div className="row d-flex" style={{ borderBottom: "1px solid #dfe6e9" }}>
                            <Input type="text" style={{ width: '20vw' }} />
                            <Button color="primary">Tambah</Button>{' '}
                        </div>
                        <div>
                            <p className="d-flex justify-content-between align-items-center">Jumlah produk: <span></span> </p>
                            <div style={{ borderBottom: "1px solid #dfe6e9" }}>
                                <h4>Ringkasan</h4>
                                <h6 className="d-flex justify-content-between align-items-center">Sub Total sebelum pengantaran:
                                <span>{this.totalHargaCart().toLocaleString()}</span>
                                </h6>
                                <h6 className="d-flex justify-content-between align-items-center">Total termasuk pajak:
                                <span>{this.totalHargaCart().toLocaleString()}</span>
                                </h6>
                            </div>
                            <h4>Layanan Pembiayaan</h4>
                            <Link onClick={() => this.onBtCheckOut(this.props.idtb_user)} to={{ pathname: `/check-out/${this.props.id}` }} className="btn btn-warning btn-lg btn-block" style={{ fontWeight: "bolder", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <span class="material-icons">
                                    lock
                            </span>
                                Bayar dengan aman</Link>{' '}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ authReducer, productReducers }) => {
    return {
        ...authReducer, products: productReducers.products_list
    }
}

export default connect(mapStateToProps, { updateCart, getProductAction, deleteCart, getDataCheckout, authLogin, getCart })(ShoppingCart);