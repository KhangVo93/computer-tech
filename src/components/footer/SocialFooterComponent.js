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

            <Row>
                <Col>
                    <Row>
                        <h1>
                            <FacebookIcon style={{ marginRight: 15, width: 30, height: 30 }} />
                            <InstagramIcon style={{ marginRight: 15, width: 30, height: 30 }} />
                            <YouTubeIcon style={{ marginRight: 15, width: 30, height: 30 }} />
                            <TwitterIcon style={{  width: 30, height: 30 }} />
                        </h1>
                    </Row>
                </Col>
            </Row>
        </>
    );
}
export default SocialFooterComponent