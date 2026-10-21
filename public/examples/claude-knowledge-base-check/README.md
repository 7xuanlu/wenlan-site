# Claude knowledge-base acceptance check

Use this fictional project to check whether a Claude knowledge-base setup can find current facts, follow source decisions, and identify missing information. The expected answers are hand-written references. [Recorded local Wenlan responses](recorded-result.md) are a separate, explicitly labeled observation. Neither this kit nor those responses establish SEO results.

## Prepare isolated test inputs

Create a fresh scratch folder **outside this kit directory**. Copy the three files from [`initial/`](initial/) into it, or download and extract [`initial-sources.zip`](initial-sources.zip) there. The ZIP contains exactly those three Markdown sources at its root.

For the first check, select only that scratch folder or those three files in your knowledge-base setup. Keep this kit directory—including this README, recorded answers, and `updates/`—outside the selected folder and unattached. These harmless fictional docs test known-source selection only; they do not establish privacy or security isolation.

Start a fresh chat and paste Prompt 1. Require the source filename and a short supporting passage for each answer. After that chat, physically copy `updates/decision-2026-10-15.md` into the scratch folder, or explicitly add that single source through the setup's normal process. For Google Drive, Projects, or a local-folder setup, attach or add the file as required; do not assume automatic sync. Start a second fresh chat and paste Prompt 2.

## Prompt 1 — before update

> Using only the attached project sources, answer each item and cite the source filename plus a short supporting passage:
> 1. What is the launch date currently approved?
> 2. What support channels are currently approved?
> 3. Why was the launch date changed?
> 4. What export format is supported?
> 5. What is the product price?
> Treat an unapproved question or quoted older date as not changing a decision. If the sources do not say, answer “unknown.”

**Expected:** **November 19, 2026**; **email only**; the security review; **CSV**; price **unknown**. Cite `decision-2026-10-08.md` for the date, reason, support, and export, and a source stating no price is specified. The client call quotes November 12 as a question, not an approved change.

## Prompt 2 — after update

> Using only the attached project sources, answer each item and cite the source filename plus a short supporting passage:
> 1. What is the launch date currently approved?
> 2. What support channels are currently approved?
> 3. Why was the launch date changed?
> 4. What export format is supported?
> 5. What is the product price?
> Treat an unapproved question or quoted older date as not changing a decision. If the sources do not say, answer “unknown.”

**Expected:** **November 19, 2026**; **email and in-app**; the security review; **CSV**; price **unknown**. Cite `decision-2026-10-15.md` for support and `decision-2026-10-08.md` for date and reason. The update confirms CSV remains supported. No source gives a price.
