import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ButtonToggle } from "reactstrap";
import axios from 'axios';
import { URL_API } from './helper'
import { connect } from 'react-redux'
import { authLogin } from '../actions'
import { Redirect } from 'react-router-dom'

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hidden: true,
            alert: false,
            message: '',
            alertType: '',
            alertRegis: false
        }
    }

    onBtShow = () => {
        this.setState({ hidden: !this.state.hidden })
    }

    onBtRegis = () => {
        let username = this.regisUsername.value
        let email = this.regisEmail.value
        let password = this.regisPassword.value
        let confirmPassword = this.regisConfirmPassword.value
        let role = "user"
        console.log(username, email, password)

        if (username == '' || email == '' || password == '' || confirmPassword == '') {
            this.setState({ alert: !this.state.alert, message: "Lengkapi semua form!", alertType: 'danger' })
            setTimeout(() => this.setState({ alert: !this.state.alert, message: '', alertType: '', }), 3000)
        }
        else {
            if (email.includes('@')) {
                axios.get(URL_API + `/users/get-all?email=${email}`)
                    .then(res => {
                        if (res.data.length > 0) {
                            this.setState({ alert: !this.state.alert, message: "Email sudah terdaftar", alertType: 'warning' })
                            setTimeout(() => this.setState({ alert: !this.state.alert, message: '', alertType: '' }), 3000)
                            this.regisUsername.value = null
                            this.regisEmail.value = null
                            this.regisPassword.value = null
                            this.regisConfirmPassword.value = null
                        } else {
                            axios.post(URL_API + `/users/regis`, {
                                username,
                                email,
                                password,
                            })
                                .then(res => {
                                    this.setState({ alert: !this.state.alert, message: "Registrasi akun sukses!", alertType: 'success' })
                                    setTimeout(() => this.setState({ alert: !this.state.alert, message: '', alertType: '', }), 3000)
                                    console.log(res.data)
                                    this.regisUsername.value = null
                                    this.regisEmail.value = null
                                    this.regisPassword.value = null
                                    this.regisConfirmPassword.value = null
                                })
                                .catch(err => {
                                    console.log("Error Register", err)
                                })
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            } else {
                this.setState({ alert: !this.state.alert, message: 'Email Anda salah', alertType: 'warning' })
                setTimeout(() => this.setState({ alert: !this.state.alert, message: '', alertType: '' }), 3000)
                this.regisUsername.value = null
                this.regisEmail.value = null
                this.regisPassword.value = null
                this.regisConfirmPassword.value = null
            }
        }

    }

    onBtLogin = () => {
        this.props.authLogin(this.inputEmail.value, this.inputPassword.value)

        // this.setState({ redirect: true })
        // axios.post(URL_API + `/users/login`, {
        //     email: this.inputEmail.value, password: this.inputPassword.value
        // }).then(res => {
        //     localStorage.setItem('tkn_id', res.data[0].idtb_user)
        //     if (res.data[0].idtb_status == 12) {
        //         this.setState({ alertRegis: true})
        //         setTimeout(() => this.setState({ alertRegis: true }), 3000)
        //     } else {
        //         this.props.authLogin(res.data)
        //     }
        // }).catch(err => console.log(err))
    }

    handlePassword = () => {
        console.log(this.regisPassword.value)
        let huruf = /[a-zA-Z]/
        let numb = /[0-9]/
        if (huruf.test(this.regisPassword.value) && !numb.test(this.regisPassword.value)) {
            console.log("Hanya Huruf")
        } else if (huruf.test(this.regisPassword.value) && numb.test(this.regisPassword.value)) {
            console.log("Huruf dan angka")
        }
        // console.log(huruf.test(this.regisPassword.value))
    }

    resendOTP = () => {
        axios.patch(URL_API + `/users/reverify`, {
            email: this.inputEmail.value, password: this.inputPassword.value
        }).then(res => {
            console.log(res.data)
        }).catch(err => console.log(err))
    }

    render() {

        if (this.props.id && this.props.idtb_status == 11) {
            return <Redirect to="/" />
        }

        return (
            <div>
                <div >
                    <div className="py-5" style={{ textAlign: 'center', margin: 'auto' }}>
                        <h1 style={{ fontSize: '35px' }}>Pilihan masuk</h1>
                        <p className="py-2">Masuk dan selesaikan pesanan dengan data pribadi Anda atau daftar untuk menikmati semua manfaat memiliki akun IKEA.</p>
                    </div>
                    <div className="row px-5" style={{ justifyContent: 'center' }}>
                        <div className="col-md-4">
                            <h2 style={{ fontSize: '22px' }}>Silakan masuk ke akun Anda</h2>
                            <p>Silakan masuk ke akun Anda untuk menyelesaikan pembayaran dengan data pribadi Anda.</p>
                            <Alert isOpen={this.props.idtb_status && this.props.idtb_status == 12 ? true : false} color="warning">
                                Please Verify Your Account <span><a className="alert-link" onClick={() => this.resendOTP()}>Request Verification</a></span>
                            </Alert>
                            <Form>
                                <FormGroup>
                                    <Label className="d-flex" style={{ justifyContent: "space-between" }} >Email<span style={{ color: 'red' }}>*</span></Label>
                                    <div className="input-group ">
                                        <Input type="email" name="email" id="exampleEmail" placeholder="Masukkan alamat email anda" innerRef={elemen => this.inputEmail = elemen} />
                                    </div>
                                </FormGroup>
                                <FormGroup>
                                    <Label className="d-flex" style={{ justifyContent: "space-between" }} >Password <span style={{ color: 'red' }}>*</span> </Label>
                                    <div className="input-group ">
                                        <Input type={this.state.hidden ? 'password' : 'text'} className="form-control" id="password" placeholder="Masukkan kata sandi anda" innerRef={elemen => this.inputPassword = elemen} />
                                        <div className="input-group-prepend">
                                            <ButtonToggle type="button" onClick={this.onBtShow} color="secondary">
                                                <FontAwesomeIcon icon={this.state.hidden ? 'eye-slash' : 'eye'} id="basic-addon2" />
                                            </ButtonToggle>{' '}
                                        </div>
                                    </div>
                                </FormGroup>
                                <FormGroup check>
                                    <Label check>
                                        <Input type="checkbox" /> Ingatkan saya
                                    </Label>
                                </FormGroup>
                            </Form>
                            <Button className="" onClick={() => this.onBtLogin()} color="primary" size="lg" block>Masuk</Button>
                        </div>
                        <div className="col-md-4" style={{ borderLeft: '1px solid gray' }} >
                            <h2 style={{ fontSize: '22px' }}>Daftar dan nikmati</h2>
                            <p>Ada banyak keuntungan yang Anda dapatkan dengan membuat akun IKEA:</p>
                            <ul>
                                <li>Anda dapat membuat dan menyimpan daftar belanja untuk memudahkan Anda saat berbelanja ke toko IKEA.</li>
                                <li>Buat dan simpan perencanaan dapur Anda</li>
                            </ul>
                            <Alert isOpen={this.state.alert} color={this.state.alertType}>
                                {this.state.message}
                            </Alert>
                            <Form>
                                <FormGroup>
                                    <Label className="d-flex" style={{ justifyContent: "space-between" }} >Username <span style={{ color: 'red' }}>*</span></Label>
                                    <Input type="email" name="email" id="exampleEmail" placeholder="Masukkan alamat email anda" innerRef={elemen => this.regisUsername = elemen} />
                                </FormGroup>
                                <FormGroup>
                                    <Label className="d-flex" style={{ justifyContent: "space-between" }} >Email <span style={{ color: 'red' }}>*</span></Label>
                                    <Input type="email" name="email" id="exampleEmail" placeholder="Masukkan alamat email anda" innerRef={elemen => this.regisEmail = elemen} />
                                </FormGroup>
                                <FormGroup>
                                    <Label className="d-flex" style={{ justifyContent: "space-between" }} >Password <span style={{ color: 'red' }}>*</span> </Label>
                                    <div className="input-group ">
                                        <Input onChange={this.handlePassword} type={this.state.hidden ? 'password' : 'text'} className="form-control" id="password" placeholder="Masukkan kata sandi anda" innerRef={elemen => this.regisPassword = elemen} />
                                        <div className="input-group-prepend">
                                            <ButtonToggle type="button" onClick={this.onBtShow} color="secondary">
                                                <FontAwesomeIcon icon={this.state.hidden ? 'eye-slash' : 'eye'} id="basic-addon2" />
                                            </ButtonToggle>{' '}
                                        </div>
                                    </div>
                                </FormGroup>
                                <FormGroup>
                                    <Label className="d-flex" style={{ justifyContent: "space-between" }} > Confirm Password <span style={{ color: 'red' }}>*</span> </Label>
                                    <div className="input-group ">
                                        <Input type={this.state.hidden ? 'password' : 'text'} className="form-control" id="password" placeholder="Masukkan kata sandi anda" innerRef={elemen => this.regisConfirmPassword = elemen} />
                                        <div className="input-group-prepend">
                                            <ButtonToggle type="button" onClick={this.onBtShow} color="secondary">
                                                <FontAwesomeIcon icon={this.state.hidden ? 'eye-slash' : 'eye'} id="basic-addon2" />
                                            </ButtonToggle>{' '}
                                        </div>
                                    </div>
                                </FormGroup>
                            </Form>
                            <Button onClick={this.onBtRegis} className="py-2" color="primary" size="lg" block>Daftar</Button>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ authReducer }) => {
    return {
        id: authReducer.idtb_user,
        idtb_status: authReducer.idtb_status
    }
}


export default connect(mapStateToProps, { authLogin })(Login);