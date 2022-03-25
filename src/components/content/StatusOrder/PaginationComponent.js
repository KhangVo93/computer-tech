
import { Pagination } from '@mui/material'
function PaginationComponent({ setPage, nopage, page }) {
    const onChangePage = (event, value) => {
        setPage(value)
    }
    return (
        <>
            <Pagination onChange={onChangePage}
                size='large'
                shape="rounded"
                count={nopage}
                defaultPage={page}></Pagination>

        </>
    )
}
export default PaginationComponent