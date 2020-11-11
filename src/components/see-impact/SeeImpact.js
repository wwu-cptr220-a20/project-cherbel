import React, { Component } from 'react';
import {SeeImpactContent} from "./SeeImpactContent";
import '../css/custom-default.css';
import './SeeImpact.css';

class SeeImpact extends Component {

    constructor(props){

        super(props);
        this.arrayPosition = 0;
        this.state = {
            imageUrl: SeeImpactContent[this.arrayPosition].imageUrl,
            headingText: SeeImpactContent[this.arrayPosition].headingText,
            paragraph: SeeImpactContent[this.arrayPosition].paragraph,
            alt: SeeImpactContent[this.arrayPosition].alt,
            about: SeeImpactContent[this.arrayPosition].about,
            isPopupVisible: true
        }
    }

    upDateInformation = () => {
            this.setState({imageUrl: SeeImpactContent[this.arrayPosition].imageUrl});
            this.setState({headingText: SeeImpactContent[this.arrayPosition].headingText});
            this.setState({paragraph: SeeImpactContent[this.arrayPosition].paragraph});
            this.setState({alt: SeeImpactContent[this.arrayPosition].alt});
            this.setState({about: SeeImpactContent[this.arrayPosition].about});
    };

    onNextClick = () => {
        this.arrayPosition++;
        if(this.arrayPosition >= Object.keys(SeeImpactContent).length){
            this.arrayPosition = 0;
        }
        this.upDateInformation()
    };
    onBackClick = () => {
        this.arrayPosition--;
        if(this.arrayPosition < 0){
            this.arrayPosition = (Object.keys(SeeImpactContent).length) - 1;
        }
        this.upDateInformation();
    };

    render() {
        return(
            <section>
                <h2 id="see-impact">See the Impact</h2>
                <div id="kids-stories" className="kids-stories-inactive">
                    <h3>Stories From The Kids</h3>
                    <div id="image-flex" >
                        <button className="back arrow" onClick={this.onBackClick}></button>
                        <img id="kids-img" className="card" src={this.state.imageUrl} alt={this.state.alt}/>
                        <button className="next arrow" onClick={this.onNextClick}></button>
                    </div>
                    <h4 className="kids-head">{this.state.headingText}</h4>
                    <p className="kids-p">{this.state.paragraph}</p>
                    <button id="more">Learn More</button>
                </div>
                <div className="story border story-active"  id="story1">
                    <h2>{this.state.headingText}</h2>
                    <p>
                        {this.state.about}
                    </p>
                    <button className="closeButton">Close</button>
                </div>
            </section>
        )
    }
}

export default SeeImpact
