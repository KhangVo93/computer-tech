import { Label, Row } from 'reactstrap'
import { Card, CardMedia, Typography, CardContent, Grid, Tooltip } from '@mui/material'
import { Link } from "react-router-dom";
function ProductConnection({ arrByType }) {
    return (
        <>
            <h4>Sản phẩm liên quan</h4>
            <Row className="p-4 mt-4">
                <Grid
                    container
                    spacing={3}
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start"
                >
                    {arrByType.map((item, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <Link to={`/detailProduct/${item._id}`} style={{ textDecoration: 'none' }}>
                                <Card raised sx={{ minHeight: 350, minWidth: '100%' }}>

                                    <Tooltip title={item.Name} placement="bottom">
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={item.ImageUrl}
                                        alt="green iguana"
                                        className="zoom"
                                    /></Tooltip>
                                    <CardContent>
                                        <Typography variant="body1" gutterBottom component='div'>
                                            <Label className='crop'>
                                                <b>{item.Name}</b>
                                            </Label>
                                        </Typography>
                                        <Typography variant='body2'>
                                            Giá niêm yết: <del>{item.BuyPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} VNĐ</del>
                                        </Typography>
                                        <Typography>
                                            <span className="promotion-price">Giá giảm: {item.PromotionPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} VNĐ</span>
                                        </Typography>
                                    </CardContent>
                                </Card></Link>
                        </Grid>
                    ))}
                </Grid>
            </Row>
        </>
    )
}
export default ProductConnection