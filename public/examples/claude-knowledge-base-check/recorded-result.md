# Recorded Wenlan retrieval checks

The [desktop-and-browser check](#desktop-and-browser-check) below is separate from the earlier local CLI check. Both used the public fictional Cedar packet.

## Earlier local CLI check

Recorded October 20, 2026, using the fictional files in this kit. Wenlan 0.19.2; Claude Code through acpx 0.14.0 / Claude ACP 0.75.1; effective main model Claude Sonnet 5.5 (auxiliary Haiku calls also reported). Two independent sessions, five successful local MCP recall calls each. Background AI disabled; sources explicitly imported.

This is not a Claude Projects, Claude Desktop UI, remote Web access, automatic folder-sync, or automatic wiki-update test. It is not a comparative accuracy benchmark. The reference answers were kept out of the database and the prompts did not supply answer values.

## Before the update — actual response

I used only the cedar-kb `recall` tool, and it returned the same three sources for all five queries.

| Question | Answer | Source and supporting passage |
|---|---|---|
| Approved launch date | **November 19, 2026** | `decision-2026-10-08.md`: "Cedar's approved launch date is now **November 19, 2026**" |
| Support channels | **Email only** | `decision-2026-10-08.md`: "Support remains **email only**." `project-brief.md` agrees: "Customer support is available by **email only**." |
| Reason for the date change | **To allow time for the security review** | `decision-2026-10-08.md`: "…to allow time for the security review." |
| Export format | **CSV** | `decision-2026-10-08.md`: "Data export remains **CSV**." `project-brief.md` agrees: "Customers can export their data as **CSV**." |
| Product price | **Unknown** | `decision-2026-10-08.md`: "This decision does not set a product price." `project-brief.md`: "This brief does not specify a product price." |

- **Old date:** `decision-2026-10-08.md` says it "supersedes the November 12 launch date in `project-brief.md`", so the brief's November 12 date is outdated.
- **Client call:** `client-call-2026-10-10.md` records the customer asking "Are we still launching November 12?" The note says this is "**not an approved request or decision to change the launch date**." I therefore did not let it change the approved date.

**Missing evidence:** No source gives a product price. I found nothing else on Cedar beyond these three files, and I didn't search outside the recall tool.

## After adding the update — actual fresh-session response

All five answers come from four Cedar sources returned by the cedar-kb `recall` tool. I read nothing else and wrote nothing.

| Question | Answer | Source and supporting passage |
|---|---|---|
| Approved launch date | **November 19, 2026** | `decision-2026-10-08.md`: "Cedar's approved launch date is now **November 19, 2026**". `decision-2026-10-15.md` confirms: "The approved launch date remains **November 19, 2026**." |
| Support channels | **Email and in-app support** | `decision-2026-10-15.md`: "changes support coverage to **email and in-app support**." This replaces the "email only" in `project-brief.md` and `decision-2026-10-08.md`. |
| Reason for the date change | **To allow time for the security review** | `decision-2026-10-08.md`: "…to allow time for the security review." The same file says it "supersedes the November 12 launch date" in `project-brief.md`. |
| Export format | **CSV** | `decision-2026-10-15.md`: "CSV export remains supported." `decision-2026-10-08.md` also says "Data export remains **CSV**." |
| Product price | **Unknown** | `project-brief.md`, `decision-2026-10-08.md` and `decision-2026-10-15.md` each say they do not set or specify a product price. |

**Superseded and non-decision sources**
- `project-brief.md` (2026-10-01) gives November 12, 2026, "email only" support and CSV export. The launch date and support channels are superseded by the later decisions.
- `client-call-2026-10-10.md` records the customer asking "Are we still launching November 12?" The note says this is "**not an approved request or decision to change the launch date**." I treated it as not changing anything, so the approved date stays November 19.

**Missing evidence**
- No source gives a product price.
- No source says whether the launch date or support channels have changed after 2026-10-15, the latest source.
- Nothing describes the security review beyond the one-line reason.
- The `recall` results returned only these four documents. I didn't check for others.

## Independent check

The lead inspected both answers and their quoted passages against the four source documents. Both identified the approved November 19 date, security-review reason, CSV export, and unknown price. Support changed from email only to email and in-app, supported by decision-2026-10-15.md. Neither restored the old date from the client-call question. No source file was changed by either model session.


## Desktop-and-browser check

Recorded October 20, 2026. Official Wenlan desktop app **0.19.2**, Claude web **Opus 5.5 Medium**, signed-in account. No terminal was used for source selection, pairing, asking, opening the original source, or Refresh. The isolated test library contained only fictional Cedar sources and synthetic Atlas reviewer fixtures. Reference answers stayed outside it. The app was launched in isolation by the test harness; a normal user installs and opens Wenlan instead.

### What we actually operated

1. In Wenlan, **Add a source → Connect a folder**; selected the extracted Cedar folder. **Sources → Cedar project → Info** showed three files and three memories.
2. In **Settings → Connections → Web access**, enabled access and explicitly approved **Whole library** for this fictional database. Claude already had a Wenlan connector, so we used **Customize → Connectors → Yours → Reconnect**, then the pairing page's code through **Have a code?** in Wenlan. Confirmed **Allow**. Claude appeared under **Connected apps**, and Claude showed Wenlan **Connected**.
3. Asked Claude the five questions without supplying their answers. The first recall and brief attempts guessed a Space named `Cedar` and returned HTTP 422. A third guessed-space retry was declined. We clarified that Cedar is the project name, removed the Space argument, and the next recall succeeded. This correction is included in the article prompt.
4. Opened **decision-2026-10-08.md** in Wenlan and checked its actual text and indexed status against the answer.
5. Put **decision-2026-10-15.md** into the folder. Clicked **Refresh**, confirmed four files/four memories, and opened the new original. A separate new Claude conversation received the corrected prompt with no previous answer or chat context. Two successful Recall calls retrieved the source passages; the tool-response panel was independently inspected.

### Actual first successful GUI answer

| Question | Answer | Cited passage |
|---|---|---|
| Approved launch date | November 19, 2026 | decision-2026-10-08.md: “Cedar’s approved launch date is now November 19, 2026” |
| Support channels | Email only | decision-2026-10-08.md: “Support remains email only.” |
| Reason for the date change | To allow time for the security review | decision-2026-10-08.md: “to allow time for the security review” |
| Export format | CSV | decision-2026-10-08.md: “Data export remains CSV.” |
| Product price | Unknown | project-brief.md: “does not specify a product price”; decision-2026-10-08.md: “does not set a product price” |

Claude explained that the client-call question did not change an approved decision. [Original response screenshot](/images/product-evidence/claude-cedar-first-answer.jpg).

### Actual fresh GUI conversation after the update

| Item | Answer | Source and supporting passage |
|---|---|---|
| Approved launch date | November 19, 2026 | decision-2026-10-08: the decision “supersedes the November 12 launch date.” decision-2026-10-15 confirms it: the approved date “remains November 19, 2026.” |
| Support channels | Email and in-app support | decision-2026-10-15 changes coverage to “email and in-app support.” This replaces “email only,” which appears in project-brief and decision-2026-10-08. |
| Reason for date change | To allow time for the security review | decision-2026-10-08: the new date is “to allow time for the security review.” |
| Export format | CSV | project-brief: customers “can export their data as CSV.” decision-2026-10-15 says “CSV export remains supported.” |
| Product price | Unknown | All three documents say they do not set a price. For example, decision-2026-10-08 says it “does not set a product price.” |

“All three” in the price answer refers to the brief and two decisions; the packet has four files in total, including the call note. The lead checked the answer against those originals. [Actual updated source in Wenlan](/images/product-evidence/wenlan-cedar-update-source.jpg) · [Actual fresh-chat answer](/images/product-evidence/claude-cedar-updated-answer.jpg).

### Boundaries and cleanup

This demonstrates this small Markdown source lookup and the manually confirmed update. It does **not** establish automatic folder refresh timing, automatic wiki maintenance, PDF ingestion, Codex behavior, or a comparative accuracy rate. The cloud route sends retrieved text through Wenlan relay to Claude; it is not an offline AI.

Because the test explicitly granted Whole library, Recall also returned synthetic Atlas hits. Claude omitted them from the Cedar answer. A prompt restricting an answer to a project is not an access-control boundary. The user's personal Wenlan library was not connected. After capture, Wenlan showed **Ended: access was removed** for this Claude grant, Web access was switched off, and the owned isolated app exited cleanly through its launcher.
