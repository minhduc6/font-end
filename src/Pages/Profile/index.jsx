import Navbar from "../../Components/Navbar";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { httpClient } from '../../service/httpClient'
import { Footer } from "../../Components/Footer";
import { Button } from 'antd';
import { setCurrentUser, setIsLoggin } from "../../Store/index";
import { DialogModalUserProfile } from '../../Components/Modal/DialogModalUserProfile'


export default function Profile() {


    const [user, setUser] = useState({});
    const dispatch = useDispatch();
    const [item, setItem] = useState()
    const [loading, setLoading] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false);


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
        getAccount()
    }, []);

    const editUser = () => {
        setIsModalOpen(true)
    }



    return (
        <>
            <Navbar />
            <div style={{ marginTop: '150px' }} class="container">
                <div class="main-body">
                    <div class="row gutters-sm">
                        <div class="col-md-4 mb-3">
                            <div class="card">
                                <div class="card-body">
                                    <div class="d-flex flex-column align-items-center text-center">
                                        <img src={user.imgUrl} class="rounded-circle" width="150" />
                                        <div class="mt-3">
                                            <h2>ID : {user.id}</h2>
                                            <h4>Display Name : {user.displayName}</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Button style={{marginLeft : '165px',marginTop : '20px'}} onClick={editUser}  type="primary" size="large" >
                                Edit
                            </Button>

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
            <DialogModalUserProfile
                getAccount={getAccount}
                setLoading={setLoading}
                value={user}
                isModalOpen={isModalOpen}
                hideModal={() => setIsModalOpen(false)}
            />
            <Footer />
        </>
    );
}

