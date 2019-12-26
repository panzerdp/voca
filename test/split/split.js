import v from '../voca';

describe('split', function() {
  it('should split a string into chunks', function() {
    expect(v.split('stellar bomb', ' ')).toEqual(['stellar', 'bomb']);
    expect(v.split('   ', ' ')).toEqual(['', '', '', '']);
    expect(v.split('dying star', /\s/)).toEqual(['dying', 'star']);
    expect(v.split('*dying*star*', /\*/)).toEqual(['', 'dying', 'star', '']);
    expect(v.split('', '')).toEqual([]);
    expect(v.split('star', '')).toEqual(['s', 't', 'a', 'r']);
  });

  it('should split a number into chunks', function() {
    expect(v.split(0)).toEqual(['0']);
    expect(v.split(1560, '6')).toEqual(['15', '0']);
    expect(v.split(-1.6, /\./)).toEqual(['-1', '6']);
  });

  it('should split the string representation of an object', function() {
    expect(v.split('rising star', ' ')).toEqual(['rising', 'star']);
    expect(
      v.split(
        {
          toString: function() {
            return 'rising-star';
          },
        },
        /\-/
      )
    ).toEqual(['rising', 'star']);
  });

  it('should return the string as an item of an array for an empty separator', function() {
    expect(v.split('star')).toEqual(['star']);
    expect(v.split('star', null)).toEqual(['star']);
    expect(v.split('star', undefined)).toEqual(['star']);
  });
});
