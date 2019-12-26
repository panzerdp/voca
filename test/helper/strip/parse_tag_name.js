
import parseTagName from 'helper/strip/parse_tag_name';

describe('parseTagName', function() {

  it('should parse the tag name from markup', function () {
    expect(parseTagName("<img title=\"foo 'bar'\"/>")).toBe('img');
    expect(parseTagName("<  b>Wonderful world</b>")).toBe('b');
  });

});