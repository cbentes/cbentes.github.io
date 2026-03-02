---
layout: page
permalink: /publications/
title: publications
nav: true
nav_order: 2
display_title: false
---

<div class="publications">

<p>
  <a href="#" class="pub-filter" data-filter="all">All</a> |
  <a href="#" class="pub-filter" data-filter="journal">Journals</a> |
  <a href="#" class="pub-filter" data-filter="conference">Conferences</a> |
  <a href="#" class="pub-filter" data-filter="thesis">Theses</a> |
  <a href="#" class="pub-filter" data-filter="supervision">Supervision</a> |
  <a href="#" class="pub-filter" data-filter="other">Other</a>
</p>

{% bibliography %}

</div>

<style>
.pub-filter {
  cursor: pointer;
}
.pub-filter.active {
  font-weight: bold;
}
.bibliography > li.type-filtered {
  display: none;
}
h2.bibliography.type-filtered,
ol.bibliography.type-filtered {
  display: none;
}
</style>

<script>
document.addEventListener("DOMContentLoaded", function () {
  var links = document.querySelectorAll(".pub-filter");

  function applyFilter(filter) {
    document.querySelectorAll(".bibliography > li").forEach(function (li) {
      var row = li.querySelector(".row[data-bib-type]");
      if (!row) return;
      var type = row.getAttribute("data-bib-type");
      if (!filter || filter === "all" || type === filter) {
        li.classList.remove("type-filtered");
      } else {
        li.classList.add("type-filtered");
      }
    });

    document.querySelectorAll("h2.bibliography").forEach(function (h2) {
      h2.classList.remove("type-filtered");
      var next = h2.nextElementSibling;
      while (next && next.tagName !== "H2") {
        if (next.tagName === "OL") {
          var total = next.querySelectorAll(":scope > li");
          var hidden = next.querySelectorAll(":scope > li.type-filtered");
          var searchHidden = next.querySelectorAll(":scope > li.unloaded");
          if (total.length > 0 && hidden.length + searchHidden.length >= total.length) {
            next.classList.add("type-filtered");
          } else {
            next.classList.remove("type-filtered");
          }
        }
        next = next.nextElementSibling;
      }
      var allGroupsHidden = true;
      var sibling = h2.nextElementSibling;
      while (sibling && sibling.tagName !== "H2") {
        if (sibling.tagName === "OL" && !sibling.classList.contains("type-filtered") && !sibling.classList.contains("unloaded")) {
          allGroupsHidden = false;
          break;
        }
        sibling = sibling.nextElementSibling;
      }
      if (allGroupsHidden) {
        h2.classList.add("type-filtered");
      }
    });
  }

  links.forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      if (link.classList.contains("active")) {
        link.classList.remove("active");
        applyFilter(null);
      } else {
        links.forEach(function (l) { l.classList.remove("active"); });
        link.classList.add("active");
        applyFilter(link.getAttribute("data-filter"));
      }
    });
  });
});
</script>
