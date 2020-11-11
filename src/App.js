import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavBar from "./components/nav-bar/NavBar";
import Footer from "./components/footer/Footer";
import Homepage from "./components/homepage/Homepage";
import AboutUs from "./components/about-us/AboutUs";
import ContactUs from "./components/contact-us/ContactUs";
import Donate from "./components/donate/Donate";
import OurProjects from "./components/our-projects/OurProjects";
import Error from "./components/Error/Error";
import './App.css';

function App() {
  return (
      <BrowserRouter>
          <div>
              <NavBar />
              <Switch>
                  <Route path="/" component={Homepage} exact/>
                  <Route path="/aboutUs" component={AboutUs}/>
                  <Route path="/contactUs" component={ContactUs}/>
                  <Route path="/donate" component={Donate}/>
                  <Route path="/ourProjects" component={OurProjects}/>
                  <Route component={Error}/>
              </Switch>
              <Footer />
          </div>
      </BrowserRouter>
  );
}

export default App;
