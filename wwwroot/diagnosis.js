const apiUrl = 'https://localhost:7000/api/Diagnosis';

function addSymptom() {
    const symptomsContainer = document.getElementById('symptoms-container');
    const symptomCount = symptomsContainer.querySelectorAll('.input-container').length + 1;

    const inputContainer = document.createElement('div');
    inputContainer.classList.add('input-container');
    inputContainer.innerHTML = `
            <label for="symptom-${symptomCount}">Enter Symptom:</label>
            <input type="text" id="symptom-${symptomCount}" placeholder="Enter Symptom">
        `;
    symptomsContainer.appendChild(inputContainer);
}

async function getDiagnosis() {
    const symptomInputs = document.querySelectorAll('input[id^="symptom-"]');
    const symptoms = Array.from(symptomInputs).map(input => input.value.trim()).filter(symptom => symptom !== '');

    const sexSelect = document.getElementById('sex');
    const sex = sexSelect.value;

    const yearOfBirthInput = document.getElementById('year-of-birth');
    const yearOfBirth = yearOfBirthInput.value.trim();

    if (symptoms.length === 0 || !sex || yearOfBirth === '') {
        alert('Please fill in all fields correctly.');
        return;
    }

    const queryParams = new URLSearchParams();
    symptoms.forEach(symptom => {
        queryParams.append('symptoms', symptom);
    });
    queryParams.append('sex', sex);
    queryParams.append('year', yearOfBirth);

    try {
        const response = await fetch(`${apiUrl}?${queryParams.toString()}`);
        if (!response.ok) {
            throw new Error('Diagnosis request failed.');
        }
        const diagnosis = await response.json();
        displayDiagnosis(diagnosis);
    } catch (error) {
        console.error('Error fetching diagnosis:', error);
        alert('Error fetching diagnosis. Please try again.');
    }
}

function displayDiagnosis(diagnosis) {
    const diagnosisList = document.getElementById('diagnosis-list');
    diagnosisList.innerHTML = '';

    diagnosis.forEach(issue => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${issue.issue.id}</td>
            <td>${issue.issue.name}</td>
            <td>${issue.issue.accuracy}</td>
            <td>${issue.issue.icd}</td>
            <td>${issue.issue.icdName}</td>
            <td>${issue.issue.profName}</td>
            <td>${issue.issue.ranking}</td>
            `;
        diagnosisList.appendChild(row);
    });
}