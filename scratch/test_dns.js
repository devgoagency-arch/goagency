import dns from "node:dns";
dns.setDefaultResultOrder("ipv4first");

const URL = "https://goestrategiacreativa.goestrategiacreativa.com/graphql";
const query = `
query GetProyectosOriginal {
  proyectos(first: 5) {
    nodes {
      title
    }
  }
}
`;

async function run() {
  console.log("Testing with ipv4first...");
  try {
    const res = await fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });
    console.log("Success! Status:", res.status);
    const json = await res.json();
    console.log("Data count:", json.data?.proyectos?.nodes?.length);
  } catch (err) {
    console.error("Failed with ipv4first:", err);
    if (err.cause) {
      console.error("Cause:", err.cause);
    }
  }
}

run();
