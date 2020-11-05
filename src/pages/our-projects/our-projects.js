'use strict';

class Graph {
    constructor() {
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
        this.chart = new Chart($("#graph"), {
            type: 'bar',
            data: {
                labels: [],
                datasets: [{
                    label: 'Percentage of children underweight (%)',
                    data: [],
                    backgroundColor: [],
                    borderColor: [],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                },
                layout: {
                    padding: {
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0
                    }
                }
            }
        });
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
                console.log(error);
                console.log("sending fake data");
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
                if (item.category == "YEAR") {
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
            this.chart.data.labels.push(item.year);
            this.chart.data.datasets[0].data.push(item.value.toFixed(4));
            this.chart.data.datasets[0].backgroundColor.push('rgba(54, 162, 235, 0.2)');
            this.chart.data.datasets[0].borderColor.push('rgba(54, 162, 235, 1)');
            this.chart.update();
        });
    }
}

let graph = new Graph();
graph.fetchData();