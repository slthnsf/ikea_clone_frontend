import React from 'react';
import { Input, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
import Carousel from "react-multi-carousel";
import { connect } from 'react-redux'
import Slider from 'react-slick'
import { Link } from 'react-router-dom'

class CardCarousel extends React.Component {
    constructor(props) {
        super(props);
        this.state = { }
    }

    printProducts = () => {
        console.log("CEK PRODUCT", this.props.products)
        if (this.props.products.length > 0) {
            return this.props.products.map((item, index) => {
                return <div >
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
    }

    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 3,
            
          };
        return (
            <div>
                <Slider {...settings}>
                {this.printProducts()}
                </Slider>
                {/* <Carousel additionalTransfrom={0}
                    arrows
                    autoPlaySpeed={3000}
                    centerMode={false}
                    className=""
                    containerClass="container-with-dots"
                    dotListClass=""
                    draggable
                    focusOnSelect={false}
                    infinite
                    itemClass=""
                    keyBoardControl
                    minimumTouchDrag={80}
                    renderButtonGroupOutside={false}
                    renderDotsOutside={false}
                    responsive={{
                        desktop: {
                            breakpoint: {
                                max: 3000,
                                min: 1024,
                            },
                            items: 5,
                            partialVisibilityGutter: 40,
                        },
                        mobile: {
                            breakpoint: {
                                max: 464,
                                min: 0,
                            },
                            items: 1,
                            partialVisibilityGutter: 30,
                        },
                        tablet: {
                            breakpoint: {
                                max: 1024,
                                min: 464,
                            },
                            items: 2,
                            partialVisibilityGutter: 30,
                        },
                    }}
                    showDots={false}
                    sliderClass=""
                    slidesToSlide={1}
                    swipeable>
                    {this.printProducts()}
                </Carousel> */}
            </div>
        );
    }
}

const mapStateToProps = ({ productReducers }) => {
    return {
        products: productReducers.products_list
    }
}

export default connect(mapStateToProps)(CardCarousel);