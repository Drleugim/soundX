import {
  StyledSection,
  StyledForm,
} from './styles'
import { useParams } from "react-router-dom"
import { useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { userDataUpdate, updateUserData, toggleUserWarning, togglePasswordWarning } from '../../store/userReducer'

function EditUser(){
  const { email, password, userName, userData } = useSelector (({ userReducer })=>({
    email: userReducer.email,
    password: userReducer.password,
    userName: userReducer.userName,
    userData: userReducer.userData,
  }))

  const dispatch = useDispatch()
  const history = useHistory()

  const { id } = useParams()
  let route = false

  useEffect(() => {
    if(userData){
      history.push('/welcome')  
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  })

  function handleChange(e) {
    const { name, value } = e.target
    const data = { name, value }
    dispatch(updateUserData(data))
  }

  function handleSubmit (e){
    e.preventDefault()
    dispatch(toggleUserWarning(false))
    dispatch(togglePasswordWarning(false))
    if(userName.length>0){
      dispatch(userDataUpdate(id,{ userName }))
      route=true
    }else{
      dispatch(toggleUserWarning(true))
    } 
  }

  return(
    <StyledSection>
			<StyledForm onSubmit={handleSubmit}>
				<label htmlFor="userName">Name: </label>
				<input
					type="userName"
					id="userName"
					name="userName"
					value={userName}
					onChange={handleChange}
				/>
				<button type="update" >Update</button>
			</StyledForm>		
		</StyledSection>
  )
}

export default EditUser