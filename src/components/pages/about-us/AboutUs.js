import React, { Component } from 'react';
import './AboutUs.css';

class AboutUs extends Component {

    render() {
        return(
            <div id="main">
                <h1>About Us</h1>
                <section>
                    <h2>Our Mission</h2>
                    <p>
                        Through business development we will assist organizations to become independent from
                        non-profits by supporting sustainable projects and quality educational facilities that
                        will ultimately lead to children enjoying independent lives.
                    </p>
                </section>
                <section className="btn">
                    <button className="donate-btn" type="button">Donate Now</button>
                </section>
                <section>
                    <h2>History</h2>
                    <p>History of the Organization</p>
                </section>
                <section>
                    <h2 id="leadership">Leadership</h2>
                    <div  className="flex-container">
                        <div className="flex-item">
                            <img className="first" src="https://i.ibb.co/yhT00M4/portrait-657116-1920.jpg" alt="_____'s portrait"/>
                            <p>A Picture of ____ the _____ of our organization</p>
                        </div>
                        <div className="flex-item">
                            <img className="second" src="https://i.ibb.co/CHm3tDN/human-1411499-1920.jpg" alt="____'s portrait"/>
                            <p>A Picture of ____ the _____ of our organization</p>
                        </div>
                    </div>
                </section>
                <section>
                    <h2 id="finance">Financials</h2>
                    <p>This Section will include links to Financial Statements and an IRS 990 Form.</p>
                </section>
            </div>
        )
    }
}

export default AboutUs
