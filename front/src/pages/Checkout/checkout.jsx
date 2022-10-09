import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import './checkout.scss';

export default function Checkout() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage(
        "Order Placed, We will release your ordered Amount after payment confirmation."
      );
    }

    if (query.get("canceled")) {
      setMessage(
        "Order Canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  return (
    <section id="checkout">
      <p>{message}</p>
      <Link to="/replenish">
        Go Back
      </Link>
    </section>
  );
}
