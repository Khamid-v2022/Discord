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
        created_at: "T",
        notify_email: false,
        marketing_email: false
    });
    // const [user, setUser] = useState({
    //     avatar: avatarImg,
    //     email: "khamid.webdev@gmail.com",
    //     name: "James",
    //     created_at: "2022-10-15T05:58:24.046Z",
    //     notify_email: true,
    //     marketing_email: false
    // });

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
        // console.log("Update");
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

    useEffect(() => {
        async function checkUser() {
            const response = await axios.get("/api/user/getuser");
            console.log("User Info:", response);
            
            if (response.status !== 401) {
                if(response.data.avatar)
                    setUser({
                        id: response.data._id,
                        avatar:`https://cdn.discordapp.com/avatars/${response.data?.userid}/${response.data?.avatar}.png?size=128`,
                        name: response.data.username,
                        email: response.data.email,
                        created_at: response.data.created_at,
                        notify_email: response.data.notify_email,
                        marketing_email: response.data.marketing_email
                    })
            }
        }
        checkUser();
      }, []);
    
 
    return (
        <section className="profile-content">
            <ToastContainer />
            <h2>Profile</h2>
            <div className="thumbnail">
                <img src={user.avatar} alt="server" />
                <div className="profile-name">
                    {user.name}
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
                    <label htmlFor="joined">Server Joined</label>
                    <div className="input-group">
                        <input placeholder="Joined Date" type="text" value={user.created_at.split("T")[0]} readOnly id="joined"/>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="joined">Notifications Email</label>
                    <Switch onChange={switch_notify} checked={user.notify_email}/>               
                </div>

                <div className="form-group">
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