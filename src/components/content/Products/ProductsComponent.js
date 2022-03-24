import { Button, Col, Label, Row } from "reactstrap"
import FilterProduct from "./FilterProduct"
import ProductList from "./ProductList"
import { useEffect, useState } from "react";
import NavigationProducts from "./NavigationProducts";
import BreadcrumbComponent from "./BreadcrumbComponent";
import axios from "axios";
import { MenuItem, Select } from "@mui/material";
function ProductsComponent({
    sortPrice,
    setSortPrice,
    restAptGetProductByTypeAndSort,
    restAptGetProductByType,
    typeProduct,
    setTypeProduct,
    dataArr,
    page,
    setPage,
    nopage }) {

    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        scrollToTop()
        window.addEventListener("scroll", () => {
            if (window.pageYOffset > 300) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        });
    }, [page]);

    // This function will scroll the window to the top 
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // for smoothly scrolling
        });
    };
    return (
        <>
            <Row className="p-2 mt-2">
                <BreadcrumbComponent />
            </Row>
            <Row className="p-2 mt-2">
                <FilterProduct
                    typeProduct={typeProduct}
                    sortPrice={sortPrice}
                    setTypeProduct={setTypeProduct}
                    restAptGetProductByType={restAptGetProductByType}
                    setSortPrice={setSortPrice}
                    restAptGetProductByTypeAndSort={restAptGetProductByTypeAndSort}
                    setPage={setPage}
                />
            </Row>
            <Row>
                <Col xs='12'>
                    <Row>
                        <ProductList data={dataArr} />
                    </Row>
                    <Row>
                        <NavigationProducts setPage={setPage} nopage={nopage} page={page} />
                    </Row>
                </Col>
            </Row>
            {showButton && (
                <button onClick={scrollToTop} className="back-to-top">
                    &#8679;
                </button>
            )}
        </>
    )
}
export default ProductsComponent