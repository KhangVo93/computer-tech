import { Label, Col } from "reactstrap";
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import PermPhoneMsgIcon from '@mui/icons-material/PermPhoneMsg';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
function PolicyComponent() {
    return (
        <>
            <Col className="policy">
                <Label>
                    <b>
                        <AirportShuttleIcon style={{ width: 30, height: 30 }} /> Giao hàng miễn phí trong 5km
                    </b>
                    <p>
                        (Áp dụng cho hóa đơn lớn hơn 300k)
                    </p>
                </Label>
            </Col>
            <Col className="policy">
                <Label>
                    <b>
                        <PermPhoneMsgIcon style={{ width: 30, height: 30 }} />Mua hàng : 070.555.7770
                    </b>
                    <p>
                        Bảo hành, khiếu nại : 0933.961.785
                    </p>
                </Label>
            </Col>
            <Col>
                <Label>
                    <b>
                        <AccessTimeIcon style={{ width: 30, height: 30 }} />Làm việc tất cả các ngày trong tuần
                    </b>
                    <p>
                        Từ 08h - 20h ( Bảo hành từ 11h )
                    </p>
                </Label>
            </Col>
        </>
    )
}
export default PolicyComponent