import { MainStyle } from './styles'

function PublishProductForm({ 
  nameProduct, 
  buyPrice, 
  rentPrice, 
  description, 
  image,
  handleSubmit,
  handleChange,
  handleChangePic,}){

  return (
    
      <MainStyle>
        <form onSubmit={handleSubmit}>
          <section>
            <label htmlFor="nameProduct">Name of your product: </label>
            <input
              type="text"
              id="name"
              name="nameProduct"
              value={nameProduct}
              onChange={handleChange}
            />
          </section>
          <section>
            <label htmlFor="buyPrice">Buy cost: </label>
            <input
              type="number"
              id="buyPrice"
              name="buyPrice"
              value={buyPrice}
              onChange={handleChange}
            />
          </section>
          <section>
            <label htmlFor="rentPrice">Rent cost: </label>
            <input
              type="number"
              id="rentPrice"
              name="rentPrice"
              value={rentPrice}
              onChange={handleChange}
            />
          </section>
          <section>
            <label htmlFor="description" placeholder="Write something...">
              Short description of your product: 
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={description}
              onChange={handleChange}
            />
          </section>
          <section>
            <label htmlFor="picture">Upload Picture: </label>
            <input
              type="file"
              accept="image/*"
              id="picture"
              name="picture"
              onChange={handleChangePic}
            />
          </section>
          <section>
              <label htmlFor="image"> Picture to upload: </label>
              {image && <img src={image} alt="picture preview" style={{width:"250px"}}/>}
          </section>
          <section>
            <button
              type="submit"
            >
              Publish
            </button>
          </section>
        </form>
      </MainStyle>
   
  )
}

export default PublishProductForm; 