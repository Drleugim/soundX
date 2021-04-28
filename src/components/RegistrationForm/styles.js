import styled from 'styled-components'

export const StyledSection = styled.section`
    display: flex;
    align-items: center; 
    flex-flow: column;
    width: 400px;
    height: 500px;
    margin-top: 15%;
    border: 2px solid #000;
    border-radius: 10px;
    box-shadow: 5px 5px lightgreen;
    background-color: white;
`
export const StyledForm = styled.form`
    width: 300px;
    height: 300px;
    margin-top: -40px;
    align-items: center;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;

    button{
        font-size: 1em;
        width: 8rem;
        height: 2.5rem;
        background-color: green;
        color: white;
        margin-top: 15px;
        border: 2px solid white;
        border-radius: 6px;
    }
    label{
        margin-top: 10px;
        align-self: flex-start;
    }
    input{
        margin-top: 5px;
        width:300px;
    }

`