async function activeTab() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return tab;
}

async function runInTab(fn, args = []) {
  const tab = await activeTab();
  const [result] = await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: fn,
    args
  });
  return result?.result;
}

function setStatus(msg) {
  document.getElementById("status").textContent = msg;
}

document.getElementById("extractListing").addEventListener("click", async () => {
  const data = await runInTab(extractListingFromPage);
  await chrome.storage.local.set({ ipkListingData: data });
  setStatus(`Listing extracted:\n${data.title || "(no title)"}\n${data.price || ""}`);
});

document.getElementById("extractPhotos").addEventListener("click", async () => {
  const data = await runInTab(extractPhotosFromPage);
  await chrome.storage.local.set({ ipkPhotoUrls: data.urls });
  setStatus(`Photos extracted: ${data.urls.length}`);
});

document.getElementById("pasteListing").addEventListener("click", async () => {
  const store = await chrome.storage.local.get(["ipkListingData"]);
  if (!store.ipkListingData) {
    setStatus("No listing data saved. Run Listing Extract first.");
    return;
  }
  const result = await runInTab(pasteListingToAdmin, [store.ipkListingData]);
  setStatus(result.message);
});

document.getElementById("pastePhotos").addEventListener("click", async () => {
  const store = await chrome.storage.local.get(["ipkPhotoUrls"]);
  const urls = store.ipkPhotoUrls || [];
  if (!urls.length) {
    setStatus("No photo URLs saved. Run Photo Extract first.");
    return;
  }
  const result = await runInTab(showPhotoUrlsOnPage, [urls]);
  setStatus(result.message);
});

function clean(s) {
  return (s || "").replace(/\s+/g, " ").trim();
}

function extractListingFromPage() {
  const clean = s => (s || "").replace(/\s+/g, " ").trim();
  const allText = clean(document.body.innerText);

  const price = allText.match(/RM\s?[\d,]+/)?.[0] || "";

let rawTitle =
  [...document.querySelectorAll("h1,h2")]
    .map(el => clean(el.innerText))
    .find(t => t && !/Mudah/i.test(t)) || "";

rawTitle = rawTitle
  .replace(/^my\s+/i, "")
  .replace(/Property for Sale/ig, "")
  .replace(/House for Sale/ig, "")
  .replace(/Bungalow House for Sale/ig, "Bungalow")
  .replace(/,\s*Kuala Lumpur$/i, "")
  .replace(/\s+in\s+/i, " in ")
  .replace(/\s+/g, " ")
  .trim();

const title = rawTitle;
const listingLocation =
  allText.match(/(?:Cheras|Bandar Damai Perdana|Petaling Jaya|Shah Alam|Klang|Subang|Mont Kiara|Bangsar|KLCC|Damansara|Bukit Jalil),\s*(?:Kuala Lumpur|Selangor)/i)?.[0] ||
  allText.match(/(?:Cheras|Bandar Damai Perdana|Petaling Jaya|Shah Alam|Klang|Subang|Mont Kiara|Bangsar|KLCC|Damansara|Bukit Jalil)/i)?.[0] ||
  "";
  const size = allText.match(/[\d,]+\s*sq\.?ft/i)?.[0] || "";
  const bed = allText.match(/\b\d+\+?\s*Bed\b/i)?.[0] || "";
  const bath = allText.match(/\b\d+\+?\s*Bath\b/i)?.[0] || "";

  const propertyType =
    allText.match(/Property Type\s+([A-Za-z\s-]+?)(?=\s+Tenure Type|\s+Land Title|\s+Facilities)/i)?.[1] || "";

  const tenure =
    allText.match(/Tenure Type\s+([A-Za-z\s-]+?)(?=\s+Remaining Tenure|\s+Land Title|\s+Facilities)/i)?.[1] || "";

  const remainingTenure =
    allText.match(/Remaining Tenure\s+([\d]+\s*Year\(s\))/i)?.[1] || "";

  const description =
    allText.match(/Description\s+(.+?)\s+Property Details/i)?.[1] ||
    allText.match(/Description\s+(.+?)\s+Contact Owner/i)?.[1] || "";

  const agentName =
    allText.match(/Chat\s+([A-Za-z\s]+?)\s+Private advertiser/i)?.[1] ||
    allText.match(/-\s*Mr\.\s*([A-Za-z\s]+)/i)?.[1] || "";

  const data = {
    source: location.href,
    title: clean(title),
    price: clean(price),
    location: clean(listingLocation),
    address: clean(listingLocation),
    state: (listingLocation || "").toLowerCase().includes("kuala lumpur")
  ? "Kuala Lumpur"
  : ((listingLocation || "").toLowerCase().includes("selangor")
    ? "Selangor"
    : ""),
    city: clean(listingLocation.split(",")[0] || listingLocation),
    bua: clean(size),
    landArea: clean(size),
    bedrooms: clean(bed.replace(/Bed/i, "")),
    bathrooms: clean(bath.replace(/Bath/i, "")),
    type: clean(propertyType),
    tenure: clean(tenure || remainingTenure),
    features: "",
    description: clean(description),
    agentName: clean(agentName)
  };

  navigator.clipboard?.writeText(JSON.stringify(data, null, 2)).catch(() => {});
  return data;
}

