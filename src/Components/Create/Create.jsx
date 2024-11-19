import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import {AuthContext} from '../../store/authContext'
import axios from 'axios';
import { addDoc, collection } from 'firebase/firestore';
import {db} from '../../firebase/config'
import { useNavigate } from 'react-router-dom';



const Create = () => {
  const navigate = useNavigate();

  const {user} = useContext(AuthContext)

  const [name,setName] = useState('');
  const [category,setCategory] = useState('');
  const [price,setPrice] = useState('')
  const [image,setImage] = useState(null)

  const handleSubmit = async (e)=>{
    e.preventDefault();
    const url = 'https://api.cloudinary.com/v1_1/djfuu8l1u/image/upload';
    const formData = new FormData();
    formData.append('file',image)
    formData.append('cloud_name','djfuu8l1u')
    formData.append('upload_preset','products')
    const imageData = await axios.post(url, formData)
    console.log(imageData)
    console.log(user)
    const data = await addDoc(collection(db,'production'),{name,category,price,url:imageData.data.secure_url??'',user:user.uid})
    navigate('/')
  }

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              value={name}
              id="fname"
              onChange={(e) => setName(e.target.value)}
              name="Name"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              value={category}
              id="fname"
              onChange={(e) => setCategory(e.target.value)}
              name="category"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input
             className="input"
             type="number"
             value={price}
             id="fname"
             onChange={(e) => setPrice(e.target.value)}
             name="Price" />
            <br />
          
          <br />
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ''}></img>
          
            <br />
            <input onChange={(e)=>{
              setImage(e.target.files[0])
            }} type="file" />
            <br />
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
          
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
