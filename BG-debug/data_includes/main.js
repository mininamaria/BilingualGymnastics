PennController.ResetPrefix(null);

Sequence(
    randomize("training"),
    SendResults()
);

Template("training_trials.csv", row =>
  newTrial("training",
    // Show PRIME image
    newImage("primeImage",row.prime_image)
        .size(400,300).css("margin", "10px").center().print()
    ,
    newText("primeInstructions", "<i>Оцените предложение:</i>")
        .css("margin-bottom", "20px").center().print()
    ,
    
    // Acceptability Judgment for PRIME
    newController("primeAJ", "AcceptabilityJudgment", {
        s: row.prime_sentence,
        as: ["1", "2", "3", "4", "5", "6", "7"],
        presentAsScale: true,
        instructions: "Для ответа используйте клавиши c цифрами или щелкните по полю с выбранным значением.",
        leftComment: "(неестественно)",
        rightComment: "(естественно)"
    }).center().print().wait()
      .log(), // This logs the participant's response
    
    // Simulate progress bar advancing
    newFunction(() => window.Ibex && window.Ibex.pb && window.Ibex.pb.increment()).call(),



    // Remove PRIME elements
    getText("primeInstructions").remove(),
    getImage("primeImage").remove(),
    getController("primeAJ").remove(),

    // Pause
    newTimer("pause", 300).start().wait(),
    
    newImage("targetImage",row.target_image)
        .size(400,300).css("margin", "10px").center().print()
    ,
    // Show TARGET with gap
    newText("targetInstructions", "<i>Заполните пропуск:</i>")
        .center().print()
    ,
    newHtml("targetHTML", `<p><div>${row.target_sentence.replace("___", "<input type='text' name='gap' id='gap'>")}</div></p>`)
        .css("margin", "20px").center().print()
    ,

    newButton("Next")
        .center().print().wait()
    ,

    // Log custom values
    newVar("primeSentence").set(row.prime_sentence).log(),
    newVar("targetSentence").set(row.target_sentence).log()
  )
);
