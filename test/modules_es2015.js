/* eslint sort-imports: "off" */
import { expect } from 'chai';

// Case

import camelCase from '../dist_mod/camel_case';
import capitalize from '../dist_mod/capitalize';
import decapitalize from '../dist_mod/decapitalize';
import kebabCase from '../dist_mod/kebab_case';
import lowerCase from '../dist_mod/lower_case';
import snakeCase from '../dist_mod/snake_case';
import swapCase from '../dist_mod/swap_case';
import titleCase from '../dist_mod/title_case';
import upperCase from '../dist_mod/upper_case';

// Chop

import charAt from '../dist_mod/char_at';
import codePointAt from '../dist_mod/code_point_at';
import first from '../dist_mod/first';
import graphemeAt from '../dist_mod/grapheme_at';
import last from '../dist_mod/last';
import prune from '../dist_mod/prune';
import slice from '../dist_mod/slice';
import substr from '../dist_mod/substr';
import substring from '../dist_mod/substring';
import truncate from '../dist_mod/truncate';

// Count

import count from '../dist_mod/count';
import countGraphemes from '../dist_mod/count_graphemes';
import countSubstrings from '../dist_mod/count_substrings';
import countWhere from '../dist_mod/count_where';
import countWords from '../dist_mod/count_words';

// Escape

import escapeHtml from '../dist_mod/escape_html';
import escapeRegExp from '../dist_mod/escape_reg_exp';
import unescapeHtml from '../dist_mod/unescape_html';

// Format

import sprintf from '../dist_mod/sprintf';
import vprintf from '../dist_mod/vprintf';

// Index

import indexOf from '../dist_mod/index_of';
import lastIndexOf from '../dist_mod/last_index_of';
import search from '../dist_mod/search';

// Manipulate

import insert from '../dist_mod/insert';
import latinise from '../dist_mod/latinise';
import pad from '../dist_mod/pad';
import padLeft from '../dist_mod/pad_left';
import padRight from '../dist_mod/pad_right';
import repeat from '../dist_mod/repeat';
import replace from '../dist_mod/replace';
import replaceAll from '../dist_mod/replace_all';
import reverse from '../dist_mod/reverse';
import reverseGrapheme from '../dist_mod/reverse_grapheme';
import slugify from '../dist_mod/slugify';
import splice from '../dist_mod/splice';
import tr from '../dist_mod/tr';
import trim from '../dist_mod/trim';
import trimLeft from '../dist_mod/trim_left';
import trimRight from '../dist_mod/trim_right';
import wordWrap from '../dist_mod/word_wrap';

// Query

import endsWith from '../dist_mod/ends_with';
import includes from '../dist_mod/includes';
import isAlpha from '../dist_mod/is_alpha';
import isAlphaDigit from '../dist_mod/is_alpha_digit';
import isBlank from '../dist_mod/is_blank';
import isDigit from '../dist_mod/is_digit';
import isEmpty from '../dist_mod/is_empty';
import isLowerCase from '../dist_mod/is_lower_case';
import isNumeric from '../dist_mod/is_numeric';
import isString from '../dist_mod/is_string';
import isUpperCase from '../dist_mod/is_upper_case';
import matches from '../dist_mod/matches';
import startsWith from '../dist_mod/starts_with';

// Split

import chars from '../dist_mod/chars';
import codePoints from '../dist_mod/code_points';
import graphemes from '../dist_mod/graphemes';
import split from '../dist_mod/split';
import words from '../dist_mod/words';

// Strip

import stripBom from '../dist_mod/strip_bom';
import stripTags from '../dist_mod/strip_tags';

// Util

import version from '../dist_mod/version';

// Entire library

import v from '../dist_mod/index.es2015';

