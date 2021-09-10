const ALPHABET = {
	A: 10,
	B: 11,
	C: 12,
	D: 13,
	E: 14,
	F: 15, 
	G: 16,
	H: 17,
	I: 18,
	J: 19,
	K: 20,
	L: 21,
	M: 22,
	N: 23,
	O: 24,
	P: 25,
	Q: 26,
	R: 27,
	S: 28,
	T: 19,
	U: 30
};

$(document).ready(() => {
	$('#ConvertBaseBtn').click(event => {
		$('#Result').empty();
		const source_base = $('#SourceBase').val();
		const number = $('input').val();
		const result_base = $('#ResultBase').val();

		const decimal_number = sourceBaseToDecimal(number, source_base);
		DecimalToResultBase(decimal_number, result_base);
	});
});

/**
 * This function takes a string and inverses it, so we can work with a loop and its index
 * to do the required operations to convert any number into it decimal base representation.
 * This function also validates the entered data is correct before performing any conversion
 * and makes sure any letter it's replaced for its decimal value.
 * 
 * @param {string} number 
 * @param {string} source_base
 * @return {string}
 */
function sourceBaseToDecimal(number, source_base) {
	// Validate source format
	if (!isValidNumber(number, source_base)) {
		$('#Result').append('El número ingresado no cumple con el formato de la base ' + source_base);
		return;
	}
	let result = 0;

	// Invert the number and spliting it up into an array
	let reverse_number = number.split('').reverse();

	for (let position = 0; position < reverse_number.length; position++) {
		if (isLetter(reverse_number[position])) {
			reverse_number[position] = ALPHABET[reverse_number[position]];
		}

		let current_number = parseInt(reverse_number[position]);
		result += current_number * (Math.pow(source_base, position));
	}

	return result;
}

/**
 * This function coverts the given decimal value to the selected base.
 * @param {string} number 
 * @param {string} result_base
 * @returns {string}
 */
function DecimalToResultBase(number, result_base) {
	let result = [];

	number = parseInt(number);
	result_base = parseInt(result_base);
	let quotient = number;
	let remainder = 0;

	while (quotient > 0) {
		remainder = quotient % result_base;
		quotient = Math.floor(quotient / result_base);

		if (result_base > 10) {
			if (remainder > 9) {
				remainder = getKeyByValue(ALPHABET, remainder);
			}
		}	
		
		result.push(remainder);
	}

	$('#Result').append(result.reverse());
}

/**
 * Helper function to check if input its a letter.
 *
 * @param {string} str 
 * @returns bool
 */
function isLetter(str) {
	return str.length === 1 && str.match(/[a-z]/i);
}

/**
 * Helper function to acces a keyname by its value in order to replace
 * a decimal based number with its letter value.
 *
 * @param {object} object 
 * @param {string} value 
 * @returns {string} keyname.
 */
function getKeyByValue(object, value) {
	return Object.keys(object).find(key => object[key] === value);
}

/**
 * This function use regular expressions to validate we are using the right syntax
 * for each base.
 * @param {string} number 
 * @param {string} base 
 * @returns {bool}
 */
 function isValidNumber(number, base) {
	let reg, pattern;
	let string_length = number.length.toString();
	
	if (base > 10) {
		let b = getKeyByValue(ALPHABET, parseInt(base - 1));
		b = b.toString().toLocaleLowerCase();
		pattern = '[a-' + b + '0-9]{' + string_length + '}';
	} else {
		let b = base - 1;
		b = b.toString();
		pattern = '[0-' + b + ']{' + string_length + '}';	
	}

	reg = new RegExp(pattern, 'i');

	return number.match(reg);
}
