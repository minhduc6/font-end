import React, { useEffect } from "react";


import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { Register } from "./Pages/Register";
import "../src/assets/css/plugins.css"
import "../src/assets/css/style.css"
import { Login } from "./Pages/Login";
import { Home } from "./Pages/Home";
import { useSelector } from "react-redux";
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
import OrganizerContainer from "./admin/Container/OrganizerContainer";
import { Invoice } from "./Pages/Invoice";
import { DetailInvoice } from "./Pages/DetailInvoice";
import StatisticalContainer from "./admin/Container/StatisticalContainer";
import { Organizers } from "./Pages/Organizer";
import { EventByOrganizer } from "./Pages/EventByOrganizer";
import { EventForm, EventFormByOrganizer } from "./Pages/EventForm";
import Statistical from "./Pages/Statistical";
import { AboutPage } from "./Pages/About";

function App() {
  const user = useSelector((state) => state.profile.user);
  const isLoggin = useSelector((state) => state.profile.isLoggin) || false

  console.log("User :" , user)
  let roleAdmin = false;
  for(let i = 0 ; i < user?.roles?.length;i++)
  {
     if(user?.roles[i].name == "ROLE_ADMIN") {
        roleAdmin = true;
     } 
  }


  console.log("Role ADMIN" , roleAdmin)
  console.log("is Login" , isLoggin)

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
      path: "/admin/organizers",
      element: roleAdmin == true ?  ( <OrganizerContainer/>) : (<Result
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
      path: "/admin/event/statistical/:id",
      element: roleAdmin == true ?  ( <StatisticalContainer/>) : (<Result
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
      element: <Profile />  
    },
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/about",
      element: <AboutPage />,
    },
    {
      path: "/event/detail/:id",
      element: <Detail />,
    },
    {
      path: "/orgainzer",
      element: isLoggin == true  ? (<Organizers/>)  :  (<Navigate to='/login'  />)
    },
    {
      path: "/event/ticket/:id",
      element: isLoggin == true  ? (<Ticket/>)  :  (<Navigate to='/login'  />)
    },
    {
      path: "/my-invoice",
      element:  isLoggin == true ? <Invoice />  :  <Navigate to='/login'  />
    },
    {
      path: "/my-invoice/:id",
      element: isLoggin == true ? <DetailInvoice />  :  <Navigate to='/login'  />
    },
    {
      path: "/my-event",
      element: isLoggin == true ? <EventByOrganizer /> :  <Navigate to='/login'  />
    },
    {
      path: "/my-event/save",
      element: isLoggin == true ? <EventFormByOrganizer /> :  <Navigate to='/login'  />
    },
    {
      path: "/my-event/statistical/:id",
      element: isLoggin == true ? <Statistical /> :  <Navigate to='/login'  />
    },
  ]);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
