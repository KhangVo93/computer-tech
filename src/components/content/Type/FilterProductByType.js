import { Col, Label } from "reactstrap"
import { Select, MenuItem } from "@mui/material"
const FilterProductByType = ({ sortPrice, setSortPrice, type, restAptGetProductByTypeAndSort }) => {

    const onChangeSortPrice = (event) => {
        setSortPrice(event.target.value)
        restAptGetProductByTypeAndSort(type, event.target.value)
    }
    return (
        <>
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

export default FilterProductByType