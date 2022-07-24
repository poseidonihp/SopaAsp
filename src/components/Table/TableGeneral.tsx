import React, { useContext } from 'react';
import './TableGeneral.scss';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { AllContext } from '../../context/AllProvider';
import useSolveArray from '../../hooks/useSolveArray';

const TableGeneral: React.FC = () => {
  const { board, result, saveResult } = useContext(AllContext); //contexto

  saveResult(useSolveArray()); //custom hook para resolver la sopa de letras

  /**
 *  Metodo gracias a la respuesta dada va celca por celda pintando la respuesta
 * @param {number} row // fila donde hay que ir a pintar.
 * @param {number} index // indice a buscar.
 * @return {boolean}
 */
  const findtoColor = (row: number, index: number): boolean => {
    if (result.length) {
      if (result.find((i) => i.Columna === index && i.Fila === row)) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  };

  return (
    <>
      {board.length > 0 && (
        <div className='tablew'>
          <div className='titleSolve'>
            <h2>Solución</h2>
          </div>
          <TableContainer component={Paper} className='table1'>
            <Table size='small' aria-label='simple table' className='size'>
              <TableHead>
                <TableRow>
                  {board[0].map((item: any, index: number) => {
                    if (findtoColor(0, index)) {
                      return (
                        <TableCell
                          align='right'
                          size='small'
                          sx={{
                            backgroundColor: '#1976d2',
                            border: 2,
                            borderColor: 'white',
                          }}
                        >
                          {item}
                        </TableCell>
                      );
                    } else {
                      return (
                        <TableCell size='small' align='right'>
                          {item}
                        </TableCell>
                      );
                    }
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {board.slice(1, board.length).map((row, indexRow) => (
                  <TableRow key={row[indexRow] + Math.random()} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    {row.map((item: any, index: number) => {
                      if (findtoColor(indexRow + 1, index)) {
                        return (
                          <TableCell
                            align='right'
                            size='small'
                            sx={{
                              backgroundColor: '#1976d2',
                              border: 2,
                              borderColor: 'white',
                            }}
                          >
                            {item}
                          </TableCell>
                        );
                      } else {
                        return (
                          <TableCell size='small' align='right'>
                            {item}
                          </TableCell>
                        );
                      }
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
      {board.length === 0 && <div className='tablew-new'>No hay sopa de letras a evaluar</div>}
    </>
  );
};

export default TableGeneral;
