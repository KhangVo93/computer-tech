import { Col, Row } from "reactstrap";
import { Link } from 'react-router-dom'
import ImportantDevicesIcon from '@mui/icons-material/ImportantDevices';
import MouseIcon from '@mui/icons-material/Mouse';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import MemoryIcon from '@mui/icons-material/Memory';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
function SocialFooterComponent() {
    return (
        <>
            <Row>
                <Col>
                    <Row>
                        <Link to={'/'} style={{ color: 'white', textDecoration: 'none' }}>
                            <h1>
                                <ImportantDevicesIcon style={{ marginLeft: 20 }} />
                                <KeyboardIcon style={{ marginLeft: 10 }} />
                                <MouseIcon style={{ marginLeft: 10 }} />
                                <MemoryIcon style={{ marginLeft: 10 }} />
                                <br />
                                COMPUTER-TECH
                            </h1>
                        </Link>
                    </Row>
                </Col>
            </Row>
            <Row className="mt-2 p-2">
                <Col xs='4'></Col>
                <Col xs='4'>
                    <Row>
                        <Col>
                            <FacebookIcon style={{ marginRight: 15, width: 30, height: 30 }} /></Col>
                        <Col>
                            <InstagramIcon style={{ marginRight: 15, width: 30, height: 30 }} /></Col>
                        <Col>
                            <YouTubeIcon style={{ marginRight: 15, width: 30, height: 30 }} /></Col>
                        <Col>
                            <TwitterIcon style={{ marginRight: 15, width: 30, height: 30 }} /></Col>
                    </Row>
                </Col>
                <Col xs='4'></Col>
            </Row>
        </>
    );
}
export default SocialFooterComponent