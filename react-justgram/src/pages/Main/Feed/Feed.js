import React, { useState, useEffect } from "react";
import Comment from "./Comment";
import "./Feed.scss";

const Feed = ({ feed }) => {
  const { id, userId, profileImg, photoUrl, content, numOfComments } = feed;

  const [comment, setComment] = useState("");
  const [nickname, setNickname] = useState("");
  const [commentArr, setCommentArr] = useState([]);
  const [keyId, setKeyId] = useState(commentArr.length);
  const [numOfComment, setNumOfComment] = useState(numOfComments);

  useEffect(() => {
    fetch("http://localhost:3000/data/commentData.json")
      .then((res) => res.json())
      .then((data) => {
        setCommentArr(data);
      });
  }, []);

  const handleInput = (e) => {
    const { id, value } = e.target;
    if (id === "upload-id-input") setNickname(value);
    else if (id === "upload-comment-input") setComment(value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (comment === "") {
      return;
    }

    const newComment = {
      id: keyId,
      feedId: id,
      userId: nickname === "" ? "justcode" : nickname,
      content: comment,
    };
    setComment("");
    setNickname("");
    setCommentArr((currentArr) => [...currentArr, newComment]);
    setKeyId(commentArr.length + 1);
    setNumOfComment((current) => current + 1);
  };

  return (
    <section className="feed-container">
      <div className="feed-whole-wrapper">
        <div className="feed-header-wrapper">
          <div className="profile-box">
            <img className="profile-img" alt="profile-img" src={profileImg} />
            <span className="profile-id"> {userId} </span>
          </div>
          <img className="menu-icon" alt="menu-icon" src="img/menuicon.png" />
        </div>
        <div className="feed-photo-wrapper">
          <img className="feed-photo" alt="feed" src={photoUrl} />
        </div>
        <div className="feed-comment-wrapper">
          <div className="comment-icon-box">
            <div>
              <img
                style={{ width: "27px" }}
                alt="heart-icon"
                src="img/heart.png"
              />
              <img alt="comment-icon" src="img/comment.png" />
              <img alt="DM-icon" src="img/dmicon.png" />
            </div>
            <img
              className="bookmark-icon"
              alt="bookmark-icon"
              src="img/bookmark.png"
            />
          </div>
          <div className="like-comment-box">
            <img
              className="like-profile-img"
              alt="profile-img"
              src="https://url.kr/bv54rq"
            />
            <div className="like-profile-text">
              <span>252_yewon</span>님 <span>외 100,022명</span>이 좋아합니다
            </div>
          </div>
          <div className="feed-text">
            <div className="bold-14px">{userId}</div>
            <div className="feed-content">{content}</div>
            <div className="plus-content">.... 더 보기</div>
          </div>
          <div className="numbers-of-comment">
            댓글 {numOfComment}개 모두 보기
          </div>
        </div>
        <Comment
          commentArr={commentArr}
          feedUniqueId={id}
          setCommentArr={setCommentArr}
          setNumOfComment={setNumOfComment}
        />
        <p className="minute">42분 전</p>
        <form className="comment-input" onSubmit={onSubmit}>
          <input
            id="upload-id-input"
            onChange={handleInput}
            value={nickname}
            type="text"
            placeholder="아이디"
          />
          <input
            id="upload-comment-input"
            onChange={handleInput}
            value={comment}
            type="text"
            placeholder="댓글 달기..."
          />
          <button
            className="upload-btn"
            style={{ opacity: comment !== "" ? 1 : 0.5 }}
          >
            게시
          </button>
        </form>
      </div>
    </section>
  );
};

export default Feed;
