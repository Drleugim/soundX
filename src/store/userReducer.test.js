import faker from 'faker'
import moxios from 'moxios'
import thunk from 'redux-thunk'
import configureStore from 'redux-mock-store'
import {
    toggleUserWarning,
    togglePasswordWarning,
    updateUserData,
    userLogout,
    userSignup,
    userLogin,
    initialState,
    userReducer,
    USER_SUCCESS,
    USER_ERROR,
    USER_LOGOUT,
    UPDATE_USER_DATA,
    TOGGLE_USER_WARNING,
    TOGGLE_PASSWORD_WARNING
} from './userReducer'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)
const user = {
    email: faker.internet.email(),
    password: faker.internet.password(),
    warning: faker.datatype.boolean(),
    token: faker.datatype.uuid()
}

describe('User Reducer', () => {
    beforeEach(() => { moxios.install() })
    afterEach(() => { moxios.uninstall() })

    it('should dispatch TOGGLE_USER_WARNING action with value as payload', () => {
        const { dispatch, getActions } = mockStore()
        
        dispatch(toggleUserWarning(user.warning))
        const [action] = getActions()

        expect(action.type).toBe(TOGGLE_USER_WARNING)
        expect(action.payload).toBe(user.warning)
    })

    it('should dispatch TOGGLE_PASSWORD_WARNING action with value as payload', () => {
        const { dispatch, getActions } = mockStore()
        
        dispatch(togglePasswordWarning(user.warning))
        const [action] = getActions()

        expect(action.type).toBe(TOGGLE_PASSWORD_WARNING)
        expect(action.payload).toBe(user.warning)
    })

    it('should dispatch UPDATE_USER_DATA action with data as payload', () => {
        const { dispatch, getActions } = mockStore()
        const data = { 
            name:faker.random.word(),
            value:faker.random.word() 
        }

        dispatch(updateUserData(data))
        const [action] = getActions()

        expect(action.type).toBe(UPDATE_USER_DATA)
        expect(action.payload).toMatchObject(data)
    })

    it('should dispatch USER_LOGOUT action without payload', () => {
        const { dispatch, getActions } = mockStore()
       
        dispatch(userLogout())
        const [action] = getActions()
        
        expect(action.type).toBe(USER_LOGOUT)
    })

    it('should dispatch USER_SUCCESS action with token as payload on user sign up', async() => {
        const { dispatch, getActions } = mockStore()
        const data = {
            email:user.email,
            password:user.password
        }

        userSignup(data)(dispatch)

        await moxios.wait(jest.fn)
        const req = moxios.requests.mostRecent()
        await req.respondWith({
            status: 201,
            response: { token:user.token },
        })

        const [action] = getActions()
        
        expect(action.type).toBe(USER_SUCCESS)
        expect(action.payload.token).toBe(user.token)
    })

    it('should dispatch USER_ERROR action on user signup error', async() => {
        const { dispatch, getActions } = mockStore()
        const data = {
            email:user.email,
            password:user.password
        }

        userSignup(data)(dispatch)

        await moxios.wait(jest.fn)
        const req = moxios.requests.mostRecent()
        await req.respondWith({
            status: 400,
        })

        const actions = getActions()
        
        expect(actions[0].type).toBe(USER_ERROR)
        expect(actions[1].type).toBe(TOGGLE_USER_WARNING)
        expect(actions[1].payload).toBeTruthy()
        expect(actions[2].type).toBe(UPDATE_USER_DATA)
        expect(actions[3].type).toBe(UPDATE_USER_DATA)
    })

    it('should dispatch USER_SUCCESS action with token as payload on user login', async() => {
        const { dispatch, getActions } = mockStore()
        const data = {
            email:user.email,
            password:user.password
        }

        userLogin(data)(dispatch)

        await moxios.wait(jest.fn)
        const req = moxios.requests.mostRecent()
        await req.respondWith({
            status: 201,
            response: { token:user.token },
        })

        const [action] = getActions()
        
        expect(action.type).toBe(USER_SUCCESS)
        expect(action.payload.token).toBe(user.token)
    })
   
    it('should dispatch USER_ERROR and 3 more actions on user login error', async() => {
        const { dispatch, getActions } = mockStore()
        const data = {
            email:user.email,
            password:user.password
        }

        userLogin(data)(dispatch)

        await moxios.wait(jest.fn)
        const req = moxios.requests.mostRecent()
        await req.respondWith({
            status: 400,
        })

        const actions = getActions()
        
        expect(actions[0].type).toBe(USER_ERROR)
        expect(actions[1].type).toBe(TOGGLE_USER_WARNING)
        expect(actions[1].payload).toBeTruthy()
        expect(actions[2].type).toBe(UPDATE_USER_DATA)
        expect(actions[3].type).toBe(UPDATE_USER_DATA)
    })

    it('should change user state when action UPDATE_USER_DATA is dispatched', () => {
        const options = ['email', 'password', 'confirmedPassword']
        const randomPosition= Math.ceil(Math.random() * 3)
        const payload = { name: options[randomPosition-1] }

        payload.name === 'email' ? payload.value=user.email : payload.value=user.password

        const state = userReducer(undefined, { type: UPDATE_USER_DATA, payload })
    
        expect(state).toMatchObject({ ...initialState, [payload.name]: payload.value })
    })

    it('should change user state when action TOGGLE_USER_WARNING is dispatched', () => {
        const state = userReducer(undefined, { type: TOGGLE_USER_WARNING, payload: user.warning })
    
        expect(state).toMatchObject({ ...initialState, userWarning: user.warning })
    })

    it('should change user state when action TOGGLE_PASSWORD_WARNING is dispatched', () => {
        const state = userReducer(undefined, { type: TOGGLE_PASSWORD_WARNING, payload: user.warning })
    
        expect(state).toMatchObject({ ...initialState, passwordWarning: user.warning })
    })
    
    it('should change user state when action USER_SUCCESS is dispatched', () => {
        const payload =  { token:user.token }
        const state = userReducer(undefined, { type: USER_SUCCESS, payload })
        
        expect(state).toMatchObject({ ...initialState, userData: payload})
    })

    it('should change user state when action USER_ERROR is dispatched', () => {
        const err =  new Error()
        const state = userReducer(undefined, { type: USER_ERROR, payload: err })
        
        expect(state).toMatchObject({ ...initialState, error: err})
    })

    it('should reset user state when action USER_LOGOUT is dispatched', () => {
        const state = userReducer(undefined, { type: USER_LOGOUT })
        
        expect(state).toMatchObject({ ...initialState, 
            email: '', 
            password: '', 
            confirmedPassword: '',
            userData:''
        })
    })
} )