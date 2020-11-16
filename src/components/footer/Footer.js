import React, { Component } from 'react';
import {FooterItems, ContactInfo} from "./FooterItems";
import './Footer.css';

class Footer extends Component {
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
                                    return(
                                        <a href={subItem.url} key={index}>{subItem.content}</a>
                                    )
                                })}
                            </div>
                        )
                    })}
                    <div className="flex-item text-center">
                        <h2>Contact Us</h2>
                        <a href={`tel:` + ContactInfo.phone}>{ContactInfo.phone}</a>
                        <span> | </span>
                        <a href={`mailto:` + ContactInfo.email}>{ContactInfo.email}</a>
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
