import React, { createContext, useState, PropsWithChildren  } from "react";
import { TodosContextState, ResultData } from "../types/GeneralTypes";

const contextDefaultValues: TodosContextState = {
board: [],
wordTofind: '',
result: [],
saveValues: () => {},
saveResult: () => {}
};

export const AllContext = createContext<TodosContextState>(
  contextDefaultValues
);

const AllProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [board, setBoard] = useState<Array<any>>(contextDefaultValues.board);
  const [wordTofind, setWordTofind] = useState<string>(contextDefaultValues.wordTofind);
  const [result, setResult] = useState<Array<ResultData>>(contextDefaultValues.result);

  const saveValues = (board: Array<any>, wordTofind: string): void => {
    setBoard(board);
    setWordTofind(wordTofind);
  };
  const saveResult = (result: Array<ResultData>): void => {
    setResult(result);
  };

  return (
    <AllContext.Provider
      value={{
        board,
        wordTofind,
        result,
        saveValues,
        saveResult
      }}
    >
      {children}
    </AllContext.Provider>
  );
};

export default AllProvider;