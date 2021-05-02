import Header from './../../components/Header'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { emptyCart } from '../../store/productReducer'

function SuccessPayment(){
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(emptyCart())
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return(
        <main>
            <Header/>
            <p>Pago Exitoso</p>
        </main>
    )
}
     
export default SuccessPayment