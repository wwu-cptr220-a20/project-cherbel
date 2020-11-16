import React, { Component } from 'react';
import '../../css/custom-default.css';
import './AboutUs.css';

class AboutUs extends Component {

    render() {
        return(
            <main className="text-center">
                <h1>About Us</h1>
                <section>
                    <h2 id="mission">Our Mission</h2>
                    <p>
                        Through business development we will assist organizations to become independent from
                        non-profits by supporting sustainable projects and quality educational facilities that
                        will ultimately lead to children enjoying independent lives.
                    </p>
                </section>
                <section class="btn">
                    <button class="donate-btn" type="button" onclick="window.location.href='../donate/donate.html';">Donate Now</button>
                </section>
                <section>
                    <h2>History</h2>
                    <p>History of the Organization</p>
                </section>
                <section>
                    <h2 id="leadership">Leadership</h2>
                    <div  class="flex-container">
                        <div class="flex-item">
                            <img class="first" src="https://i.ibb.co/yhT00M4/portrait-657116-1920.jpg" alt="A photo of _____"></img>
                            <p>A Picture of ____ the _____ of our organization</p>
                        </div>
                        <div class="flex-item">
                            <img class="second" src="https://i.ibb.co/CHm3tDN/human-1411499-1920.jpg" alt="A photo of ____"></img>
                            <p>A Picture of ____ the _____ of our organization</p>
                        </div>
                    </div>
                </section>
                <section>
                    <h2 id="finance">Financials</h2>
                    <p>This Section will include links to Financial Statements and an IRS 990 Form.</p>
                </section>
            </main>
        )
    }
}

export default AboutUs
