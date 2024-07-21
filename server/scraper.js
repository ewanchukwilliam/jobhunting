const puppeteer = require("puppeteer");
function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
async function setupBrowser() {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width: 1920, height: 1080 },
  });
  const page = await browser.newPage();
  return { browser, page };
}
async function navigateToJobs(page) {
  await page.goto("https://www.indeed.com");
  await delay(1000);
  await page.locator("#text-input-what").fill("Software engineer Junior");

  await page.locator("#text-input-where").click();
  await page.locator("#text-input-where").click();
  await page.locator("#text-input-where").click();

  await page.locator("#text-input-where").fill("Alberta");
  await page.click(".yosegi-InlineWhatWhere-primaryButton");
}
function extractJobSections(containerSelector) {
  const container = document.querySelector(containerSelector);
  const headers = container.querySelectorAll("h2.jobSectionHeader");
  const sections = {};
  headers.forEach((header) => {
    const sectionTitle = header.textContent.trim();
    let content = [];
    let nextElement = header.nextElementSibling;
    while (nextElement && nextElement.tagName !== "H2") {
      if (nextElement.tagName === "LI") {
        content.push(nextElement.textContent.trim());
      }
      nextElement = nextElement.nextElementSibling;
    }
    sections[sectionTitle] = content;
  });
  return sections;
}

async function scrapeJobs(page) {
  let allJobs = [];
  for (let i = 0; i < 3; i++) {
    await delay(2000);
    const jobElements = await page.$$("ul.css-zu9cdh>li");
    for (const jobElement of jobElements) {
      try {
        const title = await jobElement.$eval(
          "h2.jobTitle",
          (el) => el.innerText,
        );
        const location = await jobElement
          .$eval('[data-testid="text-location"]', (el) => el.innerText)
          .catch(() => null);
        const date = await jobElement
          .$eval('[data-testid="myJobsStateDate"]', (el) => el.innerText)
          .catch(() => null);
        const company = await jobElement
          .$eval('[data-testid="company-name"]', (el) => el.innerText)
          .catch(() => null);
        if (isValidJob(title)) {
          // Click the job listing to open the sidebar with the job description
          await jobElement.click();
          await delay(2000); // Wait for the sidebar to open and load content
          // Inject the section extraction function into the page context
          await page.evaluate(() => {
            window.extractJobSections = function (containerSelector) {
              const container = document.querySelector(containerSelector);
              const headers = container.querySelectorAll("h2.jobSectionHeader");
              const sections = {};
              headers.forEach((header) => {
                const sectionTitle = header.textContent.trim();
                let content = [];
                let nextElement = header.nextElementSibling;
                while (nextElement && nextElement.tagName !== "H2") {
                  if (nextElement.tagName === "LI") {
                    content.push(nextElement.textContent.trim());
                  }
                  nextElement = nextElement.nextElementSibling;
                }
                sections[sectionTitle] = content;
              });
              return sections;
            };
          });
          // Use the function to extract sections from the job description
          const sections = await page.evaluate(() => {
            return extractJobSections("#jobDescriptionText");
          });
          allJobs.push({ title, location, date, company, sections });
        }
      } catch (error) {
        // Optionally log the error or handle it in a specific way
        console.log("didnt find the h2.jobtitle a element", error);
        // Continue to the next jobElement
      }
    }
    if (!(await navigateToNextPage(page))) break;
  }
  return allJobs;
}

function isValidJob(title) {
  const juniorKeywords = [
    "jr.",
    "junior",
    "internship",
    "co-op",
    "coop",
    "student",
  ];
  const skillKeywords = [
    "developer",
    "software",
    "front end",
    "front-end",
    "backend",
    "back-end",
    "computer science",
    "engineer",
    "programmer",
    "cloud",
  ];
  return (
    juniorKeywords.some((keyword) => title?.toLowerCase().includes(keyword)) ||
    skillKeywords.some((keyword) => title?.toLowerCase().includes(keyword))
  );
}
async function navigateToNextPage(page) {
  const nextButtonSelector = 'a[data-testid="pagination-page-next"]';
  const nextButton = await page.$(nextButtonSelector);
  if (nextButton) {
    await nextButton.click();
    await closePopup(page);
    return true;
  }
  return false;
}
async function closePopup(page) {
  await delay(1500);
  try {
    const closeButtonSelector = 'button[aria-label="close"].css-yi9ndv';
    const closeButton = await page.$(closeButtonSelector);
    if (closeButton) {
      await closeButton.click();
      console.log("Popup closed successfully.");
    }
  } catch (error) {
    console.log("No popup to close or failed to close the popup.");
  }
}
(async () => {
  const { browser, page } = await setupBrowser();
  await navigateToJobs(page);
  const allJobs = await scrapeJobs(page);
  console.table(allJobs);
  await page.screenshot({ path: "screenshot.png" });
  // await browser.close();
})();
