export function getInputErrorMessage(validity: ValidityState) {
  if (validity.valueMissing) {
    return 'This field is required.';
  }
  if (validity.typeMismatch) {
    return 'Please enter a valid value.';
  }
  if (validity.patternMismatch) {
    return 'Please match the requested format.';
  }
  if (validity.tooLong) {
    return 'Please shorten this text to the limit allowed.';
  }
  if (validity.tooShort) {
    return 'Please lengthen this text to the required minimum.';
  }
  if (validity.rangeOverflow) {
    return 'Please select a smaller value.';
  }
  if (validity.rangeUnderflow) {
    return 'Please select a larger value.';
  }
  if (validity.stepMismatch) {
    return 'Please select a valid value.';
  }
  if (validity.badInput) {
    return 'Please enter a number.';
  }
  if (validity.customError) {
    return 'An error occurred. Please check this value.';
  }
  return 'The value entered is invalid.';
}
