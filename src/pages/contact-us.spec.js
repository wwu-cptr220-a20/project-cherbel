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
//cheerio instance
beforeAll(() => {
   let $ = cheerio.load(html);
});

describe('Includes Required HTML Elements', () => {
    test('HTML contains head, and body', () => {
        let bodyChildren = $('html').children();
        expect(bodyChildren.length).toEqual(2);
        expect(bodyChildren[0].tagName).toMatch('HEAD'); //html's first child is head
        expect(bodyChildren[1].tagName).toMatch('BODY');  //html's second child is body
    })
})

const $ = require('jquery');
window.jQuery = window.$ = $;
let page; // = require(jsPath);

describe('javascript functions for contact-us',() => {

    beforeAll(() => {
        fetchMock.get('*', []); //starting mock for any initial loads
        page = require(jsPath); //load the solution -- needs to be in here for some reason
      })

    //   fetchMock.restore(); //reset the mock
    //   fetchMock.getOnce('*', );

    test ('gets an image', () => {
        page.getPhoto();
        try {
            expect(page.currentPageContent.img ).toEqual(page.images[0].img);
            expect(page.currentPageContent.alt).toEqual(page.images[0].alt);
          }
          catch{
            try {
                expect(page.currentPageContent.img ).toEqual(page.images[1].img);
                expect(page.currentPageContent.alt).toEqual(page.images[1].alt);
            }
            catch{
                expect(page.currentPageContent.img ).toEqual(page.images[2].img);
                expect(page.currentPageContent.alt).toEqual(page.images[2].alt);
            }
          }
    })

    test ('gets new advice',  () => {
        page.getNewAdvice();
        expect(page.currentPageContent.advice).not.toBe(null);
    })
});