describe('CommonJS modules', function() {

  // Case

  it('should require camelCase()', function() {
    expect(camelCase('bird flight')).to.be.equal('birdFlight');
  });

  it('should require capitalize()', function() {
    expect(capitalize('macBook')).to.be.equal('MacBook');
  });

  it('should require decapitalize()', function() {
    expect(decapitalize('Sun')).to.be.equal('sun');
  });

  it('should require kebabCase()', function() {
    expect(kebabCase('BirdFlight')).to.be.equal('bird-flight');
  });

  it('should require lowerCase()', function() {
    expect(lowerCase('EARTH')).to.be.equal('earth');
  });

  it('should require snakeCase()', function() {
    expect(snakeCase('-BIRD-FLIGHT-')).to.be.equal('bird_flight');
  });

  it('should require swapCase()', function() {
    expect(swapCase('Bird Flight')).to.be.equal('bIRD fLIGHT');
  });

  it('should require titleCase()', function() {
    expect(titleCase('BIRD FLIGHT')).to.be.equal('Bird Flight');
  });

  it('should require upperCase()', function() {
    expect(upperCase('Earth')).to.be.equal('EARTH');
  });

  // Chop

  it('should require charAt()', function() {
    expect(charAt('Good day', 7)).to.be.equal('y');
  });

  it('should require codePointAt()', function() {
    expect(codePointAt('cafe\u0301', 3)).to.equal(0x0065);
  });

  it('should require first()', function() {
    expect(first('Good day', 4)).to.be.equal('Good');
  });

  it('should require graphemeAt()', function() {
    expect(graphemeAt('man\u0303ana', 2)).to.equal('n\u0303');
  });

  it('should require last()', function() {
    expect(last('Good day', 4)).to.be.equal(' day');
  });

  it('should require prune()', function() {
    expect(prune('Little Red Riding Hood', 9, '...')).to.be.equal('Little...');
  });

  it('should require slice()', function() {
    expect(slice('infinite loop', 9)).to.be.equal('loop');
  });

  it('should require substr()', function() {
    expect(substr('infinite loop', 9)).to.be.equal('loop');
  });

  it('should require substring()', function() {
    expect(substring('infinite loop', 9)).to.be.equal('loop');
  });

  it('should require truncate()', function() {
    expect(truncate('I\'ll go this way and go you that', 19, ' (read more)')).to.be.equal('I\'ll go (read more)');
  });

  // Count

  it('should require count()', function() {
    expect(count('rainbow')).to.be.equal(7);
  });

  it('should require countGraphemes()', function() {
    expect(countGraphemes('\uD835\uDC00\uD835\uDC01')).to.be.equal(2);
  });

  it('should require countSubstrings()', function() {
    expect(countSubstrings('Hey man where-where-where\'s your cup holder?', 'where')).to.be.equal(3);
  });

  it('should require countWhere()', function() {
    expect(countWhere('****--**--**', function(character) {
      return character === '*';
    })).to.be.equal(8);
  });

  it('should require countWords()', function() {
    expect(countWords('Stand by me')).to.be.equal(3);
  });

  // Escape

  it('should require escapeHtml()', function() {
    expect(escapeHtml('<p>wonderful world</p>')).to.be.equal('&lt;p&gt;wonderful world&lt;/p&gt;');
  });

  it('should require escapeRegExp()', function() {
    expect(escapeRegExp('500-200')).to.be.equal('500\\-200');
  });

  it('should require unescapeHtml()', function() {
    expect(unescapeHtml('&lt;p&gt;wonderful world&lt;/p&gt;')).to.be.equal('<p>wonderful world</p>');
  });

  // Format

  it('should require sprintf()', function() {
    expect(sprintf('Hello %5s!', 'World')).to.be.equal('Hello World!');
  });

  it('should require escapeRegExp()', function() {
    expect(vprintf('Hello %s!', ['World'])).to.be.equal('Hello World!');
  });

  // Index

  it('should require indexOf()', function() {
    expect(indexOf('we have a mission', 'a')).to.be.equal(4);
  });

  it('should require lastIndexOf()', function() {
    expect(lastIndexOf('we have a mission', 'a')).to.be.equal(8);
  });

  it('should require search()', function() {
    expect(search('we have a mission', /\s/)).to.be.equal(2);
  });

  // Manipulate

  it('should require insert()', function() {
    expect(insert('autumn', ' is nice', 6)).to.be.equal('autumn is nice');
  });

  it('should require latinise()', function() {
    expect(latinise('književnošću čuvanje')).to.be.equal('knjizevnoscu cuvanje');
  });

  it('should require pad()', function() {
    expect(pad('FF', 4, '0')).to.be.equal('0FF0');
  });

  it('should require padLeft()', function() {
    expect(padLeft('FF', 4, '0')).to.be.equal('00FF');
  });

  it('should require padRight()', function() {
    expect(padRight('FF', 4, '0')).to.be.equal('FF00');
  });

  it('should require repeat()', function() {
    expect(repeat('w', 3)).to.be.equal('www');
  });

  it('should require replace()', function() {
    expect(replace('duck', 'duck', 'swan')).to.be.equal('swan');
  });

  it('should require replaceAll()', function() {
    expect(replaceAll('duck duck', 'duck', 'swan')).to.be.equal('swan swan');
  });

  it('should require reverse()', function() {
    expect(reverse('green tree')).to.be.equal('eert neerg');
  });

  it('should require reverseGrapheme()', function() {
    expect(reverseGrapheme('ma\xF1ana')).to.be.equal('ana\xF1am');
  });

  it('should require slugify()', function() {
    expect(slugify('San Diego Zoo Safari Park')).to.be.equal('san-diego-zoo-safari-park');
  });

  it('should require splice()', function() {
    expect(splice('sting like a bee', 6, 4, 'as')).to.be.equal('sting as a bee');
  });

  it('should require tr()', function() {
    expect(tr('Yes. The fire rises.', { Yes: 'Great' })).to.be.equal('Great. The fire rises.');
  });

  it('should require trim()', function() {
    expect(trim('   Yes. The fire rises.    ')).to.be.equal('Yes. The fire rises.');
  });

  it('should require trimLeft()', function() {
    expect(trimLeft('   Yes. The fire rises.')).to.be.equal('Yes. The fire rises.');
  });

  it('should require trimRight()', function() {
    expect(trimRight('Yes. The fire rises.\n\f\t ')).to.be.equal('Yes. The fire rises.');
  });

  it('should require wordWrap()', function() {
    expect(wordWrap('Wonderful world', {
      width: 5
    })).to.be.equal('Wonderful\nworld');
  });

  // Query

  it('should require endsWith()', function() {
    expect(endsWith('Hello World!', 'World!')).to.be.true;
  });

  it('should require includes()', function() {
    expect(includes('mobile infantry', 'infantry')).to.be.true;
  });

  it('should require isAlpha()', function() {
    expect(isAlpha('HelloWorld')).to.be.true;
  });

  it('should require isAlphaDigit()', function() {
    expect(isAlphaDigit('JavaScript6')).to.be.true;
  });

  it('should require isBlank()', function() {
    expect(isBlank('Hello World!')).to.be.false;
  });

  it('should require isDigit()', function() {
    expect(isDigit('1000')).to.be.true;
  });

  it('should require isEmpty()', function() {
    expect(isEmpty('')).to.be.true;
  });

  it('should require isLowerCase()', function() {
    expect(isLowerCase('welcometoearth')).to.be.true;
  });

  it('should require isNumeric()', function() {
    expect(isNumeric('-1000')).to.be.true;
  });

  it('should require isString()', function() {
    expect(isString('Hello World!')).to.be.true;
  });

  it('should require isUpperCase()', function() {
    expect(isUpperCase('WELCOMETOEARTH')).to.be.true;
  });

  it('should require matches()', function() {
    expect(matches('pacific ocean', /^pacific ocean$/)).to.be.true;
  });

  it('should require startsWith()', function() {
    expect(startsWith('Hello World!', 'Hello')).to.be.true;
  });

  // Split

  it('should require chars()', function() {
    expect(chars('stellar bomb')).to.eql(['s', 't', 'e', 'l', 'l', 'a', 'r', ' ', 'b', 'o', 'm', 'b']);
  });

  it('should require codePoints()', function() {
    expect(codePoints('stellar bomb')).to.eql([0x73, 0x74, 0x65, 0x6C, 0x6C, 0x61, 0x72, 0x20, 0x62, 0x6F, 0x6D, 0x62]);
  });

  it('should require graphemes()', function() {
    expect(graphemes('man\u0303ana')).to.eql(['m', 'a', 'n\u0303', 'a', 'n', 'a']);
  });

  it('should require split()', function() {
    expect(split('dying star', /\s/)).to.eql(['dying', 'star']);
  });

  it('should require words()', function() {
    expect(words('*gravity***can****cross&&dimensions++')).to.eql(['gravity', 'can', 'cross', 'dimensions']);
  });

  // Strip

  it('should require stripBom()', function() {
    expect(stripBom('\uFEFFHello world!')).to.equal('Hello world!');
  });

  it('should require stripTags()', function() {
    expect(stripTags('<b>Welcome</b>')).to.equal('Welcome');
  });

  // Util

  it('should require version()', function() {
    expect(version).to.be.a('string');
  });

  // Entire library

  it('should require the entire library', function() {
    expect(v.sprintf('%d yellow %s', 5, 'apples')).to.be.equal('5 yellow apples');
  });

});