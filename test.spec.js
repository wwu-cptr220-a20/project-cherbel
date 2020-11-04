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
  test('Folder CSS validates without errors', async () => {
    await expect('css/*.css').toHaveNoCssLintErrorsAsync(); //test all files in css folder
  })
  test('About Us CSS validates without errors', async () => {
    await expect('pages/about-us/*.css').toHaveNoCssLintErrorsAsync(); //test all css files in about us folder
  })
  test('Contact Us CSS validates without errors', async () => {
    await expect('pages/contact-us/*.css').toHaveNoCssLintErrorsAsync(); //test all files in Contact Us folder
  })
  test('Dontate CSS validates without errors', async () => {
    await expect('pages/donate/*.css').toHaveNoCssLintErrorsAsync(); //test all files in donate folder
  })
  test('Our Projects CSS validates without errors', async () => {
    await expect('pages/our-projects/*.css').toHaveNoCssLintErrorsAsync(); //test all files in donate folder
  })

  //Javascript Validation
  test('JavaScript folder lints without errors', () => {
    if(fs.existsSync(__dirname+'/js')) {
      const jsfiles = fs.readdirSync(__dirname+'/js').filter((f) => f.endsWith('.js'));

      for(let f of jsfiles) {
        console.log(f);
        expect([__dirname +'/js'+f]).toHaveNoEsLintErrors();
      }
    }
  })
  test('About Us JavaScript lints without errors', () => {
    if(fs.existsSync(__dirname+'/pages/about-us')) {
      const jsfiles = fs.readdirSync(__dirname+'/pages/about-us').filter((f) => f.endsWith('.js'));

      for(let f of jsfiles) {
        expect(['pages/about-us/'+f]).toHaveNoEsLintErrors();
      }
    }
  })
  test('Contact Us JavaScript lints without errors', () => {
    if(fs.existsSync(__dirname+'/pages/contact-us')) {
      const jsfiles = fs.readdirSync(__dirname+'/pages/contact-us').filter((f) => f.endsWith('.js'));

      for(let f of jsfiles) {
        expect(['pages/contact-us/'+f]).toHaveNoEsLintErrors();
      }
    }
  })
  test('Donate JavaScript lints without errors', () => {
    if(fs.existsSync(__dirname+'/pages/donate')) {
      const jsfiles = fs.readdirSync(__dirname+'/pages/donate').filter((f) => f.endsWith('.js'));

      for(let f of jsfiles) {
        expect(['pages/donate/'+f]).toHaveNoEsLintErrors();
      }
    }
  })
  test('Our Projects JavaScript lints without errors', () => {
    if(fs.existsSync(__dirname+'/pages/our-projects')) {
      const jsfiles = fs.readdirSync(__dirname+'/pages/our-projects').filter((f) => f.endsWith('.js'));

      for(let f of jsfiles) {
        expect(['pages/our-projects/'+f]).toHaveNoEsLintErrors();
      }
    }
  })
});
