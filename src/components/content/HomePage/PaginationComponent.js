
import { Pagination } from '@mui/material'
import { Col, Row } from 'reactstrap'
function PaginationComponent({ page, nopage, setPage }) {

    const onChangePage = (event, value) => {
        setPage(value)
    }
    return (
        <>
            <Row>
                <Col style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center'
                }}>
                    <Pagination onChange={onChangePage}
                        size='large'
                        variant='outlined'
                        shape="rounded"
                        className='m-2'
                        count={nopage}
                        defaultPage={page}></Pagination>
                </Col>
            </Row>
        </>
    )
}
export default PaginationComponent