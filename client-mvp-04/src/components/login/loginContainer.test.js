import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import LoginContainer from './loginContainer';
import { BrowserRouter } from 'react-router-dom';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import authReducer from '../../store/reducers/authReducer';
import userReducer from '../../store/reducers/userReducer';

const mockStore = configureStore([]);
let store = mockStore({
  auth: authReducer,
  user: userReducer,
});
store.dispatch = jest.fn();

beforeEach(() => {
  render(
    <Provider store={store}>
      <LoginContainer />
    </Provider>,
    { wrapper: BrowserRouter }
  );
});
afterEach(cleanup);

describe('Login Container', () => {
  describe('Disable/Enable `Sign In` Button', () => {
    test('Should be disabled by default', () => {
      expect(screen.getByText('Sign in')).toBeDisabled();
    });

    test('Should be disabled when the input value contains only spaces', () => {
      expect(screen.getByText('Sign in')).toBeDisabled();
      const loginInput = screen.getByTestId('login-input');
      fireEvent.change(loginInput, { target: { value: ' ' } });
      expect(screen.getByText('Sign in')).toBeDisabled();
    });

    test('Should be enable when the input value isn`t empty', () => {
      expect(screen.getByText('Sign in')).toBeDisabled();
      const loginInput = screen.getByTestId('login-input');
      fireEvent.change(loginInput, { target: { value: 't' } });
      expect(screen.getByText('Sign in')).not.toBeDisabled();
      fireEvent.change(loginInput, { target: { value: 'test' } });
      expect(screen.getByText('Sign in')).not.toBeDisabled();
    });
  });

  describe('Show/Hide Error', () => {
    test('Should display the error message if email invalid', () => {
      const loginInput = screen.getByTestId('login-input');
      expect(loginInput).toBeInTheDocument();
      fireEvent.change(loginInput, { target: { value: 'test@gmail.c' } });
      fireEvent.submit(screen.getByTestId('login-form'));
      expect(
        screen.getByText('*Please enter a valid email address')
      ).toBeInTheDocument();
    });
  });
});
