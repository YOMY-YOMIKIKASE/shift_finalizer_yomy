function loadQuestions() {
    var questionsFile = document.getElementById('questionsSelect').value;
    if (questionsFile) {
        fetch(questionsFile)
            .then(response => response.text())
            .then(data => {
                var questions = data.split('\n');
                updateQuestions(questions);
            });
    }
}

function updateQuestions(questions) {
    var table = document.getElementById('questionsTable');
    table.innerHTML = '';

    questions.forEach((question, index) => {
        if (question.trim() !== '') {
            var row = table.insertRow();
            var cell1 = row.insertCell(0);
            cell1.textContent = question;

            var cell2 = row.insertCell(1);
            var select = document.createElement('select');
            // 選択肢を追加
            ['yukko', 'yuririn', 'cory', 'zen', 'nazyu'].forEach(optionValue => {
                var option = document.createElement('option');
                option.value = optionValue;
                option.textContent = optionValue;
                select.appendChild(option);
            });
            cell2.appendChild(select);
        }
    });
}

function submitSurvey() {
    var form = document.getElementById('surveyForm');
    var results = document.getElementById('results');
    var output = '';

    for (var i = 0; i < form.elements.length; i++) {
        var element = form.elements[i];
        if (element.tagName === 'SELECT') {
            output += element.parentNode.previousSibling.textContent + ', ' + element.value + '<br>';
        }
    }

    results.innerHTML = output;
}
