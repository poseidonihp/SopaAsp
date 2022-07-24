import { Button, TextField } from '@mui/material';
import React, { useContext, useState } from 'react';
import './Header.scss';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FormData } from '../../types/GeneralTypes';
import { AllContext } from '../../context/AllProvider';
import Alert from '@mui/material/Alert';
import { validateArray } from '../../utils/common';

const Header: React.FC = () => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormData>();
  const { saveValues } = useContext(AllContext);

  const [error, setError] = useState('');
  const [isError, setisError] = useState(false);

  const onSubmit: SubmitHandler<FormData> = (data) => {};

  /**
   *  Metodo que valida que el array recibido sea de acuerdo a como se espera
   * @param {string} stringToConvert // array a convertir.
   * @param {string} wordToFind // palabra a buscar.
   * @return {void}
   */
  const getArraytoForm = (stringToConvert: string, wordToFind: string): void => {
    const arraytoShow = validateArray(stringToConvert);
    if (arraytoShow.length > 0) {
      const widthArray: number = arraytoShow[0].length;
      let isValidArray = true;
      isValidArray = arraytoShow.every((item) => {
        if (item.length === widthArray) {
          return true;
        } else {
          return false;
        }
      });
      if (isValidArray) {
        setisError(false);
        saveValues(arraytoShow, wordToFind);
      } else {
        saveValues([], '');
        setisError(true);
        setError('Error en la Sopa de letras La longitud no es igual en todas las filas');
      }
    } else {
      saveValues([], '');
      setisError(true);
      setError('Error en la Sopa de letras algun caracter no esta permitido');
    }
  };
  /**
   *  Metodo que obtiene los valores del formulario Form
   * @param {boolean} isNewArray // Variable para saber si es Array o no.
   * @return {void}
   */
  const handleWord = (isNewArray: boolean): void => {
    const values = getValues();
    if (isNewArray) {
      setValue('wordToSearch', '');
      saveValues([], '');
    } else {
      if (values.wordToSearch.length <= 2) {
        setisError(true);
        setError('La palabra a buscar debe tener mas de 2 caracteres');
        return;
      }
    }
    getArraytoForm(values.arrayToPrint, values.wordToSearch);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {isError && (
        <Alert severity='warning' onClose={() => {}}>
          {error}
        </Alert>
      )}
      <div className='title'>
        <h2>SOLUCIONADOR DE SOPA DE LETRAS</h2>
      </div>
      <div className='flex-table'>
        <div className='array-entry'>
          <span>
            <h2>Paso 1</h2>
          </span>
          <p>Instrucciones:</p>
          <div className='width-size'>
            <span>Solo se evalúan sopa de letras con la siguiente estructura</span>
            <span className='span-width'>abc;def; o [["a","b"],["c","d"]]</span>
          </div>
          <div>
            <TextField
              id='sopa-textarea'
              label='Sopa de letras a Validar'
              multiline
              rows={8}
              defaultValue=''
              className='textField-style'
              {...register('arrayToPrint', { required: true })}
            />
            {errors.arrayToPrint && <span className='error-input'>Este Campo es requerido</span>}
            <div className='button-style'>
            <Button type='submit' className='button-style' variant='contained' onClick={() => handleWord(true)}>
              Generar
            </Button>
            </div>
          </div>
        </div>
        <div className='search-word'>
          <span>
            <h2>Paso 2</h2>
          </span>
          <TextField
            id='sopa-input'
            className='textField-style-input'
            label='Palabra a Buscar'
            variant='outlined'
            {...register('wordToSearch')}
          />
          {errors.wordToSearch && <span className='error-input'>Este Campo es requerido</span>}
          <div className='button-style'>
            <Button variant='contained' className='button-style' onClick={() => handleWord(false)}>
              Solucionar
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Header;
