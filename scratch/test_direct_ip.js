import https from "node:https";

const IP = "84.32.84.99";
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

function requestGQL() {
  const dataString = JSON.stringify({ query });

  const options = {
    hostname: IP,
    port: 443,
    path: "/graphql",
    method: "POST",
    headers: {
      "Host": "goestrategiacreativa.goestrategiacreativa.com",
      "Content-Type": "application/json",
      "Content-Length": dataString.length,
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    },
    // Necessary since hostname in certificate is not the IP
    rejectUnauthorized: false
  };

  console.log("Sending request directly to IP...");
  const req = https.request(options, (res) => {
    console.log("Status:", res.statusCode);
    let body = "";
    res.on("data", (chunk) => body += chunk);
    res.on("end", () => {
      console.log("Response loaded successfully!");
      try {
        const json = JSON.parse(body);
        console.log("Data:\n", JSON.stringify(json, null, 2));
      } catch (e) {
        console.error("JSON parse error:", e.message);
      }
    });
  });

  req.on("error", (err) => {
    console.error("Request error:", err);
  });

  req.write(dataString);
  req.end();
}

requestGQL();
