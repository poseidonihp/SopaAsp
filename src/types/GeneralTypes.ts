export interface FormData {
    arrayToPrint: string;
    wordToSearch: string;
  };

  export interface ResultData {
    Fila: number;
    Columna: number;
  };

  export type TodosContextState = {
    board: Array<any>;
    wordTofind: string;
    result: Array<ResultData>;
    saveValues: (board: Array<any>,wordTofind: string) => void;
    saveResult: (result: Array<ResultData>) => void;
  };