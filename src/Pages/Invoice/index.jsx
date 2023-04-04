import Navbar from "../../Components/Navbar";
import { Footer } from "../../Components/Footer";
import { InvoiceClient } from "../../Components/Invoice";

export const Invoice = () => {
  return (
    <div>
      <Navbar />
      <InvoiceClient />
      <Footer/>
    </div>
  );
};
