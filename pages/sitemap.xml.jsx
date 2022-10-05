import react from "react";
import { useQuery } from "react-query";
import { getAllDrills, getAllUsers, getDrills } from "../api/api";

const Sitemap = () => {
  return null;
};

export const getServerSideProps = async ({ res }) => {
  const BASE_URL = "https://www.xn--fotbollstrning-fib.se";

  const drills = await getAllDrills();
  const users = await getAllUsers();

  const sitemap = `
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

        <url>
        <loc>https://www.xn--fotbollstrning-fib.se/</loc>
        <lastmod>2022-10-05T07:30:19+00:00</lastmod>
        <priority>1.00</priority>
        </url>
        <url>
        <loc>https://www.xn--fotbollstrning-fib.se/drills</loc>
        <lastmod>2022-10-05T07:30:19+00:00</lastmod>
        <priority>0.80</priority>
        </url>
        <url>
        <loc>https://www.xn--fotbollstrning-fib.se/about</loc>
        <lastmod>2022-10-05T07:30:19+00:00</lastmod>
        <priority>0.80</priority>
        </url>
        <url>
        <loc>https://www.xn--fotbollstrning-fib.se/contact</loc>
        <lastmod>2022-10-05T07:30:19+00:00</lastmod>
        <priority>0.80</priority>
        </url>
        <url>
        <loc>https://www.xn--fotbollstrning-fib.se/login</loc>
        <lastmod>2022-10-05T07:30:19+00:00</lastmod>
        <priority>0.80</priority>
        </url>
        <url>
        <loc>https://www.xn--fotbollstrning-fib.se/privacy</loc>
        <lastmod>2022-10-05T07:30:19+00:00</lastmod>
        <priority>0.80</priority>
        </url>
        <url>
        <loc>https://www.xn--fotbollstrning-fib.se/terms</loc>
        <lastmod>2022-10-05T07:30:19+00:00</lastmod>
        <priority>0.80</priority>
        </url>
        ${drills.docs.map((drill) => {
          console.log(drill.id);
          return `
            <url>
              <loc>
                ${BASE_URL}/drills/${drill.id}
              </loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <priority>0.9</priority>
            </url>
            `;
        })}
        ${users.docs.map((user) => {
          return `
            <url>
                <loc>
                    ${BASE_URL}/user/${user.id}
                </loc>
                <lastmod>${new Date().toISOString()}</lastmod>
                <priority>0.9</priority>
            </url>
            `;
        })}
    </urlset>
    `;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: { sitemap },
  };
};

export default Sitemap;
