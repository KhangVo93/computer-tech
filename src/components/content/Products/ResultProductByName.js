import { Row, Button, Breadcrumb, Label, BreadcrumbItem } from "reactstrap";
import { useState, useEffect } from "react";
import { Card, CardMedia, Typography, CardContent, Grid, Tooltip } from '@mui/material'
import { useParams, Link } from "react-router-dom";
function ResultProductByName({ dataArr }) {
    const { name } = useParams();
    const [arrResult, setArrResult] = useState([])
    const filterByName = (paramName) => {
        return dataArr.filter(
            (n) =>
                ((!paramName) || (n.Name.toLowerCase().indexOf(paramName.toLowerCase()) !== -1))
        )
    }
    useEffect(() => {
        setArrResult(filterByName(name))
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }, [name])
    return (
        <>
            <Row className="p-2 mt-2">
                <Breadcrumb>
                    <BreadcrumbItem><Link to='/'>Home</Link></BreadcrumbItem>
                    <BreadcrumbItem>Tìm kiếm : "{name}"</BreadcrumbItem>
                </Breadcrumb>
            </Row>
            <Row className="p-2 mt-2">
                {
                    arrResult.length > 0 ?

                        <Grid
                            container
                            spacing={2}
                            direction="row"
                            justify="flex-start"
                            alignItems="flex-start"
                        >
                            {arrResult.map((item, index) => (
                                <Grid item xs={12} sm={6} md={3} key={index} >
                                    <Link to={`/detailProduct/${item._id}`} style={{ textDecoration: 'none' }}>
                                        <Card raised>

                                            <Tooltip title={item.Name} placement="bottom">
                                                <CardMedia
                                                    component="img"
                                                    height="140"
                                                    image={item.ImageUrl}
                                                    alt="green iguana" className="zoom"
                                                />
                                            </Tooltip>
                                            <CardContent>
                                                <Typography variant="body1" gutterBottom component='div'>
                                                    <b className='crop'>{item.Name}</b>
                                                </Typography>
                                                <Typography variant='body3' gutterBottom component='div'>
                                                    Giá niêm yết: <del>{item.BuyPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} VNĐ</del>
                                                </Typography>
                                                <Typography>
                                                    <span className="promotion-price">Giá giảm: {item.PromotionPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} VNĐ</span>
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                </Grid>
                            ))}
                        </Grid>
                        :

                        <Label><h3>Không có sản phẩm {name}</h3></Label>
                }
            </Row>
        </>
    )
}
export default ResultProductByName