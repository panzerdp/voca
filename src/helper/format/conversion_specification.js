import { LITERAL_PERCENT_SPECIFIER, LITERAL_SINGLE_QUOTE } from 'helper/format/const';
import nilDefault from 'helper/undefined/nil_default';

/**
 * Construct the new conversion specification object.
 *
 * @ignore
 * @param {Object} properties An object with properties to initialize.
 * @return {ConversionSpecification} ConversionSpecification instance.
 */
function ConversionSpecification(properties) {

  /**
   * The percent characters from conversion specification.
   *
   * @ignore
   * @name ConversionSpecification#percent
   * @type {string}
   */
  this.percent = properties.percent;

  /**
   *  The sign specifier to force a sign to be used on a number.
   *
   * @ignore
   * @name ConversionSpecification#signSpecifier
   * @type {string}
   */
  this.signSpecifier = properties.signSpecifier;

  /**
   * The padding specifier that says what padding character will be used.
   *
   * @ignore
   * @name ConversionSpecification#paddingSpecifier
   * @type {string}
   */
  this.paddingSpecifier = properties.paddingSpecifier;

  /**
   * The alignment specifier that says if the result should be left-justified or right-justified.
   *
   * @ignore
   * @name ConversionSpecification#alignmentSpecifier
   * @type {string}
   */
  this.alignmentSpecifier = properties.alignmentSpecifier;

  /**
   * The width specifier how many characters this conversion should result in.
   *
   * @ignore
   * @name ConversionSpecification#width
   * @type {number}
   */
  this.width = properties.width;

  /**
   * The precision specifier says how many decimal digits should be displayed for floating-point numbers.
   *
   * @ignore
   * @name ConversionSpecification#precision
   * @type {number}
   */
  this.precision = properties.precision;

  /**
   * The type specifier says what type the argument data should be treated as.
   *
   * @ignore
   * @name ConversionSpecification#typeSpecifier
   * @type {string}
   */
  this.typeSpecifier = properties.typeSpecifier;
}


/**
 * Check if the conversion specification is a percent literal "%%".
 *
 * @ignore
 * @return {boolean} Returns true if the conversion is a percent literal, false otherwise.
 */
ConversionSpecification.prototype.isPercentLiteral = function() {
  return LITERAL_PERCENT_SPECIFIER === this.percent;
};

/**
 * Get the padding character from padding specifier.
 *
 * @ignore
 * @returns {string} Returns the padding character.
 */
ConversionSpecification.prototype.getPaddingCharacter = function() {
  let paddingCharacter = nilDefault(this.paddingSpecifier, ' ');
  if (paddingCharacter.length === 2 && paddingCharacter[0] === LITERAL_SINGLE_QUOTE) {
    paddingCharacter = paddingCharacter[1];
  }
  return paddingCharacter;
};

export default ConversionSpecification;