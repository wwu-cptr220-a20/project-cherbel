const fs = require('fs');
const cheerio = require('cheerio') //for html testing
const fetchMock = require('fetch-mock');
const inlineCss = require('inline-css'); //for css testing

//include custom matchers
const styleMatchers = require('jest-style-matchers');
expect.extend(styleMatchers);

const htmlPath = __dirname + '/our-projects.html';
const html = fs.readFileSync(htmlPath, 'utf-8'); //load the HTML file once
const cssPath = __dirname + '/our-projects.css';
const css = fs.readFileSync(cssPath, 'utf-8'); //load the HTML file once
const jsPath = __dirname + '/our-projects.js';
const chartPath = __dirname + '/chart.js/dist/Chart.js';
let $ = require('jquery');

//absolute path for relative loading (if needed)
const baseDir = 'file://'+__dirname+'/';

describe('Source code is valid', () => {
    test('Our-projects page validates without errors', async () => {
        const lintOpts = {
            'attr-bans':['align', 'background', 'bgcolor', 'border', 'frameborder', 'marginwidth', 'marginheight', 'scrolling', 'style', 'width', 'height'], //adding height, allow longdesc
            'tag-bans':['style','b'], //<i> allowed for font-awesome
            'doctype-first':true,
            'doctype-html5':true,
            'html-req-lang':true,
            'attr-name-style': false, //for meta tags
            'line-end-style':false, //either way
            'indent-style':false, //can mix/match
            'indent-width':false, //don't need to beautify
            'id-class-style':false, //I like dashes in classnames
            'img-req-alt':true
        }

        const htmlfiles = fs.readdirSync(__dirname).filter((f) => f.endsWith('.pages'));
        for(let f of htmlfiles) {
            await expect(f).toHaveNoHtmlLintErrorsAsync(lintOpts);
        }
    })

    //Javascript Validation
    test('Our-Projects folder lints without errors', () => {
        if(fs.existsSync(__dirname+'/donate')) {
            const jsfiles = fs.readdirSync(__dirname+'/donate').filter((f) => f.endsWith('.js'));
            for(let f of jsfiles) {
                expect([__dirname +'/donate/'+f]).toHaveNoEsLintErrors();
            }
        }
    })
})

//HTML Validation
describe('Includes Required HTML Elements', () => {

    let $; //cheerio instance

    beforeAll(async () => {
      $ = cheerio.load(html);
    })
      
    it('should contain a head and body', () => {
        let bodyChildren = $('html').children();
        expect(bodyChildren.length).toEqual(2);
        expect(bodyChildren[0].tagName).toMatch('head'); //html's first child is head
        expect(bodyChildren[1].tagName).toMatch('body');  //html's second child is body
    })

    it('should contain nav and and footer inside Body', () => {
        let bodyChildren = $('body').children();
        let lastItem = bodyChildren.length - 1;
        expect(bodyChildren[0].tagName).toMatch('nav'); //body's first child is nav
        expect(bodyChildren[lastItem].tagName).toMatch('footer');  //body's last child is footer
    })

    it('should have 4 links in the nav bar', () => {
        let navLinks = $('.nav-link');
        expect(navLinks.length).toEqual(4);
        expect(navLinks[0].children[0].data).toEqual("Contact Us");
        expect(navLinks[1].children[0].data).toEqual("Donate");
        expect(navLinks[2].children[0].data).toEqual("Our Projects");
        expect(navLinks[3].children[0].data).toEqual("About Us");
    })

    it('should have 5 flex items in the footer', () => {
        let categories = $('.footer .flex-item');
        expect(categories.length).toEqual(5);
        expect(categories[0].children[1].children[0].data).toEqual("Give");
        expect(categories[1].children[1].children[0].data).toEqual("Learn More");
        expect(categories[2].children[1].children[0].data).toEqual("Follow Us");
        expect(categories[3].children[1].children[0].data).toEqual("Contact Us");
    })
})

// CSS Validation

describe('Includes required CSS styling', () => {

    beforeAll(async () => {
      //test CSS by inlining properties and then reading them from cheerio
      let inlined = await inlineCss(html, {extraCss: css, url:baseDir, removeLinkTags:false});
      $ = cheerio.load(inlined);
      // console.log(inlined);
    })
      
    it('should have proper padding around the graph container', () => {
        let graphContainer = $("#graph-container");
        expect(graphContainer.css('padding-left')).toEqual('10px');
        expect(graphContainer.css('padding-right')).toEqual('10px');
    })

    it('should have proper padding around the project info', () => {
        let projectInfo = $("#project-info");
        expect(projectInfo.css('padding-left')).toEqual('20px');
        expect(projectInfo.css('padding-right')).toEqual('20px');
    })
})

// JS Validation

// window.jQuery = window.$ = $; //make available to solution
let graph;
describe ('Graph functions as expected', () => {
    beforeAll(() => {
        fetchMock.get('*', []);
        fetch = jest.fn(() => Promise.resolve());
        let Chart = require(chartPath);
        $ = require('jquery'); //jQuery for convenience
        window.jQuery = window.$ = $; //make available to solution
        let solution = require(jsPath); //load the solution
        graph = new solution.Graph();
        graph.fetchData();
    })

    it('uses the proper url in the graph', () => {
        expect(graph.url).toEqual('https://cors-anywhere.herokuapp.com/https://apps.who.int/gho/athena/data/GHO/NUTRITION_WA_2.json?&filter=COUNTRY:ZWE;SEX:*');
    })

    it('uses blue bars', () => {
        expect(graph.chart.data.datasets[0].backgroundColor[0]).toEqual('rgba(54, 162, 235, 0.2)');
    })

    it('uses blue bar borders', () => {
        expect(graph.chart.data.datasets[0].borderColor[0]).toEqual('rgba(54, 162, 235, 1)');
    })

    it('has the first year as 1987', () => {
        expect(graph.chart.data.labels[0]).toEqual('1987');
    })
})
