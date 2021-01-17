import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import LoginForm from './LoginForm';

describe('LoginForm', () => {
  const inputLabels = ['E-mail', 'Password'];

  const handleChange = jest.fn();
  const handleClick = jest.fn();

  const renderLoginForm = () => render(
    <LoginForm
      email="xxx@xxx.com"
      password="test"
      onClick={handleClick}
      onChange={handleChange}
    />,
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loginField', () => {
    const { container } = renderLoginForm();

    expect(container).toHaveTextContent('E-mail');
    expect(container).toHaveTextContent('Password');
  });

  it('renders login button', () => {
    const { getByText } = renderLoginForm();

    expect(getByText('Log In')).not.toBeNull();
  });

  describe('login field change', () => {
    it('calls field change action', () => {
      const { getByLabelText } = renderLoginForm();
      const value = 'contents';

      inputLabels.forEach((label) => {
        fireEvent.change(getByLabelText(label), { target: { value } });
      });

      expect(handleChange).toBeCalledTimes(2);
    });
  });

  describe('login button click', () => {
    it('calls request login action', () => {
      const { getByText } = renderLoginForm();

      fireEvent.click(getByText('Log In'));

      expect(handleClick).toBeCalled();
    });
  });
});