import './styles.css'
import { BsInstagram } from 'react-icons/bs'
import { BsFacebook } from 'react-icons/bs'
import { BsLinkedin } from 'react-icons/bs'
import { FaReact } from 'react-icons/fa'
import { FaPaypal } from 'react-icons/fa'
import { FaBitcoin } from 'react-icons/fa'
import { SiRedux } from 'react-icons/si'
import { SiPostgresql } from 'react-icons/si'
import { SiSequelize } from 'react-icons/si'

export default function Footer() {

    return (
        <>
            <div className="footContainer">
                <div className='foot'>
                    <h2 className="titleFoot">Made with</h2>
                    <br />
                    <ul>
                        <li><FaReact /><span style={{ marginLeft: "5px" }}>React</span></li>
                        <li><SiRedux /><span style={{ marginLeft: "5px" }}>Redux</span></li>
                        <li><SiSequelize /><span style={{ marginLeft: "5px" }}>Sequelize</span></li>
                        <li><SiPostgresql /><span style={{ marginLeft: "5px" }}>PostgreSQL</span></li>
                    </ul>
                </div>
                <div className='foot'>
                    <h2 className="titleFoot">Payment Metods</h2>
                    <br />
                    <ul style={{ marginTop: '15px' }}>
                        <li><FaPaypal /><span style={{ marginLeft: "5px" }}>PayPal</span></li>
                        <li><FaBitcoin /><span style={{ marginLeft: "5px" }}>Crypto</span></li>
                    </ul>
                </div>
                <div className='foot'>
                    <h2 className="titleFoot">Follow us!</h2>
                    <br />
                    <ul style={{ marginTop: '10px' }}>
                        <li><BsFacebook /><span style={{ marginLeft: "5px" }}>bookstore</span></li>
                        <li><BsLinkedin /><span style={{ marginLeft: "5px" }}>bookStore</span></li>
                        <li><BsInstagram /><span style={{ marginLeft: "5px" }}>@bookstore</span></li>
                    </ul>
                </div>
            </div>
        </>
    )
}