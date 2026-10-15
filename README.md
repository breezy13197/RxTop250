# Rx Flashcards

Interactive drug-information flashcards for pharmacy students, built from Sigler's Top 250 Oral & Parenteral Drugs (249 drugs).

- **Students** choose which information tiers to study and practise with flip cards, a quiz, a progress page, their own custom lists and a searchable list.
- **Faculty** edit the drug information in a Google Sheet. The app reads the sheet each time it opens, so edits appear without touching any code.

---

## 1. How the pieces fit together

| Piece | What it is | Who uses it |
|---|---|---|
| `index.html` | The app itself. Open it in any web browser. | Students and faculty |
| Google Sheet **"Rx Flashcards – Drug Data"** | The master list of drugs. One row per drug, one column per piece of information. | Faculty (editing) |
| `data/drugs-backup.js` | A saved copy of the drug data. The app uses it only if it can't reach the Google Sheet (for example, with no internet). It refreshes itself every Monday (see section 11). | Nobody edits this |

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
| **Tier 3 · Safety & counseling** | Boxed warning, contraindications, adverse effects, patient counseling, REMS program, NIOSH hazardous-drug listing | Red |

Students switch each tier on or off with the **Study** buttons at the top of the app. Any combination works, but at least one tier must stay on.
- The back of each card shows only the tiers that are switched on. When more than one tier is on, tabs at the top of the card back switch between them, so the card stays short (on a computer, the keys 1, 2 and 3 do the same).
- The **Quiz** only asks about the tiers that are switched on. Tier 2 and Tier 3 questions go both ways:
  - *Information → drug:* "Which drug carries this boxed warning?"
  - *Drug → information:* "Lisinopril: what is its boxed warning?" (also mechanism, monitoring, dosage forms, contraindications, adverse effects and counseling).
  - Wrong answers come from drugs in a different class, with clearly different wording, so they can't also be correct. Where possible they come from the same body system, so they look believable.
- **REMS and NIOSH flags** (Tier 3): drugs on the FDA's REMS list (10 drugs) or the NIOSH List of Hazardous Drugs (26 drugs) show a red **REMS** and/or **NIOSH** tag on the card back and in Browse, plus a line naming the program or NIOSH table. The filter panel has **REMS** and **NIOSH hazardous** buttons that limit the cards to those drugs. *Background:* REMS (Risk Evaluation and Mitigation Strategy) is an FDA safety program for drugs with serious risks; NIOSH's list names drugs that need special handling precautions for the people who prepare and give them.
- The generic and brand name always appear at the top of the card back, because they are the answer to the card.

---

## 4. Editing drug information (faculty)

Everything is done in the Google Sheet. The sheet's first tab, **"How to edit"**, repeats these steps.

- **Change a drug:** click the cell and type. Google saves automatically. Students see the change the next time they open or refresh the app.
- **Mark a drug as reviewed:** set **Faculty Reviewed** to **Yes**. Until then, cards show a yellow **"Draft · not yet faculty reviewed"** label whenever Tier 2 or Tier 3 is switched on.
- **Add a drug:** type it in the first empty row at the bottom. Only **Generic** is required.
- **Remove a drug:** right-click the row number and choose **Delete row**.
- **REMS / NIOSH columns:** type the program name or NIOSH table (for example "Opioid Analgesic REMS" or "Table 1") when a drug is on that list. Leave the cell blank if it isn't; any text in the cell turns the tag and filter on.
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

**REMS and NIOSH columns:** matched from the REMS list and NIOSH hazardous-drug list you supplied, against the 249 drugs by name and ingredient (reviewed by hand). Notes:
- *REMS (10):* eight opioid analgesics (Opioid Analgesic REMS), plus **olanzapine** (Zyprexa Relprevv long-acting injection only) and **testosterone** (Aveed injection only). The cell says when only one product is covered.
- *NIOSH (26):* Tables 1 and 2. Oral contraceptives and similar products are flagged because NIOSH lists estrogen/progesterone combinations. **Ziprasidone** was inferred because its name was lost in the file conversion, so please confirm it.
- Not flagged: products on the lists whose drug in Sigler's isn't the listed form (e.g. injectable-only listings, naloxone, celecoxib, ibuprofen, topiramate/Qsymia, promethazine-codeine).

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

## 7. Card order and phone layout

- Cards and quiz questions come in a **random order** that changes every time the app is opened. The **⇄ Shuffle** button (next to the card count) reshuffles at any time. **Browse** stays alphabetical.
- On phones, the **Study settings & filters** panel starts folded up so the card is visible straight away; tap **Show** to open it. The grading buttons stay pinned to the bottom of the screen.
- Long drug names shrink to fit instead of breaking in the middle of a word.

## 8. Tracking what you know, skill by skill

Instead of marking a whole card "missed", the app tracks **seven skills** for every drug:

| Skill | Tier | What it covers |
|---|---|---|
| Names | 1 | Brand ↔ generic |
| Class & uses | 1 | Therapeutic class, FDA indications |
| Mechanism | 2 | Mechanism of action |
| Dosing & monitoring | 2 | Dosage forms, monitoring |
| Safety warnings | 3 | Boxed warning, contraindications |
| Adverse effects | 3 | Common adverse effects |
| Counseling | 3 | Patient counseling points |

