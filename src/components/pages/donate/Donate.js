import React, { Component, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import SeeImpact from "../../see-impact/SeeImpact";
import SocialMedia from "../../social-media/SocialMedia";
// import {DONATE_SECTIONS} from "./DonateSections";
// import _ from 'lodash';
import './Donate.css';

class Donate extends Component {

    constructor(props){
        super(props);
        this.state = {section: undefined};
    }

    componentDidMount(){
        let section = this.props.match.params.section;
        console.log(section);
        if (section  === "see-impact") {
            this.setState({scroll: true})
        }
        this.setState({section: "see-impact"});
    }

    returnScroll = () => {
        // this.setState({scroll: false});
        return (
            <ScrollToSeeImpact />
        )
    }

    render() {
        return(
            <main>

                <h1>Donate</h1>
                <section>
                    <p className="portal">Eventually this will hopefully have a portal to make a credit card donation.
                        For now i'll just add a picture</p>
                    <img src="https://i.ibb.co/v3xDbvW/united-nations-covid-19-response-QVNy-Cll-G2-GQ-unsplash.jpg"
                         alt="This says every little thing helps."/>
                </section>
                <SeeImpact />
                <SocialMedia />
                {this.state.scroll ? this.returnScroll() : ""}
            </main>
        )
    }
}


function ScrollToSeeImpact() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 1000);
    }, [pathname]);

    return null;
}

export default Donate
