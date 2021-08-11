import { useContext, useEffect, useState } from "react";
import { firestore } from "./firebase";

import { AuthContext } from "./AuthProvider";

let VideoCard = (props) => {
  let [boxOpen, setBoxOpen] = useState(false);
  let [playing, setPlaying] = useState(false);
  let [currentUserComment, setCurrentUserComment] = useState("");
  let [allComments, setAllComments] = useState([]);

  let value = useContext(AuthContext);

  useEffect(() => {
    let f = async () => {
      let allCommentId = props.post.comments;
      let arr = [];

      for (let i = 0; i < allCommentId.length; i++) {
        let id = allCommentId[i];

        let doc = await firestore.collection("comments").doc(id).get();
        let commentData = { ...doc.data(), id: doc.id };
        arr.push(commentData);
      }

      setAllComments(arr);
    };

    f();
  }, [props]);


  return (
    <div className="video-card">

      {/* <video src="https://www.youtube.com/watch?v=Cp2GPuhQrjw"></video> */}
      <video onClick={(e) => {
        if (playing) {
          setPlaying(false);
          e.currentTarget.pause();
        } else {
          setPlaying(true);
          e.currentTarget.play();
        }
      }}
        src={props.post.url}
      ></video>

      <span class="material-icons-outlined" style={{ color: "white" , position: "absolute" ,
    left : "0px" }}>
        chevron_left
      </span>

      <span class="material-icons-outlined like">favorite_border</span>
      <span class="material-icons-outlined comment" style={{ color: "black" }} onClick={() => {
        if (boxOpen) setBoxOpen(false);
        else setBoxOpen(true);
      }}>
        chat_bubble_outline
      </span>
      <span class="material-icons-outlined share" style={{ color: "black" }}>
        send
      </span>

      <p className="username" style={{ color: "black" }}>
        <b>{props.post.username}</b>
      </p>
      <p className="song" style={{ color: "black" }}>
        <span class="material-icons-outlined">music_note</span>
        <marquee>{props.post.username} <br /> | Original Audio |</marquee>
      </p>

      {boxOpen ? (
        <div className="comment-box">
          <button
            className="comment-box-close-btn"
            onClick={() => {
              setBoxOpen(false);
            }}
          >
            X
          </button>

          <div className="all-comments">
            {allComments.map((comment, index) => {
              return (
                <div key={index}>
                  <img className="img-home" src={comment.pic} />
                  <div>
                    <p>
                      <b>{comment.username}</b>
                    </p>
                    <p className="inner-comment">{comment.comment}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="comment-form">
            <input
              type="text"
              value={currentUserComment}
              onChange={(e) => {
                setCurrentUserComment(e.currentTarget.value);
              }}
            />
            <button
              onClick={() => {
                let p = firestore.collection("comments").add({
                  comment: currentUserComment,
                  username: value.displayName,
                  pic: value.photoURL,
                });

                setCurrentUserComment("");

                p.then((docRef) => {
                  return docRef.get();
                }).then((doc) => {
                  firestore
                    .collection("posts")
                    .doc(props.post.id)
                    .update({
                      comments: [...props.post.comments, doc.id],
                    });
                });
              }}
            >
              Post
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default VideoCard;