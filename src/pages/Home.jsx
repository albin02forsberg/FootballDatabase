import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect } from "react";
import { db } from "../firebase-config";
import { Link } from "react-router-dom";

export default function Home() {
  const [news, setNews] = React.useState([]);
  const [discussions, setDiscussions] = React.useState([]);

  useEffect(() => {
    document.title = "Hem";
    const newsRef = collection(db, "news");
    const newsQ = query(
      newsRef,
      orderBy("created", "desc"),
      where("isUpdate", "==", true),
      limit(3)
    );
    getDocs(newsQ).then((docs) => {
      setNews(docs.docs);
    });
    const discussionsQ = query(
      newsRef,
      orderBy("created", "desc"),
      where("isUpdate", "==", false),
      limit(3)
    );
    getDocs(discussionsQ).then((docs) => {
      setDiscussions(docs.docs);
    });
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h1>Välkommen</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <h2>Diskussioner</h2>
          {discussions &&
            discussions.map((discussion) => (
              <div className="card mb-3">
                <div className="card-body">
                  <h5 className="card-title">{discussion.data().title}</h5>
                  <p className="card-text">{discussion.data().content}</p>
                  <Link to={`/news/${discussion.id}`}>
                    <button className="btn btn-primary">Läs mer</button>
                  </Link>
                </div>
              </div>
            ))}
        </div>
        <div className="col-md-6">
          <h2>Senaste uppdateringarna</h2>
          {news &&
            news.map((news) => (
              <div className="card mb-3">
                <div className="card-body">
                  <Link to={"news/" + news.id}>
                    <h5 className="card-title">{news.data().title}</h5>
                  </Link>
                  <p className="card-text">{news.data().content}</p>
                  <p className="card-text">Skrivet av: {news.data().uname}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
