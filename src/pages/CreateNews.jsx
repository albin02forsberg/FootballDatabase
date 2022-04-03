import { addDoc, collection } from "firebase/firestore";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase-config";

export default function CreateNews() {
  let navigate = useNavigate();
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");

  useEffect(() => {
    if (!auth.currentUser) {
      navigate("/");
    }
  }, [navigate]);

  const post = async () => {
    const newsCollectionRef = collection(db, "news");
    const news = {
      title,
      content,
      uname: auth.currentUser.displayName,
      uid: auth.currentUser.uid,
      created: new Date(),
      isUpdate: true,
    };
    addDoc(newsCollectionRef, news).then((doc) => {
      // Add comments collection to news document
      const commentsCollectionRef = collection(db, "news", "comment", doc.id);
      addDoc(commentsCollectionRef, { show: false }).then((doc) => {
        // Add reference to comments collection to news document
        const newsRef = db.collection("news").doc(doc.id);
        newsRef.update({
          comments: doc.id,
        });
      });

      navigate("/news/" + doc.id);
    });
  };

  return (
    <div className="container">
      <h1>Skapa nyhet</h1>

      <div className="mb-3">
        <label class="form-label">Rubrik</label>
        <input
          className="form-control"
          placeholder="Nyhetsrubrik"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />

        <label class="form-label">Innehåll</label>
        <textarea
          className="form-control"
          placeholder="Nyhetsinnehåll"
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />

        <button className="btn btn-primary" onClick={post}>
          Posta
        </button>
      </div>
    </div>
  );
}
