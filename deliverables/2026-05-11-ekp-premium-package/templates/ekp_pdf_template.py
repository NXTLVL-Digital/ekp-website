"""
Emily Kathryn Photography — Branded PDF Template Renderer
NXTLVL Digital | 2026-05-11

Converts a markdown source file into a fully branded EKP PDF using
WeasyPrint (HTML+CSS → PDF). All EKP PDFs in the 2026-05-11 package
render through this single template so they look like a coordinated set.

Usage (from python):
    from ekp_pdf_template import render_pdf
    render_pdf(
        markdown_path="research/01-market-research.md",
        output_pdf_path="research/01-market-research.pdf",
        doc_number="01",
        doc_title="Market Research",
        doc_subtitle="South-Central Virginia Portrait Market Opportunity",
        prepared_date="May 11, 2026",
    )

Brand palette
-------------
Black        #000000
Warm Gold    #C2A36C
Blush        #DCB6AD
Aqua / Mint  #B3D4CD
Soft Gray    #D6D4D4
Cream/Ivory  #FAF7F2  (paper)
"""

from __future__ import annotations

import re
from pathlib import Path

import markdown as md_lib
from weasyprint import HTML, CSS

# -- Brand tokens -------------------------------------------------------------

BRAND = {
    "name": "Emily Kathryn Photography",
    "submark": "ek.",
    "agency": "Prepared by NXTLVL Digital",
    "tagline": "Editorial Portraiture · South-Central Virginia",
    "url": "emilykathryn.com",
    "colors": {
        "black": "#000000",
        "gold": "#C2A36C",
        "gold_soft": "#D4BC8A",
        "blush": "#DCB6AD",
        "aqua": "#B3D4CD",
        "gray": "#D6D4D4",
        "ink": "#1A1A1A",
        "paper": "#FAF7F2",
        "muted": "#6B655C",
        "rule": "#E5DFD3",
    },
}


# -- CSS ---------------------------------------------------------------------

