
import React from 'react';
import {Container} from 'reactstrap'
import CarouselComp from '../component/carousel';
import CardCarousel from '../component/cardCarousel'
import "react-multi-carousel/lib/styles.css";


class LandingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <Container fluid>
                <CarouselComp/>
                <CardCarousel/>
            </Container>
         );
    }
}


 
export default LandingPage;