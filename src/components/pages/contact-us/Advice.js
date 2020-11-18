import React, { Component } from 'react';
import '../css/custom-default.css';
import './ContactUs.css';


class Advice extends Component {
    constructor(props) {
      super(props);
      this.state = { 
        advice:
      };
    }
  
    componentDidMount() {
      fetch("https://api.adviceslip.com/advice")
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({advice: json.slip.advice});
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error = "We're Sorry, we were unable to load advice at this time."
            });
          }
        )
    }
  
    render() {
        return (
            <div class="align-horizontally">
                            <div id="need-Advice">Need some Advice?</div>
                            <div id="random-advice">
                                <p> {this.state.advice} </p>
                            </div>
                            <div id="advice-source">Advice Generated from AdviceSlip.com</div>
                        </div>
        )
    }
  }

  export default Advice