import v from '../voca';

describe('titleCase', function() {
  it('should return the title case of a string', function() {
    expect(v.titleCase('hello world')).toBe('Hello World');
    expect(v.titleCase('Hello world')).toBe('Hello World');
    expect(v.titleCase('hello World')).toBe('Hello World');
    expect(v.titleCase('Hello World')).toBe('Hello World');
    expect(v.titleCase('HELLO WORLD')).toBe('Hello World');
    expect(v.titleCase('bird')).toBe('Bird');
    expect(v.titleCase('BIRD')).toBe('Bird');
    expect(v.titleCase('bird-flight')).toBe('Bird-Flight');
    expect(v.titleCase('bird flight')).toBe('Bird Flight');
    expect(v.titleCase('san diego zoo safari park')).toBe('San Diego Zoo Safari Park');
    expect(v.titleCase('Who wants to try next?')).toBe('Who Wants To Try Next?');
    expect(v.titleCase('WHO WANTS TO TRY NEXT?')).toBe('Who Wants To Try Next?');
    expect(v.titleCase('-BIRD-FLIGHT-')).toBe('-Bird-Flight-');
    expect(v.titleCase('__BIRD___FLIGHT___')).toBe('__Bird___Flight___');
    expect(v.titleCase('Restless flycatcher')).toBe('Restless Flycatcher');
    expect(v.titleCase('XMLHttpRequest')).toBe('XmlHttpRequest');
    expect(v.titleCase('weight of up to 12 kg')).toBe('Weight Of Up To 12 Kg');
    expect(v.titleCase('/home/dmitri/projects/voca')).toBe('/Home/Dmitri/Projects/Voca');
    expect(v.titleCase('****')).toBe('****');
    expect(v.titleCase('-----')).toBe('-----');
    expect(v.titleCase('     ')).toBe('     ');
    expect(v.titleCase('\n\n\n\n   ***\t\t')).toBe('\n\n\n\n   ***\t\t');
    expect(v.titleCase('')).toBe('');
  });

  it('should return the title case of a non-latin string', function() {
    expect(v.titleCase('zborul păsării')).toBe('Zborul Păsării');
    expect(v.titleCase('полет птицы')).toBe('Полет Птицы');
    expect(v.titleCase('fuerza de sustentación')).toBe('Fuerza De Sustentación');
    expect(v.titleCase('skrzydło ptaka składa się')).toBe('Skrzydło Ptaka Składa Się');
  });

  it('should return the title case and not capitalize at specific characters', function() {
    expect(v.titleCase('jean-luc is good-looking', ['-'])).toBe('Jean-luc Is Good-looking');
    expect(v.titleCase('Un·e déput·é·e', ['·'])).toBe('Un·e Déput·é·e');
    expect(v.titleCase('Who*wants to-try*next?', ['-', '*'])).toBe('Who*wants To-try*next?');
    expect(v.titleCase('WHO*WANTS*TO*TRY*NEXT?', ['*'])).toBe('Who*wants*to*try*next?');
    expect(
      v.titleCase("Well, congratulations! You got yourself caught! Now what's the next step in your master plan?", [
        "'",
      ])
    ).toBe("Well, Congratulations! You Got Yourself Caught! Now What's The Next Step In Your Master Plan?");
  });

  it('should not modify numbers', function() {
    expect(v.titleCase(0)).toBe('0');
    expect(v.titleCase(1200)).toBe('1200');
    expect(v.titleCase('8965')).toBe('8965');
  });

  it('should return the title case of a string representation of an object', function() {
    expect(v.titleCase(['bird flight'])).toBe('Bird Flight');
    expect(
      v.titleCase({
        toString: function() {
          return 'bird flight';
        },
      })
    ).toBe('Bird Flight');
  });

  it('should return empty string for null or undefined', function() {
    expect(v.titleCase()).toBe('');
    expect(v.titleCase(undefined)).toBe('');
    expect(v.titleCase(null)).toBe('');
  });
});
