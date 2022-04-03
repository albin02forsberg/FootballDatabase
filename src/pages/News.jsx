import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase-config";

export default function News() {
  const { id } = useParams();
  const [article, setArticle] = React.useState(null);
  const [comments, setComments] = React.useState(null);

  // Get article from firestore and set state to article
  const articleCollectionRef = collection(db, "news");
  const articleRef = doc(articleCollectionRef, id);

  // Get article from firestore and set state to article
  useEffect(() => {
    getDoc(articleRef)
      .then((article) => {
        setArticle(article);
      })
      .catch((error) => {
        console.log(error);
      });
    const commentRef = collection(db, "news/comments", id);

    const commentQ = query(
      commentRef,
      orderBy("created"),
      where("show", "==", true)
    );
    getDocs(commentQ)
      .then((comments) => {
        setComments(comments.docs);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id, articleRef]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          {article && (
            <div>
              <h1>{article.data().title}</h1>
              <hr></hr>
              <p>{article.data().content}</p>

              <p>Skrivet av: {article.data().uname}</p>
              <hr />
            </div>
          )}
        </div>
      </div>
      <div className="row">
        <div className="col-md-12"></div>
        <div className="col-md-12">
          {comments && (
            <div className="comments">
              <h2>Kommentarer</h2>
              {comments.map((comment) => (
                <div key={comment.id} className="comment">
                  <p>{comment.data().content}</p>
                  <p>Skrivet av: {comment.data().uname}</p>
                  <hr />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
