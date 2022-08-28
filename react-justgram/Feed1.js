import React, { useState } from "react";
import "../Feed/Feed.scss";

const Feed = () => {
  const [id, setId] = useState(1);
  const [comment, setComment] = useState({
    id: 0,
    comment: "",
  });
  const [comments, setComments] = useState([]);
  const onChange = (event) => {
    const { value } = event.target;
    setComment({
      comment: value,
    });
  };
  const onSubmit = (event) => {
    event.preventDefault();
    if (comment.comment === "") {
      return;
    }

    setComment("")
    setComments((commentArray) => [...commentArray, comment]);
    console.log(comments);
  };

  return (
    <section className="feed-container">
      <div className="feed-whole-wrapper">
        <div className="feed-header-wrapper">
          <div className="profile-box">
            <img className="profile-img" src="https://url.kr/x18wb7" />
            <span className="profile-id">ioni_19</span>
          </div>
          <img
            className="menu-box"
            src="https://icon-library.com/images/three-dots-icon/three-dots-icon-9.jpg"
          />
        </div>
        <div className="feed-photo-wrapper">
          <img className="feed-photo" src="https://url.kr/vjio5c" />
        </div>
        <div className="feed-comment-wrapper">
          <div className="comment-icon-box">
            <div>
              <img
                style={{ width: "27px" }}
                src="https://s3.ap-northeast-2.amazonaws.com/cdn.wecode.co.kr/bearu/heart.png"
              />
              <img src="https://han.gl/jNeMM" />
              <img src="https://cdn-icons-png.flaticon.com/512/6165/6165369.png" />
            </div>
            <img className="bookmark-icon" src="https://han.gl/HHAjy" />
          </div>
          <div className="like-comment-box">
            <img className="like-profile-img" src="https://url.kr/bv54rq" />
            <div className="like-profile-text">
              <span>252_yewon</span>님 <span>외 100,022명</span>이 좋아합니다
            </div>
          </div>
          <div className="feed-text">
            <div className="bold-14px">ioni_19</div>
            <div className="feed-content">매옹이 키링 나 사줄 사람 없</div>
            <div className="plus-content">.... 더 보기</div>
          </div>
          <div className="numbers-of-comment"> 댓글 12개 모두 보기</div>
          <ul className="comment-text-box">
            {comments.map((comment) => {
              return (
                <li key={id}>
                  <span>justcode</span>
                  {comment.comment}
                </li>
              );
            })}
          </ul>
          <p className="minute">42분 전</p>
          <form className="comment-input" onSubmit={onSubmit}>
            <input
              className="upload-id-input"
              type="text"
              placeholder="아이디"
            />
            <input
              className="upload-comment-input"
              onChange={onChange}
              value={comment.comment}
              type="text"
              placeholder="댓글 달기..."
            />
            <button className="upload-btn">게시</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Feed;
