import { useEffect, useState, useContext } from 'react';
import {ResultData} from "../types/GeneralTypes";
import { AllContext } from '../context/AllProvider';

const useSolveArray = (): Array<ResultData> => {
    const {  board, wordTofind } = useContext(AllContext);
  const [result, setResult] = useState<Array<ResultData>>([]);

  let resultado: Array<any> = [];
  let isValid: boolean = false;
  let typeToFind: string = '';

    /**
   * Inicia la busqueda de la palabra
   * @param {Array<any>} board // Array completo.
   * @param {string} wordToFind // palabra a buscar.
   * @return {boolean}
   */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const searchWord = (): boolean => {
      //inicializo la variable a vacio
    // Empiezo a recorrer por filas
    for (let row = 0; row < board.length; row++) {
      // Empíezo a recorrer por columnas
      for (let column = 0; column < board[row].length; column++) {
        /* - Busca por el primer Caracter y si lo encuentra retorna
            un array con las posiciones donde se  encuentra
                */
        if (board[row][column] === wordTofind.charAt(0) && deepSearch(board, row, column, 0, wordTofind)) {
          // retorna los resultados de la palabra encontrada
          setResult(resultado);
          return true;
        }
      }
    }
    // si la palabra no existe retorna false:
    setResult([]);
    return false;
  };

  /**
   * Busqueda Profunda para entrontrar el siguiente caracter continuando con el caracter actual
   *
   * @param {Array<any>} board // Array completo.
   * @param {number} row // Fila actual del conteo.
   * @param {number} column // Columna actual del conteo.
   * @param {number} charToFind // caracter que estoy buscando.
   * @param {string} wordToFind // palabra a buscar.
   * @return {boolean}
   */
  const deepSearch = (board: Array<any>, row: number, column: number, charToFind: number, wordToFind: string): boolean => {
    // cuando encuentra la palabra retorna que ya la encontre
    if (charToFind === wordToFind.length) return true;
    if (resultado.length === wordToFind.length) return true;
    // validaciones para no buscar fuera de los limites del array
    if (
      row < 0 ||
      row > board.length - 1 ||
      column < 0 ||
      column > board[row].length - 1 ||
      board[row][column] !== wordToFind.charAt(charToFind)
    ) {
      // busqueda fuera de los limites retorna false
      return false;
    }
    // el siguiente caracter ha sido encontrado
    // guardo y cambio temporalmente donde estoy buscando para no buscar en el misma posicion
    const temp = board[row][column];
    board[row][column] = ' ';
    resultado[charToFind] = { Fila: row, Columna: column };
    /* - validaciones cuando llego a la posicion 2 de la palabra que estoy buscando para identificar 
           que tipo de palabra es si es vertical, horizontal o diagonal
                */
    if (charToFind === 1) {
      //defino que tipo de palabra estoy buscando
      typeToFind = validateToSolve(resultado);
    } else if (charToFind >= 2 && charToFind <= wordToFind.length) {
      // cuando llega al tercer caracter reviso que siga siendo segun lo identifique
      isValid = validateIsCorrect(typeToFind, charToFind);
      if (!isValid) {
        // borro la posicion del resultado para ir a la siguiente
        resultado = resultado.slice(0, -1);
        board[row][column] = temp;
        return false;
      }
    }
    /* metodo recursivo para buscar el siguiente caracter busca en todos los
    posibles combinaciones  */
    let found =
      deepSearch(board, row + 1, column, charToFind + 1, wordToFind) || //arriba
      deepSearch(board, row - 1, column, charToFind + 1, wordToFind) || // abajo
      deepSearch(board, row, column + 1, charToFind + 1, wordToFind) || //derecha
      deepSearch(board, row, column - 1, charToFind + 1, wordToFind)  ||//izquierda
      deepSearch(board, row + 1, column - 1, charToFind + 1, wordToFind) || // arriba izquierda
      deepSearch(board, row + 1, column + 1, charToFind + 1, wordToFind) || // arriba derecha
      deepSearch(board, row - 1, column - 1, charToFind + 1, wordToFind) || // abajo izquierda
      deepSearch(board, row - 1, column + 1, charToFind + 1, wordToFind); // abajo derecha
    // Devuelvo el valor a el resultado anterior.
    board[row][column] = temp;
    // returno si fue encontrada la palabra o no
    return found;
  };

   /**
   * Valida el tipo de palabra que estoy buscando
   *
   * @param {Array<ResultData>} result // Array completo.
   * @return {string}
   */
  const validateToSolve = (result:Array<ResultData>):string => {
    let vertical = result[0].Fila ;
    let horizontal = result[0].Columna;
    let value = '';
     result.slice(1, result.length).forEach(element => {
      if (element.Fila === vertical) {
        value =  'is Horizontal';
      } else if (element.Columna === horizontal) {
        value =  'is Vertical'
      } else {
        value =  'is Diagonal'
      }
    });
    return value;
  }

     /**
   * Valida si sigue siendo el tipo definido esto solo se ejecuta desde la posicion3 en adelante
   *
   * @param {string} typeToFind // tipo a validar.
   * @param {number} charToFind // caracter a validar.
   * @return {boolean}
   */
  const validateIsCorrect = (typeToFind:string,charToFind:number):boolean => {
    let isValidForType = true;
    switch (typeToFind) {
      case 'is Vertical':
        isValidForType = resultado[charToFind].Columna === resultado[charToFind - 1].Columna ? true : false;
        break;
      case 'is Horizontal':
        isValidForType = resultado[charToFind].Fila === resultado[charToFind - 1].Fila ? true : false;
        break;
      case 'is Diagonal':
        const validFilaDiag = resultado.filter(num => num.Fila === resultado[charToFind].Fila).length > 1 ? false : true;
         
        const validColumnDiag = resultado.filter(num => num.Columna === resultado[charToFind].Columna).length > 1 ? false : true;
        isValidForType = (validFilaDiag && validColumnDiag) ? true : false;
        break;
    }
    return isValidForType;
  }
  useEffect(() => {
    if (wordTofind !== '') {searchWord()};
  }, [board, wordTofind]);

  return result;
};

export default useSolveArray;
