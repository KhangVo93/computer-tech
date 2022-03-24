import ProductsComponent from "./Products/ProductsComponent"
import HomepageComponent from './HomePage/HomepageComponent'
import ProductDetailComponent from "./ProductDetail/ProductDetailComponent"
import { Route, Routes } from "react-router-dom"
import ResultProductByName from "./Products/ResultProductByName"
import LoginComponent from "./Login/LoginComponent"
import CartComponent from "./Cart/CartComponent"
import axios from 'axios'
import { useEffect, useState } from 'react'
import SignUpComponent from "./Login/SignUpComponent"
import StatusOrderComponent from "./StatusOrder/StatusOrderComponent"
import StatusOrderDetail from "./StatusOrder/StatusOrderDetail"
import InformationUser from "./Login/InformationUser"
function ContentComponent({ loginGoogle, objResult, idUser, setCartLength, aRRCart, cartLength, setArrCart, setUserName, setPassword, login, userName, password }) {
    // Dữ liệu tổng của Data API
    const [dataProduct, setDataProduct] = useState([])

    // Dữ liệu brand NEW của trang chủ
    const [dataNew, setDataNew] = useState([])

    // Dữ liệu trang tất cả sản phẩm
    const [dataForProductList, setDataForProductList] = useState([])

    // Limit sản phẩm ở trang chủ
    const limitProduct = 8

    // Set pagination của trang chủ
    const [page, setPage] = useState(1)
    const [nopage, setNoPage] = useState(0)

    // Set Pagination trang products
    const [pageProduct, setPageProduct] = useState(1);
    const [noPageProduct, setNoPageProduct] = useState(0);

    const [typeProduct, setTypeProduct] = useState(null)
    const [sortPrice, setSortPrice] = useState(null)

    // Hàm set data và phân trang cho trang home page
    const setDataForHomepage = (param) => {
        setNoPage(Math.ceil(param.length / limitProduct))
        setDataNew(param.slice((page - 1) * limitProduct, page * limitProduct))
    }

    // Hàm get data for Product List
    const getDataForProductList = async () => {
        axios.get(`https://computer-tech-be.herokuapp.com/products?skip=${pageProduct}&limit=9`)
            .then((data) => {
                setNoPageProduct(data.data.pages)
                setDataForProductList(data.data.products)
            })
            .catch((error) => {
                console.log(error.response);
            })
    }

    // Hàm get data for HomePage
    const getDataForHomePage = async () => {
        axios.get(`https://computer-tech-be.herokuapp.com/products`)
            .then((data) => {
                setDataProduct(data.data.products)
                // Lấy brand New cho HomePage
                let dataNew = data.data.products.filter((n) => n.Brand === "new")
                // Gọi Hàm setData và phân trang
                setDataForHomepage(dataNew)
            })
            .catch((error) => {
                console.log(error.response);
            })
    }

    // Hàm get data By Type
    const restAptGetProductByType = (paramType) => {
        axios.get(`https://computer-tech-be.herokuapp.com/products/type/${paramType}`)
            .then((data) => {
                setNoPageProduct(Math.ceil(data.data.product.length / 9))
                setDataForProductList(data.data.product.slice((pageProduct - 1) * 9, pageProduct * 9))
            })
    }

    //  Hàm get data by Type có sắp xếp
    const restAptGetProductByTypeAndSort = (paramType, paramSort) => {
        axios.get(`https://computer-tech-be.herokuapp.com/products/type/${paramType}/${paramSort}`)
            .then((data) => {
                setNoPageProduct(Math.ceil(data.data.product.length / 9))
                setDataForProductList(data.data.product.slice((pageProduct - 1) * 9, pageProduct * 9))
            })
    }

    useEffect(() => {

        getDataForHomePage()
        if (typeProduct !== null) {
            if (sortPrice == null) {
                restAptGetProductByType(typeProduct)
            }
            else {
                restAptGetProductByTypeAndSort(typeProduct, sortPrice)
            }
        }
        else {
            if (sortPrice != null) {
                restAptGetProductByTypeAndSort('null', sortPrice)
            }
            else {
                getDataForProductList()
            }
        }
    }, [pageProduct, typeProduct, sortPrice, page])
    return (
        <>
            <div>
                <Routes>
                    <Route exact path="/" element={<HomepageComponent dataArr={dataProduct} page={page} setPage={setPage} nopage={nopage} arrNew={dataNew} />} />
                    <Route exact path="/products" element={<ProductsComponent
                        dataArr={dataForProductList}
                        page={pageProduct}
                        setPage={setPageProduct}
                        nopage={noPageProduct}
                        setTypeProduct={setTypeProduct}
                        typeProduct={typeProduct}
                        restAptGetProductByType={restAptGetProductByType}
                        sortPrice={sortPrice}
                        setSortPrice={setSortPrice}
                        restAptGetProductByTypeAndSort={restAptGetProductByTypeAndSort}
                    />}
                    />
                    <Route exact path="/login/signup" element={<SignUpComponent />} />
                    <Route exact path="/search/:name" element={<ResultProductByName dataArr={dataProduct} />} />
                    <Route exact path="/login" element={<LoginComponent loginGoogle={loginGoogle} setUserName={setUserName} setPassword={setPassword} login={login} userName={userName} password={password} />} />
                    <Route exact path="/cart" element={<CartComponent objResult={objResult} setArrCart={setArrCart} aRRCart={aRRCart} idUser={idUser} setCartLength={setCartLength} />} />
                    <Route exact path="/detailProduct/:_id" element={<ProductDetailComponent setArrCart={setArrCart} aRRCart={aRRCart} cartLength={cartLength} setCartLength={setCartLength} idUser={idUser} />} />
                    <Route exact path="/statusOrder" element={<StatusOrderComponent idUser={idUser} />} />
                    <Route exact path="/statusOrderDetail/:orderId" element={<StatusOrderDetail />} />
                    <Route exact path="/user/:userId" element={<InformationUser />} />
                </Routes>
            </div>
        </>
    )
}
export default ContentComponent