import Switch from "react-switch";

import Sidebar from "../../component/Sidebar/Sidebar";
import Header from "../../component/Header/Header";

import "./billing.scss";
import axios from "axios";
import { useEffect, useState } from "react";

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
    const [list, setList] = useState([]);

    useEffect(async () => {
        const response = await axios.get("/api/user/getPaymentHistory");
        console.log(response);
        setList(response.data);
        
    }, []);
    
 
    return (
        <section className="billing-content">
            {/* {list.length === 0 ? <></> :
            <>

            </>} */}
        </section>
    );
}