import Link from "next/link";
import { useQuery } from "react-query";
import { getAllUsers } from "../../api/api";

export default function Users() {
  const { data, status } = useQuery("admin users", async () => {
    const users = getAllUsers();
    return users;
  });

  console.log(data);

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
              <th scope="col">Email</th>
              <th scope="col">Joined</th>
              <th scope="col">Last sign in</th>
              <th scope="col">role</th>
              <th scope="col">Bild</th>
            </tr>
          </thead>
          <tbody>
            {data.docs.map((user) => (
              <tr>
                <td>
                  <Link href={`/user/${user.id}`}>
                    <a>{user.data().name}</a>
                  </Link>
                </td>
                <td>{user.data().email}</td>
                <td>{user.data().joined}</td>
                <td>{user.data().lastSignInTime}</td>
                <td>{user.data().role}</td>
                <td>
                  <img
                    src={user.data().photo ? user.data().photo : "/user.png"}
                    alt="user"
                    className="img-fluid"
                    style={{ width: "50px" }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="3">Antal användare: {data.docs.length}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
