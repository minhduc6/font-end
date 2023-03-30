
import { useState,useEffect } from "react";
import { useDispatch } from "react-redux";
import { httpClient } from '../../service/httpClient'
import { setCurrentUser, setIsLoggin } from "../../Store/index";


export default function Profile() {


    const [user, setUser] = useState({});
    const dispatch = useDispatch();


    const getAccount = () => {
        httpClient
            .get("/api/user/me", {
            })
            .then((response) =>{
                setUser(response.data)
                dispatch(setIsLoggin(true))
                dispatch(setCurrentUser(response.data))
            }
            );
    };

    useEffect(() => {
        console.log("7890")
        getAccount()
    }, []);


    return (
        <div className="profile-container">
            <div className="container">
                <div className="profile-info">
                    <div className="profile-name">
                        <h2>{user.id}</h2>
                        <h2>{user.displayName}</h2>
                        <h2>{user.email}</h2>
                    </div>
                </div>
            </div>
        </div>
    );
}

