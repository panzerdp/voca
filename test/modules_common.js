const expect = require('chai').expect;

describe('CommonJS modules', function() {

  // Case

  it('should require camelCase()', function() {
    const camelCase = require('../dist_mod/camel_case');
    expect(camelCase('bird flight')).to.be.equal('birdFlight');
  });

  it('should require capitalize()', function() {
    const capitalize = require('../dist_mod/capitalize');
    expect(capitalize('macBook')).to.be.equal('MacBook');
  });

  it('should require decapitalize()', function() {
    const decapitalize = require('../dist_mod/decapitalize');
    expect(decapitalize('Sun')).to.be.equal('sun');
  });

  it('should require kebabCase()', function() {
    const kebabCase = require('../dist_mod/kebab_case');
    expect(kebabCase('BirdFlight')).to.be.equal('bird-flight');
  });

  it('should require lowerCase()', function() {
    const lowerCase = require('../dist_mod/lower_case');
    expect(lowerCase('EARTH')).to.be.equal('earth');
  });

  it('should require snakeCase()', function() {
    const snakeCase = require('../dist_mod/snake_case');
    expect(snakeCase('-BIRD-FLIGHT-')).to.be.equal('bird_flight');
  });

  it('should require swapCase()', function() {
    const swapCase = require('../dist_mod/swap_case');
    expect(swapCase('Bird Flight')).to.be.equal('bIRD fLIGHT');
  });

  it('should require titleCase()', function() {
    const titleCase = require('../dist_mod/title_case');
    expect(titleCase('BIRD FLIGHT')).to.be.equal('Bird Flight');
  });

  it('should require upperCase()', function() {
    const upperCase = require('../dist_mod/upper_case');
    expect(upperCase('Earth')).to.be.equal('EARTH');
  });

  // Chop

  it('should require charAt()', function() {
    const charAt = require('../dist_mod/char_at');
    expect(charAt('Good day', 7)).to.be.equal('y');
  });

  it('should require codePointAt()', function() {
    const codePointAt = require('../dist_mod/code_point_at');
    expect(codePointAt('cafe\u0301', 3)).to.equal(0x0065);
  });

  it('should require first()', function() {
    const first = require('../dist_mod/first');
    expect(first('Good day', 4)).to.be.equal('Good');
  });

  it('should require graphemeAt()', function() {
    const graphemeAt = require('../dist_mod/grapheme_at');
    expect(graphemeAt('man\u0303ana', 2)).to.equal('n\u0303');
  });

  it('should require last()', function() {
    const last = require('../dist_mod/last');
    expect(last('Good day', 4)).to.be.equal(' day');
  });

  it('should require prune()', function() {
    const prune = require('../dist_mod/prune');
    expect(prune('Little Red Riding Hood', 9, '...')).to.be.equal('Little...');
  });

  it('should require slice()', function() {
    const slice = require('../dist_mod/slice');
    expect(slice('infinite loop', 9)).to.be.equal('loop');
  });

  it('should require substr()', function() {
    const substr = require('../dist_mod/substr');
    expect(substr('infinite loop', 9)).to.be.equal('loop');
  });

  it('should require substring()', function() {
    const substring = require('../dist_mod/substring');
    expect(substring('infinite loop', 9)).to.be.equal('loop');
  });

  it('should require truncate()', function() {
    const truncate = require('../dist_mod/truncate');
    expect(truncate('I\'ll go this way and go you that', 19, ' (read more)')).to.be.equal('I\'ll go (read more)');
  });

  // Count

  it('should require count()', function() {
    const count = require('../dist_mod/count');
    expect(count('rainbow')).to.be.equal(7);
  });

  it('should require countGraphemes()', function() {
    const countGraphemes = require('../dist_mod/count_graphemes');
    expect(countGraphemes('\uD835\uDC00\uD835\uDC01')).to.be.equal(2);
  });

  it('should require countSubstrings()', function() {
    const countSubstrings = require('../dist_mod/count_substrings');
    expect(countSubstrings('Hey man where-where-where\'s your cup holder?', 'where')).to.be.equal(3);
  });

  it('should require countWhere()', function() {
    const countWhere = require('../dist_mod/count_where');
    expect(countWhere('****--**--**', function(character) {
      return character === '*';
    })).to.be.equal(8);
  });

  it('should require countWords()', function() {
    const countWords = require('../dist_mod/count_words');
    expect(countWords('Stand by me')).to.be.equal(3);
  });

  // Escape

  it('should require escapeHtml()', function() {
    const escapeHtml = require('../dist_mod/escape_html');
    expect(escapeHtml('<p>wonderful world</p>')).to.be.equal('&lt;p&gt;wonderful world&lt;/p&gt;');
  });

  it('should require escapeRegExp()', function() {
    const escapeRegExp = require('../dist_mod/escape_reg_exp');
    expect(escapeRegExp('500-200')).to.be.equal('500\\-200');
  });

  it('should require unescapeHtml()', function() {
    const unescapeHtml = require('../dist_mod/unescape_html');
    expect(unescapeHtml('&lt;p&gt;wonderful world&lt;/p&gt;')).to.be.equal('<p>wonderful world</p>');
  });

  // Format

  it('should require sprintf()', function() {
    const sprintf = require('../dist_mod/sprintf');
    expect(sprintf('Hello %5s!', 'World')).to.be.equal('Hello World!');
  });

  it('should require escapeRegExp()', function() {
    const vprintf = require('../dist_mod/vprintf');
    expect(vprintf('Hello %s!', ['World'])).to.be.equal('Hello World!');
  });

  // Index

  it('should require indexOf()', function() {
    const indexOf = require('../dist_mod/index_of');
    expect(indexOf('we have a mission', 'a')).to.be.equal(4);
  });

  it('should require lastIndexOf()', function() {
    const lastIndexOf = require('../dist_mod/last_index_of');
    expect(lastIndexOf('we have a mission', 'a')).to.be.equal(8);
  });

  it('should require search()', function() {
    const search = require('../dist_mod/search');
    expect(search('we have a mission', /\s/)).to.be.equal(2);
  });

  // Manipulate

  it('should require insert()', function() {
    const insert = require('../dist_mod/insert');
    expect(insert('autumn', ' is nice', 6)).to.be.equal('autumn is nice');
  });

  it('should require latinise()', function() {
    const latinise = require('../dist_mod/latinise');
    expect(latinise('književnošću čuvanje')).to.be.equal('knjizevnoscu cuvanje');
  });

  it('should require pad()', function() {
    const pad = require('../dist_mod/pad');
    expect(pad('FF', 4, '0')).to.be.equal('0FF0');
  });

  it('should require padLeft()', function() {
    const padLeft = require('../dist_mod/pad_left');
    expect(padLeft('FF', 4, '0')).to.be.equal('00FF');
  });

  it('should require padRight()', function() {
    const padRight = require('../dist_mod/pad_right');
    expect(padRight('FF', 4, '0')).to.be.equal('FF00');
  });

  it('should require repeat()', function() {
    const repeat = require('../dist_mod/repeat');
    expect(repeat('w', 3)).to.be.equal('www');
  });

  it('should require replace()', function() {
    const replace = require('../dist_mod/replace');
    expect(replace('duck', 'duck', 'swan')).to.be.equal('swan');
  });

  it('should require replaceAll()', function() {
    const replaceAll = require('../dist_mod/replace_all');
    expect(replaceAll('duck duck', 'duck', 'swan')).to.be.equal('swan swan');
  });

  it('should require reverse()', function() {
    const reverse = require('../dist_mod/reverse');
    expect(reverse('green tree')).to.be.equal('eert neerg');
  });

  it('should require reverseGrapheme()', function() {
    const reverseGrapheme = require('../dist_mod/reverse_grapheme');
    expect(reverseGrapheme('ma\xF1ana')).to.be.equal('ana\xF1am');
  });

  it('should require slugify()', function() {
    const slugify = require('../dist_mod/slugify');
    expect(slugify('San Diego Zoo Safari Park')).to.be.equal('san-diego-zoo-safari-park');
  });

  it('should require splice()', function() {
    const splice = require('../dist_mod/splice');
    expect(splice('sting like a bee', 6, 4, 'as')).to.be.equal('sting as a bee');
  });

  it('should require tr()', function() {
    const tr = require('../dist_mod/tr');
    expect(tr('Yes. The fire rises.', { Yes: 'Great' })).to.be.equal('Great. The fire rises.');
  });

  it('should require trim()', function() {
    const trim = require('../dist_mod/trim');
    expect(trim('   Yes. The fire rises.    ')).to.be.equal('Yes. The fire rises.');
  });

  it('should require trimLeft()', function() {
    const trimLeft = require('../dist_mod/trim_left');
    expect(trimLeft('   Yes. The fire rises.')).to.be.equal('Yes. The fire rises.');
  });

  it('should require trimRight()', function() {
    const trimRight = require('../dist_mod/trim_right');
    expect(trimRight('Yes. The fire rises.\n\f\t ')).to.be.equal('Yes. The fire rises.');
  });

  it('should require wordWrap()', function() {
    const wordWrap = require('../dist_mod/word_wrap');
    expect(wordWrap('Wonderful world', {
      width: 5
    })).to.be.equal('Wonderful\nworld');
  });

  // Query

  it('should require endsWith()', function() {
    const endsWith = require('../dist_mod/ends_with');
    expect(endsWith('Hello World!', 'World!')).to.be.true;
  });

  it('should require includes()', function() {
    const includes = require('../dist_mod/includes');
    expect(includes('mobile infantry', 'infantry')).to.be.true;
  });

  it('should require isAlpha()', function() {
    const isAlpha = require('../dist_mod/is_alpha');
    expect(isAlpha('HelloWorld')).to.be.true;
  });

  it('should require isAlphaDigit()', function() {
    const isAlphaDigit = require('../dist_mod/is_alpha_digit');
    expect(isAlphaDigit('JavaScript6')).to.be.true;
  });

  it('should require isBlank()', function() {
    const isBlank = require('../dist_mod/is_blank');
    expect(isBlank('Hello World!')).to.be.false;
  });

  it('should require isDigit()', function() {
    const isDigit = require('../dist_mod/is_digit');
    expect(isDigit('1000')).to.be.true;
  });

  it('should require isEmpty()', function() {
    const isEmpty = require('../dist_mod/is_empty');
    expect(isEmpty('')).to.be.true;
  });

  it('should require isLowerCase()', function() {
    const isLowerCase = require('../dist_mod/is_lower_case');
    expect(isLowerCase('welcometoearth')).to.be.true;
  });

  it('should require isNumeric()', function() {
    const isNumeric = require('../dist_mod/is_numeric');
    expect(isNumeric('-1000')).to.be.true;
  });

  it('should require isString()', function() {
    const isString = require('../dist_mod/is_string');
    expect(isString('Hello World!')).to.be.true;
  });

  it('should require isUpperCase()', function() {
    const isUpperCase = require('../dist_mod/is_upper_case');
    expect(isUpperCase('WELCOMETOEARTH')).to.be.true;
  });

  it('should require matches()', function() {
    const matches = require('../dist_mod/matches');
    expect(matches('pacific ocean', /^pacific ocean$/)).to.be.true;
  });

  it('should require startsWith()', function() {
    const startsWith = require('../dist_mod/starts_with');
    expect(startsWith('Hello World!', 'Hello')).to.be.true;
  });

  // Split

  it('should require chars()', function() {
    const chars = require('../dist_mod/chars');
    expect(chars('stellar bomb')).to.eql(['s', 't', 'e', 'l', 'l', 'a', 'r', ' ', 'b', 'o', 'm', 'b']);
  });

  it('should require codePoints()', function() {
    const codePoints = require('../dist_mod/code_points');
    expect(codePoints('stellar bomb')).to.eql([0x73, 0x74, 0x65, 0x6C, 0x6C, 0x61, 0x72, 0x20, 0x62, 0x6F, 0x6D, 0x62]);
  });

  it('should require graphemes()', function() {
    const graphemes = require('../dist_mod/graphemes');
    expect(graphemes('man\u0303ana')).to.eql(['m', 'a', 'n\u0303', 'a', 'n', 'a']);
  });

  it('should require split()', function() {
    const split = require('../dist_mod/split');
    expect(split('dying star', /\s/)).to.eql(['dying', 'star']);
  });

  it('should require words()', function() {
    const words = require('../dist_mod/words');
    expect(words('*gravity***can****cross&&dimensions++')).to.eql(['gravity', 'can', 'cross', 'dimensions']);
  });

  // Strip

  it('should require stripBom()', function() {
    const stripBom = require('../dist_mod/strip_bom');
    expect(stripBom('\uFEFFHello world!')).to.equal('Hello world!');
  });

  it('should require stripTags()', function() {
    const stripTags = require('../dist_mod/strip_tags');
    expect(stripTags('<b>Welcome</b>')).to.equal('Welcome');
  });

  // Util

  it('should require version()', function() {
    const version = require('../dist_mod/version');
    expect(version).to.be.a('string');
  });

  // Entire library

  it('should require the entire library', function() {
    const v = require('../dist_mod/index');
    expect(v.sprintf('%d yellow %s', 5, 'apples')).to.be.equal('5 yellow apples');
  });

});