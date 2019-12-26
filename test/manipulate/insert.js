
import v from '../voca';

describe('insert', function() {

  it('should insert into a string at specified position', function() {
    expect(v.insert('autumn', 'nice ', 0)).toBe('nice autumn');
    expect(v.insert('autumn', 'nice ')).toBe('nice autumn');
    expect(v.insert('autumn', 'nice', 1)).toBe('aniceutumn');
    expect(v.insert('autumn', 'nice', 5)).toBe('autumnicen');
    expect(v.insert('autumn', ' is nice', 6)).toBe('autumn is nice');
    expect(v.insert('', 'nice', 0)).toBe('nice');
    expect(v.insert('autumn', '', 1)).toBe('autumn');
    expect(v.insert('autumn', '', 6)).toBe('autumn');
  });

  it('should not insert into a string when position is out of bounds', function() {
    expect(v.insert('autumn', 'nice ', 100)).toBe('autumn');
    expect(v.insert('autumn', 'nice', -100)).toBe('autumn');
    expect(v.insert('autumn', 'nice', 7)).toBe('autumn');
    expect(v.insert('autumn', 'nice', -1)).toBe('autumn');
    expect(v.insert('', 'nice', 1)).toBe('');
  });

  it('should insert into a string representation of an object at specified position', function() {
    expect(v.insert(['paradise'], '**', 2)).toBe('pa**radise');
    expect(v.insert({
      toString: function() {
        return 'Tony';
      }
    }, ' Montana', 4)).toBe('Tony Montana');
  });

  it('should not insert into a string on null or undefined arguments', function() {
    expect(v.insert()).toBe('');
    expect(v.insert(null)).toBe('');
    expect(v.insert(undefined)).toBe('');
    expect(v.insert(undefined, undefined)).toBe('');
  });

});