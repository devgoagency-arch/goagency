import dns from "node:dns";
import { promisify } from "node:util";

const lookup = promisify(dns.lookup);
const URL_STR = "https://goestrategiacreativa.goestrategiacreativa.com/graphql";
const query = `
query GetProyectoTerms {
  proyectos(first: 3) {
    nodes {
      id
      title
      slug
    }
  }
}
`;

async function testBypass() {
  console.log("Resolving hostname...");
  const parsedUrl = new URL(URL_STR);
  const hostname = parsedUrl.hostname;

  try {
    // Lookup only family 4 (IPv4) to get a single IP address
    const { address } = await lookup(hostname, { family: 4 });
    console.log(`Resolved ${hostname} to IPv4: ${address}`);

    // Replace hostname with IP in the URL
    parsedUrl.hostname = address;
    const targetUrl = parsedUrl.toString();

    console.log(`Fetching from target: ${targetUrl} with Host header: ${hostname}`);
    
    // We must pass an agent or rejectUnauthorized option if node complains about SSL certificate hostname
    // But since undici/fetch doesn't easily support rejectUnauthorized without custom dispatcher,
    // let's see if Node's native fetch accepts it or fails with hostname verification.
    const res = await fetch(targetUrl, {
      method: "POST",
      headers: {
        "Host": hostname,
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      },
      body: JSON.stringify({ query }),
    });

    console.log("Status:", res.status);
    const json = await res.json();
    console.log("Data count:", json.data?.proyectos?.nodes?.length);
  } catch (err) {
    console.error("Fetch bypass failed:", err);
  }
}

testBypass();
