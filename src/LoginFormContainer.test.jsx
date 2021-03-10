import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import { useDispatch } from 'react-redux';

import LoginFormContainer from './LoginFormContainer';

jest.mock('react-redux');

describe('LoginFormContainer', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    useDispatch.mockImplementation(() => dispatch);
  });

  it('이메일, 암호 입력창에 값을 입력하면 입력값이 업데이트 됩니다.', () => {
    const { queryByLabelText } = render(<LoginFormContainer />);

    fireEvent.change(queryByLabelText(/E-mail/), { target: { value: 'currentEmail@example.com' } });

    expect(dispatch).toBeCalled();

    fireEvent.change(queryByLabelText(/Password/), { target: { value: 'currentPassword123' } });

    expect(dispatch).toBeCalled();
  });

  it('로그인하는 버튼을 눌러 아이디와 비밀번호를 제출합니다.', () => {
    const { getByText } = render(<LoginFormContainer />);

    fireEvent.click(getByText(/Login/));

    expect(dispatch).toBeCalled();
  });
});
