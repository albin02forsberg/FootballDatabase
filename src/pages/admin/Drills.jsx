import { collection, getDocs } from "firebase/firestore";
import React from "react";
import { useEffect } from "react";
import { db } from "../../firebase-config";
import { Link } from "react-router-dom";
import Loading from "../../modules/Loading";
import { Box, Container } from "@mui/system";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

export default function Drills() {
  const [drills, setDrills] = React.useState([]);

  // Get drills from firebase
  useEffect(() => {
    const drillsCollectionRef = collection(db, "drills");
    getDocs(drillsCollectionRef).then((docs) => {
      setDrills(docs.docs);
    });
  }, []);

  if (!drills.length) {
    return <Loading />;
  }

  return (
    <Container>
      <Box mb={3}></Box>
      <Box mb={3}>
        <Typography variant="h4">Övningar</Typography>
      </Box>
      <Box mb={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Namn</TableCell>
              <TableCell>Skapare</TableCell>
              <TableCell>Redigera</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {drills.map((drill) => {
              return (
                <TableRow key={drill.id}>
                  <TableCell>{drill.data().name}</TableCell>
                  <TableCell>{drill.data().uname}</TableCell>
                  <TableCell>
                    <Link to={`/admin/drills/${drill.id}`}>Redigera</Link>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Antal övningar: {drills.length}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </Box>
      <Box mb={3}></Box>
      <Box mb={3}>
        <Link to="/admin/drills/new">Skapa ny övning</Link>
      </Box>
    </Container>
    //   <h1>Drills</h1>
    //   <div className="table-responsive">
    //     <table className="table table-striped">
    //       <thead>
    //         <tr>
    //           <th>Namn</th>
    //           <th>Skapare</th>
    //           <th>Redigera</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {drills.map((drill) => (
    //           <tr key={drill.id}>
    //             <td>
    //               <Link to={"/drill/" + drill.id}>{drill.data().name}</Link>
    //             </td>
    //             <td>
    //               <Link to={"/user/" + drill.data().uid}>
    //                 {drill.data().uname}
    //               </Link>
    //             </td>
    //             <td>
    //               <Link to={"/editDrill/" + drill.id}>
    //                 <button className="btn btn-primary">Redigera</button>
    //               </Link>
    //             </td>
    //           </tr>
    //         ))}
    //       </tbody>
    //     </table>
    //   </div>
    // </div>
  );
}
