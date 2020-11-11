import React, { Component } from 'react';
import './Homepage.css';

class Homepage extends Component {

    render() {
        return(
            <main>
                <section id="homepage" className="w-100 p-3">
                    <h1 id="title">Foundation for the Global Advancement of Children</h1>
                    <p id="mission">Bringing children out of poverty by supporting
                        education and creating safe, loving environments.</p>
                </section>
            </main>
        )
    }
}

export default Homepage
