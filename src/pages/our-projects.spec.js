const fs = require('fs');
const cheerio = require('cheerio') //for html testing
const fetchMock = require('fetch-mock');

//include custom matchers
const styleMatchers = require('jest-style-matchers');
expect.extend(styleMatchers);

const htmlPath = __dirname + '/our-projects/our-projects.html';
const html = fs.readFileSync(htmlPath, 'utf-8'); //load the HTML file once
const jsPath = __dirname + '/our-projects/our-projects.js';

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
})