CSS_STRING = """
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Italiana&family=Inter:wght@300;400;500;600;700&display=swap');

/* ---------- Page geometry ---------- */

@page {
    size: Letter;
    margin: 0.85in 0.85in 1in 0.85in;

    @bottom-left {
        content: "Emily Kathryn Photography  ·  Prepared by NXTLVL Digital";
        font-family: 'Inter', sans-serif;
        font-size: 8pt;
        letter-spacing: 0.12em;
        color: #6B655C;
        text-transform: uppercase;
        padding-top: 12pt;
        border-top: 0.5pt solid #C2A36C;
    }

    @bottom-right {
        content: counter(page) " / " counter(pages);
        font-family: 'Inter', sans-serif;
        font-size: 8pt;
        letter-spacing: 0.18em;
        color: #6B655C;
        padding-top: 12pt;
        border-top: 0.5pt solid #C2A36C;
    }
}

@page :first {
    margin: 0;

    @bottom-left { content: none; border: none; }
    @bottom-right { content: none; border: none; }
}

@page divider {
    background: #000000;
    margin: 0;

    @bottom-left { content: none; border: none; }
    @bottom-right { content: none; border: none; }
}

/* ---------- Reset & base ---------- */

* { box-sizing: border-box; }

html, body {
    margin: 0;
    padding: 0;
    font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
    font-weight: 400;
    font-size: 10pt;
    line-height: 1.6;
    color: #1A1A1A;
    background: #FAF7F2;
}

/* ---------- COVER ---------- */

.cover {
    page: first;
    page-break-after: always;
    width: 8.5in;
    height: 11in;
    position: relative;
    background: #FAF7F2;
    padding: 0;
    margin: 0;
    display: block;
}

.cover-inner {
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    padding: 1.1in 0.95in 1in 0.95in;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.cover-band {
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 0.34in;
    background: #000000;
}

.cover-band-gold {
    position: absolute;
    top: 0.34in; left: 0; right: 0;
    height: 4pt;
    background: #C2A36C;
}

.cover-header {
    margin-top: 0.1in;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    letter-spacing: 0.32em;
    font-size: 8pt;
    font-family: 'Inter', sans-serif;
    text-transform: uppercase;
    color: #6B655C;
}

.cover-header .left { text-align: left; }
.cover-header .right { text-align: right; }

.cover-mid {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-top: 0.4in;
}

.cover-eyebrow {
    font-family: 'Inter', sans-serif;
    font-size: 9pt;
    letter-spacing: 0.42em;
    text-transform: uppercase;
    color: #C2A36C;
    margin-bottom: 0.18in;
}

.cover-number {
    font-family: 'Italiana', 'Cormorant Garamond', serif;
    font-size: 96pt;
    line-height: 0.9;
    color: #000000;
    margin: 0 0 0.05in 0;
    letter-spacing: -0.02em;
}

.cover-rule {
    width: 1.6in;
    height: 1pt;
    background: #C2A36C;
    margin: 0.2in 0 0.32in 0;
}

.cover-title {
    font-family: 'Italiana', 'Cormorant Garamond', serif;
    font-weight: 400;
    font-size: 56pt;
    line-height: 1.0;
    letter-spacing: -0.01em;
    color: #000000;
    margin: 0;
}

.cover-subtitle {
    font-family: 'Cormorant Garamond', serif;
    font-style: italic;
    font-weight: 400;
    font-size: 17pt;
    line-height: 1.35;
    color: #4A463F;
    margin-top: 0.22in;
    max-width: 5.2in;
}

.cover-foot {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    border-top: 0.5pt solid #C2A36C;
    padding-top: 0.18in;
}

.cover-foot-left,
.cover-foot-right {
    font-family: 'Inter', sans-serif;
    font-size: 8pt;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #1A1A1A;
    line-height: 1.7;
}

.cover-foot .agency {
    color: #C2A36C;
    font-weight: 500;
}

.cover-submark {
    position: absolute;
    bottom: 0.55in;
    right: 0.95in;
    width: 0.7in;
    height: 0.7in;
    border-radius: 50%;
    border: 0.7pt solid #1A1A1A;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Italiana', 'Cormorant Garamond', serif;
    font-size: 24pt;
    color: #1A1A1A;
}

/* ---------- Section divider page ---------- */

.section-divider {
    page: divider;
    page-break-before: always;
    page-break-after: always;
    width: 8.5in;
    height: 11in;
    background: #000000;
    color: #FAF7F2;
    padding: 1.5in 0.95in;
    position: relative;
}

.section-divider .eyebrow {
    font-family: 'Inter', sans-serif;
    font-size: 8.5pt;
    letter-spacing: 0.42em;
    text-transform: uppercase;
    color: #C2A36C;
    margin-bottom: 0.12in;
}

.section-divider h2 {
    font-family: 'Italiana', 'Cormorant Garamond', serif;
    font-size: 64pt;
    line-height: 1;
    margin: 0 0 0.25in 0;
    color: #FAF7F2;
    font-weight: 400;
}

.section-divider .number {
    position: absolute;
    bottom: 1in;
    right: 0.95in;
    font-family: 'Italiana', serif;
    font-size: 120pt;
    line-height: 1;
    color: #C2A36C;
    opacity: 0.55;
}

/* ---------- Body content ---------- */

.body {
    padding: 0;
}

.body h1 {
    font-family: 'Italiana', 'Cormorant Garamond', serif;
    font-weight: 400;
    font-size: 32pt;
    line-height: 1.1;
    color: #000000;
    margin: 0 0 0.18in 0;
    letter-spacing: -0.005em;
    page-break-after: avoid;
}

.body h1:not(:first-of-type) {
    margin-top: 0.45in;
    padding-top: 0.25in;
    border-top: 0.5pt solid #C2A36C;
}

.body h2 {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 600;
    font-size: 18pt;
    line-height: 1.2;
    color: #000000;
    margin: 0.3in 0 0.1in 0;
    letter-spacing: 0;
    page-break-after: avoid;
}

.body h3 {
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    font-size: 10pt;
    line-height: 1.3;
    color: #C2A36C;
    text-transform: uppercase;
    letter-spacing: 0.22em;
    margin: 0.22in 0 0.08in 0;
    page-break-after: avoid;
}

.body h4 {
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    font-size: 10.5pt;
    color: #1A1A1A;
    margin: 0.16in 0 0.06in 0;
    page-break-after: avoid;
}

.body p {
    margin: 0 0 0.12in 0;
    color: #1A1A1A;
    text-align: left;
    hyphens: auto;
}

.body strong { font-weight: 600; color: #000000; }
.body em { font-style: italic; color: #2A2A2A; }

.body a { color: #C2A36C; text-decoration: none; border-bottom: 0.5pt solid #C2A36C; }

.body ul, .body ol {
    margin: 0.05in 0 0.16in 0;
    padding-left: 0.25in;
}

.body li {
    margin-bottom: 0.04in;
    line-height: 1.55;
}

.body ul li::marker { color: #C2A36C; }
.body ol li::marker { color: #C2A36C; font-family: 'Cormorant Garamond', serif; font-weight: 600; }

.body blockquote {
    margin: 0.22in 0 0.22in 0.1in;
    padding: 0.12in 0.2in;
    border-left: 2pt solid #C2A36C;
    background: rgba(220, 182, 173, 0.16);
    font-family: 'Cormorant Garamond', serif;
    font-style: italic;
    font-size: 12pt;
    line-height: 1.5;
    color: #2A2A2A;
}

.body code {
    font-family: 'Courier New', monospace;
    font-size: 9pt;
    background: #F1ECDF;
    padding: 0 4pt;
    border-radius: 2pt;
}

.body hr {
    border: none;
    border-top: 0.5pt solid #C2A36C;
    margin: 0.3in 0;
}

.body table {
    width: 100%;
    border-collapse: collapse;
    margin: 0.16in 0 0.22in 0;
    font-size: 9pt;
    page-break-inside: auto;
}

.body table th {
    background: #000000;
    color: #FAF7F2;
    text-align: left;
    padding: 7pt 8pt;
    font-family: 'Inter', sans-serif;
    font-weight: 500;
    font-size: 8.5pt;
    letter-spacing: 0.14em;
    text-transform: uppercase;
}

.body table td {
    padding: 7pt 8pt;
    border-bottom: 0.5pt solid #E5DFD3;
    vertical-align: top;
    line-height: 1.45;
}

.body table tr:nth-child(even) td {
    background: rgba(214, 212, 212, 0.18);
}

.body table tr:last-child td {
    border-bottom: 1pt solid #C2A36C;
}

/* Callout boxes — built with markdown blockquote prefixed with [!Note] etc */
.callout {
    background: #FFFFFF;
    border-left: 3pt solid #C2A36C;
    padding: 0.18in 0.22in;
    margin: 0.2in 0;
    font-size: 9.5pt;
    line-height: 1.55;
}

.callout-eyebrow {
    font-family: 'Inter', sans-serif;
    font-size: 8pt;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: #C2A36C;
    margin-bottom: 0.06in;
    font-weight: 600;
}

/* Lead paragraph */
.body p.lead {
    font-family: 'Cormorant Garamond', serif;
    font-style: italic;
    font-size: 13pt;
    line-height: 1.5;
    color: #2A2A2A;
    margin-bottom: 0.18in;
}

.body p:first-of-type::first-letter {
    /* drop cap effect on first para — only after h1 */
}

/* Strong heading divider used after document number */
.body .doc-meta {
    font-family: 'Inter', sans-serif;
    font-size: 8.5pt;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: #6B655C;
    margin-bottom: 0.4in;
    padding-bottom: 0.18in;
    border-bottom: 0.5pt solid #C2A36C;
}

.body .doc-meta span { margin-right: 0.4in; }
.body .doc-meta span strong { color: #C2A36C; font-weight: 600; }

/* Page break helpers */
.page-break { page-break-after: always; }
.no-break { page-break-inside: avoid; }
"""


