const fs = require('fs');

//include custom matchers
const styleMatchers = require('jest-style-matchers');
expect.extend(styleMatchers);

describe('Source code is valid', () => {
  test('HTML validates without errors', async () => {
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

  //CSS validation
  test('CSS in CSS Folder validates without errors', async () => {
    await expect('css/*.css').toHaveNoCssLintErrorsAsync(); //test all files in css folder
  })
  test('CSS in About Us folder validates without errors', async () => {
    await expect('src/pages/about-us/*.css').toHaveNoCssLintErrorsAsync(); //test all files in css folder
  })
  test('CSS in Contact Us folder validates without errors', async () => {
    await expect('src/pages/contact-us/*.css').toHaveNoCssLintErrorsAsync(); //test all files in css folder
  })
  test('CSS in Donate folder validates without errors', async () => {
    await expect('src/pages/donate/*.css').toHaveNoCssLintErrorsAsync(); //test all files in css folder
  })
  test('CSS in Our Projects Folder validates without errors', async () => {
    await expect('src/pages/our-projects/*.css').toHaveNoCssLintErrorsAsync(); //test all files in css folder
  })

  //Javascript Validation
  test('JS folder lints without errors', () => {
    if(fs.existsSync(__dirname+'/src/js')) {
      const jsfiles = fs.readdirSync(__dirname+'/src/js').filter((f) => f.endsWith('.js'));

      for(let f of jsfiles) {
        expect([__dirname +'/src/js/'+f]).toHaveNoEsLintErrors();
      }
    }
  })
});
