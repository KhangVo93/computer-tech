import { Col, Input, Label, Row } from "reactstrap";
import Carousel from 'react-elastic-carousel';
import { Card, CardMedia, Typography, CardContent, Grid, Tooltip } from '@mui/material'
import { Link } from "react-router-dom";
import { useState } from "react";

function LastestProductsComponent({ dataArrHot, dataArrNew }) {
    const breakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 550, itemsToShow: 2, itemsToScroll: 2 },
        { width: 768, itemsToShow: 3 },
        { width: 1200, itemsToShow: 4 }
    ];

    return (
        <>
            <div>
                <Row className="p-4">
                    <Col className="text-center">
                        <h2><b>Danh mục sản phẩm</b></h2>
                    </Col>
                </Row>
                <Row>
                    <Col style={{ textAlign: 'left' }}>
                        <Input value={"SẢN PHẨM HOT"} style={{ maxWidth: 200, textAlign: 'center', backgroundColor: 'red', color: 'white' }} readOnly />
                    </Col>
                </Row>
                <Row className="p-4 mt-4" style={{ alignItems: 'center' }}>
                    <Carousel breakPoints={breakPoints}>
                        {dataArrHot.map((item, index) => (
                            <Link to={`/detailProduct/${item._id}`} key={index} style={{ textDecoration: 'none' }}>
                                <div style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    height: 320,
                                    width: '100%',
                                    margin: 15,
                                    fontSize: '4em',
                                }}>
                                    <Card raised
                                        sx={{ minHeight: 320, minWidth: '100%' }}>
                                        <Tooltip title={item.Name} placement="bottom">
                                            <CardMedia
                                                component="img"
                                                height="140"
                                                image={item.ImageUrl}
                                                alt="green iguana"
                                                className="zoom"
                                            />
                                        </Tooltip>
                                        <CardContent>
                                            <Typography variant="body1" gutterBottom component='div'>
                                                <Label className='crop'>
                                                    <b>{item.Name}</b>
                                                </Label>
                                            </Typography>
                                            <Typography variant='body1'>
                                                Giá niêm yết: <del>{item.BuyPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} VNĐ</del>
                                            </Typography>
                                            <Typography>
                                                <span className="promotion-price">Giá giảm: {item.PromotionPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} VNĐ</span>
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </div>
                            </Link>
                        ))}
                    </Carousel>
                </Row>
                <Row>
                    <Col style={{ textAlign: 'left' }}>
                        <Input value={"SẢN PHẨM MỚI"} style={{ maxWidth: 200, textAlign: 'center', backgroundColor: 'red', color: 'white' }} readOnly />
                    </Col>
                </Row>
                <Row className="p-4 mt-4">
                    <Grid
                        container
                        spacing={3}
                        direction="row"
                        justify="flex-start"
                        alignItems="flex-start"
                    >
                        {dataArrNew.map((item, index) => (
                            <Grid item xs={12} sm={6} md={3} key={index}>
                                <Link to={`/detailProduct/${item._id}`} style={{ textDecoration: 'none' }}>
                                    <Card raised sx={{ minHeight: 250, minWidth: '100%' }}>
                                        <Tooltip title={item.Name} placement="bottom">

                                            <CardMedia
                                                component="img"
                                                height="140"
                                                image={item.ImageUrl}
                                                alt="green iguana"
                                                className="zoom"
                                            />
                                        </Tooltip>
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
            </div>
        </>
    );
}
export default LastestProductsComponent