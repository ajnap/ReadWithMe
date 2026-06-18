import { chromium } from "playwright";

const out = "/Users/alexnapierski/Downloads/Read_With_Me/shots";
import { mkdirSync } from "fs";
mkdirSync(out, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 880 } });
await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
await page.waitForTimeout(800);

// 1. hero
await page.screenshot({ path: `${out}/01-hero.png` });

// helper to scroll to an absolute Y and settle
async function toY(y) {
  await page.evaluate((y) => window.scrollTo(0, y), y);
  await page.waitForTimeout(650);
}

// section offsets
const offsets = await page.evaluate(() => {
  const get = (id) => {
    const el = document.getElementById(id);
    const r = el.getBoundingClientRect();
    return { top: r.top + window.scrollY, height: el.offsetHeight };
  };
  return { how: get("how"), inside: get("inside"), build: get("build") };
});

// 2. promise / story
await toY(offsets.how.top + 300);
await page.screenshot({ path: `${out}/02-story.png` });

// 3-5. flip book at a few scroll depths
const insideTop = offsets.inside.top;
const insideH = offsets.inside.height;
await toY(insideTop + insideH * 0.02);
await page.screenshot({ path: `${out}/03-book-cover.png` });
await toY(insideTop + insideH * 0.28);
await page.screenshot({ path: `${out}/04-book-flip1.png` });
await toY(insideTop + insideH * 0.55);
await page.screenshot({ path: `${out}/05-book-flip2.png` });

// 6. builder with a typed name
await toY(offsets.build.top - 40);
await page.fill("#build input", "Ava");
await page.waitForTimeout(500);
await page.screenshot({ path: `${out}/06-builder.png` });

await browser.close();
console.log("done");
