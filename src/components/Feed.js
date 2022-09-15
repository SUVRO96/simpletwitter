import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";
import { useSelector } from "react-redux";

const Feed = () => {
  const text = useRef();
  const [postItem, setPostItem] = useState([]);
  const [successPost, setSuccessPost] = useState(false);
  const loginData = useSelector(state => state.login.loginDataRedux);
  const navigate = useNavigate();

  const submitPost = async () => {
    if (text.current.value !== "") {
      const url = "http://localhost:4000/tweets/addtweet";
      const tempObj = {};
      tempObj.tweetid = "p" + parseInt(Math.random() * 100000000000);
      tempObj.userid = loginData.userid;
      tempObj.name = loginData.name;
      tempObj.text = text.current.value;
      const response = await axios.post(url, tempObj);
      if (response.status === 201) {
        setSuccessPost(true);
      }
      text.current.value = "";
      setTimeout(() => {
        setSuccessPost(false);
      }, 2000);
    }
  };
  const callItemApi = async () => {
    const url = "http://localhost:4000/tweets/alltweets";
    try {
      const response = await axios.get(url);
      setPostItem(response.data.reverse());
      console.log(postItem);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!loginData) {
      navigate("/login");
    }
  });

  useEffect(() => {
    callItemApi();
    console.log(postItem);
  }, [successPost]);

  return (
    <div className="d-flex">
      <LeftSide />
      <section className="col-8 m-2" style={{ backgroundColor: "gray" }}>
        <div className="d-flex">
          <img
            src="https://i.pinimg.com/736x/25/78/61/25786134576ce0344893b33a051160b1.jpg"
            className="profile_pic"
            alt="profile"
          />
          <p className="profile_name"></p>
        </div>
        <div className="d-flex flex-column rounded text-center">
          <textarea
            className="m-2 border rounded p-2"
            ref={text}
            placeholder="What's on your mind..."
          ></textarea>
          <span className="align-self-end">
            <button className="btn btn-sm btn-info mx-2" onClick={submitPost}>
              Post
            </button>
          </span>
        </div>
        <hr />
        {successPost && (
          <p className="alert alert-success m-2" role="alert">
            successfully posted..
          </p>
        )}

        <div
          className="d-flex flex-column m-2 border border-dark rounded"
          style={{ backgroundColor: "lightgray" }}
        >
          {postItem &&
            postItem.map(item => (
              <div
                key={item.id}
                className="m-1 border rounded"
                style={{ backgroundColor: "white" }}
              >
                <div className="m-1">
                  <div className="d-flex justify-content-between">
                    <span className="d-flex">
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/21/21294.png"
                        alt="profile"
                        style={{ height: "20px", width: "20px" }}
                      />
                      <p style={{ fontWeight: "bold" }}>{item.name}</p>
                    </span>
                  </div>
                  {item.text && <p className="ps-3 post-text">{item.text}</p>}
                  {item.itemImage && <img src={item.itemImage} alt="post" />}
                </div>
              </div>
            ))}
        </div>
      </section>
      <RightSide />
    </div>
  );
};

export default Feed;
