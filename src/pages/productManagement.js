import axios from "axios";
import React from "react";
import {
    Table,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form, FormGroup, Label, Input, Badge
} from "reactstrap";
import { URL_API } from "./helper";
import { Row, Col } from 'reactstrap'
import { connect } from 'react-redux'
import { getProductAction } from '../actions'

let kursor = {
    cursor: "pointer",
    marginRight: "0.5vw"
}
class ProductManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            modalEdit: false,
            products: [],
            stok: [],
            image: [],
            thumbnail: 0,
            selectedIndex: null,
            sortNama: [],
            idCtg: [],
            fileName: "Select file",
            fileUpload: null,
            imgPrev: null
        };
    }

    onBtFile = (e) => {
        if (e.target.files[0]) {
            this.setState({ fileName: e.target.files[0].name, fileUpload: e.target.files[0] })
            this.setState({ imgPrev: URL.createObjectURL(e.target.files[0]) })
        } else {
            this.setState({ fileName: "Select file", fileUpload: null })
        }
    }
    toggle = () => {
        this.setState((state, props) => ({
            modal: !this.state.modal
        }))
    }

    toggleEdit = () => {
        this.setState({ modalEdit: !this.state.modalEdit })
    }

    componentDidMount() {
        this.getIdCtg()
    }


    printDataProduct = () => {
        return this.props.products.map((item, index) => {
            if (this.state.selectedIndex === index) {
                return (
                    <Modal isOpen={!this.state.modalEdit}  >
                        <ModalHeader toggle={this.toggleEdit}>Edit Product</ModalHeader>
                        <ModalBody>
                            <Form>
                                <Row>
                                    <Col>
                                        <Label>Image</Label>
                                        <div className="input-group ">
                                            <Input type="text" innerRef={elemen => this.editIdImage = elemen} defaultValue={item.images[0].idtb_product_image} />
                                        </div>
                                        <div className="input-group ">
                                            <Input type="text" innerRef={elemen => this.editImage = elemen} defaultValue={item.images[0].images} />
                                        </div>
                                    </Col>
                                    <Col>
                                        <Label>Image2</Label>
                                        <div className="input-group ">
                                            <Input type="text" innerRef={elemen => this.editIdImage2 = elemen} defaultValue={item.images[1].idtb_product_image} />
                                        </div>
                                        <div className="input-group ">
                                            <Input type="text" innerRef={elemen => this.editImage2 = elemen} defaultValue={item.images[1].images} />
                                        </div>
                                    </Col>
                                    {/* <Col>
                                        <Label>Image3</Label>
                                        <div className="input-group ">
                                            <Input type="text" innerRef={elemen => this.editImage3 = elemen} defaultValue={item.images[2]} />
                                        </div>
                                    </Col> */}
                                </Row>
                                {/* <Label>Image</Label>
                                <div className="input-group ">
                                    <Input type="text" innerRef={elemen => this.editImage = elemen} defaultValue={item.image} />
                                </div> */}
                                <Label>Nama Produk</Label>
                                <div className="input-group ">
                                    <Input type="text" innerRef={elemen => this.editNama = elemen} defaultValue={item.nama} />
                                </div>
                                <Label>Deskripsi</Label>
                                <div className="input-group ">
                                    <Input type="text" innerRef={elemen => this.editDesc = elemen} defaultValue={item.deskripsi} />
                                </div>
                                <Label>Brand</Label>
                                <div className="input-group ">
                                    <Input type="text" innerRef={elemen => this.editBrand = elemen} defaultValue={item.brand} />
                                </div>
                                {/* <Label>Qty</Label>
                                <div className="input-group ">
                                    <Input type="text" innerRef={elemen => this.editQty = elemen} defaultValue={item.qty} />
                                </div> */}
                                {/* <Label>Kategori</Label>
                                <div className="input-group ">
                                    <Input type="select" innerRef={elemen => this.editKategori = elemen} defaultValue={item.kategori} >
                                        <option disabled selected>Pilih Kategori</option>
                                        <option>Sofa</option>
                                        <option>Kursi Kantor</option>
                                        <option>Lemari</option>
                                        <option>Lampu Meja</option>
                                    </Input>
                                </div> */}
                                <Row>
                                    <Col>
                                        <Label>Id Stok</Label>
                                        <div className="input-group ">
                                            <Input type="text" innerRef={elemen => this.editIdStok = elemen} defaultValue={item.stok[0].idtb_product_stok} />
                                        </div>
                                    </Col>
                                    <Col>
                                        <Label>Type 1</Label>
                                        <div className="input-group ">
                                            <Input type="text" innerRef={elemen => this.editType1 = elemen} defaultValue={item.stok[0].type} />
                                        </div>
                                    </Col>
                                    <Col>
                                        <Label>Quantity 1</Label>
                                        <div className="input-group ">
                                            <Input type="text" innerRef={elemen => this.editQty1 = elemen} defaultValue={item.stok[0].qty} />
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Label>Id Stok</Label>
                                        <div className="input-group ">
                                            <Input type="text" innerRef={elemen => this.editIdStok2 = elemen} defaultValue={item.stok[1].idtb_product_stok} />
                                        </div>
                                    </Col>
                                    <Col>
                                        <Label>Type 2</Label>
                                        <div className="input-group ">
                                            <Input type="text" innerRef={elemen => this.editType2 = elemen} defaultValue={item.stok[1].type} />
                                        </div>
                                    </Col>
                                    <Col>
                                        <Label>Quantity 2</Label>
                                        <div className="input-group ">
                                            <Input type="text" innerRef={elemen => this.editQty2 = elemen} defaultValue={item.stok[1].qty} />
                                        </div>
                                    </Col>
                                </Row>
                                <Label>Harga</Label>
                                <div className="input-group ">
                                    <Input type="text" innerRef={elemen => this.editHarga = elemen} defaultValue={item.harga} />
                                </div>
                            </Form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={() => this.onBtSave(item.idtb_product)}>Save</Button>{' '}
                            <Button color="secondary" onClick={() => this.setState({ selectedIndex: null })}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                )
            } else {
                return (
                    <tr>
                        <td>{index + 1}</td>
                        <td style={{ textAlign: "center" }}>
                            {
                                this.state.thumbnail[0] == index ?
                                    <img src={item.images[this.state.thumbnail[1]].images} width='60%' alt={item.nama + index} />
                                    :
                                    <img src={item.images[0].images} width='60%' />
                            }
                            <div>
                                {
                                    item.images &&
                                    item.images.map((item, idx) => {
                                        return <img src={item.images} style={kursor} width="20%"
                                            onClick={() => this.setState({ thumbnail: [index, idx] })} />
                                    })
                                }
                            </div>
                        </td>
                        {/* <td>{item.images}</td> */}
                        <td>{item.nama}</td>
                        <td>{item.deskripsi}</td>
                        <td>{item.brand}</td>
                        {/* <td>{item.qty}</td> */}

                        {/* <td>{item.kategori}</td> */}
                        <td>
                            {
                                item.stok &&
                                item.stok.map((item, index) => {
                                    return <p>{item.type} <Badge color="secondary">{item.qty}</Badge></p>
                                })
                            }
                        </td>
                        <td>Rp. {parseInt(item.harga).toLocaleString()}</td>
                        <td style={{ display: "flex", justifyContent: "space-evenly" }}>
                            <Button size="sm" color="warning" onClick={() => this.setState({ selectedIndex: index })}>Detail</Button>{' '}
                            <Button size="sm" color="danger" onClick={() => this.onBtDelete(item.idtb_product)}>Delete</Button>{' '}
                        </td>
                    </tr>
                )
            }
        })
    }

    onBtDelete = (idtb_product) => {
        axios.delete(URL_API + `/products/${idtb_product}`)
            .then(res => {
                this.props.getProductAction()
                // this.props.btClose()
            }).catch(err => {
                console.log("err del", err)
            })
        // axios.delete(`http://localhost:2022/products/${id}`)
        //     .then(() => {
        //         return axios.get(`http://localhost:2022/products`)
        //     })
        //     .then((res) => {
        //         let products = res.data
        //         this.setState({ products })
        //     })
    }

    onBtSave = (idtb_product) => {
        let images = [
            {
                "idtb_product_image": this.editIdImage.value,
                "images": this.editImage.value,
                "idtb_product": idtb_product
            },
            {
                "idtb_product_image": this.editIdImage2.value,
                "images": this.editImage2.value,
                "idtb_product": idtb_product
            }
        ]
        console.log(images)
        let nama = this.editNama.value
        let deskripsi = this.editDesc.value
        let brand = this.editBrand.value
        let stok = [
            {
                "idtb_product_stok": this.editIdStok.value,
                "type": this.editType1.value,
                "qty": this.editQty1.value,
                "idtb_product": idtb_product
            },
            {
                "idtb_product_stok": this.editIdStok2.value,
                "type": this.editType2.value,
                "qty": this.editQty2.value,
                "idtb_product": idtb_product
            }
        ]

        let harga = this.editHarga.value
        // PATCH: memperbarui data pada kolom data yang dipilih
        axios.patch(URL_API + `/products/${idtb_product}`, {
            nama, brand, deskripsi, harga, idtb_status: 1, images, stok
        })
            .then(res => {
                console.log("Res Save:", res.data)
                this.props.getProductAction()
                this.setState({ selectedIndex: null })
            })
            .catch(err => console.log(err))
    }

    onBtAdd = () => {
        console.log("Stok:", this.state.stok)
        // console.log("Image:", this.state.image)
        let nama = this.addNama.value
        let deskripsi = this.addDesc.value
        let brand = this.addBrand.value
        let idtb_category = parseInt(this.addKategori.value)
        // let qty = this.addQty.value
        // let image = this.addImage.value
        let stok = this.state.stok
        // let images = this.state.image
        // let image = [this.addImage.value, this.addImage2.value, this.addImage3.value]
        let harga = parseInt(this.addHarga.value)
        let idtb_status = 1
        let formData = new FormData()
        // console.log({ nama, brand, deskripsi, harga, idtb_status, idtb_category, images, stok })

        // {
        //     nama, brand, deskripsi, harga, idtb_status, idtb_category, stok
        // }
        formData.append('data', JSON.stringify({nama, brand, deskripsi, harga, idtb_status, idtb_category, stok}))
        formData.append('images', this.state.fileUpload)
        axios.post(URL_API + '/products/add', formData)
            .then((res) => {
                console.log('REspon Post', res.data)
                //cara 2
                // this.getDataProduct()
                this.props.getProductAction()
            })
            .catch(err => {
                console.log('ERROR', err)
            })

        this.toggle()
    }

    onBtAddStok = () => {
        let tempStok = this.state.stok
        tempStok.push({ qty: null, type: null, idtb_status: 1 })
        this.setState({ stok: tempStok })
    }
    onBtAddImage = () => {
        this.state.image.push(null)
        this.setState({ image: this.state.image })
        // let tempImage = [...this.state.image]
        // tempImage.push({ idtb_product_image: null, idtb_product: null, images: [] })
        // this.setState({ image: tempImage })
    }

    printStok = () => {
        if (this.state.stok.length > 0) {
            return this.state.stok.map((item, index) => {
                return <Row>
                    <Col>
                        <Input type="text" placeholder={`Type=${index + 1}`} onChange={(e) => this.handleType(e, index)} />
                    </Col>
                    <Col>
                        <Input type="number" min={0} placeholder={`Qty=${index + 1}`} onChange={(e) => this.handleQty(e, index)} />
                    </Col>
                    <Col>
                        <a onClick={() => this.onBtDeleteStok(index)} class="material-icons">
                            delete
                        </a>
                    </Col>
                </Row>
            })
        }
    }

    onBtDeleteStok = (index) => {
        this.state.stok.splice(index, 1)
        this.setState({ stok: this.state.stok })
    }

    handleType = (e, index) => {
        this.state.stok[index].type = e.target.value
    }

    handleQty = (e, index) => {
        this.state.stok[index].qty = parseInt(e.target.value)
    }

    onBtCancel = () => {
        this.setState({ stok: [] })
        this.toggle()
    }



    printImage = () => {
        if (this.state.image.length > 0) {
            return this.state.image.map((item, index) => {
                return <Row>
                    <Col>
                        <Input type="text" placeholder={`Image=${index + 1}`}
                            onChange={(e) => this.handleImage(e, index)} />
                    </Col>
                    <Col>
                        <a onClick={() => this.onBtDeleteImage(index)} class="material-icons">
                            delete
                        </a>
                    </Col>
                </Row>

            })
        }
    }

    handleImage = (e, index) => {
        this.state.image[index] = e.target.value
    }

    onBtDeleteImage = (index) => {
        this.state.image.splice(index, 1)
        this.setState({ image: this.state.image })
    }

    handleSort = () => {
        if (this.sort.value === "nama-asc") {
            this.props.products.sort((a, b) => {
                let namaA = a.nama.toUpperCase()
                let namaB = b.nama.toUpperCase()

                if (namaA < namaB) {
                    return -1;
                }
            })
            console.log(this.props.products)
        } else if (this.sort.value === "nama-desc") {
            this.props.products.sort((a, b) => {
                let namaA = a.nama.toUpperCase()
                let namaB = b.nama.toUpperCase()

                if (namaA > namaB) {
                    return -1;
                }
            })
            // this.setState(this.props.products)
        } else if (this.sort.value === "harga-asc") {
            this.props.products.sort((a, b) => {
                return a.harga - b.harga
            })
            // this.setState(this.props.products)
        } else if (this.sort.value === "harga-desc") {
            this.props.products.sort((a, b) => {
                return b.harga - a.harga
            })
            // this.setState(this.props.products)
        } else {
            return this.props.products
        }
        this.setState(this.props.products)
    }
    // onBtSort = () => {
    //     console.log(this.sort.value)
    //     let field = this.sort.value.split('-')[0]
    //     let sortType = this.sort.value.split('-')[1]
    //     axios.get(URL_API+ `/products?_sort=${field}&_order=${sortType}`)
    //     .then(res => {
    //         console.log(field, sortType, res.data)
    //         // this.setState({ products: res.data })
    //         this.props.getProductAction(res.data)
    //     })
    //     .catch(err => {
    //         console.log(err)
    //     })  
    // }

    getIdCtg = () => {
        axios.get(URL_API + `/transaction/getId`)
            .then(res => {
                console.log("CEK ID", res.data)
                this.setState({ idCtg: res.data })
            }).catch(err => console.log(err))
    }

    render() {
        // console.log("IMG", this.state.fileName)
        return (
            <div className="container">
                <h2 className="text-center">Product Management</h2>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Input style={{ width: '20%' }} type="select" onClick={this.handleSort}
                        innerRef={elemen => this.sort = elemen} >
                        <option selected disabled>Sort</option>
                        <option value="nama-asc" >Nama Asc</option>
                        <option value="nama-desc">Nama Desc</option>
                        <option value="harga-asc">Harga Asc</option>
                        <option value="harga-desc">Harga Desc</option>
                    </Input>
                    <Button color="success" onClick={this.toggle}>Add</Button>
                    <Modal isOpen={this.state.modal} toggle={this.toggle} >
                        <ModalHeader toggle={this.toggle}>Add Product</ModalHeader>
                        <ModalBody>
                            <Form>
                                <Label>Nama Produk</Label>
                                <div className="input-group ">
                                    <Input type="text" innerRef={elemen => this.addNama = elemen} />
                                </div>
                                <Label>Deskripsi</Label>
                                <div className="input-group ">
                                    <Input type="text" innerRef={elemen => this.addDesc = elemen} />
                                </div>
                                <Label>Brand</Label>
                                <div className="input-group ">
                                    <Input type="text" innerRef={elemen => this.addBrand = elemen} />
                                </div>
                                <Label>Category</Label>
                                <div className="input-group ">
                                    <Input type="select" innerRef={elemen => this.addKategori = elemen}>
                                        <option disabled selected>Choose Category</option>
                                        {
                                            this.state.idCtg.map((item, index) => {
                                                return (
                                                    <option value={item.idtb_category}>{item.category}</option>
                                                )
                                            })
                                        }
                                    </Input>
                                </div>
                                {/* <Label>Qty</Label>
                                <div className="input-group ">
                                    <Input type="text" innerRef={elemen => this.addQty = elemen} />
                                </div> */}
                                <FormGroup>
                                    <Label>Stok</Label>
                                    <Button outline color="success" type="button" size="sm" style={{ float: "right" }} onClick={this.onBtAddStok}>Add Stok</Button>
                                    {this.printStok()}
                                </FormGroup>
                                {/* <Label>Image</Label>
                                <div className="input-group ">
                                    <Input type="text" innerRef={elemen => this.addImage = elemen} />
                                </div> */}
                                <FormGroup>
                                    <Label>Images</Label>
                                    <div style={{ display: "flex", alignItems: "center", justifyItems: "center" }}>
                                        {
                                            this.state.imgPrev != null ?
                                            <>
                                            <img src={ this.state.imgPrev  } width='30%' />
                                            <Input type="file" onChange={this.onBtFile} />
                                            </> :
                                            <>
                                            <img src="https://reactnativecode.com/wp-content/uploads/2018/02/Default_Image_Thumbnail.png" width='30%' />
                                            <Input type="file" onChange={this.onBtFile} />
                                            </>
                                            
                                        }

                                    </div>
                                    {/* <Button outline color="success" type="button" size="sm" style={{ float: "right" }} onClick={this.onBtAddImage}>Add Image</Button> */}
                                    {/* {this.printImage()} */}
                                    {/* <InputGroup>
                                    </InputGroup> */}
                                </FormGroup>
                                <Label>Harga</Label>
                                <div className="input-group ">
                                    <Input type="text" innerRef={elemen => this.addHarga = elemen} />
                                </div>
                            </Form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.onBtAdd}>Add Product</Button>{' '}
                            <Button color="secondary" onClick={this.onBtCancel}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </div>
                <div >
                    <Table hover style={{ textAlign: "center", alignContent: "center" }}>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th style={{ width: "20vw" }}>Image</th>
                                <th>Nama</th>
                                <th style={{ width: "15vw" }}>Deskripsi</th>
                                <th>Brand</th>
                                <th>Stok</th>
                                <th>Harga</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody className="m-auto">
                            {this.printDataProduct()}
                        </tbody>
                    </Table>
                </div>

            </div>
        );
    }
}

const mapStateToProps = ({ productReducers }) => {
    return {
        products: productReducers.products_list
    }
}

export default connect(mapStateToProps, { getProductAction })(ProductManagement);





