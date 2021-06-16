import axios from "axios";
import React from 'react';
import { URL_API } from "./helper";
import { connect } from 'react-redux'
import { getProductAction, sortProducts} from '../actions'
import { Input, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";


class ProductsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.products,
            key: true
        }
    }

    //untuk menjalankan fungsi ketika ada perubahan data pada state dan juga props
    componentDidUpdate(){
        if(this.props.products.length > 0 && this.state.key){
            this.setState({data: this.props.products, key: false})
        }
    }

    printProducts = () => {
            return this.props.products.map((item, index) => {
                return <div className="col-md-2">
                    <Card >
                        <Link to={`/product-detail?idtb_product=${item.idtb_product}`} style={{textDecoration: "none", color: "black"}}>
                        <CardImg top width="80%" src={item.images[0].images} alt="Card image cap" />
                        <CardBody>
                            <CardTitle tag="h5" style={{ fontWeight: 'bolder' }}>{item.nama}</CardTitle>
                            <CardSubtitle tag="h6" className="mb-2 text-muted">{item.kategori}</CardSubtitle>
                            <CardText tag="h5" style={{ fontWeight: 'bolder' }}>Rp. {item.harga.toLocaleString()}</CardText>
                            <Button type="button" outline
                                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <span class="material-icons">
                                    visibility
                                </span>
                                <span>Lihat Sekilas</span>
                            </Button>
                        </CardBody>
                        </Link>
                    </Card>
                </div>
            })
    }


    handleSortReducer = () => {
        let field = this.sort.value.split('-')[0]
        let sortType = this.sort.value.split('-')[1]
        let tempData = [...this.props.products];
        let sortValue = this.sort.value
        if(sortType == 'asc'){
            let dataAsc = tempData.sort((a, b) => {
                return a[field] - b[field]
            })
            this.setState({ data: dataAsc})
        } else if(sortType == 'desc') {
            let dataDesc = tempData.sort((a, b) => {
                return b[field] - a[field]
            })
            this.setState({data: dataDesc})
        } 
        else if (sortValue == "nama-asc"){
            let namaAsc = tempData.sort((a, b) => {
                return a[field] - b[field]
            })
            this.setState({data: namaAsc})
        }
    }

    handleSort = () => {
        if(this.sort.value === "nama-asc"){
            this.props.products.sort((a, b) =>{
                let namaA = a.nama.toUpperCase()
                let namaB = b.nama.toUpperCase()
    
                if(namaA < namaB){
                    return -1;
                } 
            })
            console.log(this.props.products)
        } else if (this.sort.value === "nama-desc"){
            this.props.products.sort((a, b) =>{
                let namaA = a.nama.toUpperCase()
                let namaB = b.nama.toUpperCase()
    
                if(namaA > namaB){
                    return -1;
                } 
            })
            // this.setState(this.props.products)
        } else if(this.sort.value === "harga-asc"){
            this.props.products.sort((a, b) =>{
                return a.harga - b.harga 
            })
            // this.setState(this.props.products)
        } else if (this.sort.value === "harga-desc"){
            this.props.products.sort((a, b) =>{
                return b.harga - a.harga 
            })
            // this.setState(this.props.products)
        } else {
            return this.props.products
        }
        this.setState(this.props.products)
    }

    render() {
        return (
            <div>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Input style={{ width: '20%' }} type="select" onClick={this.handleSort} innerRef={elemen => this.sort = elemen} >
                        <option selected disabled>Sort</option>
                        <option value="nama-asc" >Nama Asc</option>
                        <option value="nama-desc">Nama Desc</option>
                        <option value="harga-asc">Harga Asc</option>
                        <option value="harga-desc">Harga Desc</option>
                        <option value="id-asc">Reset</option>
                    </Input>
                </div>
                <div className="row">
                {this.printProducts()}
                </div>                
            </div>

        );
    }
}

const mapStateToProps = ({ productReducers }) => {
    return {
        products: productReducers.products_list,
        productsList: productReducers.products_sort
    }
}

export default connect(mapStateToProps, { getProductAction, sortProducts })(ProductsPage);