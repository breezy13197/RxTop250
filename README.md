# Rx Flashcards

Interactive drug-information flashcards for pharmacy students, based on Sigler's Top 250 Oral & Parenteral Drugs.

## How to use and edit

The app is one file: **`index.html`**. Everything is in that file: the drug cards, the "Sticker" visual style and all four study modes. You don't need to install anything or run a server.

---

## 1. Opening the app

1. Download or copy `index.html` to your computer.
2. Double-click it. It opens in your web browser (Chrome, Edge, Safari or Firefox).

*Background:* an `.html` file is a web page. Normally a browser downloads web pages from the internet, but it can open one saved on your computer just as well. Everything the app needs is inside the file. The one exception is the fonts, which come from Google Fonts. If you're offline, the app still works but uses your computer's standard fonts.

### Sharing with students
You can send students the file itself (by email or through your LMS), or upload it to any web host (for example GitHub Pages or your school's web space). Each student's progress is stored only in their own browser (see section 3).

---

## 2. What the app does

| Area | What it does |
|---|---|
| **Flip & grade** | Shows one card at a time. Click the card or press **Space** to flip it. Use **←** and **→** (on screen or on the keyboard) to move between cards. **Missed it** adds the card to your missed list and **Got it** removes it. |
| **Quiz** | Multiple-choice questions about drug class, generic name, primary indication or boxed warning. Shows a running score. A wrong answer adds the card to your missed list. |
| **Spaced review** | Goes through the deck. **Again** shows the card again soon and **Hard** a little later. **Good** and **Easy** remove it from this session. |
| **Browse** | A searchable list of every card. Click a drug to open its card, already flipped to the back. |
| **Filters** | Route, CPL tier, drug class, controlled substances only, boxed warning only, and "My missed". |
| **Card front** | Choose what the front of the card shows: generic name, brand name, clues (class + indications), or a random mix. |

---

## 3. Where progress is saved

The app saves the **"missed" list**. It's stored in the browser's own storage on that computer (called *localStorage*).

- Nothing is sent to the internet.
- The saved data belongs to that one browser on that one computer. A student who switches computers or browsers starts fresh.
- Clearing browsing data in the browser erases the missed list.

---

## 4. Adding or editing a drug

1. Open `index.html` in a plain text editor. On Windows use **Notepad**, on a Mac use **TextEdit** (choose *Format → Make Plain Text* first). **VS Code** is a good free option. Don't use Word, because it adds hidden formatting that breaks the file.
2. Search for `const DRUGS = [`. Every drug below that line is one block in curly braces `{ ... }`.
3. To add a drug, copy an existing block (from `{ id:` through the closing `},`), paste it directly below, and change the text inside the quotes.
4. Save the file, then reload it in the browser.

What each field means:

| Field | Meaning | Example |
|---|---|---|
| `id` | A short nickname that must be unique. The app uses it to remember missed cards. | `'lisi'` |
| `generic` / `brand` | Names shown on the card | `'Lisinopril'`, `'Zestril®'` |
| `cls` | Drug class | `'Antihypertensive'` |
| `sys` | Color group. Must be one of: `endo`, `cardio`, `resp`, `gi`, `cns`, `inf`, `heme` | `'cardio'` |
| `route` | Exactly `'Oral'` or `'Injectable'` | `'Oral'` |
| `ind` | A list of indications in square brackets | `['Hypertension','Heart failure']` |
| `ctrl` | `'Not Controlled'`, or the schedule, e.g. `'Schedule II'` | `'Schedule IV'` |
| `cpl` | `'CPL1'` through `'CPL5'` | `'CPL3'` |
| `moa`, `mon`, `coun`, `forms` | Mechanism, monitoring, counseling and dosage forms | free text |
| `boxed` | Boxed warning text. Use `''` (two single quotes) when there is none. | `''` |

**Common mistakes:** every text value needs a quote mark at the start and end, and every block needs a comma after its closing `}`. If a text value contains an apostrophe (for example *patient's*), type it as `\'` (patient\'s). If the page goes blank after an edit, the most likely cause is a missing quote or comma near your change.

---

## 5. Things to know

- **Please check the drug facts.** The design assistant condensed the 15 sample cards from FDA labeling and general knowledge. They haven't been checked against DailyMed.
- **No drug is CPL5 yet,** so choosing CPL tier 5 shows "No cards match these filters".
- **Spaced review only works within one session.** The labels "1 day" and "4 days" match the design, but cards aren't scheduled for future days. Closing the page starts the review over.
