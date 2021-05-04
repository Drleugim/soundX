import axios from 'axios'
import { StyledPay } from '../Payment/styles'
import { useEffect } from 'react'
import { useSelector} from 'react-redux'
import { useLocation} from 'react-router-dom'

function queryString(query) {
  const res = {}
  query
    .replace('?', '')
    .split('&')
    .forEach(q => {
      const [key, value] = q.split('=')
      res[key] = value
    })
  return res
}

function Payment() {
  const location = useLocation()
  const { amount } = useSelector(({productReducer}) => ({amount: productReducer.cartAmount})) 
  const { email } = useSelector (({userReducer})=>({email: userReducer.userEmail}))

  useEffect(() => {
    const { ref_payco } = queryString(location.search)

    axios({
      method: 'GET',
      baseURL: 'https://secure.epayco.co',
      url: `/validation/v1/reference/${ref_payco}`,
    })
      .then(({ data }) => console.log(data))
  }, [location])

  const handler = window.ePayco.checkout.configure({
    key: process.env.REACT_APP_EPAYCO_PUBLIC_KEY,
    test: true,
  })

  const data = {
    external: 'false',
    autoclick: false,

    amount,
    name: 'SoundX',
    description: 'SoundX-Products',
    currency: 'usd',

    country: 'CO',
    lang: 'en',
    tax: '0',
    tax_base: '0',

    invoice: 'INV123456784',
    extra1: email,

    response: process.env.REACT_APP_SUCCESS_PAYMENT_URL,

    name_billing: email,
    address_billing: 'Cra 115 # 43A - 62',
    type_doc_billing: 'cc',
    number_doc_billing: '4575623182290326',
    mobilephone_billing: '3207904865',
    methodsDisable: ["CASH", "SP", "DP"],
    
  }

  function handlePayment() {  
    handler.open(data)
  }

  return (
    <div>
      <StyledPay type="button" onClick={handlePayment}>
        Pay
      </StyledPay>
    </div>
  )
}

export default Payment