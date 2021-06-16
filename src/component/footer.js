import React from 'react';
import { Link } from 'react-router-dom'

class FooterComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div>
                <div className="d-flex py-5" style={{ justifyContent: 'center', margin: 'auto', borderBottom: '1px solid #bdc3c7' }}>
                        <h2 style={{ fontSize: '21px' }}>Ikuti kami di</h2>
                        <div className="px-2">
                            <img style={{ height: '25px', width: '25px' }} src="https://cdn.pixabay.com/photo/2015/05/17/10/51/facebook-770688_1280.png" />
                        </div>
                        <div className="px-2">
                            <img style={{ height: '25px', width: '25px' }} src="https://cdn.pixabay.com/photo/2016/09/17/07/03/instagram-1675670_1280.png" />
                        </div>
                        <div className="px-2">
                            <img style={{ height: '25px', width: '25px' }} src="https://seeklogo.com/images/P/pinterest-logo-CA98998DCB-seeklogo.com.png" />
                        </div>
                        <div className="px-2">
                            <img style={{ height: '25px', width: '25px' }} src="https://awsimages.detik.net.id/content/2012/06/10/398/logotwitterluar.jpg" />
                        </div>
                        <div className="px-2">
                            <img style={{ height: '25px', width: '25px' }} src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c545.png" />
                        </div>
                    </div>
                <footer>
                    <div className="py-5" style={{ textAlign: 'center', margin: 'auto', borderBottom: '1px solid #bdc3c7' }}>
                        <h2 style={{fontSize: '21px'}}>Tautan yang berguna</h2>
                        <ul type="none" className="d-flex" style={{justifyContent: 'center'}} >
                            <li className="px-2">Katalog & Brosur</li>
                            <li className="px-2">Program Perencanaan</li>
                            <li className="px-2">Layanan Pelanggan</li>
                            <li className="px-2">IKEA untuk Bisnis</li>
                            <li className="px-2">Hubungi Kami</li>
                            <li className="px-2">Pick-Up Point IKEA</li>
                        </ul>
                        <ul type="none" className="d-flex" style={{justifyContent: 'center'}} >
                            <li className="px-2">Ini adalah IKEA</li>
                            <li className="px-2">Bekerja di IKEA</li>
                            <li className="px-2">FAQ</li>
                            <li className="px-2">Ruang Berita</li>
                            <li className="px-2">Layanan IKEA</li>
                        </ul>
                    </div>
                    <div className="d-flex m-3" style={{justifyContent: 'space-between'}}>
                        <p>© Inter IKEA Systems B.V. 2014 - 2021</p>
                        <ul type="none" className="d-flex" style={{display: "inline-block"}}>
                            <li className="px-1"><Link>Kebijakan Privasi</Link></li>
                            <li className="px-1"><Link>Pembatasan Tanggung Jawab</Link></li>
                            <li className="px-1"><Link>Pengungkpan yang bertanggung Jawab</Link></li>
                            <li className="px-1"><Link>Kebijakan Cookie</Link></li>
                        </ul>
                    </div>
                </footer>
            </div>
         );
    }
}
 
export default FooterComp;