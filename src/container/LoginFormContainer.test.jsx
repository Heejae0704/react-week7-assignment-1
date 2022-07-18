import { MemoryRouter } from 'react-router-dom';

import { render, fireEvent } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import LoginFromContainer from './LoginFormContainer';

jest.mock('react-redux');

describe('LoginFromContainer', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();

    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector({
      loginFields: {
        email: 'test@test',
        password: '1234',
      },
    }));
  });

  const renderLoginFromContainer = () => render(
    <MemoryRouter>
      <LoginFromContainer />
    </MemoryRouter>,
  );

  it('input controls가 보여집니다.', () => {
    const { getByLabelText } = renderLoginFromContainer();

    expect(getByLabelText('E-mail').value).toBe('test@test');
    expect(getByLabelText('Password').value).toBe('1234');
  });

  it('change event가 호출됩니다.', () => {
    const { getByLabelText } = renderLoginFromContainer();

    fireEvent.change(getByLabelText('E-mail'), {
      target: { value: 'new email' },
    });

    expect(dispatch).toBeCalledWith({
      type: 'changeLoginField',
      payload: { name: 'email', value: 'new email' },
    });
  });

  it('"Log In" 버튼이 보여집니다.', () => {
    const { getByText } = renderLoginFromContainer();

    fireEvent.click(getByText('Log In'));

    expect(dispatch).toBeCalled();
  });
});
