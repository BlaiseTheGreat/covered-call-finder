import React from "react";
import DataTable from "react-data-table-component";
import Card from "@material-ui/core/Card";
import SortIcon from "@material-ui/icons/ArrowDownward";
import "./styles.css";

const customColumnSort = (rowA, rowB, field) => {
    if (parseFloat(rowA[field]) > parseFloat(rowB[field])) {
     return 1;
    } else if (parseFloat(rowB[field]) > parseFloat(rowA[field])) {
     return -1;
    }
    return 0;
  };

const customRankRenderer = (row, index, column, id) => {
    return (
        <div>
            {row.rank}
            <a 
                className={'yahooLink'} 
                target="_blank" 
                href={`https://finance.yahoo.com/quote/${row.ticker}/options`}
            >
                {row.ticker}
            </a>
        </div>
    )
    
}

const columns = [
    {
        id: 1,
        name: "Ratio Rank",
        selector: (row) => row.rank,
        sortable: true,
        reorder: true,
        sortFunction: (rowA, rowB) => customColumnSort(rowA, rowB, 'rank'),
        cell: customRankRenderer,
    },
    {
        id: 2,
        name: "Ratio",
        selector: (row) => row.ccRatio,
        sortable: true,
        reorder: true,
        sortFunction: (rowA, rowB) => customColumnSort(rowA, rowB, 'rank'),
    },
    {
        id: 3,
        name: "Decription",
        selector: (row) => row.description,
        sortable: true,
        right: true,
        reorder: true,
        center: true,
    },
    {
        id: 4,
        name: "Current Stock Price",
        selector: (row) => row.underlyingPrice,
        sortable: true,
        right: true,
        reorder: true,
        sortFunction: (rowA, rowB) => customColumnSort(rowA, rowB, 'underlyingPrice')
    },
    {
        id: 5,
        name: "100 Share Cost",
        selector: (row) =>(row.underlyingPrice * 100).toFixed(2),
        sortable: true,
        right: true,
        reorder: true,
        sortFunction: (rowA, rowB) => customColumnSort(rowA, rowB, 'underlyingPrice')
    },
    {
        id: 6,
        name: "Last call price",
        selector: (row) => row.last,
        sortable: true,
        right: true,
        reorder: true,
        sortFunction: (rowA, rowB) => customColumnSort(rowA, rowB, 'last')
    },
];


//<a target="_blank" href={`https://finance.yahoo.com/quote/` + allSPData[i].ticker + `/options`}>{allSPData[i].ticker}</a>

const MyDataTable = (props) => {
    return (
        <div className="MyDataTable">
            <Card>
                <DataTable
                    // title="S&P500 Covered Calls"
                    columns={columns}
                    data={props.callsData}
                    defaultSortFieldId={1}
                    sortIcon={<SortIcon />}
                    pagination
                    selectableRows
                    striped={true}
                    highlightOnHover={true}
                    dense={true}
                    responsive={true}
                    paginationPerPage={15}
                    theme={'dark'}
                />
            </Card>
        </div>
    );
}

export default MyDataTable;
// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);
