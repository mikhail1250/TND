(() => {
  const menuButton = document.querySelector(".menu-button");
  const nav = document.querySelector(".site-nav");
  const brandLinks = [...document.querySelectorAll('.brand[href="/"]')];

  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(open));
    });

    nav.addEventListener("click", (event) => {
      if (event.target.closest("a")) {
        nav.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
      }
    });
  }

  brandLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const onHome = window.location.pathname === "/" || window.location.pathname.endsWith("/index.html");
      if (!onHome) return;
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      nav?.classList.remove("open");
      menuButton?.setAttribute("aria-expanded", "false");
    });
  });

  const form = document.querySelector("#eligibility-checker");
  if (form) {
    const questions = [...form.querySelectorAll(".question")];
    const backButton = form.querySelector(".back-button");
    const progress = form.querySelector(".progress-track span");
    const result = form.querySelector(".checker-result");
    const restartButton = form.querySelector(".restart-button");
    let current = 0;

    const showQuestion = (index) => {
      questions.forEach((question, questionIndex) => {
        question.hidden = questionIndex !== index;
        question.classList.toggle("active", questionIndex === index);
      });
      result.hidden = true;
      current = index;
      backButton.hidden = current === 0;
      progress.style.width = `${((current + 1) / questions.length) * 100}%`;
      const firstInput = questions[current].querySelector("input");
      if (firstInput) firstInput.focus({ preventScroll: true });
    };

    const renderResult = () => {
      const values = Object.fromEntries(new FormData(form).entries());
      const flags = [];
      let heading = "A professional review may be worthwhile";
      let copy = "Your answers show a plausible reason to examine Article 20/D in more detail. Eligibility still depends on documents, Turkish source rules and the final application procedure.";

      if (values.arrival === "no" || values.foreignIncome === "no") {
        heading = "The regime may not be a practical fit";
        copy = "Based on these answers, the new exemption may have limited relevance. A different Turkish residence or tax question may matter more.";
      } else if (values.history === "no") {
        heading = "The three-year condition needs close attention";
        copy = "A prior Turkish domicile or tax liability can prevent eligibility, subject to limited statutory exceptions for certain Turkish investment, property and capital-gains income.";
      } else if (Object.values(values).includes("unsure") || values.activity === "yes") {
        heading = "Your case contains a material uncertainty";
        copy = "The regime may be relevant, but residence timing or source-of-income analysis should be resolved before you rely on the exemption.";
      }

      if (values.arrival === "unsure") flags.push("Confirm the date on which Turkey treats you as settled.");
      if (values.history === "unsure") flags.push("Build a year-by-year Turkish domicile and tax-liability history.");
      if (values.foreignIncome === "unsure") flags.push("Classify income by Turkish source rules, not payment location.");
      if (values.activity === "yes" || values.activity === "unsure") flags.push("Review remote work and foreign-company management separately.");
      if (!flags.length) flags.push("Gather residence and tax records for the previous three calendar years.");
      flags.push("Recheck the final Communique No. 333 before filing.");

      result.querySelector("h3").textContent = heading;
      result.querySelector(".result-copy").textContent = copy;
      result.querySelector(".result-flags").innerHTML = flags.map((flag) => `<li>${flag}</li>`).join("");
      questions.forEach((question) => { question.hidden = true; });
      backButton.hidden = true;
      progress.style.width = "100%";
      result.hidden = false;
      result.focus?.();
    };

    questions.forEach((question, index) => {
      question.addEventListener("change", () => {
        window.setTimeout(() => {
          if (index < questions.length - 1) showQuestion(index + 1);
          else renderResult();
        }, 140);
      });
    });

    backButton.addEventListener("click", () => showQuestion(Math.max(0, current - 1)));
    restartButton.addEventListener("click", () => {
      form.reset();
      showQuestion(0);
    });
  }

  const deadlineTool = document.querySelector("#deadline-tool");
  const deadlineResult = document.querySelector("#deadline-result");
  const deadlineNote = document.querySelector("#deadline-note");
  if (deadlineTool && deadlineResult && deadlineNote) {
    const renderDeadline = () => {
      const data = Object.fromEntries(new FormData(deadlineTool).entries());
      const yearValue = Number(data.year) || 2026;
      const monthValue = Number(data.month) || 1;
      const deadlineYear = monthValue >= 11 ? yearValue + 1 : yearValue;
      const deadlineText = monthValue >= 11 ? `28 February ${deadlineYear}` : `31 December ${deadlineYear}`;

      let note = "Start with residence evidence, prior tax-residence proof and an income-source map.";
      if (data.history === "limited") {
        note = "Limited Turkish investment or property income may not block the exemption, but it should be documented carefully.";
      } else if (data.history === "yes") {
        note = "A prior Turkish tax liability may be a blocking issue. Treat this as a professional-review case.";
      } else if (data.history === "unsure") {
        note = "First task: reconstruct the previous three calendar years before relying on the exemption.";
      }

      deadlineResult.textContent = deadlineText;
      deadlineNote.textContent = note;
    };

    deadlineTool.addEventListener("change", renderDeadline);
    renderDeadline();
  }

  const year = document.querySelector("#year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
