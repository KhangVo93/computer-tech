import HomepageContent from "../HomePage/HomepageContent";

function HomepageComponent({ dataArr, setPage, page, nopage, arrNew }) {
    return (
        <>
            <HomepageContent dataArr={dataArr} setPage={setPage} page={page} nopage={nopage} arrNew={arrNew} />
        </>
    );

}
export default HomepageComponent