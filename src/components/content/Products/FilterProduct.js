import { Col, Label } from 'reactstrap'
import { Select, MenuItem } from '@mui/material'
function FilterProduct({
    sortPrice,
    setSortPrice,
    restAptGetProductByTypeAndSort,
    restAptGetProductByType,
    typeProduct,
    setTypeProduct,
    setPage }) {

    const onChangeTypeProduct = (event) => {
        setPage(1)
        setTypeProduct(event.target.value)
        restAptGetProductByType(event.target.value)
    }

    const onChangeSortPrice = (event) => {
        
        setPage(1)
        setSortPrice(event.target.value)
        restAptGetProductByTypeAndSort(typeProduct, event.target.value)
    }
    return (
        <>
            <Col xs='3'>
                <Label>Loại </Label>
                <Select style={{ marginLeft: 10 }} variant="standard" value={typeProduct} onChange={onChangeTypeProduct}>
                    <MenuItem value={null}>None</MenuItem>
                    <MenuItem value='keyboard'>Bàn phím</MenuItem>
                    <MenuItem value='mouse'>Chuột</MenuItem>
                    <MenuItem value='monitor'>Màn hình</MenuItem>
                    <MenuItem value='vga'>VGA</MenuItem>
                    <MenuItem value='ssd'>SSD</MenuItem>
                    <MenuItem value='headphone'>Tai nghe</MenuItem>
                    <MenuItem value='case'>Case</MenuItem>
                    <MenuItem value='mainboard'>Mainboard</MenuItem>
                </Select>
            </Col>
            <Col xs='3'>
                <Label>Sắp xếp </Label>
                <Select style={{ marginLeft: 10 }} variant="standard" value={sortPrice} onChange={onChangeSortPrice}>
                    <MenuItem value={null}>None</MenuItem>
                    <MenuItem value={1}>Giá thấp đến cao</MenuItem>
                    <MenuItem value={-1}>Giá cao đến thấp</MenuItem>
                </Select>
            </Col>
        </>
    )
}
export default FilterProduct