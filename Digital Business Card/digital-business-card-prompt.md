# Digital Business Card Generator — Reusable Prompt

**How to use this (for tutorial viewers):**
1. Fill in your own details in the `[BRACKETS]` below.
2. Copy everything from "COPY STARTING HERE" down.
3. Paste it into Claude (or Claude Code), then paste your photo into the same message.
4. Answer the follow-up questions Claude asks you.
5. Claude will save a preview file for you to open locally AND give you ready-to-paste code in its reply — you never need to open the saved file to get your code.

---

### COPY STARTING HERE ⬇️

```
Build me a digital business card page with a button that saves my contact
info directly to someone's phone as a vCard file, plus a QR code that
links to the page.

* Save the preview file to this folder: Desktop
* Name the preview file: business-card.html

MY DETAILS
- Name: [YOUR NAME]
- Title: [YOUR JOB TITLE]
- Email: [YOUR EMAIL]
- Phone: [YOUR PHONE NUMBER]
- LinkedIn: [YOUR LINKEDIN URL]
- Photo: I'm pasting my photo into this chat. If it's a wide/landscape
  photo, crop it into a centered square automatically — no need to ask
  me first.
- My website: [YOUR WEBSITE URL] — please match this page's colors,
  fonts, and overall style to that site.

LAYOUT
- Show my contact details as a short list with a small icon next to
  each one: email, phone, and LinkedIn should each get their own line.
- Below the "Save Contact" button, add a separate "Connect on LinkedIn"
  button, so LinkedIn appears both in the contact list AND as its own
  button.

BEFORE YOU GENERATE ANYTHING, ASK ME:
1. Where I'll be pasting this code once it's finished — WordPress,
   Squarespace, Wix, or a plain HTML file on my own hosting. The
   placement instructions and copy-paste code you give me at the end
   need to match this platform exactly.
2. The exact web address this page will live at once it's published —
   the QR code needs to point to this.
3. If I forgot to paste in my photo, stop and ask me for it before
   continuing. Do not invent or generate a placeholder photo for me.

FILE HANDLING (TESTING ONLY)
- Save the finished file as a local preview only, at:
  [FOLDER PATH] / [FILE NAME].html
- This saved file is just for me to double-click and preview in my own
  browser first — it is NOT what gets pasted into my real website.

BUILD IN THESE SPECIFIC REQUIREMENTS
1. vCard formatting: contact card files (vCards) follow an old
   formatting rule where no single line of text in the file can be
   longer than 75 characters — if a line is longer, it must be
   "folded" by breaking it and starting the continuation line with a
   single space, per the vCard/RFC 2426 spec. Apply this automatically
   so the saved contact never gets corrupted or rejected by someone's
   phone.
2. Hide my email address and phone number from the page's raw code —
   don't show them as plain, readable text anywhere a bot could scrape
   them. Scramble/encode them so they only turn into a normal,
   clickable, readable email link and phone link after the page has
   fully loaded in the visitor's browser.
3. Add plain-language comments throughout the code explaining what
   each part does, written for someone who isn't a programmer — or at
   minimum, comments that let me paste any section into Claude and ask
   "what does this part do?" for more detail.

WHAT I WANT BACK
Once you generate the code, don't just save the file and stop. In your
reply, also give me — so I never have to open the saved file to get
this:
1. A short summary of what you built and any assumptions you made.
2. Step-by-step instructions for testing the preview file, including
   how to open the saved contact file on a real phone to confirm it
   saves correctly.
3. The EXACT copy-paste code for the platform I told you I'm using,
   formatted for that platform specifically (a WordPress Custom HTML
   block, a Squarespace Code Block, a Wix HTML iframe/embed element,
   or a plain .html file to upload) — ready to paste with no further
   edits needed.
4. Any platform-specific caveats I should know about (for example,
   some page builders strip <script> tags or require an embed/iframe
   instead of inline code).

Please use plain, encouraging language throughout — I may not be a
programmer.
```

### COPY ENDING HERE ⬆️
