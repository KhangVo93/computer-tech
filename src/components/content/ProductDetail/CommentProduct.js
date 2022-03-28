import { TextareaAutosize } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Button, Label, Row, Col } from 'reactstrap'
const CommentProduct = ({ cmt, setCmt, restApiGetCommentProduct, restApiCreateCommentProduct, aRRComment }) => {
    const onClickCreateCmt = () => {
        restApiCreateCommentProduct()
        restApiGetCommentProduct()
    }

    return (
        <>
            <h4>Bình luận sản phẩm</h4>
            <hr />
            <Row>
                <Col xs='6'>
                    <TextareaAutosize
                        value={cmt}
                        minRows={3}
                        placeholder="Nhập bình luận của bạn"
                        onChange={(e) => setCmt(e.target.value)} />
                </Col>
                <Col xs='2'>
                    <Button className='btn-success' onClick={onClickCreateCmt}>Bình luận</Button>
                </Col>
            </Row>
            <Row className='mt-2'>
                <Col xs='6'>
                    {
                        aRRComment.map((item, index) => {
                            return (
                                <div key={index}>
                                    <Row>
                                        <Col>
                                            <b>{item.nameCustomer}</b>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            {item.text}
                                        </Col>
                                    </Row>
                                    <Row><Col>
                                        ({item.dateCreate})
                                    </Col>
                                    </Row>
                                </div>
                            )
                        })
                    }
                </Col>
            </Row>
        </>
    )
}
export default CommentProduct