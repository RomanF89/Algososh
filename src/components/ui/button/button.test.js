import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react';

import { Button } from './button';

describe('Кнпока рендерится без ошибок', () => {
  it('Кнопка с текстом рендерится без ошибок', () => {
    const tree = renderer
      .create(<Button text="Добавить в head"/>)
      .toJSON();
      expect(tree).toMatchSnapshot();
  }); 
  it('Кнопка без текста рендерится без ошибок', () => {
    const tree = renderer
      .create(<Button/>)
      .toJSON();
      expect(tree).toMatchSnapshot();
  }); 
  it('Заблокированная кнопка рендерится без ошибок', () => {
    const tree = renderer
      .create(<Button disabled={true}/>)
      .toJSON();
      expect(tree).toMatchSnapshot();
  }); 
  it('Кнопка с индикацией загрузки рендерится без ошибок', () => {
    const tree = renderer
      .create(<Button isLoader={true}/>)
      .toJSON();
      expect(tree).toMatchSnapshot();
  }); 
  it('Корректность вызова коллбэка при клике на кнопку', () => {
    window.alert = jest.fn();
    render(<Button onClick={() => alert('Кнопка работает!')} text='Кнопка коллбэка'/>);
    const button = screen.getByText('Кнопка коллбэка');
    fireEvent.click(button);
    expect(window.alert).toHaveBeenCalledWith('Кнопка работает!');
  }); 
})

