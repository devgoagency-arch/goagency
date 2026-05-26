import dns from "node:dns";

const originalLookup = dns.lookup;
dns.lookup = function (hostname, options, callback) {
  let cb = callback;
  let opts = options;
  if (typeof options === "function") {
    cb = options;
    opts = {};
  }
  
  if (hostname === "goestrategiacreativa.goestrategiacreativa.com") {
    const ip = "84.32.84.99";
    const family = 4;
    console.log(`[DNS OVERRIDE] Resolving ${hostname} to ${ip} (opts: ${JSON.stringify(opts)})`);
    
    if (opts && opts.all) {
      const result = [{ address: ip, family }];
      if (cb) {
        cb(null, result);
        return;
      }
      return Promise.resolve(result);
    }
    
    if (cb) {
      cb(null, ip, family);
      return;
    }
    return Promise.resolve({ address: ip, family });
  }
  
  return originalLookup(hostname, opts, cb);
};

const URL = "https://goestrategiacreativa.goestrategiacreativa.com/graphql";
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

async function testOverride() {
  console.log("Fetching with DNS override active...");
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
    console.log("Data count:", json.data?.proyectos?.nodes?.length);
  } catch (err) {
    console.error("Fetch failed:", err);
  }
}

testOverride();
