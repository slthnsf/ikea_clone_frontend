import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { Button, ButtonDropdown, Modal, ModalBody, ModalFooter, ModalHeader, Table } from 'reactstrap';
import { URL_API } from './helper';
import { Badge } from 'reactstrap';


class HistoryAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            transaction: [],
            modal: false,
            selectedIndex: null
        }
    }

    componentDidMount() {
        this.getDataCheckOut()
    }

    getDataCheckOut = () => {
        axios.get(URL_API + `/transaction/get-alltrans`)
            .then(res => {
                console.log(res.data)
                this.setState({ transaction: res.data })
            })
            .catch(err => console.log(err))
    }

    printCheckOut = () => {
        console.log(this.state.transaction)
        let { transaction } = this.state
        return transaction.map((item, index) => {
            if (this.state.selectedIndex === index) {
                return (
                    <Modal isOpen={!this.state.modal}>
                        <ModalHeader toggle={this.toggle}> Detail Product</ModalHeader>
                        <ModalBody>
                            <div className="row">
                                <div className="col-8">
                                    <h6>Date: {item.date}</h6>
                                    <h6>Invoice: {item.invoice}</h6>
                                    <h6>Pemesan: {item.username}</h6>
                                    <h6>Note: {item.note}</h6>
                                </div>
                                <div className="col-4" style={{ display: "flex", justifyContent: "flex-end" }}>
                                    <h6>
                                        {
                                            item.status == "Unpaid" ?
                                                <>
                                                    <Badge color="warning">{item.status}</Badge>
                                                </> :
                                                <>
                                                    {
                                                        item.status == "Paid" ?
                                                        <Badge color="primary">{item.status}</Badge> :
                                                        <Badge color="success">{item.status}</Badge>
                                                    }
                                                </>
                                        }
                                    </h6>
                                </div>
                            </div>
                            <div>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>No</th>
                                            <th>Nama Product</th>
                                            <th>Type</th>
                                            <th>Harga</th>
                                            <th>Qty</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            item.detail.map((item, index) => {
                                                return (
                                                    <tr>
                                                        <td>{index + 1}</td>
                                                        <td>{item.nama}</td>
                                                        <td>{item.type}</td>
                                                        <td>{item.harga}</td>
                                                        <td>{item.qty}</td>
                                                        <td>{item.qty * item.harga}</td>
                                                    </tr>
                                                )
                                            })
                                        }

                                    </tbody>
                                </Table>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <h6>Ongkir</h6>
                                <h6>{item.ongkir}</h6>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <h6>Total</h6>
                                <h6>{item.total_payment}</h6>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={() => this.setState({ selectedIndex: null })}>OK</Button>
                        </ModalFooter>
                    </Modal>
                )
            } else {
                return (
                    <tr>
                        <td>{index + 1}</td>
                        <td>{item.date}</td>
                        <td>{item.invoice}</td>
                        <td>{item.total_payment.toLocaleString()}</td>
                        <td style={{ display: "flex", justifyContent: "space-evenly" }}>
                            {
                                this.props.role == "Admin" ?
                                    <>
                                        {
                                            item.status == "Paid" || item.status == "Processed" ?
                                                <>
                                                    <Button color="primary" onClick={() => this.setState({ selectedIndex: index })}>Detail</Button>
                                                    <Button color="success" onClick={() => this.onBtConfirm(item.idtb_transaction)}>Confirm</Button>
                                                </>
                                                :
                                                <>
                                                    <Button color="primary" onClick={() => this.setState({ selectedIndex: index })}>Detail</Button>
                                                    <Button color="success" disabled>Confirm</Button>
                                                </>
                                        }
                                    </>
                                    :
                                    <>
                                        <Button color="primary" onClick={() => this.setState({ selectedIndex: index })}>Detail</Button>
                                        <Button color="success">Paid</Button>
                                    </>
                            }

                        </td>
                    </tr>
                )
            }
        })
    }

    onBtConfirm = (idtb_transaction) => {
        axios.patch(URL_API + `/transaction/confirm/${idtb_transaction}`)
            .then(res => {
                // console.log(res.data)
                this.getDataCheckOut()
            }).catch(err => console.log(err))
    }
    render() {
        console.log("transaksi", this.state.transaction)
        return (
            <div className="container p-5">
                <h1 style={{ fontSize: '42px', textAlign: "center" }}>Order Summary</h1>
                <div >
                    <Table style={{ borderBottom: "1px solid #dfe6e9", textAlign: "center" }}>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Date</th>
                                <th>Invoice</th>
                                <th>Total</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.printCheckOut()}
                        </tbody>
                    </Table>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ authReducer }) => {
    return {
        idtb_user: authReducer.idtb_user,
        role: authReducer.role
    }
}

export default connect(mapStateToProps)(HistoryAdmin);