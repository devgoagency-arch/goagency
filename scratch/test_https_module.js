import https from "node:https";

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

function requestGQL() {
  const dataString = JSON.stringify({ query });

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": dataString.length,
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    },
    // Sometime Schannel/OpenSSL renegotiation needs secureOptions or rejecting unauthorized
    rejectUnauthorized: false
  };

  console.log("Sending request via https module...");
  const req = https.request(URL, options, (res) => {
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
        console.log("Body length:", body.length);
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
