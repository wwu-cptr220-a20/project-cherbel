const fs = require('fs');
const cheerio = require('cheerio') //for html testing

//include custom matchers
const styleMatchers = require('jest-style-matchers');
expect.extend(styleMatchers);

const htmlPath = __dirname + '/about-us/about-us.html';
const html = fs.readFileSync(htmlPath, 'utf-8'); 

describe('Source code is valid', () => {
    test('about-us validates without errors', async () => {
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

        await expect(__dirname + '/about-us/about-us.html').toHaveNoHtmlLintErrorsAsync(lintOpts);
    })
  });

//HTML Validation
let $; //cheerio instance
beforeAll(() => {
    $ = cheerio.load(html);
});

describe('Includes Required HTML Elements', () => {
    test('about-us contains head, and body', () => {
        let bodyChildren = $('html').children();
        expect(bodyChildren.length).toEqual(2);
        expect(bodyChildren[0].tagName).toMatch('head'); //html's first child is head
        expect(bodyChildren[1].tagName).toMatch('body');  //html's second child is body
    })

    test('Body contains nav, and footer', () => {
        let bodyChildren = $('body').children();
        let lastItem = bodyChildren.length - 1;
        expect(bodyChildren[0].tagName).toMatch('nav'); //body's first child is nav
        expect(bodyChildren[lastItem].tagName).toMatch('script');  //body's last child is footer
    })
})
