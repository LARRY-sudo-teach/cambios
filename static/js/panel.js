(() => {
  document.querySelectorAll(".js-questionnaire").forEach((form) => {
    const questions = Array.from(form.querySelectorAll(".enunciado"));
    const current = form.querySelector("[data-progress-current]");
    const total = form.querySelector("[data-progress-total]");
    const percent = form.querySelector("[data-progress-percent]");
    const fill = form.querySelector("[data-progress-fill]");
    const prev = form.querySelector("[data-question-prev]");
    const next = form.querySelector("[data-question-next]");
    const finish = form.querySelector("[data-question-finish]");
    const exit = form.querySelector("[data-question-exit]");
    let index = 0;

    if (!questions.length || !current || !total || !percent || !fill) return;

    const cards = Array.from(new Set(questions.map((question) => question.closest(".tarjeta")).filter(Boolean)));

    const show = (nextIndex) => {
      index = Math.max(0, Math.min(nextIndex, questions.length - 1));
      questions.forEach((question, questionIndex) => {
        question.hidden = questionIndex !== index;
      });
      cards.forEach((card) => {
        card.hidden = !card.contains(questions[index]);
      });
      const value = Math.round(((index + 1) / questions.length) * 100);
      current.textContent = String(index + 1);
      total.textContent = String(questions.length);
      percent.textContent = `${value}%`;
      fill.style.width = `${value}%`;
      if (prev) prev.disabled = index === 0;
      if (next) next.hidden = index === questions.length - 1;
      if (finish) finish.hidden = index !== questions.length - 1;
      if (exit) exit.hidden = index !== 0;
    };

    prev?.addEventListener("click", () => show(index - 1));
    next?.addEventListener("click", () => show(index + 1));
    show(0);
  });
})();
