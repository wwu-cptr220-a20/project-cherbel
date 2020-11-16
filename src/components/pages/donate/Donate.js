import React, { Component } from 'react';
import SeeImpact from "../../see-impact/SeeImpact";
import SocialMedia from "../../social-media/SocialMedia";
import '../../css/custom-default.css';
import './Donate.css';

class Donate extends Component {

    render() {
        return(
            <main className="text-center">
                <h1>Donate</h1>
                <section id="donate">
                    <p className="portal">Eventually this will hopefully have a portal to make a credit card donation.
                        For now i'll just add a picture</p>
                    <img src="https://i.ibb.co/v3xDbvW/united-nations-covid-19-response-QVNy-Cll-G2-GQ-unsplash.jpg"
                         alt="This says every little thing helps." height="400px"/>
                </section>
                <SeeImpact />
                <SocialMedia />
            </main>
        )
    }
}

export default Donate
