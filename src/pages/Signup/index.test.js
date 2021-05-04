import { render, cleanup, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { store } from './../../store'
import moxios from 'moxios'
import Signup from './index'
import faker from 'faker'

const user = {
    email: faker.internet.email(),
    password: faker.internet.password(),
    token: faker.datatype.uuid()
}

describe('Register', () => {
    beforeEach(() => {
        moxios.install()
        cleanup()
    })
    
    afterEach(() => { moxios.uninstall() })

    it('should signup user successfully ', async() => {
        const { getByLabelText, getByTestId } = render(
          <Provider store={store}>
            <MemoryRouter>
              <Signup />
            </MemoryRouter>
          </Provider>
        )
        
        const emailInput = getByLabelText('E-mail:')
        const passwordInput = getByLabelText('Password:')
        const confirmedPasswordInput = getByLabelText('Confirm Password:')
        const signUpButton = getByTestId('signUpButton')

        const emailEvent = { target: {
            name:'email',
            value: user.email
        }}
        const passwordEvent = { target: {
            name:'password',
            value: user.password
        }} 
        const confirmedPasswordEvent = { target: {
            name:'confirmedPassword',
            value: user.password
        }} 

        fireEvent.change(emailInput, emailEvent)
        fireEvent.change(passwordInput, passwordEvent)
        fireEvent.change(confirmedPasswordInput, confirmedPasswordEvent)
        userEvent.click(signUpButton)

        jest.spyOn(window.localStorage.__proto__, 'setItem')

        await moxios.wait(jest.fn)
        const req = moxios.requests.mostRecent()
        await req.respondWith({
            status: 201,
            response: { token:user.token }
        })

        expect(localStorage.setItem).toHaveBeenCalledWith('token', user.token)
    })
    
    it('should not signup user and show password warning, if pass and confirm pass not match',
     async() => {
        const { getByLabelText, getByTestId } = render(
            <Provider store={store}>
              <MemoryRouter>
                <Signup />
              </MemoryRouter>
            </Provider>
        )
          
        const emailInput = getByLabelText('E-mail:')
        const passwordInput = getByLabelText('Password:')
        const confiermedPasswordInput = getByLabelText('Confirm Password:')
        const signUpButton = getByTestId('signUpButton')
  
        const emailEvent = { target: {
            name:'email',
            value: user.email
        }}
        const passwordEvent = { target: {
            name:'password',
            value: user.password
        }} 
        const confirmedPasswordEvent = { target: {
            name:'confirmedPassword',
            value:faker.internet.password()
        }} 
  
        fireEvent.change(emailInput, emailEvent)
        fireEvent.change(passwordInput, passwordEvent)
        fireEvent.change(confiermedPasswordInput, confirmedPasswordEvent )
        userEvent.click(signUpButton)
          
        const passwordWarning = getByTestId('passwordWarning')
        expect(passwordWarning).toBeInTheDocument()
    })

    it('should not signup user and show user warning, if user already exist',
     async() => {
        const { getByLabelText, getByTestId } = render(
            <Provider store={store}>
              <MemoryRouter>
                <Signup />
              </MemoryRouter>
            </Provider>
          )
          
        const emailInput = getByLabelText('E-mail:')
        const passwordInput = getByLabelText('Password:')
        const confiermedPasswordInput = getByLabelText('Confirm Password:')
        const signUpButton = getByTestId('signUpButton')
  
        const emailEvent = { target: {
            name:'email',
            value: user.email
        }}
        const passwordEvent = { target: {
            name:'password',
            value: user.password
        }} 
        const confirmedPasswordEvent = { target: {
            name:'confirmedPassword',
            value:user.password
        }} 
  
        fireEvent.change(emailInput, emailEvent)
        fireEvent.change(passwordInput, passwordEvent)
        fireEvent.change(confiermedPasswordInput, confirmedPasswordEvent )
        userEvent.click(signUpButton)

        await moxios.wait(jest.fn)
        const req = moxios.requests.mostRecent()
        await req.respondWith({
            status: 400
        })  

        const userWarning = getByTestId('signUpUserWarning')
        expect(userWarning).toBeInTheDocument()
    })
})