import React from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';

class CardProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        let {nama, kategori, brand, harga} = this.props.dataProduct
        
        return (
            <div className="col-md-3">
                <Card>
                    <CardImg top width="100%" src="/assets/318x180.svg" alt="Card image cap" />
                    <CardBody>
                        <CardTitle tag="h5" style={{fontWeight: 'bolder'}}>{nama}</CardTitle>
                        <CardSubtitle tag="h6" className="mb-2 text-muted">{kategori}</CardSubtitle>
                        <CardText tag="h5" style={{fontWeight: 'bolder'}}>Rp. {harga}</CardText>
                        <Button className="material-icons" type="button" outline
                        style={{width: "100%"}}>
                            <span>
                                visibility
                            </span>
                            <span>
                                Lihat sekilas
                            </span>
                           </Button>
                    </CardBody>
                </Card>
            </div>
        );
    }
}

export default CardProduct;