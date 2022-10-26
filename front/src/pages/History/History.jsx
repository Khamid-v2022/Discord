import Sidebar from "../../component/Sidebar/Sidebar";
import Header from "../../component/Header/Header";

import "./history.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import useWindowDim from "../../hooks/useWindowDim";

export default function History() {
    return (
        <section id="history">
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
        
        const response = await axios.get("/api/invite/getJoinedServers");
        setList(response.data); 
        console.log(response.data);
        
        setLoading(false);
    }, []);
    
 
    return (
        <section className="history-content">
            <h2>History</h2>
            {width > 426 ? (
                <Table data={list} loading={loading} />
            ) : (
                <MTable data={list} loading={loading} />
            )}
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
                                <th></th>
                                <th>Server Name</th>
                                <th>Link</th>
                                <th>Joined Date</th>
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

function TableRow({ item, index}){
    if(item.invite.length === 0)
        return;
    let date = new Date(item.join_date);
    let options = {  
        year: "numeric", month: "short", day: "numeric" 
    };  
    
    const icon = item.invite[0].iconId ? `https://cdn.discordapp.com/icons/${item.invite[0]?.serverId}/${item.invite[0]?.iconId}.png?size=512` : false;
    
    return (
        <tr>
            <td>
                { icon ? (<img src={icon} className="server-icon" />) : ("")}
            </td>
            <td>
                { item.invite[0].serverName} 
            </td>
            <td>
                <a href={ item.invite[0].link } target="_blank">{ item.invite[0].link }</a>
            </td>
            <td>
                {date.toDateString("en-us", options)}
            </td>
        </tr>
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
                                <th></th>
                                <th>Server Name</th>
                                <th>Joined Date</th>
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

function MTableRow({ item, index}){
    if(item.invite.length === 0)
        return;
    let date = new Date(item.join_date);
    let options = {  
        year: "numeric", month: "short", day: "numeric" 
    };  
    
    const icon = item.invite[0].iconId ? `https://cdn.discordapp.com/icons/${item.invite[0]?.serverId}/${item.invite[0]?.iconId}.png?size=512` : false;
    
    return (
        <tr>
            <td>
                { icon ? (<img src={icon} className="server-icon" />) : ("")}
            </td>
            <td>
                <a href={ item.invite[0].link } target="_blank">{ item.invite[0].serverName} </a>
            </td>
            <td>
                {date.toDateString("en-us", options)}
            </td>
        </tr>
    )
}