# -- Markdown rendering -------------------------------------------------------

MD_EXTENSIONS = [
    "extra",
    "tables",
    "sane_lists",
    "smarty",
    "attr_list",
    "def_list",
]


def render_markdown(md_text: str) -> str:
    # Pull out any "Lead:" prefix to first paragraph after title for lead styling
    md = md_lib.Markdown(extensions=MD_EXTENSIONS)
    html = md.convert(md_text)
    # First paragraph after first h1 → add .lead class
    html = re.sub(
        r"(</h1>\s*)<p>(.*?)</p>",
        r'\1<p class="lead">\2</p>',
        html,
        count=1,
        flags=re.DOTALL,
    )
    return html


# -- HTML template ------------------------------------------------------------

COVER_HTML = """
<section class="cover">
    <div class="cover-band"></div>
    <div class="cover-band-gold"></div>
    <div class="cover-inner">
        <div class="cover-header">
            <div class="left">Emily&nbsp;Kathryn&nbsp;Photography</div>
            <div class="right">{prepared_date}</div>
        </div>

        <div class="cover-mid">
            <div class="cover-eyebrow">{eyebrow}</div>
            <div class="cover-number">{doc_number}</div>
            <div class="cover-rule"></div>
            <h1 class="cover-title">{doc_title}</h1>
            <p class="cover-subtitle">{doc_subtitle}</p>
        </div>

        <div class="cover-foot">
            <div class="cover-foot-left">
                <div class="agency">{agency}</div>
                <div>{tagline}</div>
            </div>
            <div class="cover-foot-right">
                <div>{url}</div>
                <div>Confidential · For Client Review</div>
            </div>
        </div>

        <div class="cover-submark">{submark}</div>
    </div>
</section>
"""

