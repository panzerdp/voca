import {expect} from 'chai';
import v from '../voca';

describe('isPalindrome', () => {
  it('should return true for a single character', () => {
    expect(v.isPalindrome('a')).to.be.true;
    expect(v.isPalindrome('b')).to.be.true;
    expect(v.isPalindrome('c')).to.be.true;
  });

  it('should return true for a single number', () => {
    expect(v.isPalindrome('1')).to.be.true;
    expect(v.isPalindrome('2')).to.be.true;
    expect(v.isPalindrome('3')).to.be.true;
  });

  it('should return true for a single diacritic character', () => {
    expect(v.isPalindrome(';')).to.be.true;
    expect(v.isPalindrome('.')).to.be.true;
    expect(v.isPalindrome(']')).to.be.true;
  });

  it('should return true if string is a palindrome', () => {
    expect(v.isPalindrome('Rotator')).to.be.true;
    expect(v.isPalindrome('Redder')).to.be.true;
    expect(v.isPalindrome('Madam')).to.be.true;
  });

  it('should return false if string is not a palindrome', () => {
    expect(v.isPalindrome('Bench')).to.be.false;
    expect(v.isPalindrome('Wood')).to.be.false;
    expect(v.isPalindrome('JavaScript')).to.be.false;
  });

  it('should return true if number is a palindrome', () => {
    expect(v.isPalindrome(123321)).to.be.true;
    expect(v.isPalindrome(11)).to.be.true;
    expect(v.isPalindrome(25555552)).to.be.true;
  });

  it('should return false if number is not a palindrome', () => {
    expect(v.isPalindrome(123)).to.be.false;
    expect(v.isPalindrome(159200)).to.be.false;
    expect(v.isPalindrome(2000)).to.be.false;
  });

  it('should return true if a sentence is a palindrome', () => {
    const veryLongPalindrome = `
    Do good? I? No. Evil anon I deliver. I maim nine more hero-men in Saginaw,
    sanitary sword a-tuck, Carol, I. Lo! Rack, cut a drowsy rat in Aswan.
    I gas nine more hero-men in Miami. Reviled, I (Nona) live on. I do, O God.
    `;

    expect(v.isPalindrome('No lemon, no melon')).to.be.true;
    expect(v.isPalindrome('Eva, can I see bees in a cave?')).to.be.true;
    expect(v.isPalindrome(veryLongPalindrome)).to.be.true;
  });

  it('should return true if string is empty', () => {
    expect(v.isPalindrome('')).to.be.true;
  });

  it('should return false if string is null', () => {
    expect(v.isPalindrome(null)).to.be.false;
  });

  it('should return false if string is undefined', () => {
    expect(v.isPalindrome(undefined)).to.be.false;
  });
});
