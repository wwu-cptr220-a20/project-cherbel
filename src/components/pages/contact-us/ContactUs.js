import React, { Component } from 'react';
import SocialMedia from "../../social-media/SocialMedia";
import './ContactUs.css';

class ContactUs extends Component {

    render() {
        return(
            <main className="">
                <h1>Contact Us</h1>
                <img src="https://i.ibb.co/kMKvjnk/pawel-czerwinski-0x-CCPIbl3-M-unsplash.jpg" alt="A telephone" height="200px"/>
                <section>
                    <h2>How to contact us</h2>
                    <p>
                        There are several ways to contact us. During business hours, fastest way to contact us
                        will be our phone number found below. If you want more information on a certain subject,
                        are wondering where your where your donations are going, or anything else, you can also
                        contact us us via email and we'll get back to you as soon as possible.
                    </p>
                    <div class="contact-info">
                        <div>Phone:<a href="tel:1-123-456-7890"> 1 (123) 456-7890</a></div>
                        <div>Email:<a href="mailto:example@example.com"> example@example.com</a></div>
                        <div>Address: 123 Fyneman Way, College Place, Wa, 99324</div>
                    </div>
                    <div className="donate-div">
                        <button className="donate-btn" type="button">Donate Now</button>
                    </div>
                </section>
                <section id="content-section">
                    <div className="flex-box">
                        <div className="flex-item advice-card">
                            <div class="align-horizontally">
                                <div id="need-Advice">Need some Advice?</div>
                                <div id="random-advice"></div>
                                <div id="advice-source">Advice Generated from AdviceSlip.com</div>
                            </div>
                        </div>
                        <div className="flex-item photo-card">
                            <div className="flex-item social-media">
                                <SocialMedia />
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        )
    }
}

export default ContactUs
