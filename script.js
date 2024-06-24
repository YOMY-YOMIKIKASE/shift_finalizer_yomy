function loadQuestions() {
    var questionsFile = document.getElementById('questionsSelect').value;
    if (questionsFile) {
        fetch(questionsFile)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok.');
                }
                return response.text();
            })
            .then(data => {
                var questions = data.split('\n');
                updateQuestions(questions);
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
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
            var options = ['nazyu','yukko','cory','sunny','bits','maayu','ma-chan'];
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
    var outputByQuestion = '';
    var outputByAnswer = {};
    var allAnswered = true;

    // 全てのラジオボタンを確認し、回答を集計
    for (var i = 0; i < form.elements.length; i++) {
        var element = form.elements[i];
        if (element.type === 'radio' && element.checked) {
            var questionText = element.dataset.questionText;
            var answerValue = element.value;

            // 質問順に出力
            outputByQuestion += questionText + ', ' + answerValue + '<br>';

            // 回答ごとに質問を集計
            if (!outputByAnswer[answerValue]) {
                outputByAnswer[answerValue] = [];
            }
            outputByAnswer[answerValue].push(questionText);
        }
    }

    // 回答ごとの出力を準備
    var outputByAnswerFormatted = '';
    for (var answer in outputByAnswer) {
        outputByAnswerFormatted += '<strong>' + answer + ':</strong><br>';
        outputByAnswer[answer].forEach(function(question) {
            outputByAnswerFormatted += '- ' + question + '<br>';
        });
        outputByAnswerFormatted += '<br>';
    }

    // 結果の表示
    results.innerHTML = '<h3>日付順一覧:</h3>' + outputByQuestion + '<h3>担当ごとの一覧:</h3>' + outputByAnswerFormatted;
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
