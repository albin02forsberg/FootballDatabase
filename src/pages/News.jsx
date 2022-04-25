import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { lazy, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { auth, db } from "../firebase-config";

const Comment = lazy(() => {
  return Promise.all([
    import("../modules/Comment"),
    new Promise((resolve) => setTimeout(resolve, 500)),
  ]).then(([moduleExports]) => moduleExports);
});

export default function News() {
  const { id } = useParams();
  const [article, setArticle] = React.useState(null);
  const [comments, setComments] = React.useState(null);

  const [comment, setComment] = React.useState("");

  // Get article from firestore and set state to article

  // Get article from firestore and set state to article
  useEffect(() => {
    document.title = "Nyheter";
    const articleCollectionRef = collection(db, "news");
    const articleRef = doc(articleCollectionRef, id);
    getDoc(articleRef)
      .then((article) => {
        setArticle(article);
        const commentRef = collection(db, "news/" + article.id + "/comments");

        const commentQ = query(
          commentRef,
          where("content", ">", ""),
          orderBy("content")
        );
        getDocs(commentQ)
          .then((comments) => {
            setComments(comments.docs);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const postComment = async () => {
    console.log("postComment");
    const commentsCollectionRef = collection(db, "news/" + id + "/comments");
    const data = {
      content: comment,
      uname: auth.currentUser.displayName,
      uid: auth.currentUser.uid,
      created: new Date(),
    };
    addDoc(commentsCollectionRef, data).then((doc) => {
      setComment("");
      console.log(doc);
      window.location.reload();
    });
  };

  return (
    <div className="container">
      <div className="row">
        {article && (
          <div>
            <h1>{article.data().title}</h1>
            <hr></hr>
            <p>{article.data().content}</p>

            <p>
              Skrivet av:{" "}
              <Link to={"/user/" + article.data().uid}>
                {article.data().uname}
              </Link>{" "}
            </p>
            <hr />
          </div>
        )}
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="form">
            <label htmlFor="comment">Kommentar</label>
            <textarea
              className="form-control"
              placeholder="Kommentar"
              onChange={(e) => {
                setComment(e.target.value);
              }}
            />
            <button className="btn btn-primary" onClick={postComment}>
              Kommentera
            </button>
          </div>
        </div>
      </div>
      <div className="row">
        {comments &&
          comments.map((comment) => (
            <div className="col-md-12">
              <Comment comment={comment} />
            </div>
          ))}
      </div>
    </div>
  );
}
