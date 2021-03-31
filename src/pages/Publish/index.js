import PublishProductForm from '../../components/PublishProductForm'
import { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { productPublish ,updateProductData, updatePictureData, toggleProductWarning } from '../../store/productReducer'
import { userLogout } from '../../store/userReducer'

function Publish(){
  const { nameProduct, buyPrice, rentPrice, description, picture, productWarning, productData} = useSelector (
    ({ productReducer })=>({
    nameProduct: productReducer.nameProduct,
    buyPrice: productReducer.buyPrice,
    rentPrice: productReducer.rentPrice,
    description: productReducer.description,
    picture: productReducer.picture,
    productWarning: productReducer.productWarning,
    productData: productReducer.productData,
  }))

  const [image, setImage] = useState(null)

  const dispatch = useDispatch()
  const history = useHistory()

  function handleLogout(e){
    e.preventDefault()
    dispatch(userLogout())
    localStorage.clear()
    history.push('/')
  }

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
    }
  })

  return(
    <div className="App">
      <PublishProductForm
        nameProduct={nameProduct}
        buyPrice={buyPrice}
        rentPrice={rentPrice}
        description={description}
        picture={picture}
        image={image}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        handleLogout={handleLogout}
        handleChangePic={handleChangePic}
      />
      {productWarning && <p>Please make sure the file is the correct format </p>}
   </div>
  )
  
}

export default Publish