import { PRINTABLE_ASCII } from '../const';
import v from '../voca';

describe('countWhere', function() {
  it('should return the number of characters in a string for a predicate', function() {
    expect(v.countWhere('', v.isAlpha)).toBe(0);
    expect(v.countWhere('africa654', v.isAlpha)).toBe(6);
    expect(v.countWhere('790', v.isAlpha)).toBe(0);
    expect(v.countWhere(PRINTABLE_ASCII, v.isDigit)).toBe(10);
    expect(
      v.countWhere('****--**--**', function(character) {
        return character === '*';
      })
    ).toBe(8);
    expect(
      v.countWhere('****--**--**', function() {
        return false;
      })
    ).toBe(0);
  });

  it('should invoke the predicate with correct parameters and context', function() {
    let verifyIndex = 0;
    const context = {};
    const verifyString = '0123456789';
    expect(
      v.countWhere(
        verifyString,
        function(character, index, string) {
          expect(index).toBe(verifyIndex);
          expect(this).toBe(context);
          expect(string).toBe(verifyString);
          expect(character).toBe(verifyString[verifyIndex]);
          verifyIndex++;
          return true;
        },
        context
      )
    ).toBe(10);
  });

  it('should return the number of characters in a number for a predicate', function() {
    expect(v.countWhere(123, v.isDigit)).toBe(3);
    expect(v.countWhere(0, v.isDigit)).toBe(1);
    expect(v.countWhere(-1.5, v.isDigit)).toBe(2);
  });

  it('should return the number of characters in a string representation of an object for a predicate', function() {
    expect(v.countWhere(['droplet'], v.isDigit)).toBe(0);
    expect(
      v.countWhere(
        {
          toString: function() {
            return 'homo sapiens';
          },
        },
        v.isAlphaDigit
      )
    ).toBe(11);
  });

  it('should return zero for a non function predicate', function() {
    expect(v.countWhere('africa')).toBe(0);
    expect(v.countWhere('africa', undefined)).toBe(0);
    expect(v.countWhere('africa', null)).toBe(0);
    expect(v.countWhere('africa', 'africa')).toBe(0);
    expect(v.countWhere('africa', 0)).toBe(0);
    expect(v.countWhere()).toBe(0);
  });
});
