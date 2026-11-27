// The BUILD step: copies the website into a "dist" folder,
// and stamps it with the commit ID and time so you can see each new deploy.

const fs = require("fs");

const files = ["index.html", "style.css", "bmi.js", "main.js"];

fs.rmSync("dist", { recursive: true, force: true });
fs.mkdirSync("dist");
for (const file of files) fs.copyFileSync(file, `dist/${file}`);

const commit = (process.env.GITHUB_SHA || "local").slice(0, 7);
const time = new Date().toISOString().slice(0, 16).replace("T", " ") + " UTC";
const html = fs.readFileSync("dist/index.html", "utf8")
  .replace("__BUILD_INFO__", `Build ${commit} · ${time}`);
fs.writeFileSync("dist/index.html", html);

console.log(`Built ${files.length} files into dist/ (build ${commit})`);
