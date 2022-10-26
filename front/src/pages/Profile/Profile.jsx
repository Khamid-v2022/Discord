import Switch from "react-switch";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Sidebar from "../../component/Sidebar/Sidebar";
import Header from "../../component/Header/Header";
import avatarImg from "../../res/imgs/avatar.png";

import "./profile.scss";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Profile() {
    return (
        <section id="profile">
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
    const [user, setUser] = useState({
        id: "",
        avatar: avatarImg,
        email: "",
        name: "",
        joinedServers: "",
        notify_email: false,
        marketing_email: false
    });

    const switch_notify = () => {
        setUser((prevState) => ({
            ...prevState,
            notify_email: !user.notify_email
        }));   
    }

    const switch_marketing = () => {
        setUser((prevState) => ({
            ...prevState,
            marketing_email: !user.marketing_email
        })) 
    }

    const update = async () => {
        let update = {
            id: user.id,
            notify_email: user.notify_email,
            marketing_email: user.marketing_email
        }

        const response = await axios.post("/api/user/updateuser", update);
        if(response.status === 200){
            toast("Successfully updated");
        } else {
            toast("Something went wrong");
        }
    }

    useEffect(async () => {
        let session = sessionStorage.getItem("userInfo");
        if(session){
            const user_info = JSON.parse(session);
            setUser((prevState) => ({
                ...prevState,
                id: user_info.userInfo._id,
                avatar:`https://cdn.discordapp.com/avatars/${user_info.userInfo?.userid}/${user_info.userInfo?.avatar}.png?size=128`,
                name: user_info.userInfo.username,
                discriminator: user_info.userInfo.discriminator,
                email: user_info.userInfo.email,
                notify_email: user_info.userInfo.notify_email,
                marketing_email: user_info.userInfo.marketing_email
            }))
            
            // get Joined Server count

            const response = await axios.get("/api/invite/getJoinedServers");
            setUser((prevState) => ({
                ...prevState,
                joinedServers: response.data.length
            }))
            // console.log(response);
        }
    }, []);
    
 
    return (
        <section className="profile-content">
            <ToastContainer />
            <h2>Profile</h2>
            <div className="thumbnail">
                <img src={user.avatar} alt="server" />
                <div className="profile-name">
                    {user.name}<span className="user-index">{user.discriminator ? "#" + user.discriminator : ""}</span>
                </div>
            </div>
            

            <div className="details">
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <div className="input-group">
                        <input placeholder="Email" type="email" value={user.email} readOnly id="email"/>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="joined"><a href="/history">Server Joined</a></label>
                    <div className="input-group">
                        <input placeholder="Joined Servers" type="text" value={user.joinedServers} readOnly id="joined"/>
                    </div>
                </div>

                <div className="form-group flex-row">
                    <label htmlFor="joined">Notifications Email</label>
                    <Switch onChange={switch_notify} checked={user.notify_email}/>               
                </div>

                <div className="form-group flex-row">
                    <label htmlFor="joined">Marketing Emails</label>
                    <Switch onChange={switch_marketing} checked={user.marketing_email}/>   
                </div>
            </div>

            <div className="actions">
                <button className="update-btn" onClick={() => update()}>
                    Update
                </button>
            </div>
        </section>
    );
}