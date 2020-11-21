import React, { Component } from 'react';

class Photo extends Component {
    constructor(props) {
        super(props);
        this.state = [ 
        {img: "https://i.ibb.co/k9VyHjP/umbrella-1807513-1920.jpg",
        alt: "Someone holding and Umbrella."},
        {img: "https://i.ibb.co/0nQn71j/people-2591874-1920.jpg",
        alt: "Someone sitting on a mountain."},
        {img: "https://i.ibb.co/p1KGkzj/girl-843076-1920.jpg",
        alt: "A dramatic photo of a someone on a leafy hillside."}
        ];
    }

    doMath() {
        let size = this.state.length;
        return Math.floor(size*Math.random());
    }
    
    render() {
        return (
            <img className= "photo" src= {this.state[this.doMath()].img} alt={this.state[this.doMath()].alt}/>
        )
    }
}

  export default Photo