*Background:* a student can know a drug's name and class but not its mechanism. Grading the whole card as one pass/fail hides that, so each skill gets its own result.

- **Flip & grade:** flip the card, then tap any part you missed (the **Missed part?** row above the buttons) and press **Save**. Press **Got it** if you knew everything, or **Missed it** if you missed it all. Only skills in the tiers you've switched on are graded.
- **Quiz:** each question belongs to one skill. A right or wrong answer counts toward that skill only.
- **Status:** each skill keeps your last four answers. ✓ **Solid** = right the last two times, ~ **Learning** = right last time, ✗ **Weak** = wrong last time, · **Not tried** = no answers yet.
- **My progress page:** a bar for each skill, a drug-by-drug table, and **Practise weak** buttons. It covers whichever cards are currently selected (so choosing one of your lists shows progress for just that list).
- **Weak spots filter** (in *Study settings & filters*): study only drugs you were weak in, either in any skill or one skill. In the Quiz, questions then focus on the weak skill. As you clear a drug (so it is no longer weak), it drops out of the set; when the set is empty you'll see "No weak spots right now". Press **Shuffle** to rebuild the set from your current results.
- **Spaced review was removed.** Weak-spot practice replaces it. Cards are not scheduled for future days.

## 9. My lists (custom decks)

For a quiz on a certain set of drugs, open **My lists**:
1. Press **+ Make my first list** and give it a name.
2. Add drugs by **pasting names** (from a syllabus or study guide; brand or generic, separated by commas or new lines; any it can't find are listed so you can add them by hand) and/or by **ticking** drugs in the searchable list below.
3. Press **Study this list**. Flip & grade, Quiz, My progress and Browse then use only that list.

Switch lists, or go back to all drugs, with the **My list** buttons in *Study settings & filters*. The other filters (route, tiers and so on) still apply on top of the list.

**Lists from faculty (the "Lists" tab in the Google Sheet).** Faculty can give every student a ready-made deck, such as everything on Exam 2:
1. Open the **Lists** tab of the Google Sheet.
2. In column **List Name** type the list's name, and in column **Drug** pick or type one drug (a dropdown offers the generic names; brand names work too). Use one row per drug and repeat the list name on each row.
3. Students see these lists marked with ★ under **My list** and in **My lists**. They can study them, or press **Make my own copy** to edit a copy.

*Background:* the app reads this tab each time it opens, just like the Drugs tab, so changes appear without touching any code. To change a list, edit its rows; to remove one, delete all of its rows. Names are matched the same way as the paste box (so "metoprolol" adds both salts), and a name that can't be matched is skipped. Don't rename the tab or its headers. The sheet's **Notes** column is for faculty and is not shown to students.

## 10. What is saved in the browser

Everything below is saved in the browser's own storage (called *localStorage*) on that device only. Nothing is sent anywhere and there are no accounts, so progress does not follow a student to another phone or computer.

| Saved as | What it holds |
|---|---|
| `rxcards-skills` | Your last four answers for each skill of each drug |
| `rxcards-lists` | Your custom lists (names and drugs) |
| `rxcards-activelist` | Which list you were studying |
| `rxcards-courselists` | A copy of the faculty lists from the last visit |
| `rxcards-tiers` | Which tiers are switched on |
| `rxcards-front` | Card-front setting (Generic, Brand, Clues, Random) |

Not saved: filters, shuffle order, quiz score and which mode you were in. Those reset when the page is reopened. Clearing browser data (or using a private window) erases everything above. The old `rxcards-missed` list from earlier versions is converted once into "weak in every skill" and then no longer used.

## 11. Keeping the backup copy up to date

`data/drugs-backup.js` is refreshed automatically by a **GitHub Action** (a small job that GitHub runs for you; its instructions are in `.github/workflows/refresh-backup.yml`).

- **When it runs:** every Monday morning, and any time you press the button (below).
- **What it does:** downloads the Drugs tab of the Google Sheet, checks it looks right (has a "Generic" column and at least 50 drugs), and rewrites the backup file. If nothing changed since last time, it does nothing. If the Sheet can't be read, it leaves the old backup alone and the run shows a red ✗ in the Actions tab.
- **Run it now** (for example after adding lots of drugs): on GitHub open the repository → **Actions** → **Refresh drug backup** → **Run workflow** → **Run workflow**. Wait a minute, then refresh the page to see a new commit called "Refresh drug backup from Google Sheet".
- **Requirement:** the Sheet must be shared as "Anyone with the link → Viewer" (section 2), because the job reads it the same way the app does.
- **GitHub only runs scheduled jobs from the repository's main branch.** Until this work is merged into `main`, the Monday schedule and the Run workflow button will not appear.
- **Not included:** the Lists tab. Those lists are saved in each student's browser instead.
- **Running it by hand** (optional, needs Node.js 18 or newer): `node scripts/refresh-backup.mjs` in the project folder.
