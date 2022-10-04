import Link from "next/link";
import { useQuery } from "react-query";
import { getAllDrills, getDrills } from "../../api/api";

export default function Drills() {
  const { data, status } = useQuery("admin drills", async () => {
    const drills = getAllDrills();
    return drills;
  });

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div class="container px-5 my-5">
      <div className="table-responsive">
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">Namn</th>
              <th scope="col">Typ</th>
              <th scope="col">User name</th>
            </tr>
          </thead>
          <tbody>
            {data.docs.map((drill) => (
              <tr>
                <td>
                  <Link href={`/drills/${drill.id}`}>
                    <a>{drill.data().name}</a>
                  </Link>
                </td>
                <td>{drill.data().type}</td>
                <td>
                  <Link href={`/user/${drill.data().uid}`}>
                    <a>{drill.data().uname}</a>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="3">Antal övningar: {data.docs.length}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
