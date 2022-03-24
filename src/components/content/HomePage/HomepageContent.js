import Carousel from '../HomePage/Carousel'
import LastestProducts from "../HomePage/LastestProducts";
import PaginationComponent from './PaginationComponent.js'
import ViewAllComponent from './ViewAll';
import { useEffect, useState } from 'react'
import { Button } from 'reactstrap';
function HomepageContent({ dataArr, setPage, page, nopage, arrNew }) {

    const loadDataByBrandHot = () => {
        return dataArr.filter(
            (n) =>
                (n.Brand === "hot")
        )
    }
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.pageYOffset > 300) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        });
    }, []);

    // This function will scroll the window to the top 
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // for smoothly scrolling
        });
    };
    
    return (
        <>
            <Carousel dataArr={loadDataByBrandHot()} />
            <LastestProducts dataArrHot={loadDataByBrandHot()} dataArrNew={arrNew} />
            <PaginationComponent nopage={nopage} page={page} setPage={setPage} />
            <ViewAllComponent />
            {showButton && (
                <button onClick={scrollToTop} className="back-to-top">
                    &#8679;
                </button>
            )}
        </>
    )
}
export default HomepageContent