function extractPhotosFromPage() {
  const urls = [...new Set(
    [...document.querySelectorAll("img")]
      .map(img => img.currentSrc || img.src)
      .filter(src =>
        src &&
        src.includes("/image_hd/plain/") &&
        /\.(jpg|jpeg|png|webp)(\?|$)/i.test(src)
      )
  )];

  navigator.clipboard?.writeText(urls.join("\n")).catch(() => {});
  return { urls };
}

function pasteListingToAdmin(data) {
  const textarea = document.getElementById("importText");

  if (!textarea) {
    return { message: "Admin listing text box not found." };
  }

  const cleanTitle = (data.title || "")
    .replace(/^my\s+/i, "")
    .replace(/Property for Sale\s*/ig, "")
    .replace(/House for Sale\s*/ig, "")
    .replace(/\s+in\s+$/i, "")
    .trim();

  const descriptionLines = (data.description || "")
    .split(/\s{2,}|\n+/)
    .map(x => x.trim())
    .filter(Boolean)
    .slice(0, 12)
    .map((x, i) => `${i + 1}. ${x}`)
    .join("\n");

  const text = `
Listing Type: For Sale
Property Type: ${data.type || ""}

Title:
${cleanTitle || data.title || ""}

Price:
${data.price || ""}

Short Location / Address:
${data.location || ""}

Full Address:
${data.address || data.location || ""}

State:
${data.state || ""}

City:
${data.city || ""}

Status:
active

Built-up Size:
${data.bua || ""}

Land Area:
${data.landArea || ""}

Bedrooms:
${data.bedrooms || ""}

Bathrooms:
${data.bathrooms || ""}

Car Park:
${data.carPark || ""}

Tenure:
${data.tenure || ""}

Maintenance Fee:
(leave blank)

Features:
${data.features || ""}

Google Maps Link:
(leave blank)

Latitude:
(leave blank)

Longitude:
(leave blank)

Source Agent Name:
${data.agentName || ""}

Description:
${descriptionLines}
`.trim();

  textarea.value = text;
  textarea.dispatchEvent(new Event("input", { bubbles: true }));
  textarea.dispatchEvent(new Event("change", { bubbles: true }));

  const sourceAgent = document.getElementById("sourceAgentName");
  const sourceAgentRow = document.getElementById("sourceAgentRow");

  if (sourceAgent && data.agentName) {
    sourceAgent.value = data.agentName;
    sourceAgent.dispatchEvent(new Event("input", { bubbles: true }));
    sourceAgent.dispatchEvent(new Event("change", { bubbles: true }));
  }

  if (sourceAgentRow && data.agentName) {
    sourceAgentRow.style.display = "grid";
  }

  const importStatus = document.getElementById("importStatus");
  if (importStatus) {
    importStatus.textContent = "Listing pasted into Magical AI box. Click Fill form.";
    importStatus.style.color = "green";
  }

  return { message: "Listing pasted cleanly. Click Fill form." };
}

function showPhotoUrlsOnPage(urls) {
  const textarea = document.getElementById("importImageUrls");

  if (!textarea) {
    navigator.clipboard?.writeText(urls.join("\n")).catch(() => {});
    return {
      message: "Admin image URL box not found. Photo URLs copied instead."
    };
  }

  textarea.value = urls.join("\n");
  textarea.dispatchEvent(new Event("input", { bubbles: true }));
  textarea.dispatchEvent(new Event("change", { bubbles: true }));

  const importStatus = document.getElementById("importStatus");
  if (importStatus) {
    importStatus.textContent = `Photo URLs pasted: ${urls.length}`;
    importStatus.style.color = "green";
  }

  navigator.clipboard?.writeText(urls.join("\n")).catch(() => {});

  return {
    message: `Photo URLs pasted into admin image box: ${urls.length}`
  };
}
