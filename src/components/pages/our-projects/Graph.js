import React, { Component } from 'react';
import {Bar} from 'react-chartjs-2';
import './OurProjects.css';
// import { Chart } from 'react-chartjs-2';

class Graph extends Component {
    constructor(props) {
        super(props);
        this.chartReference = React.createRef();
        // the WHO api requires a proxy, which is provided by heroku and tends to time-out on occasion, 
        // causing the data to not be returned.
        this.url = 'https://cors-anywhere.herokuapp.com/https://apps.who.int/gho/athena/data/GHO/NUTRITION_WA_2.json?&filter=COUNTRY:ZWE;SEX:*';
        // this object is used in case the external data breaks
        this.fakeData = [
            {
                year: "1987",
                value: 10.5
            }, {
                year: "1988",
                value: 8.0
            }, {
                year: "1994",
                value: 11.8
            }, {
                year: "1999",
                value: 11.5
            }, {
                year: "2005-2006",
                value: 14.0
            }, {
                year: "2009",
                value: 11.7
            }, {
                year: "2010-2011",
                value: 10.2
            }, {
                year: "2014",
                value: 11.2
            }, {
                year: "2015", 
                value: 8.5
            }, {
                year: "2019",
                value: 9.7
            }
        ];

        this.state = {
            labels: [],
            datasets: [
              {
                label: 'Zimbabwe',
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: []
              }
            ]
        }          
    }

    componentDidMount() {
        console.log("Mounted");
        console.log(this.chartReference);
    }

    changeHandler(value) {
        this.chartReference.update();
    }

    fetchData() {
        let promise = fetch(this.url)
            .then(response => {
                return response.json();
            })
            .then(data => {
                this.parseData(data);
            })
            .catch(error => {
                // console.log(error);
                // console.log("sending fake data");
                this.renderData(this.fakeData);
            });
        return promise;
    }

    parseData(data) {
        let facts = data.fact;
        // console.log(facts);
        let condensedFacts = facts.map(item => {
            let year = '';
            item.Dim.forEach(item => {
                if (item.category === "YEAR") {
                    year = item.code;
                }
            });
            return {
                year: year,
                value: parseFloat(item.value.display)
            };
        });
        this.renderData(condensedFacts);
    }

    renderData(data) {
        // console.log("Data for chart:");
        // console.log(data);
        data.forEach(item => {
            this.state.labels.push(item.year);
            this.state.datasets[0].data.push(item.value.toFixed(4));
            console.log("about to update");
        });
        // this.render();
    }

    render() {
        // this.fetchData();
        this.renderData(this.fakeData);
        
        return (
          <div id="bar-graph">
            <Bar
                data={this.state}
                options={{
                    title:{
                        display:true,
                        text:'Percentage of Children Underweight in Zimbabwe by Year',
                        fontSize:20
                    },
                    legend:{
                        display:true,
                        position:'right'
                    }
                }}
                ref={this.chartReference}
            />
          </div>
        );
    }
}

export default Graph;
