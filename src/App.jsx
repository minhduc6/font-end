import React, { useEffect } from "react";


import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";
import { Register } from "./Pages/Register";
import "../src/assets/css/plugins.css"
import "../src/assets/css/style.css"
import { Login } from "./Pages/Login";
import { Home } from "./Pages/Home";
import { useSelector } from "react-redux";
import { Footer } from "./Components/Footer";
import OAuth2RedirectHandler from './Components/oauth2/OAuth2RedirectHandler';
import Profile from "./Pages/Profile";
import AdminContainer from "./admin/Container/AdminContainer";
import { Button, Result } from 'antd';
import UserContainer from "./admin/Container/UserContainer";
import CategoryContainer from "./admin/Container/CategoryContainer";
import EventContainer from "./admin/Container/EventContainer";
import EventSaveContainer from "./admin/Container/EventSaveContainer";
import { Detail } from "./Pages/Detail";
import { Ticket } from "./Pages/BuyTicket";
import InvoiceContainer from "./admin/Container/InvoiceContainer";

function App() {
  const user = useSelector((state) => state.profile.user);
  const isLogin = useSelector((state) => state.profile.isLogin)

  console.log("User :" , user)
  let roleAdmin = false;
  for(let i = 0 ; i < user?.roles?.length;i++)
  {
     if(user?.roles[i].name == "ROLE_ADMIN") {
        roleAdmin = true;
     } 
  }

  console.log("Role ADMIN" , roleAdmin)

  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/admin",
      element: roleAdmin == true ?  ( <AdminContainer/>) : (<Result
        status="403"
        title="403"
        subTitle="Forbiden"
        extra={<Button type="primary">Back Home</Button>}
      />)
    },
    {
      path: "/admin/user",
      element: roleAdmin == true ?  ( <UserContainer/>) : (<Result
        status="403"
        title="403"
        subTitle="Forbiden"
        extra={<Button type="primary">Back Home</Button>}
      />)
    },
    {
      path: "/admin/category",
      element: roleAdmin == true ?  ( <CategoryContainer/>) : (<Result
        status="403"
        title="403"
        subTitle="Forbiden"
        extra={<Button type="primary">Back Home</Button>}
      />)
    },
    {
      path: "/admin/event",
      element: roleAdmin == true ?  ( <EventContainer/>) : (<Result
        status="403"
        title="403"
        subTitle="Forbiden"
        extra={<Button type="primary">Back Home</Button>}
      />)
    },
    {
      path: "/admin/invoice",
      element: roleAdmin == true ?  ( <InvoiceContainer/>) : (<Result
        status="403"
        title="403"
        subTitle="Forbiden"
        extra={<Button type="primary">Back Home</Button>}
      />)
    },
    {
      path: "/admin/event/save",
      element: roleAdmin == true ?  ( <EventSaveContainer/>) : (<Result
        status="403"
        title="403"
        subTitle="Forbiden"
        extra={<Button type="primary">Back Home</Button>}
      />)
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/oauth2/redirect",
      element: <OAuth2RedirectHandler />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/event/detail/:id",
      element: <Detail />,
    },
    {
      path: "/event/ticket/:id",
      element:  <Ticket/> 
    }
  ]);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
