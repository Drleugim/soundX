import { MainStyle } from './styles'

function PublishProductForm({ 
  nameProduct, 
  buyPrice, 
  rentPrice,
  quantity,
  brand, 
  description,
  newUsed, 
  status,
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
            <label htmlFor="quantity">Quantity: </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={quantity}
              onChange={handleChange}
            />
          </section>
          <section>
            <label htmlFor="brand">Brand: </label>
            <input
              type="text"
              id="brand"
              name="brand"
              value={brand}
              onChange={handleChange}
            />
          </section>
          <label htmlFor="newUsed">
              Is it new or used:
          </label>
          <section>
            <select 
            name="newUsed" 
            id="newUsed" 
            value={newUsed}
            onChange={handleChange}
            >
              <option value="state">State</option>
              <option value="new">New</option>
              <option value="used">Used</option>
            </select>
          </section>
          <section>
            <select 
            name="status" 
            id="status" 
            value={status}
            onChange={handleChange}
            >
              <option value="sell">For Sale</option>
              <option value="rent">For Rent</option>
              <option value="sellAndRent">For Sale and Rent</option>
            </select>
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