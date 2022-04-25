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
import calculateTime from "../scripts/calculateTime";

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
        <div className="content">
          <h2>Diskussioner</h2>
          <div className="row">
            {discussions.map((discussion) => (
              <div className="card" key={discussion.id}>
                <div className="card-header">
                  <Link to={`/discussion/${discussion.id}`}>
                    {discussion.data().title}
                  </Link>
                  <hr />
                </div>
                <div className="card-footer">
                  <small>
                    {calculateTime(discussion.data().created.seconds)}
                  </small>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="content">
          <h2>Senaste uppdateringarna</h2>
          <div className="row">
            {news.map((news) => (
              <div className="card" key={news.id}>
                <div className="card-header">
                  <Link to={`/news/${news.id}`}>{news.data().title}</Link>
                </div>
                <div className="card-footer">
                  <small>{calculateTime(news.data().created.seconds)}</small>{" "}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
