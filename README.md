# Rx Flashcards

Interactive drug-information flashcards for pharmacy students, built from Sigler's Top 250 Oral & Parenteral Drugs (249 drugs).

- **Students** choose which information tiers to study and practise with flip cards, a quiz, spaced review and a searchable list.
- **Faculty** edit the drug information in a Google Sheet. The app reads the sheet each time it opens, so edits appear without touching any code.

---

## 1. How the pieces fit together

| Piece | What it is | Who uses it |
|---|---|---|
| `index.html` | The app itself. Open it in any web browser. | Students and faculty |
| Google Sheet **"Rx Flashcards – Drug Data"** | The master list of drugs. One row per drug, one column per piece of information. | Faculty (editing) |
| `data/drugs-backup.js` | A saved copy of the drug data from 2026-10-09. The app uses it only if it can't reach the Google Sheet (for example, with no internet). | Nobody edits this |

*Background:* when a student opens the app, it first shows the saved copy so the page appears instantly. Then it quietly downloads the latest version of the Google Sheet and switches to it. The small line at the bottom of the app says which one is showing: **"live from the faculty Google Sheet"** or **"saved copy"**.

Google Sheet: https://docs.google.com/spreadsheets/d/1MGGz9hqHF-PTv-Z35NzGfuIi7Hp5WAvj5cSWiv6emis/edit

---

## 2. One-time setup: let the app read the Google Sheet

The app can only read the sheet if it is shared for viewing. *Background:* the app runs in each student's browser without a Google login, so the sheet has to be readable by anyone who has the link. Only people you add as **Editors** can change it.

1. Open the Google Sheet.
2. Click the **Share** button (top right).
3. Under **General access**, change "Restricted" to **"Anyone with the link"**, and make sure the role next to it says **Viewer**.
4. Click **Done**.
5. To let other faculty edit, add their email addresses in the same Share box with the role **Editor**.

Until step 3 is done, the app shows the saved copy and a note saying the live sheet couldn't be reached.

---

## 3. Information tiers

| Tier | What's included | Sheet header color |
|---|---|---|
| **Tier 1 · Basics** | Brand/Generic, therapeutic class, FDA indication(s), controlled substance classification | Purple |
| **Tier 2 · Pharmacology** | Mechanism of action, dosage forms, monitoring | Teal |
| **Tier 3 · Safety & counseling** | Boxed warning, contraindications, adverse effects, patient counseling | Red |

Students switch each tier on or off with the **Study** buttons at the top of the app. Any combination works, but at least one tier must stay on.
- The back of each card shows only the tiers that are switched on, each under its own heading.
- The **Quiz** only asks about the tiers that are switched on. For example, with only Tier 3 on, it asks about boxed warnings and adverse effects.
- The generic and brand name always appear at the top of the card back, because they are the answer to the card.

---

## 4. Editing drug information (faculty)

Everything is done in the Google Sheet. The sheet's first tab, **"How to edit"**, repeats these steps.

- **Change a drug:** click the cell and type. Google saves automatically. Students see the change the next time they open or refresh the app.
- **Mark a drug as reviewed:** set **Faculty Reviewed** to **Yes**. Until then, cards show a yellow **"Draft · not yet faculty reviewed"** label whenever Tier 2 or Tier 3 is switched on.
- **Add a drug:** type it in the first empty row at the bottom. Only **Generic** is required.
- **Remove a drug:** right-click the row number and choose **Delete row**.
- **Dropdown columns:** Body System, Route, Controlled Substance, CPL and Faculty Reviewed have dropdown menus, so the values always match what the app expects.

**Rules that keep the app working:**
- Don't rename or delete the headers in row 1. Reordering columns is fine, and so is adding new columns to the right; the app ignores columns it doesn't recognize.
- Don't rename the **"Drugs"** tab.
- Leave a cell blank when there is nothing to say (for example, no boxed warning).

**What each column controls in the app:**
- **Body System:** the card color and the **Class** filter.
- **Route:** the **Route** filter. Oral and Injectable each get their own button; Inhaled, Nasal, Topical, Transdermal and Ophthalmic fall under "Other routes".
- **CPL:** the CPL 1–5 filter.
- **Sigler's List, DailyMed Link and Faculty Notes:** for faculty only. Students never see them.

---

## 5. Where the content came from (please read)

- **Tier 1** comes from your *Sigler's Top 250 Oral and Parenteral Drugs* spreadsheet.
- **Tier 2 and Tier 3** were drafted by AI from the *Top250_Tier2_Tier3_DRAFT* spreadsheet, which held full FDA label sections from openFDA/DailyMed. Each section was condensed to 1–3 sentences suited to a flashcard. Where the matched label covered only one product (for example a single tablet strength), dosage forms were written for the drug as a whole from general drug knowledge.
- **All 249 drugs are marked "Faculty Reviewed = No".** Every Tier 2 and Tier 3 entry needs a faculty check before it is relied on for teaching or exams.

Changes made to the source data:
- Spelling fixed: "Quetiapine Fumerate" → Fumarate, "Zolendronic" → Zoledronic, "Antiprakinson" → Antiparkinson, "Andrenergic" → Adrenergic.
- Filgrastim had no drug class, so it was given "Colony-Stimulating Factor (G-CSF)". Epoetin's class "CSF, GF" became "Erythropoiesis-Stimulating Agent".
- Added a **Route** column with each drug's actual route. Sigler's "Oral" tab includes inhalers, insulins and topicals, so the filter now uses the real route. Sigler's original tab is kept in the **Sigler's List** column.

---

## 6. Sharing the app with students

Students need a web address to open the app. The free option is **GitHub Pages**, which turns this repository into a website:

1. On GitHub, open the repository → **Settings** → **Pages**.
2. Under **Branch**, pick the branch that holds the app and the **/(root)** folder, then **Save**.
3. After a minute or two, GitHub shows the address (something like `https://breezy13197.github.io/RxTop250/`). Share that link with students.

---

## 7. Saved progress

Each student's **missed cards**, **chosen tiers** and **card-front setting** are saved in their own browser, on that device only. Nothing is sent anywhere. Clearing browser data resets them.

Known limitation: **Spaced review** works within one study session. The "1 day" and "4 days" labels match the design, but cards are not yet scheduled for future days.
