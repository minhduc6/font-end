import Navbar from "../../Components/Navbar";
import { Footer } from "../../Components/Footer";
import { DetailInvoiceClient } from "../../Components/DetailInvoice";

export const DetailInvoice = () => {
  return (
    <div>
      <Navbar />
       <DetailInvoiceClient />
      <Footer/>
    </div>
  );
};
