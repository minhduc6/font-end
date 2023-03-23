import React, { useEffect } from "react";


import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Register } from "./Pages/Register";
import "../src/assets/css/plugins.css"
import "../src/assets/css/style.css"
import { Login } from "./Pages/Login";
import { Home } from "./Pages/Home";
import { useSelector } from "react-redux";
import { Genres } from "./Pages/Genres";
import { MoviesPage } from "./Pages/MoviesPage";
import { TVsPage } from "./Pages/TVsPage";
import { SearchPage } from "./Pages/SearchPage";
import { Footer } from "./Components/Footer";
import OAuth2RedirectHandler from './Components/oauth2/OAuth2RedirectHandler';
import { FavoritePage } from "./Pages/FavoritePage";
import { WatchPage } from "./Pages/WatchPage";
import Profile from "./Pages/Profile";
import AdminContainer from "./admin/Container/AdminContainer";
import { Button, Result } from 'antd';
import UserContainer from "./admin/Container/UserContainer";
import CategoryContainer from "./admin/Container/CategoryContainer";
import EventContainer from "./admin/Container/EventContainer";
import EventSaveContainer from "./admin/Container/EventSaveContainer";

function App() {
  const user = useSelector((state) => state.app.user);

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
      path: "/",
      element: <Footer />,
      children: [
        {
          path: "/genres/:type/:id",
          element: <Genres />,
        },
        {
          path: "/search/:input",
          element: <SearchPage />,
        },
        {
          path: "/tv",
          element: <TVsPage />,
        },
        {
          path: "/movies",
          element: <MoviesPage />,
        },
        {
          path: "/favorite",
          element: <FavoritePage />,
        },
        {
          path: "/watch",
          element: <WatchPage />,
        },
      ],
    },
  ]);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
