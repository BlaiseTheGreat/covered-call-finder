import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Card from "@material-ui/core/Card";
import SortIcon from "@material-ui/icons/ArrowDownward";
import movies from "./movies";
import "./styles.css";
import './SP500.css';
import MyDataTable from "./MyDataTable";

const SP500 = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [allSPData, setAllSPData] = useState();

    useEffect(() => {
        fetch("/all")
            .then(res => res.json())
            .then(
                (result) => {
                    setAllSPData(result);
                    setIsLoaded(true);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    setIsLoaded(false);
                    setError(error);
                }
            )
    }, [])

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }


    // if (error) {
    //     return <div>Error: {error.message}</div>;
    // } else if (!isLoaded) {
    //     return <div>Loading...</div>;
    // } else {
    //     return (
    //         btcPrice
    //     );
    // }


    if (isLoaded) {
        // const data2 = [];
        // for (let i = 0; i < allSPData.length; i++) {
        //     data2.push(

        //         <div className="card hoverable" style={{ width: '18rem' }} key={allSPData[i].ticker}>
        //             <div className="card-header">
        //                 Rank: {i + 1} <a target="_blank" href={`https://finance.yahoo.com/quote/` + allSPData[i].ticker + `/options`}>{allSPData[i].ticker}</a>
        //             </div>
        //             <ul className="list-group list-group-flush">
        //                 <li className="list-group-item">Ratio: <b>{allSPData[i].ccRatio}</b></li>
        //                 <li className="list-group-item">{allSPData[i].description}</li>
        //                 <li className="list-group-item">Current stock price: ${allSPData[i].underlyingPrice}</li>
        //                 <li className="list-group-item">100 Share cost: ${numberWithCommas(Math.floor(allSPData[i].underlyingPrice * 100))}</li>
        //                 <li className="list-group-item">Last call price: ${allSPData[i].last}</li>
        //             </ul>
        //         </div>
        //     )
        // }

        return (

            <div>
                <nav className="navbar navbar-dark bg-dark">
                    <div className="container-fluid">
                        <span className="navbar-brand mb-0 h1">Covered Call Finder</span>
                    </div>
                </nav>
                <h1>S&P500 WEEKLY CALLS</h1>
                <MyDataTable callsData={allSPData}/>

                {/* {data2} */}
            </div>
        )
    } else {
        return (
            <h1>Loading...</h1>
        );
    }



}

export default SP500;
