
import v from '../voca';

describe('splice', function() {

  it('should splice the string at a given position, number of characters and addition string', function() {
    expect(v.splice('sting like a bee', 0, 0, 'you should ')).toBe('you should sting like a bee');
    expect(v.splice('sting like a bee', 0, 5, 'fly')).toBe('fly like a bee');
    expect(v.splice('sting like a bee', 6, 4, 'as')).toBe('sting as a bee');
    expect(v.splice('sting like a bee', 0, 16, 'float like a butterfly')).toBe('float like a butterfly');
    expect(v.splice('sting like a bee', 0, 16, '')).toBe('');
    expect(v.splice('bee', 3, 0, ' flies')).toBe('bee flies');
    expect(v.splice('bee', 10, 0, ' flies')).toBe('bee flies');
    expect(v.splice('sting like a bee', 0, 0, '')).toBe('sting like a bee');
    expect(v.splice('bee', 10, 100, ' flies')).toBe('bee flies');
    expect(v.splice('bee', 100, 100, ' is an insect')).toBe('bee is an insect');
    expect(v.splice('bee', 100, -1, ' is an insect')).toBe('bee is an insect');
  });

  it('should splice the string at a given negative position, number of characters and addition string', function() {
    expect(v.splice('days', -1, 1, '')).toBe('day');
    expect(v.splice('days', -1, 1, ' and night')).toBe('day and night');
    expect(v.splice('make the days count', -5, 5, 'matter')).toBe('make the days matter');
    expect(v.splice('make the days count', -5, 0, 'matter and ')).toBe('make the days matter and count');
    expect(v.splice('make the days count', -19, 19, 'matter')).toBe('matter');
    expect(v.splice('make the days count', -19, 19, '')).toBe('');
    expect(v.splice('make the days count', -100, 19, 'matter')).toBe('matter');
    expect(v.splice('make the days count', -100, 100, 'matter')).toBe('matter');
  });

  it('should delete from string at a given position by number of characters', function() {
    expect(v.splice('suffer now then be champion', 6, 4)).toBe('suffer then be champion');
    expect(v.splice('champion', -1, 0)).toBe('champion');
    expect(v.splice('champion', 0, 0)).toBe('champion');
    expect(v.splice('champion', 1, 0)).toBe('champion');
    expect(v.splice('champion', 5)).toBe('champ');
    expect(v.splice('champion', 0)).toBe('');
  });

  it('should splice the string representation of an object', function() {
    expect(v.splice(['paradise'], 0, 0, 'this is ')).toBe('this is paradise');
    expect(v.splice({
      toString: function() {
        return 'paradise';
      }
    }, 5, 1, 'I')).toBe('paradIse');
  });

  it('should clear the string for null or undefined arguments', function() {
    expect(v.splice('champion')).toBe('');
    expect(v.splice('champion', undefined, null)).toBe('');
    expect(v.splice('champion', null, null, null)).toBe('');
    expect(v.splice()).toBe('');
  });

});