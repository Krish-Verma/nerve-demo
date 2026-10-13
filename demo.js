"use strict";

// Independently authored fictional fixtures. These are not backend responses.
const fixtures = [
  {
    id: "checkout", system: "Checkout", state: "supported", label: "Supported sample",
    relationship: "Checkout supports the goal by accepting orders during peak demand.",
    summary: "The sample note records an order acceptance exercise.",
    limit: "This synthetic excerpt supports only the displayed relationship. It does not prove capacity or overall readiness.",
    source: { id: "SAMPLE-01", title: "Order acceptance exercise", date: "12 Oct 2026 · 09:00 UTC", location: "Section 2 · Exercise outcome", excerpt: "In this fictional exercise, Checkout accepted the sample orders. Order acceptance contributes to the goal of keeping peak-season orders flowing." }
  },
  {
    id: "inventory", system: "Inventory availability", state: "stale", label: "Stale sample",
    relationship: "Inventory availability supports the goal by showing whether items can be ordered.",
    summary: "The included evidence is older than this scenario's seven-day freshness window.",
    limit: "A fresh check is needed. Old evidence does not establish the current state and does not imply a failure.",
    source: { id: "SAMPLE-02", title: "Availability snapshot note", date: "28 Sep 2026 · 10:00 UTC", location: "Section 1 · Sample snapshot", excerpt: "In this fictional snapshot, availability was shown for the sample items. This note describes that snapshot only; it makes no claim about later inventory state." }
  },
  {
    id: "routing", system: "Order routing", state: "missing", label: "Missing evidence",
    relationship: "Order routing is a proposed contributor to the goal by directing accepted orders toward fulfillment.",
    summary: "No source fixture is supplied for this proposed relationship.",
    limit: "The relationship remains unverified in this sample. Missing evidence is not evidence that Order routing failed.",
    source: null
  }
];

const cards = document.querySelector("#cards");
const detail = document.querySelector("#detail");

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function selectFixture(fixture) {
  for (const button of cards.querySelectorAll("button")) {
    button.setAttribute("aria-pressed", String(button.dataset.fixture === fixture.id));
  }
  detail.replaceChildren();
  detail.append(element("p", "eyebrow", "RELATIONSHIP INSPECTOR · SYNTHETIC"));
  const title = element("h2", "", fixture.system);
  title.id = "detail-title";
  detail.append(title, element("span", `badge ${fixture.state}`, fixture.label));
  detail.append(element("h3", "", "Explicit relationship"), element("p", "relationship", fixture.relationship));
  detail.append(element("h3", "", "Evidence state"), element("p", "", fixture.summary), element("p", "limit", fixture.limit));
  detail.append(element("h3", "", "Source citation"));

  if (fixture.source) {
    const citation = element("a", "citation", `[${fixture.source.id}] ${fixture.source.title}`);
    citation.href = "#source-excerpt";
    detail.append(citation);
    detail.append(element("p", "source-meta", `${fixture.source.location} · ${fixture.source.date}`));
    const source = element("div", "source");
    source.id = "source-excerpt";
    source.append(element("p", "eyebrow", "INCLUDED SYNTHETIC SOURCE EXCERPT"), element("blockquote", "", fixture.source.excerpt));
    detail.append(source);
  } else {
    detail.append(element("p", "empty-source", "No citation available · no source fixture supplied."));
  }
  detail.append(element("p", "fixture-note", "Local fixture viewer only. No query execution, live data, or backend requests."));
}

for (const fixture of fixtures) {
  const button = element("button", "card");
  button.type = "button";
  button.dataset.fixture = fixture.id;
  button.setAttribute("aria-pressed", "false");
  button.append(element("span", "card-title", fixture.system), element("span", `badge ${fixture.state}`, fixture.label), element("span", "card-caption", "Goal → system · synthetic relationship"));
  button.addEventListener("click", () => selectFixture(fixture));
  cards.append(button);
}

selectFixture(fixtures[0]);
