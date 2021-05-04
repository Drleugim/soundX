import faker from 'faker'
import moxios from 'moxios'
import thunk from 'redux-thunk'
import configureStore from 'redux-mock-store'
import {
  toggleProductWarning,
  cleanProduct,
  updateProductData,
  updatePictureData,
  productPublish,
  getProducts,
  initialState,
  productReducer,
  PRODUCT_SUCCESS,
  PRODUCT_ERROR,
  UPDATE_PRODUCT_DATA,
  UPDATE_PICTURE_DATA,
  CLEAN_PRODUCT_DATA,
  TOGGLE_PRODUCT_WARNING,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_ERROR
} from './productReducer'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const product = {
  nameProduct: faker.commerce.product(),
  buyPrice: faker.commerce.price(),
  rentPrice: faker.commerce.price(),
  quantity: faker.datatype.number(),
  brand: faker.company.companyName(),
  newUsed: faker.commerce.productAdjective(),
  description: faker.commerce.productDescription(),
  picture: faker.image.image(),
}

describe('Product Reducer', () => {
  beforeEach(() => { 
    moxios.install()
  })
  afterEach(() => { moxios.uninstall() })

  it('should dispatch TOGGLE_PRODUCT_WARNING action with value as payload', () => {
    const { dispatch, getActions } = mockStore()
    
    dispatch(toggleProductWarning(product.warning))
    const [action] = getActions()

    expect(action.type).toBe(TOGGLE_PRODUCT_WARNING)
    expect(action.payload).toBe(product.warning)
  })

  it('should dispatch UPDATE_PRODUCT_DATA action with data as payload', () => {
    const { dispatch, getActions } = mockStore()
    const data = { 
      name:faker.random.word(),
      value:faker.random.word() 
    }

    dispatch(updateProductData(data))
    const [action] = getActions()

    expect(action.type).toBe(UPDATE_PRODUCT_DATA)
    expect(action.payload).toMatchObject(data)
  })

  it('should dispatch UPDATE_PICTURE_DATA action with data as payload', () => {
    const { dispatch, getActions } = mockStore()
    const data = { 
      name:faker.random.word(),
      value:faker.random.word() 
    }

    dispatch(updatePictureData(data))
    const [action] = getActions()

    expect(action.type).toBe(UPDATE_PICTURE_DATA)
    expect(action.payload).toMatchObject(data)
  })


  it('should dispatch CLEAN_PRODUCT_DATA action with data as payload', () => {
    const { dispatch, getActions } = mockStore()

    dispatch(cleanProduct())
    const [action] = getActions()

    expect(action.type).toBe(CLEAN_PRODUCT_DATA)
  })

  it('should dispatch PRODUCT_SUCCESS action with data as payload product publish', async() => {
    const { dispatch, getActions } = mockStore()
    const data = {
      nameProduct: product.nameProduct,
      buyPrice: product.buyPrice,
      rentPrice: product.rentPrice,
      quantity: product.quantity,
      brand: product.brand,
      newUsed: product.newUsed,
      description: product.description,
      picture: product.picture,
    }

    productPublish(data)(dispatch)

    await moxios.wait(jest.fn)
    const req = moxios.requests.mostRecent()
    await req.respondWith({
        status: 201,
        response: { product },
    })

    const [action] = getActions()
    
    expect(action.type).toBe(PRODUCT_SUCCESS)
    expect(action.payload.product).toBe(product)
  })

  it('should dispatch PRODUCT_ERROR action on publishin product', async() => {
    const { dispatch, getActions } = mockStore()
    const data = {
      nameProduct: product.nameProduct,
      buyPrice: product.buyPrice,
      rentPrice: product.rentPrice,
      quantity: product.quantity,
      brand: product.brand,
      newUsed: product.newUsed,
      description: product.description,
      picture: product.picture,
    }
    productPublish(data)(dispatch)

    await moxios.wait(jest.fn)
    const req = moxios.requests.mostRecent()
    await req.respondWith({
        status: 400,
    })

    const actions = getActions()
    
    expect(actions[0].type).toBe(PRODUCT_ERROR)
    expect(actions[1].type).toBe(TOGGLE_PRODUCT_WARNING)
    expect(actions[1].payload).toBeTruthy()
  })

  it('should change product state when action UPDATE_PRODUCT_DATA is dispatched', () => {
    const options = ['nameProduct', 'buyPrice', 'rentPrice', 'quantity', 'brand','newUsed','description','picture']
    const randomPosition= Math.ceil(Math.random() * 3)
    const payload = { name: options[randomPosition-1] }

    payload.name === 'namProduct' ? payload.value=product.nameProduct : payload.value=product.buyPrice

    const state = productReducer(undefined, { type: UPDATE_PRODUCT_DATA, payload })

    expect(state).toMatchObject({ ...initialState, [payload.name]: payload.value })
  })

  it('should change product state when action UPDATE_PICTURE_DATA is dispatched', () => {
    const payload = { name: 'picture'}

    const state = productReducer(undefined, { type: UPDATE_PICTURE_DATA, payload })

    expect(state).toMatchObject({ ...initialState, picture: payload })
  })

  it('should change product state when action TOGGLE_PRODUCT_WARNING is dispatched', () => {
    const state = productReducer(undefined, { type: TOGGLE_PRODUCT_WARNING, payload: product.warning })

    expect(state).toMatchObject({ ...initialState, productWarning: product.warning })
  })
  
  it('should change product state when action PRODUCT_SUCCESS is dispatched', () => {
    const payload =  { productData: product }
    const state = productReducer(undefined, { type: PRODUCT_SUCCESS, payload })
    
    expect(state).toMatchObject({ ...initialState, productData: payload})
  })

  it('should change product state when action PRODUCT_ERROR is dispatched', () => {
    const err =  new Error()
    const state = productReducer(undefined, { type: PRODUCT_ERROR, payload: err })
    
    expect(state).toMatchObject({ ...initialState, error: err})
  })

  it('should change product state when action CLEAN_PRODUCT_DATA is dispatched', () => {
    const state = productReducer(undefined, { type: CLEAN_PRODUCT_DATA })
    
    expect(state).toMatchObject({ ...initialState})
  })
} )