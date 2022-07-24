    /**
   * Funcion que valida las diferentes alternativas del includes
   * @param {string} arraytoConvert // Array a convertir.
   * @param {string} charToValidate // caracter a validar.
   * @return {boolean}
   */
export const validateIncludes = (arraytoConvert: string, charToValidate: string): boolean => {
    switch (charToValidate) {
      case "'":
      case '[':
      case ']':
      case ';':
      case '"':
      case '(':
      case ')':
      case ':':
      case ',':
        return arraytoConvert.includes(charToValidate);
      case 'numbers':
        const hasNumber = /\d/;
        return hasNumber.test(arraytoConvert);
      case 'special':
        const format = /^[a-zA-Z0-9!@#$%\^&*)(+=._-]*$/;
        return format.test(arraytoConvert);
      default:
        return false;
    }
  };
    /**
   * Funcion que valida que el array no tenga los diferentes valores
   * @param {string} arraytoConvert // Array a convertir.
   * @return { Array<any> =>}
   */
export const validateArray = (arraytoConvert: string): Array<any> => {
    try {
      if (validateIncludes(arraytoConvert, 'numbers') || validateIncludes(arraytoConvert, 'special')) {
        return [];
      } else if (validateIncludes(arraytoConvert, "'") || validateIncludes(arraytoConvert, '(') || validateIncludes(arraytoConvert, ')')) {
        return [];
      } else if (validateIncludes(arraytoConvert, '[') && validateIncludes(arraytoConvert, ']') && !validateIncludes(arraytoConvert, ';')) {
        return JSON.parse(arraytoConvert.trim().split('\n').join('').split(' ').join(''));
      } else if (
        validateIncludes(arraytoConvert, ';') &&
        !validateIncludes(arraytoConvert, ':') &&
        !validateIncludes(arraytoConvert, ',')
      ) {
        return arraytoConvert
          .split('\n')
          .join('')
          .split(';')
          .map((x) => x.split(''))
          .filter((x) => x.length > 0);
      }

      return [];
    } catch (error) {
      return [];
    }
  }; 