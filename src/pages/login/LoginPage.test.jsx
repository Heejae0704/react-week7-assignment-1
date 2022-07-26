import { render } from '@testing-library/react';

import { useSelector } from 'react-redux';

import { MemoryRouter } from 'react-router-dom';

import LoginPage from './LoginPage';

jest.mock('react-redux');

describe('<LoginPage />', () => {
  useSelector.mockImplementation((selector) => selector({
    loginFields: {
      email: '',
      password: '',
    },
    errors: {
      login: null,
    },
  }));

  const renderLoginPage = () => render((
    <MemoryRouter>
      <LoginPage />
    </MemoryRouter>
  ));

  it('renders page title', () => {
    const { container } = renderLoginPage();

    expect(container).toHaveTextContent('Log In');
  });

  it('renders input controls', () => {
    const { getByLabelText } = renderLoginPage();

    expect(getByLabelText('E-mail')).toBeInTheDocument();
    expect(getByLabelText('Password')).toBeInTheDocument();
  });

  it('renders submit button', () => {
    const { getByRole } = renderLoginPage();

    expect(getByRole('button', {
      name: 'Log In',
    })).toBeInTheDocument();
  });
});