import http from "node:http";

setTimeout(() => {
  const req = http.get("http://localhost:4321/", (res) => {
    let d = "";
    res.on("data", (c) => (d += c));
    res.on("end", () => {
      const has = d.includes("Selected Work");
      const links = (d.match(/href="\/proyectos\//g) || []).length;
      console.log("Status:", res.statusCode, "| Selected Work:", has, "| Project links:", links);
    });
  });
  req.on("error", (e) => console.error("ERR:", e.message));
}, 3000);
