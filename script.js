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
            var options = ['nazyu', 'yuririn', 'yukko', 'zen','cory'];
            options.forEach((optionValue, optionIndex) => {
                var radioInput = document.createElement('input');
                radioInput.type = 'radio';
                radioInput.name = 'question' + index;
                radioInput.value = optionValue;
                radioInput.id = 'question' + index + 'option' + optionIndex;
                radioInput.dataset.questionText = question; // 質問文をデータ属性として追加

                var label = document.createElement('label');
                label.htmlFor = radioInput.id;
                label.textContent = optionValue;

                cell2.appendChild(radioInput);
                cell2.appendChild(label);
            });
        }
    });
}

function submitSurvey() {
    var form = document.getElementById('surveyForm');
    var results = document.getElementById('results');
    var output = '';
    var allAnswered = true;

    for (var i = 0; i < form.elements.length; i++) {
        var element = form.elements[i];
        if (element.type === 'radio') {
            var name = element.name;
            if (!form.elements[name].value) {
                allAnswered = false;
                break;
            }
        }
    }

    if (!allAnswered) {
        alert('すべての質問に回答してください。');
        return;
    }

    for (var i = 0; i < form.elements.length; i++) {
        var element = form.elements[i];
        if (element.type === 'radio' && element.checked) {
            output += element.dataset.questionText + ',' + element.value + '<br>';
        }
    }

    results.innerHTML = output;
}

// ラジオボタンの最初の要素にのみrequired属性を設定
function addRequiredToFirstRadioButton() {
    var allRadioButtons = document.querySelectorAll('input[type=radio]');
    var handledNames = {};

    allRadioButtons.forEach(function(radio) {
        if (!handledNames[radio.name]) {
            radio.required = true;
            handledNames[radio.name] = true;
        }
    });
}