DOC_HTML = """<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>{title}</title></head>
<body>
{cover}
<main class="body">
<div class="doc-meta">
    <span><strong>Document</strong> {doc_number}</span>
    <span><strong>Prepared</strong> {prepared_date}</span>
    <span><strong>By</strong> NXTLVL Digital</span>
</div>
{body_html}
</main>
</body></html>"""


def render_pdf(
    markdown_path: str | Path,
    output_pdf_path: str | Path,
    doc_number: str,
    doc_title: str,
    doc_subtitle: str,
    prepared_date: str = "May 11, 2026",
    eyebrow: str = "EKP Premium Brand Package",
):
    """Render a markdown source file to a branded EKP PDF."""
    md_path = Path(markdown_path)
    out_path = Path(output_pdf_path)

    md_text = md_path.read_text(encoding="utf-8")

    # Strip the first H1 from markdown body since cover handles it
    # (we still keep a "doc-meta" strip in body)
    md_body_text = re.sub(
        r"^\s*#\s+.*?\n", "", md_text, count=1, flags=re.MULTILINE
    )
    # Strip the "Prepared:" / "Prepared by:" metadata lines if present
    md_body_text = re.sub(
        r"^\s*\*\*Prepared.*?\*\*.*?\n", "", md_body_text, flags=re.MULTILINE
    )
    md_body_text = re.sub(
        r"^\s*\*\*Brand frame.*?\*\*.*?\n", "", md_body_text, flags=re.MULTILINE
    )

    body_html = render_markdown(md_body_text)

    cover = COVER_HTML.format(
        prepared_date=prepared_date.upper(),
        eyebrow=eyebrow.upper(),
        doc_number=doc_number,
        doc_title=doc_title,
        doc_subtitle=doc_subtitle,
        agency=BRAND["agency"].upper(),
        tagline=BRAND["tagline"].upper(),
        url=BRAND["url"].upper(),
        submark=BRAND["submark"],
    )

    html = DOC_HTML.format(
        title=doc_title,
        cover=cover,
        doc_number=doc_number,
        prepared_date=prepared_date.upper(),
        body_html=body_html,
    )

    out_path.parent.mkdir(parents=True, exist_ok=True)
    HTML(string=html, base_url=str(md_path.parent)).write_pdf(
        str(out_path),
        stylesheets=[CSS(string=CSS_STRING)],
    )
    print(f"  → wrote {out_path}")
    return out_path


if __name__ == "__main__":
    # Smoke test
    here = Path(__file__).parent
    test_md = here / "_template_test.md"
    test_md.write_text(
        "# Template Smoke Test\n\n"
        "This is a lead paragraph confirming the template renders.\n\n"
        "## A second heading\n\n"
        "Body text with **bold**, *italic*, and `code` styles.\n\n"
        "- bullet one\n- bullet two\n- bullet three\n\n"
        "> A blockquote line — used for callouts and emphasis.\n\n"
        "| Column A | Column B | Column C |\n"
        "|---|---|---|\n"
        "| Row 1 | data | data |\n"
        "| Row 2 | data | data |\n"
    )
    render_pdf(
        test_md,
        here / "_template_test.pdf",
        doc_number="00",
        doc_title="Template Smoke Test",
        doc_subtitle="Verifying the EKP-branded PDF renderer outputs cleanly.",
    )
