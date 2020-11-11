import React, { Component } from 'react';
import '../css/custom-default.css';
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
                <section>
                    <h2 id="see-impact">See the Impact</h2>
                    {/*// <!--Dynamic Section for kids stories-->*/}
                    <div id="kids-stories">
                        <h3>Stories From The Kids</h3>
                        <div id="image-flex">
                            <button className="back arrow"></button>
                            <img id="kids-img" className="card" alt=""/>
                                <button className="next arrow"></button>
                        </div>
                        <h4 className="kids-head"> </h4>
                        <p className="kids-p"></p>
                        <button id="more">Learn More</button>
                    </div>
                    <div className="story border" id="story1">
                        <h2>Child 1</h2>
                        <p>
                            This is a popup story that will detail the story of the first child
                            displayed in the slideshow widget.
                        </p>
                        <button className="closeButton">Close</button>
                    </div>
                    <div className="story border" id="story2">
                        <h2>Child 2</h2>
                        <p>
                            This is a popup story that will detail the story of the first child
                            displayed in the slideshow widget.
                        </p>
                        <button className="closeButton">Close</button>
                    </div>
                    <div className="story border" id="story3">
                        <h2>Child 3</h2>
                        <p>
                            This is a popup story that will detail the story of the first child
                            displayed in the slideshow widget.
                        </p>
                        <button className="closeButton">Close</button>
                    </div>
                </section>
                {/*// <!--Section for Social Media-->*/}
                <section>
                    <div>
                        <h3>Social Media</h3>
                        <table id="social">
                            <td><img
                                src="https://i.ibb.co/80hwJkK/iconfinder-Rounded-Facebook-svg-5282541.png"
                                alt="Facebook Icon" border="0"/></td>
                            <td><img
                                src="https://i.ibb.co/Npkt1kR/iconfinder-Rounded-Twitter5-svg-5282551.png"
                                alt="Twitter Icon" border="0"/></td>
                            <td><img
                                src="https://i.ibb.co/BCkpFF0/iconfinder-Rounded-Instagram-svg-5282544.png"
                                alt="Twitter Icon" border="0"/></td>
                        </table>
                    </div>
                </section>
            </main>
        )
    }
}

export default Donate
