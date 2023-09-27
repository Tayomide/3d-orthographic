import React from 'react'
import { styled } from 'styled-components'
import { STLLoader } from 'three/addons/loaders/STLLoader';

export const Navbar = ({ setRotation, setStl }) => {

  const handleChange = (e) => {
    const view = e.target.value
    switch (view) {
      case "front":
        setRotation([0, 0, 0])
        break;
      case "top":
        setRotation([-Math.PI/2, 0, 0])
        break;
      case "rside":
        setRotation([0, -Math.PI/2, 0])
        break;
      case "back":
        setRotation([0, Math.PI, 0])
        break;
      case "bottom":
        setRotation([Math.PI/2, 0, 0])
        break;
      case "lside":
        setRotation([0, Math.PI/2, 0])
        break;
      default:
        setRotation([0, 0, 0])
        break;
    }
  }

  const handleModelChange = (e) => {
    const loader = new STLLoader();
    loader.load(e.target.value, (geometry) => {
      setStl(geometry);
    });
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      loadSTL(file);
    }
  };

  const loadSTL = (file) => {
    const loader = new STLLoader();
    loader.load(URL.createObjectURL(file), (geometry) => {
      setStl(geometry);
    });
  };

  return (
    <Container>
      <select onChange={handleChange}>
        <option value="front">Front View</option>
        <option value="top">Top View</option>
        <option value="rside">Right Side View</option>
        <option value="back">Back View</option>
        <option value="bottom">Bottom View</option>
        <option value="lside">Left Side View</option>
      </select>
      <select onChange={handleModelChange}>
        <option hidden>Select a Model</option>
        <option value="3d%20model%201.STL">Model 1</option>
        <option value="3d%20model%202.STL">Model 2</option>
        <option value="3d%20model%203.STL">Model 3</option>
        <option value="3d%20model%205.STL">Model 5</option>
        <option value="3d%20model%206.STL">Model 6</option>
        <option value="lab%203%20excersise%201.STL">Model 7</option>
        <option value="lab%203%20exercise%202.STL">Model 8</option>
        <option value="Lab%203%20exercise%203.STL">Model 9</option>

      </select>
      <button onClick={() => setRotation([Math.PI/8, Math.PI/8, 0])}>Reset View</button>
      <label htmlFor='upload'>
        <input type='file' name="upload" id='upload' accept=".stl" onChange={handleFileChange}/>
        <span>Upload model</span>
      </label>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 2.1em;
  width: 100%;
  background-color: white;
  padding: 0 0.2em;
  align-items: center;
  select{
    height: 2em;
    border: 1px solid #e2e2e2;
    outline: 0;
    border-radius: 0.5em;
    padding: 0.2em;
    cursor: pointer;
  }
  button{
    margin-left: 0.5em;
    height: 2em;
    border: 1px solid #e2e2e2;
    border-radius: 0.5em;
    outline: 0;
    padding: 0.1em 1.5em;
    cursor: pointer;
    background-color: transparent;
    &:hover{
      background-color: #f6f6f6;
    }
  }
  label{
    margin-left: 0.5em;
    font-size: 0.8em;
    height: 2em;
    border: 1px solid #e2e2e2;
    border-radius: 0.5em;
    outline: 0;
    padding: 0.1em 1em;
    cursor: pointer;
    background-color: transparent;
    display: inline-flex;
    align-items: center;
    &:hover{
      background-color: #f6f6f6;
    }
    input{
      display: none;
    }
    span{
      font-size: 1.15em;
      height: max-content;
    }
  }
`