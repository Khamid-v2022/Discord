import Sidebar from "../../component/Sidebar/Sidebar";
import Header from "../../component/Header/Header";
// import Invoice from "./Invoice";

import "./billing.scss";
import axios from "axios";
import { useEffect, useState } from "react";

import useWindowDim from "../../hooks/useWindowDim";

import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { PDFDownloadLink } from "@react-pdf/renderer";

let options = {  
    year: "numeric", month: "short", day: "numeric" 
}; 

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
            {/* <PDFDownloadLink
                    document={<Invoices list={list} />}
                    fileName={"Invoice.pdf" }
            >
                Download
            </PDFDownloadLink> */}
            {width > 426 ? ( <Table data={list} loading={loading} /> ) : (<MTable data={list} loading={loading} />)}
            {/* <Table data={list} loading={loading} /> */}
        </section>
    );
}

function Table({ data, loading}) {
    let index = data.length + 1;
    let index1 = 0;
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
                                <th>ID</th>
                                <th>Invoice</th>
                                <th>Billing Date</th>
                                <th>Status</th>
                                <th>Amount</th>
                                <th>Package</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((row, id) => {
                                    index = index - 1;
                                    index1++;
                                    return (
                                        <TableRow
                                            item = {row}
                                            key = {id}
                                            index = {index}
                                            index1 = {index1}
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

function TableRow({ item, index, index1}){
    let date = new Date(item.trx_time);
     
    const downloadPdf = async () => {
        console.log("download");
    }

    return (
        <tr>
            <td><span>{index1}</span></td>
            <td>
                <span>Invoice #{index}</span>
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
                <PDFDownloadLink
                    document={<Invoice data={item} index = {index} />}
                    fileName={"Invoice #" + index + ".pdf" }
                    className="download-btn"
                >
                    Download
                </PDFDownloadLink>
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
                Invoice #{index}
            </td>
            <td>
                {date.toDateString("en-us", options)}
            </td>
            <td>
                <span className="paid-status">
                    Paid
                </span>
            </td>
            <td>
                ${item.amount}
            </td>
            <td>
                {item.pakage}
            </td>
            <td>
                <PDFDownloadLink
                    document={<Invoice data={item} />}
                    fileName={"Invoice #" + index + ".pdf" }
                    className="download-btn"
                >
                    Download
                </PDFDownloadLink>
            </td>
        </tr>
    )
}


const styles = StyleSheet.create({
    page: {
      backgroundColor: '#E4E4E4'
    },
    table: {
      margin: 10,
      padding: 10,
      flexGrow: 1
    },
    section: {
        padding: 15
    },
    row: {
        display: "flex",
        flexDirection: "row",
    },
    cell: {
        padding: 4,
        border: "1px solid gray"
    }
});
  
  // Create Document Component
const Invoice = ({data, index}) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                <Text>Invoice #{index}</Text>
                <Text>Amount: USD ${data.amount}</Text>
                <Text>Billing Date: {new Date(data.trx_time).toDateString("en-us", options)}</Text>
                <Text>Plan: {data.pakage}</Text>
            </View>
        </Page>
    </Document>
);

const Invoices = ({list}) => (
    <Document>
        <Page size="A4" style={styles.page}>
            {
                list.map((item, index) => {
                    <>
                    {/* <View style={styles.row}> */}
                        <Text style={styles.cell}>Invoice #{list.length - index}</Text>
                        <Text style={styles.cell}>Amount: USD ${item.amount}</Text>
                        <Text style={styles.cell}>Billing Date: {new Date(item.trx_time).toDateString("en-us", options)}</Text>
                        <Text style={styles.cell}>Plan: {item.pakage}</Text>
                    {/* </View> */}
                    </>
                })
            }
            
        </Page>
    </Document>
);