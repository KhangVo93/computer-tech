import { Link } from 'react-router-dom'
import { Col, Row } from 'reactstrap';
import { Tooltip } from '@mui/material'
function IconNavBarComponent({ objResult, logoutGoogle, cartLength, idUser }) {
    const logout = () => {
        logoutGoogle();
    }
    return (
        <>
            <Row className='mt-2 p-2'>
                <Col>
                    {
                        objResult ?
                            <>
                                <div className='dropdown'>
                                    {
                                        objResult.photoURL ? <img src={objResult.photoURL} alt='avatar' style={{ width: 35, height: 35, borderRadius: "50%" }} />
                                            :
                                            <i className="fa-solid fa-face-grin-beam fa-2x" style={{ width: 35, height: 35, borderRadius: "50%" }}></i>
                                    }
                                    <div className='dropdown-content'>
                                        <b>{objResult.displayName || objResult.FullName}</b>
                                        <br />
                                        <Link to={`/user/${idUser}`} style={{ textDecoration: 'none', color: 'black', marginTop: 10, paddingLeft: 15 }}>
                                            Thông tin của bạn
                                        </Link>
                                        <br />
                                        <Link to={`/statusOrder`} style={{ textDecoration: 'none', color: 'black', marginTop: 10, paddingLeft: 15 }}>
                                            Đơn hàng của bạn
                                        </Link>
                                        <hr />
                                        <a role='button' href='/#' onClick={logout} style={{ textDecoration: 'none' }}>
                                            Thoát <i className="fa-solid fa-arrow-right-from-bracket" style={{ marginLeft: 10 }}></i>
                                        </a>
                                    </div>
                                </div>
                            </>
                            :

                            <Link to={"/login"} style={{ color: 'white' }}>
                                <i className="far fa-user-circle fa-2x" />
                            </Link>
                    }

                    <Link to={"/login"} style={{ color: 'white', display: 'none' }}>
                    </Link>
                </Col>
                <Col>
                    <Link to={"/cart"} style={{ color: 'white' }}>
                        <div class="cart-image">
                            <i class="fas fa-shopping-basket fa-2x"></i>
                            <div class="cart-count">{cartLength}</div>
                        </div>
                    </Link>
                </Col>
            </Row>
        </>
    );
}
export default IconNavBarComponent