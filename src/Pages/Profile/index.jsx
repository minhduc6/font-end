import Navbar from "../../Components/Navbar";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { httpClient } from '../../service/httpClient'
import { Footer } from "../../Components/Footer";
import { setCurrentUser, setIsLoggin } from "../../Store/index";


export default function Profile() {


    const [user, setUser] = useState({});
    const dispatch = useDispatch();


    const getAccount = () => {
        httpClient
            .get("/api/user/me", {
            })
            .then((response) => {
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
        <>
        <Navbar />
        <div style={{marginTop : '150px'}} class="container">
            <div class="main-body">
                <div class="row gutters-sm">
                    <div class="col-md-4 mb-3">
                        <div class="card">
                            <div class="card-body">
                                <div class="d-flex flex-column align-items-center text-center">
                                    <img src={user.imgUrl} alt="Admin" class="rounded-circle" width="150" />
                                    <div class="mt-3">
                                        <h2>ID : {user.id}</h2>
                                        <h4>Display Name : {user.displayName}</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-8">
                        <div class="card mb-3">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-sm-3">
                                        <h6 class="mb-0">Full Name</h6>
                                    </div>
                                    <div class="col-sm-9 text-secondary">
                                        {user.displayName}
                                    </div>
                                </div>
                                <hr />
                                <div class="row">
                                    <div class="col-sm-3">
                                        <h6 class="mb-0">Email</h6>
                                    </div>
                                    <div class="col-sm-9 text-secondary">
                                        {user.email}
                                    </div>
                                </div>
                                <hr />
                                <div class="row">
                                    <div class="col-sm-3">
                                        <h6 class="mb-0">Role</h6>
                                    </div>
                                    <div class="col-sm-9 text-secondary">
                                        {user.roles?.map((item) => <p>{item.name}</p>)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
        </>
    );
}

