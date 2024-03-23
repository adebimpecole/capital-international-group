import React from 'react'
import "./styles.css";
import Navbar from "../sections/Navbar";
import Card from "../components/Card";
import Footer from "../sections/Footer";
import MiniFooter from "../sections/MiniFooter";

const LandingPage = () => {
    const values = [
        {
          title: "  Investment Platform",
          body: "Use our international investment platform to place your own trades across an almost unlimited universe of assets.",
        },
        {
          title: "  Investment Management",
          body: "Let us manage your investments. Select the optimal discretionary strategy to meet you or your clients long-term financial goals.",
        },
        {
          title: " Banking",
          body: "With competitive rates of interest and fast account opening, we serve corporates, trusts and high net worth individuals.",
        },
      ];
    
  return (
    <>
        <Navbar />
      <div className="section_one">
        <h1 className="section_one_head">
          Invest with us. Bank with us. ‍<span>Grow with us.</span>
        </h1>
        <div className="section_one_text">
          Explore the ultimate suite of financial services designed to simplify
          asset and cash management for businesses, intermediaries and high net
          worth individuals.
        </div>
        <div className="cards">
          <Card title={values[0].title} body={values[0].body}/>
          <Card title={values[1].title} body={values[1].body}/>
          <Card title={values[2].title} body={values[2].body}/>
        </div>
      </div>
      <Footer/>
      <MiniFooter/>
    </>
  )
}

export default LandingPage