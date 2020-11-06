const fs = require('fs');
const cheerio = require('cheerio') //for html testing
const fetchMock = require('fetch-mock');

//include custom matchers
const styleMatchers = require('jest-style-matchers');
expect.extend(styleMatchers);

const htmlPath = __dirname + '/donate/donate.html';
const html = fs.readFileSync(htmlPath, 'utf-8'); //load the HTML file once
const jsPath = __dirname + '/donate/donate.js';

describe('Source code is valid', () => {
    test('Donate page validates without errors', async () => {
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
    test('Donate folder lints without errors', () => {
        if(fs.existsSync(__dirname+'/donate')) {
            const jsfiles = fs.readdirSync(__dirname+'/donate').filter((f) => f.endsWith('.js'));
            for(let f of jsfiles) {
                expect([__dirname +'/donate/'+f]).toHaveNoEsLintErrors();
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

//load JavaScript libraries separately
window.jQuery = window.$ = $; //make available to solution
let page;/// = require(jsPath); //load the solution

describe('Javascript Functions Properly', () => {

    beforeAll(() => {
        fetchMock.get('*', []);
        page = require(jsPath);
        page.pageContent = [
            {
                "imageUrl": "https://i.ibb.co/1dkTL91/kid-2696865-1920.jpg",
                "headingText": "This is ____",
                "paragraph": "___ is one of the kids on our organization benefitting from your donations.",
                "alt": "A photo of a smiling girl."
            },
            {
                "imageUrl": "https://i.ibb.co/5k1v1gP/kid-2679111-1920.jpg",
                "headingText": "Meet ____",
                "paragraph": "____ is learning how to type on a computer at our school in ___.",
                "alt": "A photo of a smiling girl."
            }
        ]
    })

    test('Current page content updates correctly.', async () => {
        fetchMock.restore(); //reset the mock
        fetchMock.getOnce('*', page.pageContent);
        await page.getPageContents();
        page.updateInformation();
        expect(page.pageContent[page.arrayPosition]['paragraph']).toEqual(page.currentPageContent.paragraph);
        expect(page.pageContent[page.arrayPosition]['headingText']).toEqual(page.currentPageContent.headingText);
        expect(page.pageContent[page.arrayPosition]['imageUrl']).toEqual(page.currentPageContent.imageUrl);
    })
})
