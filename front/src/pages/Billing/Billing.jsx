import Sidebar from "../../component/Sidebar/Sidebar";
import Header from "../../component/Header/Header";

import "./billing.scss";
import axios from "axios";
import { useEffect, useState } from "react";

import useWindowDim from "../../hooks/useWindowDim";

export default function Billing() {
    return (
        <section id="billing">
            <div className="container">
                <div className="content">
                    <Sidebar />
                    <div className="main">
                        <Header />
                        <PageContent />
                    </div>
                </div>
            </div>
        </section>
    );
}

function PageContent() {
    let { width } = useWindowDim();

    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(async () => {
        setLoading(true);
        const response = await axios.get("/api/payment/getPaymentHistory");
        setList(response.data);    
        setLoading(false);
    }, []);
    
 
    return (
        <section className="billing-content">
            <h2>Billing</h2>
            {width > 426 ? ( <Table data={list} loading={loading} /> ) : (<MTable data={list} loading={loading} />)}
        </section>
    );
}

function Table({ data, loading}) {
    let index = data.length + 1;
    return (
        <>
        {   loading ? (
                <div className="no-data">
                    <p>Loading Data...</p>
                </div>
            ) : (
                data.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Invoice</th>
                                <th>Billing Date</th>
                                <th>Status</th>
                                <th>Amount</th>
                                <th>Plan</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((row, id) => {
                                    index = index - 1;
                                    return (
                                        <TableRow
                                            item = {row}
                                            key = {id}
                                            index = {index}
                                        />
                                    )
                                })
                            }
                        </tbody>
                    </table>
                ) : (
                    <div className="no-data">
                        <p>No data</p>
                    </div>
                )
            )
        }
        </>
    )
}

function MTable({ data, loading}) {
    let index = data.length + 1;
    return (
        <>
        {   loading ? (
                <div className="no-data">
                    <p>Loading Data...</p>
                </div>
            ) : (
                data.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Invoice</th>
                                <th>Status</th>
                                <th>Amount</th>
                                <th>Plan</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((row, id) => {
                                    index = index - 1;
                                    return (
                                        <MTableRow
                                            item = {row}
                                            key = {id}
                                            index = {index}
                                        />
                                    )
                                })
                            }
                        </tbody>
                    </table>
                ) : (
                    <div className="no-data">
                        <p>No data</p>
                    </div>
                )
            )
        }
        </>
    )
}

function TableRow({ item, index}){

    let date = new Date(item.trx_time);
    let options = {  
        year: "numeric", month: "short", day: "numeric" 
    };  
    return (
        <tr>
            <td>
                <span>Invoice #{index} - <span className="gray-span">{date.toDateString("en-us", options)}</span> </span>
            </td>
            <td>{date.toDateString("en-us", options)}</td>
            <td>
                <span className="paid-status">
                    Paid
                </span>
            </td>
            <td>
                <span className="gray-span">USD</span> ${item.amount}
            </td>
            <td>
                {item.pakage}
            </td>
            <td>
                <a href="#">Download</a>
            </td>
        </tr>
    )
}


function MTableRow({ item, index}){

    let date = new Date(item.trx_time);
    let options = {  
        year: "numeric", month: "short", day: "numeric" 
    };  
    return (
        <tr>
            <td>
                <span>Invoice #{index} - <span className="gray-span">{date.toDateString("en-us", options)}</span> </span>
            </td>
            <td>
                <span className="paid-status">
                    Paid
                </span>
            </td>
            <td>
                <span className="gray-span">USD</span> ${item.amount}
            </td>
            <td>
                {item.pakage}
            </td>
            <td>
                <a href="#">Download</a>
            </td>
        </tr>
    )
}