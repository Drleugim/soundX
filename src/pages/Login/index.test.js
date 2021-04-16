import { render, cleanup, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { store } from './../../store'
import moxios from 'moxios'
import Login from './index'
import faker from 'faker'

const user = {
    email: faker.internet.email(),
    password: faker.internet.password(),
    token: faker.datatype.uuid()
}

describe('Login', () => {
    beforeEach(() => {
        moxios.install()
        cleanup()
    })
    
    afterEach(() => { moxios.uninstall() })

    it('should login a user successfully ', async() => {
        const { getByLabelText, getByTestId } = render(
          <Provider store={store}>
            <MemoryRouter>
              <Login />
            </MemoryRouter>
          </Provider>
        )
        
        const emailInput = getByLabelText('E-mail:')
        const passwordInput = getByLabelText('Password:')
        const signInButton = getByTestId('signInButton')

        const emailEvent = { target: {
            name:'email',
            value: user.email
        }}
        const passwordEvent = { target: {
            name:'password',
            value: user.password
        }} 

        fireEvent.change(emailInput, emailEvent)
        fireEvent.change(passwordInput, passwordEvent)
        userEvent.click(signInButton)

        jest.spyOn(window.localStorage.__proto__, 'setItem')

        await moxios.wait(jest.fn)
        const req = moxios.requests.mostRecent()
        await req.respondWith({
            status: 201,
            response: { token:user.token }
        })

        expect(localStorage.setItem).toHaveBeenCalledWith('token', user.token)
    })
    
    it('should not login a user', async() => {
        const { getByLabelText, getByTestId } = render(
            <Provider store={store}>
              <MemoryRouter>
                <Login />
              </MemoryRouter>
            </Provider>
          )
          
        const emailInput = getByLabelText('E-mail:')
        const passwordInput = getByLabelText('Password:')
        const signInButton = getByTestId('signInButton')
  
        const emailEvent = { target: {
            name:'email',
            value: user.email
        }}
        const passwordEvent = { target: {
            name:'password',
            value: user.password
        }} 
  
        fireEvent.change(emailInput, emailEvent)
        fireEvent.change(passwordInput, passwordEvent)
        userEvent.click(signInButton)
  
        await moxios.wait(jest.fn)
        const req = moxios.requests.mostRecent()
        await req.respondWith({
            status: 400
        })
          
        const userWarning = getByTestId('userWarning')
        expect(userWarning).toBeInTheDocument()
    })
})