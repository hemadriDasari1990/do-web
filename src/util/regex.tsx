import { keyCodeDict } from "./keyCodeDict";
export const EMAIL_PATTERN = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
export const ONLY_NUMBERS = /^[0-9]*$/;
export const ONLY_ALPHABET_CHARS = /^[a-zA-Z]*$/;
export const ALPHABET_WITH_SPACES = /^[A-Za-z\s]+$/;
export const ALPHABET_NUMIREC = /^\w+$/;
export const ALPHA_NUMERIC_WITH_SPACE = /^[a-zA-Z0-9\s]*$/;
export const ALPHA_NUMERIC = /^[a-zA-Z0-9]*$/;
export const ALPHABET_NUMBERIC_WITH_SPACE_AND_HYPHEN = /^[a-z\d\-_\s]+$/i;
export const NUMERIC_WITH_SLASH = /^[0-9/]*$/;
export const ALPHABET_NUMIREC_AND_SOME_SPECIAL_CHARACTERS = /^[ A-Za-z0-9_@./#+-]*$/;
export const MOBILE_NUMBER_REGEX = /^5[025648][1-9][0-9]{6}$/;
export const LANDLINE_NUMBER_REGEX = /^(?:\+971)?(?:2|3|4|6|7|9)\d{7}$/m;
export const WEBSITE_URL_REGEX = /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$/;
export const NUMERIC_LIMIT = `^[0-9]{8,8}$`;
export const NUMERIC_ONLY = /^[0-9]+$/;
export const EIDA_NUMBER = /^784[0-9]{4}[0-9]{7}[0-9]{1}$/g;
export const NAME_ONLY = `^([A-Za-z]+[,.]?[ ]?|[A-Za-z]+[-]?)+$`;
export const INVESTMENT_REGEX = /^0*([5-8][0-9]{3}|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-9]|[1-8][0-9]{4}|9[0-8][0-9]{3}|99[0-8][0-9]{2}|999[0-8][0-9]|9999[0-9]|[1-8][0-9]{5}|9[0-8][0-9]{4}|99[0-8][0-9]{3}|999[0-8][0-9]{2}|9999[0-8][0-9]|99999[0-9]|1000000)$/;
export const AREA_REGEX = /^([a-zA-Z0-9 -])*$/;
export const NAME_REGEX = /^([a-zA-Z ])*$/;
export const PERCENTAGE_REGEX = /^([1-9]([0-9])?|0)(\.[0-9]{1,2})?$/;
export const ALPHA_NUMERIC_AND_SPECIAL_CHARACTERS = /^[ A-z\n\d_@.#$=!%^)(\]:\*;\?\/\,}{\|\[\+-]*$/; // eslint-disable-line
export const INPUT_STARTS_WITH_ZERO = /^0[0-9]*$/;
export const ALPHA_NUMERIC_AND_SPECIAL_CHARACTERS_WITHOUT_PERCENTAGE = /^[ A-z\n\d_@.#$=!^)(\]:\*;\?\/\,}{\|\[\+-]*$/; // eslint-disable-line
export const FILE_NAME_REGEX = /^[A-Za-z0-9_ -]*$/;

export const allow = (
  keyEvent: { [Key: string]: any },
  regexp = new RegExp(ONLY_NUMBERS),
  maxLength = 1000
) => {
  const keyCode: number = keyEvent.keyCode as number;
  const currentValueInInput =
    keyEvent.target.value + (keyEvent.key || keyCodeDict[keyCode]);
  if (
    !regexp.test(currentValueInInput) ||
    currentValueInInput.length > maxLength
  ) {
    keyEvent.preventDefault();
  }
};
