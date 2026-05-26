async function testLocal() {
  console.log("Requesting local home page...");
  try {
    const res = await fetch("http://127.0.0.1:4321/");
    console.log("Status:", res.status);
    const html = await res.text();
    console.log("HTML length:", html.length);
    
    // Check if projects are in the HTML
    const hasProjects = html.includes("Selected Work");
    const hasNoProjectsText = html.includes("No hay proyectos publicados aún.");
    
    console.log("Has 'Selected Work' header:", hasProjects);
    console.log("Has 'No hay proyectos publicados aún' text:", hasNoProjectsText);
    
    if (html.includes("haagen-dazs")) {
      console.log("Found project: haagen-dazs");
    } else {
      console.log("haagen-dazs NOT found in HTML");
    }
  } catch (err) {
    console.error("Local request failed:", err.message);
  }
}

testLocal();
