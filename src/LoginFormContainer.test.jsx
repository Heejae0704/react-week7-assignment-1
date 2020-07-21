import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { render, fireEvent } from '@testing-library/react';

import LoginFormContainer from './LoginFormContainer';

jest.mock('react-redux');
describe('LoginFormContainer', () => {
  const dispatch = jest.fn();
  beforeEach(() => {
    dispatch.mockClear();
    useDispatch.mockImplementation(() => dispatch);
    useSelector.mockImplementation((selector) => selector({
      loginFields: {
        email: 'test@test',
        password: '1234',
      },
      accessToken: given.accessToken,
    }));
  });

  function renderLoginFormContainer() {
    return render((
      <LoginFormContainer />
    ));
  }

  context('when logged out', () => {
    given('accessToken', () => '');

    it('renders input controls and button', () => {
      const { getByLabelText, getByText } = renderLoginFormContainer();

      expect(getByLabelText('E-mail').value).toBe('test@test');
      expect(getByLabelText('Password').value).toBe('1234');
      expect(getByText('Log In')).not.toBeNull();
    });

    it('listens change events', () => {
      const { getByLabelText } = renderLoginFormContainer();

      fireEvent.change(getByLabelText('E-mail'), {
        target: { value: 'new email' },
      });

      expect(dispatch).toBeCalledWith({
        type: 'changeLoginFields',
        payload: { name: 'email', value: 'new email' },
      });
    });

    it('listens click events', () => {
      const { getByText } = renderLoginFormContainer();

      fireEvent.click(getByText('Log In'));

      expect(dispatch).toBeCalled();
    });
  });

  context('when logged in', () => {
    given('accessToken', () => 'ACCESS_TOKEN');

    it('renders log out button', () => {
      const { container } = render((
        <LoginFormContainer />
      ));

      expect(container).toHaveTextContent('Log Out');
    });

    it('listens click event', () => {
      const { getByText } = render((
        <LoginFormContainer />
      ));

      fireEvent.click(getByText('Log Out'));

      expect(dispatch).toBeCalledWith({ type: 'logout' });
    });
  });
});
