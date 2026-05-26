const URL = "https://goestrategiacreativa.goestrategiacreativa.com/graphql";

const query = `
query GetProyectoTerms {
  proyectos(first: 3) {
    nodes {
      id
      title
      slug
      terms {
        nodes {
          name
          slug
          taxonomyName
        }
      }
    }
  }
}
`;

async function run() {
  try {
    const res = await fetch(URL, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      },
      body: JSON.stringify({ query }),
    });
    const json = await res.json();
    console.log("Status:", res.status);
    console.log("Response data:\n", JSON.stringify(json, null, 2));
  } catch (err) {
    console.error("Query failed:", err.message);
  }
}

run();
