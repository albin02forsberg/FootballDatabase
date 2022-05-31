import {
  Button,
  Card,
  Divider,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
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
import React, { lazy, Suspense, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { auth, db } from "../firebase-config";
import Loading from "../modules/Loading";

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
    <Container>
      {article && (
        <Box>
          <Typography variant="h4">{article.data().title}</Typography>
          <Divider />
          <Typography variant="body1">{article.data().content}</Typography>
          <Typography variant="body1">
            Skrivet av:{" "}
            <Link to={"/user/" + article.data().uid}>
              {article.data().uname}
            </Link>{" "}
          </Typography>
          <Divider />
        </Box>
      )}
      <Box>
        <FormControl fullWidth>
          <Typography variant="h6">Kommentera</Typography>
          <Box mb={2} />
          <TextField
            field="comment"
            value={comment}
            label="Kommentar"
            onChange={setComment}
          />
          <Box mb={2} />
          <Button onClick={postComment}>Kommentera</Button>
        </FormControl>
      </Box>
      <Box>
        {comments &&
          comments.map((comment) => (
            <Box mb={3}>
              <Card mb={6} key={comment.id}>
                <Suspense fallback={<Loading />} key={comment.id}>
                  <Comment comment={comment} key={comment.id} />
                </Suspense>
              </Card>
            </Box>
          ))}
      </Box>
    </Container>
  );
}
