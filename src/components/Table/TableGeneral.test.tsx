import React from 'react';
import {render, screen} from '@testing-library/react';
import TableGeneral from './TableGeneral';

test('render Table General', () => {
    render(<TableGeneral />)
    const divElement = screen.getAllByRole("tablew");
    expect(divElement).toHaveTextContent('Solución')
})