import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

class NotFound extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className="row px-5 m-auto" style={{justifyContent: "center"}}>
                <div className="col-md-5 " >
                    <img src="https://i.imgur.com/qIufhof.png" width="500vw" height="500vh"/>
                </div>
                <div className="col-md-5" style={{ alignSelf:"center"}}>
                    {/* <img src="https://www.flaticon.com/svg/vstatic/svg/2622/2622264.svg?token=exp=1617371785~hmac=5f157015eb6cbf6215b227bf57b2f3de" width="100vw" height="100vh"/> */}
                    <h1 style={{fontSize: "70px"}}>OOPS!</h1>
                    <h3>We can't seem to find the page you're looking for.</h3>
                    <p>Error code: 404</p>
                    <p>Meanwhile, why don't try again by going.</p>
                    <Link to="/" className="btn btn-outline-secondary" type="button" outline color="secondary">Home</Link>{' '}
                </div>
            </div>
        );
    }
}

export default NotFound;