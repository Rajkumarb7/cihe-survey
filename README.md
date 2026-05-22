# CIHE RES 901 — Student Survey App

A mobile-friendly survey form that collects responses directly into **Google Sheets** with a **CSV backup** option.

---

## 🔗 Live Link
After deploying to GitHub Pages:
```
https://YOUR-USERNAME.github.io/cihe-survey
```

---

## 📁 Files

| File | Purpose |
|------|---------|
| `index.html` | The survey app (deploy this to GitHub Pages) |
| `google-apps-script.js` | Paste into Google Apps Script to receive data |
| `README.md` | This setup guide |

---

## 🚀 Step-by-Step Setup

### Step 1 — Set up Google Sheets (5 min)

1. Go to [sheets.google.com](https://sheets.google.com) and create a new spreadsheet
2. Name it something like **"RES 901 Survey Data"**
3. Click **Extensions → Apps Script**
4. Delete all default code in the editor
5. Open `google-apps-script.js` from this repo and **copy everything**
6. Paste it into the Apps Script editor
7. Click the **▶ Run** button next to `testSetup` to verify it works
   - Accept permissions when prompted
   - Check your spreadsheet — you should see a test row appear
8. Click **Deploy → New deployment**
   - Type: **Web App**
   - Execute as: **Me**
   - Who has access: **Anyone**
9. Click **Deploy** and **copy the Web App URL** (looks like `https://script.google.com/macros/s/ABC.../exec`)

### Step 2 — Add the URL to the survey app

1. Open `index.html` in a text editor
2. Find this line (near line 330):
   ```js
   const GOOGLE_SCRIPT_URL = "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE";
   ```
3. Replace `YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE` with your copied URL
4. Save the file

### Step 3 — Publish to GitHub Pages

1. Create a new GitHub repository named `cihe-survey` (make it **Public**)
2. Upload both files (`index.html` and optionally `README.md`)
3. Go to **Settings → Pages**
4. Under **Source**, select: **Deploy from a branch → main → / (root)**
5. Click **Save**
6. Wait ~60 seconds, then your app is live at:
   ```
   https://YOUR-USERNAME.github.io/cihe-survey
   ```

### Step 4 — Share the link!

Send the GitHub Pages URL to your classmates. Every submission will:
- ✅ Appear instantly in your Google Sheet
- ✅ Give the respondent a CSV download of their own response

---

## 📊 What Gets Recorded

Each row in Google Sheets contains:

| Column | Data |
|--------|------|
| Participant ID | Auto-generated anonymous code (e.g. PA3BF7K) |
| Timestamp | ISO date/time of submission |
| Q1–Q4 | Demographics (gender, age, year, faculty) |
| Q5–Q7 | Study behaviour (hours, location, barriers) |
| Q8–Q13 | Satisfaction & stress ratings (1–5) |
| Q14–Q16 | Wellbeing ratings (1–5) |
| Q17 | Sleep hours |
| Q18 | Open-ended comments |

---

## 🔒 Privacy & Ethics

- No personally identifiable information is collected
- Participants are assigned a random ID automatically
- All data is transmitted over HTTPS
- Responses are stored only in your private Google Sheet
- Compliant with CIHE Australia research ethics guidelines

---

## 🛠 Troubleshooting

**Responses not appearing in Google Sheets?**
- Double-check the Web App URL in `index.html`
- Make sure you redeployed after any code changes in Apps Script
- In Apps Script, check **Executions** for error logs

**Getting CORS errors?**
- This is expected — the form uses `mode: 'no-cors'` which is correct for Apps Script
- Responses still go through; the form won't get a confirmation back (that's fine)

**Need to re-deploy after changes to Apps Script?**
- Always create a **New deployment** (not edit existing) so the URL stays the same

---

*RES 901: Quantitative Research Methods · CIHE Australia · Semester 1, 2026*
