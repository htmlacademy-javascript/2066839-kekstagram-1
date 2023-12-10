
// Функция палиндром

function checkPalindrome(string) {
  string = string.toLowerCase().replace(/\s/g, '');
  return string === string.split('').reverse().join('');
}

// console.log(checkPalindrome('Довод'));

checkPalindrome('Довод');

// Функция извлечения чисел

function getNumber(string) {
  return string.replace(/\D/g, '');
}

getNumber('1 кефир');

// console.log(getNumber('А  9 я томат 1'));
