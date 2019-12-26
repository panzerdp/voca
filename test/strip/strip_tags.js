import v from '../voca';

describe('stripTags', function() {
  it('should strip tags', function() {
    expect(v.stripTags('<b>Hello world!</b>')).toBe('Hello world!');
    expect(v.stripTags('<span class="italic">Hello world!</span>')).toBe(
      'Hello world!'
    );
    expect(v.stripTags('<span class="<italic>">Hello world!</span>')).toBe(
      'Hello world!'
    );
    expect(v.stripTags('<span class="italic"><b>Hello world!</b></span>')).toBe(
      'Hello world!'
    );
    expect(v.stripTags('<html>hello</html>')).toBe('hello');
    expect(v.stripTags('<script language="PHP"> echo hello </script>')).toBe(
      ' echo hello '
    );
    expect(v.stripTags('<html><b>hello</b><p>world</p></html>')).toBe(
      'helloworld'
    );
  });

  it('should strip potential xss tags', function() {
    /**
     * @see https://www.owasp.org/index.php/XSS_Filter_Evasion_Cheat_Sheet
     */
    expect(v.stripTags('<script>evil();</script>')).toBe('evil();');
    expect(v.stripTags('<SCRIPT SRC=http://xss.rocks/xss.js></SCRIPT>')).toBe(
      ''
    );
    expect(v.stripTags('<IMG """><SCRIPT>alert("XSS")</SCRIPT>">')).toBe('');
    expect(
      v.stripTags('<SCRIPT/XSS SRC="http://xss.rocks/xss.js"></SCRIPT>')
    ).toBe('');
    expect(
      v.stripTags('<BODY onload!#$%&()*~+-_.,:;?@[/|]^`=alert("XSS")>')
    ).toBe('');
    expect(v.stripTags('<SCRIPT/SRC="http://xss.rocks/xss.js"></SCRIPT>')).toBe(
      ''
    );
    expect(v.stripTags('<<SCRIPT>alert("XSS");//<</SCRIPT>')).toBe('');
    expect(v.stripTags('<SCRIPT SRC=http://xss.rocks/xss.js?< B >')).toBe('');
    expect(v.stripTags('<SCRIPT SRC=//xss.rocks/.j>')).toBe('');
    expect(v.stripTags('<IMG SRC="javascript:alert(\'XSS\')"')).toBe('');
    expect(
      v.stripTags('<SCRIPT a=">" SRC="httx://xss.rocks/xss.js"></SCRIPT>')
    ).toBe('');
    expect(
      v.stripTags('<SCRIPT =">" SRC="httx://xss.rocks/xss.js"></SCRIPT>')
    ).toBe('');
    expect(
      v.stripTags('<SCRIPT a=">" \'\' SRC="httx://xss.rocks/xss.js"></SCRIPT>')
    ).toBe('');
    expect(
      v.stripTags('<SCRIPT "a=\'>\'" SRC="httx://xss.rocks/xss.js"></SCRIPT>')
    ).toBe('');
    expect(
      v.stripTags('<SCRIPT a=`>` SRC="httx://xss.rocks/xss.js"></SCRIPT>')
    ).toBe('` SRC="httx://xss.rocks/xss.js">');
    expect(
      v.stripTags('<SCRIPT a=">\'>" SRC="httx://xss.rocks/xss.js"></SCRIPT>')
    ).toBe('');
    expect(
      v.stripTags(
        '<SCRIPT>document.write("<SCRI");</SCRIPT>PT SRC="httx://xss.rocks/xss.js"></SCRIPT>'
      )
    ).toBe('document.write("');
  });

  it('should strip tags which attributes contain < or > ', function() {
    const helloWorld = 'hello  world';
    expect(v.stripTags('hello <img title="<"> world')).toBe(helloWorld);
    expect(v.stripTags('hello <img title=">"> world')).toBe(helloWorld);
    expect(v.stripTags('hello <img title=">_<"> world')).toBe(helloWorld);
    expect(v.stripTags("hello <img title='>_<'> world")).toBe(helloWorld);
    expect(v.stripTags('hello <img title="foo \'bar\'"> world')).toBe(
      helloWorld
    );
  });

  it('should strip tags on multiple lines', function() {
    const multilineHtml =
      "<html>This's a string with quotes:</html>\n\"strings in double quote\";\n'strings in single quote';\n<html>thisline is single quoted /withslashes </html>";
    expect(v.stripTags(multilineHtml, '<html>')).toBe(multilineHtml);
  });

  it('should strip comments and doctype', function() {
    expect(v.stripTags('<html><!-- COMMENT --></html>')).toBe('');
    expect(
      v.stripTags('<b>Hello world!</b><!-- Just some information -->')
    ).toBe('Hello world!');
    expect(
      v.stripTags(
        '<span class="italic">Hello world!<!-- Just some information --></span>'
      )
    ).toBe('Hello world!');
    expect(
      v.stripTags(
        '<!-- Small<>comment --><span class="italic"><!-- Just some information --><b>Hello world!</b></span>'
      )
    ).toBe('Hello world!');
    expect(
      v.stripTags(
        '<!doctype html><span class="italic"><!-- Just some information --><b>Hello world!</b></span>'
      )
    ).toBe('Hello world!');
  });

  it('should not strip allowable tags', function() {
    expect(v.stripTags('<b>Hello world!</b>', ['b'])).toBe(
      '<b>Hello world!</b>'
    );
    expect(v.stripTags('<b class="red">Hello world!</b>', ['b'])).toBe(
      '<b class="red">Hello world!</b>'
    );
    expect(
      v.stripTags('<b class="red">Hello</b> <span>world!</span>', '<b><a>')
    ).toBe('<b class="red">Hello</b> world!');
    const helloWorldHtml =
      '<html><p>hello</p><b>world</b><a href="#fragment">Other text</a></html>';
    expect(v.stripTags(helloWorldHtml, '<html>')).toBe(
      '<html>helloworldOther text</html>'
    );
    expect(v.stripTags(helloWorldHtml, ['p'])).toBe(
      '<p>hello</p>worldOther text'
    );
    expect(v.stripTags(helloWorldHtml, '<a>')).toBe(
      'helloworld<a href="#fragment">Other text</a>'
    );
    expect(v.stripTags(helloWorldHtml, ['html', 'p', 'a', 'b'])).toBe(
      helloWorldHtml
    );
  });

  it('should not modify a string without tags', function() {
    expect(v.stripTags('Hello world!')).toBe('Hello world!');
    expect(v.stripTags('  ')).toBe('  ');
    expect(v.stripTags('')).toBe('');
  });

  it('should add instead of stripped tags a special string', function() {
    expect(
      v.stripTags(
        '<li><b><a href="#" title="Title">Recently improved articles</a></b></li>',
        '',
        '*'
      )
    ).toBe('***Recently improved articles***');
    expect(v.stripTags('<b>Hello</b><i>World</i>', '<a>', ' ')).toBe(
      ' Hello  World '
    );
    expect(v.stripTags('Line<br/>break', ['i'], ' ')).toBe('Line break');
  });

  it('should treat especially broken or invalid tags', function() {
    expect(v.stripTags('< html >')).toBe('< html >');
    expect(v.stripTags('<<>>')).toBe('');
    const allowableTags = '<p><a><html>';
    expect(v.stripTags('<<htmL>>hello<</htmL>>', allowableTags)).toBe(
      '<htmL>hello</htmL>'
    );
    expect(v.stripTags('<a.>HtMl text</.a>', allowableTags)).toBe('HtMl text');
    expect(
      v.stripTags(
        '<nnn>I am a quoted (") string with special chars like $,!,@,%,&</nnn>',
        allowableTags
      )
    ).toBe('I am a quoted (") string with special chars like $,!,@,%,&');
    expect(
      v.stripTags(
        '<abc>hello</abc> \t\tworld... <ppp>strip_tags_test</ppp>',
        allowableTags
      )
    ).toBe('hello \t\tworld... strip_tags_test');
  });

  it('should strip tags from a string representation of an object', function() {
    expect(v.stripTags('<a href="#">Hello</a>')).toBe('Hello');
    expect(
      v.stripTags(
        {
          toString: function() {
            return '<a href="#">Hello</a>';
          }
        },
        '<a>'
      )
    ).toBe('<a href="#">Hello</a>');
  });

  it('should return empty string for null or undefined', function() {
    expect(v.stripTags(null)).toBe('');
    expect(v.stripTags(null, null)).toBe('');
    expect(v.stripTags(undefined)).toBe('');
    expect(v.stripTags(undefined, '<a>')).toBe('');
    expect(v.stripTags(undefined, undefined)).toBe('');
  });
});
