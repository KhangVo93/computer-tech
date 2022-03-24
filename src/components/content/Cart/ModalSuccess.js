import { Button } from "@mui/material"
import { Modal, ModalFooter, ModalHeader, ModalBody, Row, Label } from "reactstrap"
function ModalSuccess({
    openModalSuccess,
    setOpenModalSuccess,
    orderId,
    setOrderId }) {

    const onClickCloseModal = () => {
        setOpenModalSuccess(false)
        setOrderId(null)
    }

    const toggleModal = () => {
        setOpenModalSuccess(false)
        setOrderId(null)
    }
    return (
        <>
            <Modal isOpen={openModalSuccess} toggle={toggleModal}>
                <ModalHeader>
                    Thông báo
                </ModalHeader>
                <ModalBody>
                    <Row className="mt-2 p-2 text-center">
                        <Label>
                        Đặt hàng thành công, mã đơn hàng của bạn là
                        </Label>
                    </Row>
                    <Row className="mt-2 p-2 text-center"><h5>{orderId}</h5></Row>
                </ModalBody>
                <ModalFooter>
                    <Button variant="contained" onClick={onClickCloseModal}> Đóng </Button>
                </ModalFooter>
            </Modal>
        </>
    )
}
export default ModalSuccess