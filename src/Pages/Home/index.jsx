
import Navbar from "../../Components/Navbar";
import ListItem from "../../Components/ListItems"
import "./home.scss";
import { Footer } from "../../Components/Footer";





export const Home = () => {
  return (
    <div className="home-page">
      <Navbar />
      <ListItem />
      <Footer/>
    </div>
  );
};
