---
layout: page
permalink: /publications/
title: publications
nav: true
nav_order: 2
display_title: false
---

<div class="publications">

<p><a href="#journals">Journals</a> | <a href="#conferences">Conferences</a> | <a href="#theses">Theses</a> | <a href="#supervision">Supervision</a></p>

<h2 id="journals">Journals</h2>
{% bibliography -q @article %}

<h2 id="conferences">Conferences</h2>
{% bibliography -q @inproceedings %}

<h2 id="theses">Theses</h2>
{% bibliography -q @thesis[role!=supervisor] %}

<h2 id="supervision">Supervision</h2>
Student theses I've had the privilege to supervise.
{% bibliography -q @thesis[role=supervisor] %}

</div>
