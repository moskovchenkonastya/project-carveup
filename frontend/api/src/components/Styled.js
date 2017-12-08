import styled from 'emotion/react'
import { Link } from 'react-router-dom'

export const Body = styled.div`
text-align: center;
`
export const Mappadding = styled.div`
text-align: center;
margin: 0px 100px 0px 100px;
`

export const Wrap = styled.div`
margin-top: 40vh;
margin:15px auto 25px;
padding: 22px 70px 0 22px;
-webkit-tap-highlight-color: rgba(0, 255, 0, 0);
`
export const MapBody = styled.body`
margin-left: 50%;
`


export const Title = styled.h1`
text-align: center;
margin: 60px 30px 20px 30px;
`
export const Background = styled.form`
background: blue;
width: 100%;
height: 100%;
`
const  Form = styled.form`
text-align: center;
widht: 30px;
height:50px;
`

export const MapBasics = styled.div`
text-align: center;
background: white;
width: 1200px;
height: 50px;
margin: 0px 100px 0px 100px;
`
export const Footer = styled.div`
text-align: center;
background: #FFBA12;
width: 1200px;
height: 20px;
letter-spacing:1px;
margin: 0px 100px 0px 100px;
padding: 0.5em 0;
`

const Style = styled.span`
  vertical-align: middle;
  padding: 6px 10px;
  border: 1px solid rgb(213, 213, 213);
  font-size: 14px;
  font-weight: 400;
  outline: none;
  font-family: sans-serif;
`

export const Button = styled(Style)`
  text-align: center;
  border-radius: 3px 0 0 3px;
  background: rgb(248, 248, 248);
  &:hover {
    background: rgb(238, 238, 238);
  }
`

export const Count = styled(Style)`
  margin-left: -1px;
  border-radius: 0 3px 3px 0;
  width: 100px;
`

export const StyleLink = styled.a`
  display: block;
  text-decoration: none;
  color: black;
`

export const Message = styled.h2`
  font-family: sans-serif;
  font-weight: 100;
  margin-top: 30vh;
`

export const Blue = styled.span`color: rgb(0, 128, 255);`

export const FormTitle = styled.h1`
  text-align: center;
  font-family: sans-serif;
  font-weight: 100;
  margin-top: 5vh;
  margin-bottom: 50px;
  @media (max-width: 500px) {
    margin-top: 2vh;
  }
`

export const TextField = styled.input`
  display: block;
  height: 42px;
  width: 300px;
  margin: 10px auto;
  padding: 0 12px;
  border-radius: 3px;
  border: 1px solid lightgrey;
  outline: none;
  font-size: 14px;
  box-sizing: border-box;
  appearance: none;
  &:focus {
    border-color: rgb(0, 128, 255);
  }
`

export const Submit = styled.input`
  text-align: center;
  border: none;
  color: #FF8811;
  font-size: 24px;
  background: none;
  outline: none;
  cursor: pointer;
  margin-top: 30px;
`

export const FooterLink = styled(Link)`
  text-align: center;
  position: fixed;
  left: 0;
  bottom: 15px;
  width: 100%;
  font-size: 14px;
  font-family: sans-serif;
  font-weight: 100;
  text-decoration: none;
  color: rgb(10, 10, 10);
  &:hover {
    color: rgb(0, 0, 0);
  }
`
