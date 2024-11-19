import React, { useState, useEffect, useContext } from "react";
import Heart from "../../assets/Heart";
import "./Post.css";
import { db } from "../../firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { PostContext } from "../../store/postContext";
import { useNavigate } from "react-router-dom";

function Posts() {
  const [products, setProducts] = useState([]);
  const { setPostDetails } = useContext(PostContext);
  const navigate = useNavigate();

  useEffect(() => {
    getDocs(collection(db, "production")).then((querySnapshot) => {
      const arr = [];
      querySnapshot.forEach((doc) => {
        arr.push({ id: doc.id, ...doc.data() });
      });
      setProducts(arr);
      console.log(arr);
    });
  }, []);

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {products.map((product) => (
            <div
              className="card"
              key={product.id}
              onClick={() => {
                setPostDetails(product);
                navigate("/view");
              }}
            >
              <div className="favorite">
                <Heart />
              </div>
              <div className="image">
                <img src={product.url} alt={product.name} />{" "}
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {product.price}</p>
                <span className="kilometer">{product.category}</span>
                <p className="name">{product.name}</p>
              </div>
              <div className="date">
                <span>Thu,7 Nov 2024</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
        {products.map((product) => (
          <div className="card"
          key={product.id}
          onClick={() => {
            setPostDetails(product);
            navigate("/view");
          }}
          >
            <div className="favorite">
              <Heart />
            </div>
            <div className="image">
            <img src={product.url} alt={product.name} />{" "}
            </div>
            <div className="content">
              <p className="rate">&#x20B9;  {product.price}</p>
              <span className="kilometer">{product.category}</span>
              <p className="name">{product.name}</p>
            </div>
            <div className="date">
              <span>Thu,7 Nov 2024</span>
            </div>
          </div>
          )).reverse()}
        </div>
      </div>
    </div>
  );
}

export default Posts;
