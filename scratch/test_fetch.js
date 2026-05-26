const URL = "https://goestrategiacreativa.goestrategiacreativa.com/graphql";
const query = `
query GetProjects {
  proyectos(first: 5) {
    nodes {
      title
    }
  }
}
`;

async function testFetch() {
  console.log("Fetching without User-Agent...");
  try {
    const res = await fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });
    console.log("Success! Status:", res.status);
    const json = await res.json();
    console.log("Data:", JSON.stringify(json, null, 2));
  } catch (err) {
    console.error("Failed without User-Agent:", err.message);
  }

  console.log("\nFetching with User-Agent...");
  try {
    const res = await fetch(URL, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      },
      body: JSON.stringify({ query }),
    });
    console.log("Success! Status:", res.status);
    const json = await res.json();
    console.log("Data:", JSON.stringify(json, null, 2));
  } catch (err) {
    console.error("Failed with User-Agent:", err.message);
  }
}

testFetch();
