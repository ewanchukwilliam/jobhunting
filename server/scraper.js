const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const { executablePath } = require("puppeteer");
puppeteer.use(StealthPlugin());

const fs = require("fs");

function delay(time) {
	return new Promise((resolve) => setTimeout(resolve, time));
}
async function setupBrowser() {
	const browser = await puppeteer.launch({
		// headless: false,
		defaultViewport: { width: 1920, height: 1080 },
		headless: true,
		executablePath: executablePath(),
	});
	const page = await browser.newPage();
	return { browser, page };
}
async function navigateToJobs(page) {
	await page.goto("https://www.indeed.com");
	await page.screenshot({ path: "screenshot.png" });
	await page.waitForSelector("#text-input-what", { visible: true });
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
		while (nextElement && nextElement.tagName !== "h2") {
			if (nextElement.tagName === "li") {
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
	for (let i = 0; i < 1; i++) {
		await page.waitForSelector("ul.css-zu9cdh>li");
		const jobElements = await page.$$("ul.css-zu9cdh>li");
		for (const jobElement of jobElements) {
			try {
				const title = await jobElement.$eval("h2.jobTitle", (el) =>
					el.innerText.replace(/\n/g, "").trim(),
				);
				const location = await jobElement
					.$eval('[data-testid="text-location"]', (el) =>
						el.innerText.replace(/\n/g, "").trim(),
					)
					.catch(() => null);
				const date = await jobElement
					.$eval('[data-testid="myJobsStateDate"]', (el) =>
						el.innerText
							.replace(/\n/g, "")
							.replace(/PostedPosted/g, "Posted")
							.replace(/Posted Posted/g, "Posted")
							.replace(/PostedJust/g, "Just")
							.trim(),
					)
					.catch(() => null);
				const company = await jobElement
					.$eval('[data-testid="company-name"]', (el) =>
						el.innerText.replace(/\n/g, "").trim(),
					)
					.catch(() => null);
				if (isValidJob(title)) {
					// Click the job listing to open the sidebar with the job description
					await jobElement.click();
					await delay(2000); // Wait for the sidebar to open and load content
					// Inject the section extraction function into the page context
					const sections = await page.evaluate(() => {
						const container = document.querySelector("#jobDescriptionText");
						let allText = [];
						const walker = document.createTreeWalker(
							container,
							NodeFilter.SHOW_TEXT,
							null,
							false,
						);
						let node;
						while ((node = walker.nextNode())) {
							const text = node.textContent.replace(/\n/g, " ").trim();
							if (text) allText.push(text);
						}
						return allText.join(" ");
					});
					allJobs.push({
						title: title,
						location: location,
						date: date,
						company: company,
						sections: sections,
					});
				}
			} catch (error) {
				// Optionally log the error or handle it in a specific way
				// console.error("Error processing job element:", error);
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
		"frontend",
		"front-end",
		"backend",
		"back end",
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
	const closeButtonSelector = 'button[aria-label="close"].css-yi9ndv';
	await delay(2000);
	try {
		const closeButton = await page.$(closeButtonSelector);
		if (closeButton) {
			await closeButton.click();
			console.log("Popup closed successfully.");
		}
	} catch (error) {
		console.log("No popup to close or failed to close the popup.");
	}
}
async function createDescFile(allJobs) {
	fs.writeFile("example.txt", "Recorded applications \n \n", "utf8", (err) => {
		if (err) {
			console.log("didnt add to file", err);
			return;
		}
		console.log(`created example.txt`);
	});
	for (let i = 0; i < allJobs.length; i++) {
		const company = allJobs[i].company.replace("\n", "");
		const date = allJobs[i].date
			.replace("\n", "")
			.replace("PostedPosted", "Posted")
			.replace("Posted Posted", "Posted")
			.replace("PostedJust", "Just");
		const title = allJobs[i].title.replace("\n", "");
		const description = " /// " + allJobs[i].sections;
		const text =
			company + ", " + date + ", " + title + "\n" + description + "\n\n";
		fs.appendFile("example.txt", text, "utf8", (err) => {
			if (err) {
				console.log("didnt add to file", err);
				return;
			}
			console.log(`added description for ${company} to example.txt`);
		});
	}
}
async function postings() {
	const { browser, page } = await setupBrowser();
	await navigateToJobs(page);
	const allJobs = await scrapeJobs(page);
	// await createDescFile(allJobs);
	await browser.close();
	if (allJobs.length !== 0) {
		console.log("scraping successfull");
	} else {
		console.log("scraping unsuccessful");
	}
	return allJobs;
}
module.exports = postings;
