import axios from 'axios';
import React from 'react';
import { Jumbotron, Button, Input, Alert, FormGroup } from 'reactstrap';
import { URL_API } from './helper';


// const VerificationPage = (props) => {
//     const [otp, setOTP] = useState('')

//     // useEffect(() => {
//     //     verify()
//     // }, [])

//     const verify = () => {
//         console.log("OTP:", otp)
//         // axios.patch(URL_API + `/users/verify`, { otp })
//         //     .then(res => {
//         //         console.log(res.data)
//         //         return (
//         //             <Alert color="success">
//         //                 Verification Succes!
//         //             </Alert>
//         //         )
//         //     }).catch(err => {
//         //         console.log(err)
//         //     })
//     }

//     return (
//         <div className="mt-4 container text-center">
//             <Jumbotron style={{ justifyContent: 'center' }}>
//                 <h1 className="display-3">Hello, Please Verify your Email Address!</h1>
//                 <p className="lead">Type your OTP</p>
//                 <Input type="text" innerRef={e => setOTP(e)} />
//                 <hr className="my-2" />
//                 {/* <p>It uses utility classes for typography and spacing to space content out within the larger container.</p> */}
//                 <p className="lead">
//                     <Button onClick={verify} color="primary">Verify your Email</Button>
//                 </p>
//             </Jumbotron>
//         </div>
//     )
// }

// export default VerificationPage;

class VerificarionPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            alert: false
        }
    }

    verify = () => {
        let code = this.codeOTP.value
        let headers = {
            headers: {
                'Authorization': `Bearer ${this.props.location.pathname.split('/')[2]}`
            }
        }
        console.log("OTP", code)
        console.log(headers)
        axios.patch(URL_API + `/users/verify`, { 
            otp: code 
        }, headers)
            .then(res => {
                console.log(res.data)
                this.setState({alert: !this.state.alert})
                setTimeout(() => this.setState({ alert: !this.state.alert }), 3000)
                this.codeOTP.value = null
            }).catch(err => {
                console.log(err)
            })
    }

    render() {
        console.log(this.props.location.pathname.split('/')[2])

        return (

            <div className="mt-4 container text-center">
                <Alert isOpen={this.state.alert} color="success">
                    Verification Succes!
                    </Alert>
                <Jumbotron >
                    <h1 className="display-3">Hello, Please Verify your Email Address!</h1>
                    <p className="lead">Type your OTP</p>
                    <Input style={{ width: '20%', margin: 'auto' }} type="text" innerRef={elemen => this.codeOTP = elemen} />
                    <hr className="my-2" />
                    {/* <p>It uses utility classes for typography and spacing to space content out within the larger container.</p> */}
                    <p className="lead">
                        <Button onClick={() => this.verify()} color="primary">Verify your Email</Button>
                    </p>
                </Jumbotron>
            </div>
        );
    }
}

export default VerificarionPage;