import { TextField } from '@mui/material'
import { Button, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from "@mui/material"
import { useState } from 'react';
import { Label, Row, Col } from 'reactstrap'
const CommentProduct = ({ cmt, aRRReplyComment, objResult, setCmt, restApiGetCommentProduct, restApiCreateCommentProduct, aRRComment }) => {

    // Chỉnh style cho table giỏ hàng 
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    const onClickCreateCmt = () => {
        if (objResult) {
            let validata = validateInput()
            if (validata) {
                restApiCreateCommentProduct()
                restApiGetCommentProduct()
            }
        }
        else {
            alert('Bạn phải đăng nhập')
        }
    }

    const validateInput = () => {
        if (!cmt) {
            alert('Bạn chưa nhập nội dung')
            return false
        }
        return true
    }

    const onClickReply = (idReply) => {
        switch (document.getElementById(idReply).style.display) {
            case 'none': document.getElementById(idReply).style.display = 'block'; break;
            case 'block': document.getElementById(idReply).style.display = 'none'; break;
        }
    }
    return (
        <>
            <h4>Bình luận sản phẩm</h4>
            <hr />
            <Row>
                <Col xs='6'>
                    <TextField
                        multiline
                        fullWidth
                        rows={3}
                        id='inputCmt'
                        variant='filled'
                        onChange={(e) => setCmt(e.target.value)}
                        placeholder="Nhập bình luận của bạn"
                    />
                </Col>
                <Col xs='2'>
                    <Button variant='contained' color='success' onClick={onClickCreateCmt}>Bình luận</Button>
                </Col>
            </Row>
            <Row className='mt-2 p-2'>
                <Col>
                    {aRRComment.map((item, index) => {
                        return (
                            <Row key={index}>
                                <Col>
                                    <b>{item.nameCustomer}</b>
                                </Col>
                                <Col>
                                    {item.text}
                                </Col>
                                <Col>
                                    <pre>{item.dateCreate}</pre>
                                </Col>
                                <Col>
                                    <Button variant='text' onClick={() => onClickReply(item._id)}>Trả lời</Button>
                                </Col>
                                <div>
                                    {/* {
                                        aRRReplyComment.map((itemReply, index) => {
                                            return (
                                                <p key={index}>{itemReply.text}</p>
                                            )
                                        })
                                    } */}
                                    {
                                        item.replyComments.length == aRRReplyComment.length ?
                                            aRRReplyComment
                                                .map((itemReply, index) => {
                                                    return (
                                                        <p key={index}>{itemReply.nameCustomer}--{itemReply.text}</p>
                                                    )
                                                })
                                            : null
                                    }

                                </div>
                                <hr />
                                <div id={item._id} style={{ display: 'none', textAlign: 'right' }}>
                                    <TextField
                                        multiline
                                        rows={3}
                                        fullWidth
                                        style={{ maxWidth: '70%' }}
                                        variant='filled'
                                        placeholder="Nhập bình luận của bạn"
                                    />
                                    <Button variant='contained' color='success' style={{ marginLeft: 10 }}>Bình luận</Button>
                                </div>
                            </Row>
                        )
                    })}
                </Col>
            </Row>
        </>
    )
}
export default CommentProduct