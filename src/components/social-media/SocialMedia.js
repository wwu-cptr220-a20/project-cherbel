import React, { Component } from 'react';
import './SocialMedia.css';

class SocialMedia extends Component {

    visitTwitter = () => {
        window.location = "https://twitter.com";
    }

    visitFacebook = () => {
        window.location = "https://www.facebook.com";
    }

    visitInstagram = () => {
        window.location = "https://www.instagram.com";
    }

    render() {
        return(
            <section>
                <h3>Social Media</h3>
                <table id="social">
                    <tbody>
                        <tr>
                            <td onClick={this.visitFacebook}><img src="https://i.ibb.co/80hwJkK/iconfinder-Rounded-Facebook-svg-5282541.png" alt="Facebook Icon"/></td>
                            <td onClick={this.visitTwitter}><img src="https://i.ibb.co/Npkt1kR/iconfinder-Rounded-Twitter5-svg-5282551.png" alt="Twitter Icon"/></td>
                            <td onClick={this.visitInstagram}><img src="https://i.ibb.co/BCkpFF0/iconfinder-Rounded-Instagram-svg-5282544.png" alt="Twitter Icon"/></td>
                        </tr>
                    </tbody>
                </table>
            </section>
        )
    }
}

export default SocialMedia
