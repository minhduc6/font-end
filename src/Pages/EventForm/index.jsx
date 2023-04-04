
import Navbar from "../../Components/Navbar";
import { Footer } from "../../Components/Footer";
import EventForm from "../../Components/EventForm";


export const EventFormByOrganizer = () => {
  return (
    <div className="home-page">
      <Navbar />
      <EventForm/>
      <Footer/>
    </div>
  );
};
