$(function () {
  // 1. Questions: q = question, o = options, a = index of the correct option
  const questions = [
    { q: "What does HTML stand for?", o: ["Hyper Text Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyper Transfer Markup Language"], a: 0 },
    { q: "Which tag links a CSS file to a page?", o: ["<script>", "<link>", "<style src>", "<css>"], a: 1 },
    { q: "Which Bootstrap class creates a responsive container?", o: [".box", ".wrapper", ".container", ".page"], a: 2 },
    { q: "Which symbol is used for jQuery?", o: ["#", "$", "@", "&"], a: 1 },
    { q: "Which keyword declares a constant in JavaScript?", o: ["var", "let", "const", "static"], a: 2 }
  ];

  let i = 0, score = 0, locked = false;

  // 2. Show the current question
  function show() {
    locked = false;
    const q = questions[i];
    $("#progress").css("width", (i / questions.length * 100) + "%");
    $("#count").text("Question " + (i + 1) + " of " + questions.length);
    $("#question").text(q.q);
    $("#options").empty();
    q.o.forEach(function (text, idx) {
      $("<button>").addClass("btn btn-outline-primary w-100 text-start mb-2")
        .text(text).data("i", idx).appendTo("#options");
    });
    $("#next").hide();
  }

  // 3. Check the answer
  $("#options").on("click", "button", function () {
    if (locked) return;
    locked = true;
    const q = questions[i];
    if ($(this).data("i") === q.a) {
      score++;
      $(this).removeClass("btn-outline-primary").addClass("btn-success");
    } else {
      $(this).removeClass("btn-outline-primary").addClass("btn-danger");
      $("#options button").eq(q.a).removeClass("btn-outline-primary").addClass("btn-success");
    }
    $("#next").text(i === questions.length - 1 ? "See result" : "Next").show();
  });

  // 4. Next question or final result
  $("#next").on("click", function () {
    i++;
    if (i < questions.length) show(); else finish();
  });

  function finish() {
    $("#quiz").hide();
    $("#progress").css("width", "100%");
    $("#score").text(score + " / " + questions.length);
    $("#msg").text(score === questions.length ? "Perfect score!" : score >= 3 ? "Good job!" : "Keep practicing!");
    $("#result").show();
  }

  $("#restart").on("click", function () {
    i = 0; score = 0;
    $("#result").hide(); $("#quiz").show();
    show();
  });

  show();
});
