const apiUrl = '/api/Symptom';

async function fetchSymptoms() {
    try {
        const response = await fetch(apiUrl);
        const symptoms = await response.json();
        displaySymptoms(symptoms);
    } catch (error) {
        console.error('Error fetching symptoms:', error);
    }
}

function displaySymptoms(symptoms) {
    const symptomsList = document.getElementById('symptoms-list');
    symptomsList.innerHTML = '';
    symptoms.forEach(symptom => {
        const row = document.createElement('tr');
        row.innerHTML = `
                <td>${symptom.id}</td>
                <td>${symptom.name}</td>
            `;
        symptomsList.appendChild(row);
    });
}

fetchSymptoms();