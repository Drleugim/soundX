import PublishProductForm from './../PublishProductForm'
import { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { productPublish ,
  updateProductData, 
  updatePictureData,
  cleanProduct, 
  toggleProductWarning } from '../../store/productReducer'

function PublishProduct(){
  const { nameProduct, buyPrice, rentPrice, quantity, brand, newUsed, description, picture, productWarning, productData, status} = useSelector (
    ({ productReducer })=>({
    nameProduct: productReducer.nameProduct,
    buyPrice: productReducer.buyPrice,
    rentPrice: productReducer.rentPrice,
    quantity: productReducer.quantity,
    brand: productReducer.brand,
    newUsed: productReducer.newUsed,
    status: productReducer.status,
    description: productReducer.description,
    picture: productReducer.picture,
    productWarning: productReducer.productWarning,
    productData: productReducer.productData,
  }))

  const [image, setImage] = useState(null)

  const dispatch = useDispatch()
  const history = useHistory()

  function handleChange(e) {
    const { name, value } = e.target
    const data = { name, value }
    dispatch(updateProductData(data))
  }

  function handleChangePic(e) {
    readFile(e.target.files[0])
    dispatch(updatePictureData(e.target.files))
  }

  function readFile(picture) {
    const reader = new FileReader()

    reader.readAsDataURL(picture)

    reader.onload = e => setImage(e.target.result)
    reader.onerror = e => dispatch(toggleProductWarning(true))
  }

  async function handleSubmit (e){
    e.preventDefault()
    dispatch(toggleProductWarning(false))

    const data = new FormData()
    if(data) {
      data.append('nameProduct', nameProduct)
      data.append('buyPrice', buyPrice)
      data.append('rentPrice', rentPrice)
      data.append('quantity', quantity)
      data.append('brand', brand)
      data.append('newUsed', newUsed)
      data.append('status', status)
      data.append('description', description)
      data.append('picture', picture[0], picture[0].name)
      dispatch(productPublish(data))
    }else{
      dispatch(toggleProductWarning(true))
      setImage(null)
    }
  }

  useEffect(() => {
    if(productData!=='' && picture!==null){
      history.push('/welcome') 
      dispatch(cleanProduct()) 
    }
  })

  return(
    <div className="App">
      <PublishProductForm
        nameProduct={nameProduct}
        buyPrice={buyPrice}
        rentPrice={rentPrice}
        quantity={quantity}
        brand={brand}
        newUsed={newUsed}
        status={status}
        description={description}
        picture={picture}
        image={image}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        handleChangePic={handleChangePic}
      />
      {productWarning && <p>Please make sure the file is the correct format </p>}
   </div>
  )
}

export default PublishProduct 