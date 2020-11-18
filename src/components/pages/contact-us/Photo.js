import React, { Component } from 'react';
import '../css/custom-default.css';
import './ContactUs.css';


class Photo extends Component {
    constructor(props) {
        super(props);
        this.state = { 
        {img: "https://i.ibb.co/k9VyHjP/umbrella-1807513-1920.jpg",
        alt: "Someone holding and Umbrella."},
        {img: "https://i.ibb.co/0nQn71j/people-2591874-1920.jpg",
        alt: "Someone sitting on a mountain."},
        {img: "https://i.ibb.co/p1KGkzj/girl-843076-1920.jpg",
        alt: "A dramatic photo of a someone on a leafy hillside."}
        };
    }

    let size = images.length
    let x = Math.floor(size*Math.random())
    

    render() {
        return (
            <img src= {this.state[x].img} alt={this.state[x].alt}/>
        )
    }
}

  export default Photo
