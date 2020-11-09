const fs = require('fs');
const fetchMock = require('fetch-mock');
const jsPath = __dirname + '/contact-us/contact-us.js';
const cheerio = require('cheerio') //for html testing


//include custom matchers
const styleMatchers = require('jest-style-matchers');
expect.extend(styleMatchers);

const htmlPath = __dirname + '/contact-us/contact-us.html';
const html = fs.readFileSync(htmlPath, 'utf-8'); //load the HTML file once

describe('Source code is valid', () => {
    test('contact-us page validates without errors', async () => {
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
    test('contact-us folder lints without errors', () => {
        if(fs.existsSync(__dirname+'/contact-us')) {
            const jsfiles = fs.readdirSync(__dirname+'/contact-us').filter((f) => f.endsWith('.js'));
            for(let f of jsfiles) {
                expect([__dirname +'/contact-us/'+f]).toHaveNoEsLintErrors();
            }
        }
    })
})

//HTML Validation
let $; //cheerio instance
beforeAll(() => {
    $ = cheerio.load(html);
});

describe('Includes Required HTML Elements', () => {
    test('HTML contains head, and body', () => {
        let bodyChildren = $('html').children();
        expect(bodyChildren.length).toEqual(2);
        expect(bodyChildren[0].tagName).toMatch('head'); //html's first child is head
        expect(bodyChildren[1].tagName).toMatch('body');  //html's second child is body
    })

    test('Body contains nav, and footer', () => {
        let bodyChildren = $('body').children();
        let lastItem = bodyChildren.length - 1;
        expect(bodyChildren[0].tagName).toMatch('nav'); //body's first child is nav
        expect(bodyChildren[lastItem].tagName).toMatch('footer');  //body's last child is footer
    })
})


window.jQuery = window.$ = $;

let page = require(jsPath);

describe('javascript functions for contact-us',() => {

    test ('gets an image', () => {
        page.getPhoto();
        expect(page.currentPageContent.img ).toEqual(page.images[x].img);
        expect(page.currentPageContent.alt).toEqual(page.images[x].alt);
    })

    test ('gets new advice',  () => {
        expect(page.currentPageContent.advice).notToBe(null);
    })
});
