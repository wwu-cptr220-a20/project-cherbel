import React, { Component } from 'react';
import {Bar} from 'react-chartjs-2';
import './OurProjects.css';
// import { Chart } from 'react-chartjs-2';

class Graph extends Component {
    constructor(props) {
        super(props);
        this.chartReference = React.createRef();
        this.countries = {
            Zambia: "ZMB",
            India: "IND",
            China: "CHN",
            Iraq: "IRQ",
            Malawi: "MWI",
            Vietnam: "VNM",
            United_States: "USA"
        }
        // the WHO api requires a proxy, which is provided by heroku and tends to time-out on occasion, 
        // causing the data to not be returned.
        this.url1 = 'https://cors-anywhere.herokuapp.com/https://apps.who.int/gho/athena/data/GHO/NUTRITION_WA_2.json?&filter=COUNTRY:ZWE;SEX:*';
        this.url2 = 'https://cors-anywhere.herokuapp.com/https://apps.who.int/gho/athena/data/GHO/NUTRITION_WA_2.json?&filter=COUNTRY:' + this.countries.China + ';SEX:*';
        // this object is used in case the external data breaks
        this.fakeData = {
            country: "Zimbabwe",
            data: [
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
            ]
        };

        this.set1 = {};
        this.set2 = {};

        this.state = {
            data: () => {
                return {
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
            },
            refresh: false,
            set1url: this.url1,
            set2url: this.url2
        };
        
        this.graphData = {
            labels: [],
            datasets: [
              {
                label: '',
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: []
              },
              {
                label: '',
                backgroundColor: 'rgba(255,255,0,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: []
              }
            ]
        };

        this.chartReference = React.createRef();
    }

    componentDidMount() {
        this.fetchData(this.state.set1url, 1);
        this.fetchData(this.state.set2url, 2);
        // this.renderData(this.fakeData, 0);
    }

    fetchData(url, setNumber) {
        var newSetNumber = setNumber - 1;
        let promise = fetch(url)
            .then(response => {
                return response.json();
            })
            .then(data => {
                this.parseData(data, newSetNumber);
            })
            .catch(error => {
                // this.renderData(this.fakeData);
            });
        return promise;
    }

    // this function simply condenses the object returned by the API
    // to an object containing only the values we need.
    parseData(data, setNumber) {
        let facts = data.fact;
        let condensedFacts = {
            country: '',
            data: []
        };
        condensedFacts.data = facts.map(item => {
            let year = '';
            item.Dim.forEach(item2 => {
                if (item2.category === "YEAR") {
                    year = item2.code;
                }
            });
            return {
                year: year,
                value: parseFloat(item.value.display)
            };
        });
        let country = "";
        data.dimension.forEach(item => {
            if (item.label === "COUNTRY") {
                country = item.code[0].display;
            }
        });
        condensedFacts.country = country;
        this.renderData(condensedFacts, setNumber);
    }

    renderData(data, setNumber) {
        if (setNumber === 0) {
            this.set1 = data;
            data.data.forEach(item => {
                this.graphData.labels.push(item.year);
                this.graphData.datasets[setNumber].data.push(item.value.toFixed(4));
            });
            this.graphData.datasets[setNumber].label = data.country;
        } else if (setNumber === 1) {
            this.set2 = data;
            this.graphData = this.mapData(this.set1, this.set2);
            // this.graphData.datasets[0].data[0] = 13;
        }
        this.setState(currentState => {
            return {
                data: () => {
                    return this.graphData
                },
                refresh: !currentState.refresh
            }
        });
    }

    mapData(set1, set2) {
        let newData = {
            labels: [],
            datasets: [
              {
                label: '',
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: []
              },
              {
                label: '',
                backgroundColor: 'rgba(255,255,0,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: []
              }
            ]
        }
        set1.data.forEach(item => {
            newData.labels.push(item.year);
        })
        set2.data.forEach(item => {
            newData.labels.push(item.year);
        })
        newData.labels.sort();
        var set1Index = 0;
        var set2Index = 0;
        newData.labels.forEach(year => {
            // set1
            if (set1Index < set1.data.length) {
                if (set1.data[set1Index].year === year) {
                    // value belongs in year slot
                    newData.datasets[0].data.push(set1.data[set1Index].value);
                    set1Index++;
                } else {
                    newData.datasets[0].data.push(0);
                }
            }
            // set2
            if (set2Index < set2.data.length) {
                if (set2.data[set2Index].year === year) {
                    // value belongs in year slot
                    newData.datasets[1].data.push(set2.data[set2Index].value);
                    set2Index++;
                } else {
                    newData.datasets[1].data.push(0);
                }
            }
        });

        newData.datasets[0].label = set1.country;
        newData.datasets[1].label = set2.country;

        return newData;
    }

    clickHandler = () => {
        var temp = parseFloat(this.graphData.datasets[0].data[0]);
        temp += 1;
        this.graphData.datasets[0].data[0] = temp.toString();
        this.setState(currentState => {
            return {
                data: () => {
                    return this.graphData
                },
                refresh: !currentState.refresh
            }
        });
        // this.chartReference.update();
    }

    changeSet = (country) => {
        this.url2 = 'https://cors-anywhere.herokuapp.com/https://apps.who.int/gho/athena/data/GHO/NUTRITION_WA_2.json?&filter=COUNTRY:' + this.countries[country] + ';SEX:*';
        this.fetchData(this.url2, 2);
    }

    render() {
        return (
          <div id="bar-graph">
            <Bar
                data={this.state.data}
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
                refresh={this.state.refresh}
            />
            <DropDown title="Comparable Countries" countries={Object.keys(this.countries)} changeCallback={this.changeSet}/>
            {/* <button onClick={this.clickHandler}>Raise 1987</button>
            <h2>1987 Value: {this.state.data().datasets[0].data[0]}</h2> */}
          </div>
        );
    }
}

class DropDown extends Component {
    constructor(props) {
      super(props);
      
      this.state = {
        showMenu: false,
      }
      
      this.showMenu = this.showMenu.bind(this);

      var index = 0;
      this.buttons = this.props.countries.map(country => {
        index++;  
        return <button 
                    key={index} 
                    className="menu-button" 
                    onClick={() => {
                        this.props.changeCallback(country)
                    }}>
                {country}</button>;
      });
    }
    
    showMenu(event) {
      event.preventDefault();
      
      this.setState(currentState => {
        return { showMenu: !currentState.showMenu };
      });
    }
  
    render() {
      return (
        <div>
          <button onClick={this.showMenu} className="menu-button">
            {this.props.title}
          </button>
          
          {
            this.state.showMenu
              ? (
                <div className="menu">
                  {this.buttons}
                </div>
              )
              : (
                null
              )
          }
        </div>
      );
    }
}
  

export default Graph;
