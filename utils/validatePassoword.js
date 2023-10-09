const validator = require('validator');

const upperCase = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
];

const lowercase = upperCase.map((char) => char.toLowerCase());

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

module.exports = isSecurePassword = (str) => {
  let contains = false;

  upperCase.forEach((char) => {
    if (validator.contains(str, char)) return (contains = true);
  });
  if (!contains) return false;

  contains = false;
  lowercase.forEach((char) => {
    if (validator.contains(str, char)) return (contains = true);
  });
  if (!contains) return false;

  contains = false;
  numbers.forEach((char) => {
    if (validator.contains(str, char)) return (contains = true);
  });
  if (!contains) return false;

  return true;
};
