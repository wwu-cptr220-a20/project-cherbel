import React, { Component } from 'react';
import {FooterItems, ContactInfo} from "./FooterItems";
import './Footer.css';
import {Link} from "react-router-dom";

class Footer extends Component {

    GenerateContent = (subItem,  index) => {
        return <Link key={index} to={subItem.url} ><span className="link">{subItem.content}</span></Link>
    }

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
            <footer className="footer">
                <div className="oval"></div>
                <div className="flex-container">
                    {FooterItems.map((item, index) => {
                        return (
                            <div key={index} className="flex-item text-center">
                                <h2>{item.title}</h2>
                                {item.items.map((subItem, index) => {
                                    return this.GenerateContent(subItem, index)
                                })}
                            </div>
                        )
                    })}
                    <div className="flex-item text-center">
                        <h2>Social Media</h2>
                        <span onClick={this.visitFacebook} className="link">Facebook | </span>
                        <span onClick={this.visitTwitter} className="link">Twitter | </span>
                        <span onClick={this.visitInstagram} className="link">Instagram</span>
                    </div>
                    <div className="flex-item text-center">
                        <h2>Contact Us</h2>
                        <a href={`tel:` + ContactInfo.phone} className="link">{ContactInfo.phone}</a>
                        <span> | </span>
                        <a href={`mailto:` + ContactInfo.email} className="link">{ContactInfo.email}</a>
                    </div>
                    <div className="flex-item text-center non-profit">
                        <i className="text-light py-4 mb-4">&copy;FGAC is a Non-Profit Organization</i>
                    </div>
                </div>


            </footer>
        )
    }
}

export default Footer
