import { expect } from 'chai';
import v from '../voca';

describe('stripTags', function() {

  it('should strip tags', function() {
    expect(v.stripTags('<b>Hello world!</b>')).to.be.equal('Hello world!');
    expect(v.stripTags('<span class="italic">Hello world!</span>')).to.be.equal('Hello world!');
    expect(v.stripTags('<span class="<italic>">Hello world!</span>')).to.be.equal('Hello world!');
    expect(v.stripTags('<span class="italic"><b>Hello world!</b></span>')).to.be.equal('Hello world!');
    expect(v.stripTags('<html>hello</html>')).to.be.equal('hello');
    expect(v.stripTags('<script language=\"PHP\"> echo hello </script>')).to.be.equal(' echo hello ');
    expect(v.stripTags('<html><b>hello</b><p>world</p></html>')).to.be.equal('helloworld');
  });

  it('should strip potential xss tags', function() {
    /**
     * @see https://www.owasp.org/index.php/XSS_Filter_Evasion_Cheat_Sheet
     */
    expect(v.stripTags('<script>evil();</script>')).to.be.equal('evil();');
    expect(v.stripTags('<SCRIPT SRC=http://xss.rocks/xss.js></SCRIPT>')).to.be.equal('');
    expect(v.stripTags('<IMG """><SCRIPT>alert("XSS")</SCRIPT>">')).to.be.equal('');
    expect(v.stripTags('<SCRIPT/XSS SRC="http://xss.rocks/xss.js"></SCRIPT>')).to.be.equal('');
    expect(v.stripTags('<BODY onload!#$%&()*~+-_.,:;?@[/|\]^`=alert("XSS")>')).to.be.equal('');
    expect(v.stripTags('<SCRIPT/SRC="http://xss.rocks/xss.js"></SCRIPT>')).to.be.equal('');
    expect(v.stripTags('<<SCRIPT>alert("XSS");//<</SCRIPT>')).to.be.equal('');
    expect(v.stripTags('<SCRIPT SRC=http://xss.rocks/xss.js?< B >')).to.be.equal('');
    expect(v.stripTags('<SCRIPT SRC=//xss.rocks/.j>')).to.be.equal('');
    expect(v.stripTags('<IMG SRC="javascript:alert(\'XSS\')"')).to.be.equal('');
    expect(v.stripTags('<SCRIPT a=">" SRC="httx://xss.rocks/xss.js"></SCRIPT>')).to.be.equal('');
    expect(v.stripTags('<SCRIPT =">" SRC="httx://xss.rocks/xss.js"></SCRIPT>')).to.be.equal('');
    expect(v.stripTags('<SCRIPT a=">" \'\' SRC="httx://xss.rocks/xss.js"></SCRIPT>')).to.be.equal('');
    expect(v.stripTags('<SCRIPT "a=\'>\'" SRC="httx://xss.rocks/xss.js"></SCRIPT>')).to.be.equal('');
    expect(v.stripTags('<SCRIPT a=`>` SRC="httx://xss.rocks/xss.js"></SCRIPT>')).to.be.equal('` SRC="httx://xss.rocks/xss.js">');
    expect(v.stripTags('<SCRIPT a=">\'>" SRC="httx://xss.rocks/xss.js"></SCRIPT>')).to.be.equal('');
    expect(v.stripTags('<SCRIPT>document.write("<SCRI");</SCRIPT>PT SRC="httx://xss.rocks/xss.js"></SCRIPT>')).to.be.equal('document.write("');
  });

  it('should strip tags which attributes contain < or > ', function() {
    const helloWorld = 'hello  world';
    expect(v.stripTags('hello <img title="<"> world')).to.be.equal(helloWorld);
    expect(v.stripTags('hello <img title=">"> world')).to.be.equal(helloWorld);
    expect(v.stripTags('hello <img title=">_<"> world')).to.be.equal(helloWorld);
    expect(v.stripTags("hello <img title='>_<'> world")).to.be.equal(helloWorld);
    expect(v.stripTags("hello <img title=\"foo 'bar'\"> world")).to.be.equal(helloWorld);
  });

  it('should strip tags on multiple lines', function() {
    const multilineHtml = '<html>This\'s a string with quotes:</html>\n"strings in double quote";\n\'strings in single quote\';\n<html>this\line is single quoted /with\slashes </html>';
    expect(v.stripTags(multilineHtml, '<html>')).to.be.equal(multilineHtml);
  });

  it('should strip comments and doctype', function() {
    expect(v.stripTags('<html><!-- COMMENT --></html>')).to.be.equal('');
    expect(v.stripTags('<b>Hello world!</b><!-- Just some information -->')).to.be.equal('Hello world!');
    expect(v.stripTags('<span class="italic">Hello world!<!-- Just some information --></span>')).to.be.equal('Hello world!');
    expect(v.stripTags('<!-- Small<>comment --><span class="italic"><!-- Just some information --><b>Hello world!</b></span>'))
      .to.be.equal('Hello world!');
    expect(v.stripTags('<!doctype html><span class="italic"><!-- Just some information --><b>Hello world!</b></span>'))
      .to.be.equal('Hello world!');
  });

  it('should not strip allowable tags', function() {
    expect(v.stripTags('<b>Hello world!</b>', ['b'])).to.be.equal('<b>Hello world!</b>');
    expect(v.stripTags('<b class="red">Hello world!</b>', ['b'])).to.be.equal('<b class="red">Hello world!</b>');
    expect(v.stripTags('<b class="red">Hello</b> <span>world!</span>', '<b><a>')).to.be.equal('<b class="red">Hello</b> world!');
    const helloWorldHtml = '<html><p>hello</p><b>world</b><a href="#fragment">Other text</a></html>';
    expect(v.stripTags(helloWorldHtml, '<html>')).to.be.equal('<html>helloworldOther text</html>');
    expect(v.stripTags(helloWorldHtml, ['p'])).to.be.equal('<p>hello</p>worldOther text');
    expect(v.stripTags(helloWorldHtml, '<a>')).to.be.equal('helloworld<a href="#fragment">Other text</a>');
    expect(v.stripTags(helloWorldHtml, ['html', 'p', 'a', 'b'])).to.be.equal(helloWorldHtml);
  });

  it('should not modify a string without tags', function() {
    expect(v.stripTags('Hello world!')).to.be.equal('Hello world!');
    expect(v.stripTags('  ')).to.be.equal('  ');
    expect(v.stripTags('')).to.be.equal('');
  });

  it('should add instead of stripped tags a special string', function() {
    expect(v.stripTags('<li><b><a href="#" title="Title">Recently improved articles</a></b></li>', '', '*'))
      .to.be.equal('***Recently improved articles***');
    expect(v.stripTags('<b>Hello</b><i>World</i>', '<a>', ' ')).to.be.equal(' Hello  World ');
    expect(v.stripTags('Line<br/>break', ['i'], ' ')).to.be.equal('Line break');
  });

  it('should treat especially broken or invalid tags', function() {
    expect(v.stripTags('< html >')).to.be.equal('< html >');
    expect(v.stripTags('<<>>')).to.be.equal('');
    const allowableTags = '<p><a><html>';
    expect(v.stripTags('<<htmL>>hello<</htmL>>', allowableTags)).to.be.equal('<htmL>hello</htmL>');
    expect(v.stripTags('<a.>HtMl text</.a>', allowableTags)).to.be.equal('HtMl text');
    expect(v.stripTags('<nnn>I am a quoted (\") string with special chars like \$,\!,\@,\%,\&</nnn>', allowableTags))
      .to.be.equal('I am a quoted (\") string with special chars like \$,\!,\@,\%,\&');
    expect(v.stripTags('<abc>hello</abc> \t\tworld... <ppp>strip_tags_test</ppp>', allowableTags))
      .to.be.equal('hello \t\tworld... strip_tags_test');
  });

  it('should strip tags from a string representation of an object', function() {
    expect(v.stripTags('<a href="#">Hello</a>')).to.equal('Hello');
    expect(v.stripTags({
      toString: function() {
        return '<a href="#">Hello</a>';
      }
    }, '<a>')).to.equal('<a href="#">Hello</a>');
  });

  it('should return empty string for null or undefined', function() {
    expect(v.stripTags(null)).to.be.equal('');
    expect(v.stripTags(null, null)).to.be.equal('');
    expect(v.stripTags(undefined)).to.be.equal('');
    expect(v.stripTags(undefined, '<a>')).to.be.equal('');
    expect(v.stripTags(undefined, undefined)).to.be.equal('');
  });
});