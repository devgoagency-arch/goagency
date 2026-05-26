const URL = "https://goestrategiacreativa.goestrategiacreativa.com/graphql";

const queryOriginal = `
query GetProyectosOriginal {
  proyectos(first: 5) {
    nodes {
      id
      title
      slug
      acfProyecto {
        cliente
        urlDelProyecto
        fecha
        rol
        descripcionCorta
      }
    }
  }
}
`;

const queryNewFields = `
query GetProyectosNewFields {
  proyectos(first: 5) {
    nodes {
      id
      title
      slug
      acfProyecto {
        cliente
        urlDelProyecto
        fecha
        rol
        descripcionCorta
        theChallenge
        theSolution
        theResult
      }
    }
  }
}
`;

async function test(name, query) {
  console.log(`\nTesting ${name}...`);
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
    if (json.errors) {
      console.log(`${name} failed with errors:`, json.errors.map(e => e.message));
    } else {
      console.log(`${name} succeeded! Data count:`, json.data.proyectos?.nodes?.length);
      if (json.data.proyectos?.nodes?.length) {
        console.log("First project node:", JSON.stringify(json.data.proyectos.nodes[0], null, 2));
      }
    }
  } catch (err) {
    console.error(`${name} failed:`, err.message);
  }
}

async function main() {
  await test("Original Fields Query", queryOriginal);
  await test("New Fields Query", queryNewFields);
}

main();
