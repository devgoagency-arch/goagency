const url = "https://goestrategiacreativa.goestrategiacreativa.com/graphql";

const query = `
query {
  proyectos(first: 5) {
    nodes {
      title
      slug
      acfProyecto {
        cliente
        descripcionCorta
        theChallenge
        theSolution
        theResult
        urlDelProyecto
        fecha
        rol
      }
    }
  }
}
`;

fetch(url, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ query })
})
.then(res => res.json())
.then(data => {
  console.log(JSON.stringify(data, null, 2));
})
.catch(err => {
  console.error("Error:", err);
});
