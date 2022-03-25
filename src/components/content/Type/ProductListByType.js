import { Row,  Label } from "reactstrap";
import { Card, CardMedia, Typography, CardContent, Grid, Tooltip } from '@mui/material'
import '../../../style.css'
import { Link } from "react-router-dom";
function ProductListByType({ aRRProductListByType }) {
    return (
        <>
            <Row className="p-2 mt-2">
                <Grid
                    container
                    spacing={2}
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start"
                >
                    {aRRProductListByType.map((item, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index} >
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
                                            <Label className="crop">
                                            <b>{item.Name}</b>
                                            </Label>
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
            </Row>
        </>
    )
}
export default ProductListByType