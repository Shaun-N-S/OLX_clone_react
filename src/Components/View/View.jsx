import React,{useEffect,useContext,useState} from 'react';
import { collection, query, where, getDocs } from "firebase/firestore";


import './View.css';
import { PostContext } from '../../store/postContext';
import firebase from 'firebase/compat/app';
import { db } from '../../firebase/config';
function View() {
  const [userDetails,setUserDetails] = useState()
  const {postDetails} = useContext(PostContext)

  // useEffect(()=>{
  //   const {userId} = postDetails
  //   firebase.firestore().collection.where('id','==',userId).get().then((res)=>{
  //     res.forEach(doc => {
  //       setUserDetails(doc.data())
  //     })
  //   })
  // },[])

  // 
  useEffect(()=>{
    const {user} = postDetails
    console.log(postDetails)
    const q = query(collection(db, "users"), where("id", "==", user));
  
    getDocs(q).then((querySnapshot)=>{
      // console.log(querySnapshot)
      querySnapshot.forEach((doc) => {
        setUserDetails(doc.data())
        console.log(doc.data())
      })
    })

  },[])

  

  // 

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.url}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>Tue May 04 2021</span>
        </div>
        {userDetails && <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails.username}</p>
          <p>{userDetails.phone}</p>
        </div>}
      </div>
    </div>
  );
}
export default View;
