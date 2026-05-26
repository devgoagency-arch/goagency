const URL = "https://goestrategiacreativa.goestrategiacreativa.com/graphql";

// Introspection query to get all fields on the type 'Proyecto_Acfproyecto' (or whatever the acfProyecto type name is)
const query = `
query IntrospectFields {
  __type(name: "Proyecto_Acfproyecto") {
    name
    fields {
      name
      type {
        name
        kind
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
    console.log("Type Introspection:\n", JSON.stringify(json, null, 2));
  } catch (err) {
    console.error("Introspection failed:", err.message);
  }
}

run();
