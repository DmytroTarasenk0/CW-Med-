const apiUrl = '/api/Patient';
let isEditMode = false;

function addSymptom() {
    const symptomsContainer = document.getElementById('symptoms-container');
    const symptomCount = symptomsContainer.querySelectorAll('input[name="symptoms"]').length + 1;

    const label = document.createElement('label');
    label.setAttribute('for', `symptom${symptomCount}`);
    label.textContent = `Symptom ${symptomCount}:`;
    symptomsContainer.appendChild(label);

    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('id', `symptom${symptomCount}`);
    input.setAttribute('name', 'symptoms');
    input.setAttribute('required', '');
    symptomsContainer.appendChild(input);

    symptomsContainer.appendChild(document.createElement('br'));
}

function deleteSymptom() {
    const symptomsContainer = document.getElementById('symptoms-container');
    const symptomCount = symptomsContainer.querySelectorAll('input[name="symptoms"]').length;

    if (symptomCount > 1) {
        symptomsContainer.removeChild(symptomsContainer.lastChild);
        symptomsContainer.removeChild(symptomsContainer.lastChild);
        symptomsContainer.removeChild(symptomsContainer.lastChild);
    }
}

function editAddSymptom() {
    const symptomsContainer = document.getElementById('edit-symptoms-container');
    const symptomCount = symptomsContainer.querySelectorAll('input[name="symptoms"]').length + 1;

    const label = document.createElement('label');
    label.setAttribute('for', `edit-symptom${symptomCount}`);
    label.textContent = `Symptom ${symptomCount}:`;
    symptomsContainer.appendChild(label);

    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('id', `edit-symptom${symptomCount}`);
    input.setAttribute('name', 'symptoms');
    input.setAttribute('required', '');
    symptomsContainer.appendChild(input);

    symptomsContainer.appendChild(document.createElement('br'));
}

function editDeleteSymptom() {
    const symptomsContainer = document.getElementById('edit-symptoms-container');
    const symptomCount = symptomsContainer.querySelectorAll('input[name="symptoms"]').length;

    if (symptomCount > 1) {
        symptomsContainer.removeChild(symptomsContainer.lastChild);
        symptomsContainer.removeChild(symptomsContainer.lastChild);
        symptomsContainer.removeChild(symptomsContainer.lastChild);
    }
}

async function addPatient() {
    const name = document.getElementById('name').value;
    const sex = document.querySelector('input[name="sex"]:checked').value;
    const yearOB = document.getElementById('yearOB').value;

    const symptoms = [];
    document.querySelectorAll('input[name="symptoms"]').forEach(input => {
        symptoms.push(input.value.trim());
    });

    const queryString = `?Name=${encodeURIComponent(name)}&Sex=${encodeURIComponent(sex)}&YearOB=${encodeURIComponent(yearOB)}`;
    const symptomsQueryString = symptoms.map(symptom => `Symptoms=${encodeURIComponent(symptom)}`).join('&');
    const fullUrl = `${apiUrl}${queryString}&${symptomsQueryString}`;

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            sex: sex,
            yearOB: yearOB,
            symptoms: symptoms
        })
    });

    if (response.ok) {
        fetchPatients();
        resetForm();
    } else {
        console.error('Failed to add patient');
    }
}

async function updatePatient() {
    const id = document.getElementById('edit-patient-id').value;
    const name = document.getElementById('edit-name').value;
    const sex = document.querySelector('input[name="sex"]:checked').value;
    const yearOB = document.getElementById('edit-yearOB').value;

    const symptoms = [];
    document.querySelectorAll('#edit-symptoms-container input[name="symptoms"]').forEach(input => {
        symptoms.push(input.value.trim());
    });

    const url = `${apiUrl}/${id}`;

    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                name: name,
                sex: sex,
                yearOB: yearOB,
                symptoms: symptoms
            })
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage);
        }

        fetchPatients();
        document.getElementById('edit-patient-form').reset();
        cancelUpdate();
    } catch (error) {
        console.error('Error updating patient:', error);
        throw error;
    }
}

async function deletePatient(id) {
    const response = await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        fetchPatients();
    } else {
        console.error('Failed to delete patient');
    }
}

async function fetchPatients() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch patients');
        }
        const patients = await response.json();
        const patientsList = document.getElementById('patients-list');
        patientsList.innerHTML = '';
        patients.forEach(patient => {
            const row = document.createElement('tr');
            row.innerHTML = `
                    <td>${patient.id}</td>
                    <td>${patient.name}</td>
                    <td>${patient.sex}</td>
                    <td>${patient.yearOB}</td>
                    <td>${patient.symptoms.join(', ')}</td>
                    <td>
                        <button onclick="editPatient(${patient.id})">Edit</button>
                        <button onclick="deletePatient(${patient.id})">Delete</button>
                    </td>
                `;
            patientsList.appendChild(row);
        });
    } catch (error) {
        console.error(error);
    }
}

function editPatient(id) {
    fetch(`${apiUrl}/${id}`, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(patient => {
            document.getElementById('edit-patient-title').style.display = 'block';
            document.getElementById('edit-patient-form').style.display = 'block';
            document.getElementById('edit-patient-id').value = patient.id;
            document.getElementById('edit-name').value = patient.name;
            document.getElementById(`edit-${patient.sex.toLowerCase()}`).checked = true;
            document.getElementById('edit-yearOB').value = patient.yearOB;

            const symptomsContainer = document.getElementById('edit-symptoms-container');
            symptomsContainer.innerHTML = '';

            patient.symptoms.forEach((symptom, index) => {
                const label = document.createElement('label');
                label.setAttribute('for', `edit-symptom${index + 1}`);
                label.textContent = `Symptom ${index + 1}:`;
                symptomsContainer.appendChild(label);

                const input = document.createElement('input');
                input.setAttribute('type', 'text');
                input.setAttribute('id', `edit-symptom${index + 1}`);
                input.setAttribute('name', 'symptoms');
                input.setAttribute('value', symptom);
                input.setAttribute('required', '');
                symptomsContainer.appendChild(input);

                symptomsContainer.appendChild(document.createElement('br'));
            });

            isEditMode = true;
        })
        .catch(error => {
            console.error('Error fetching patient:', error);
        });
}

function cancelUpdate() {
    document.getElementById('edit-patient-title').style.display = 'none';
    document.getElementById('edit-patient-form').style.display = 'none';
    isEditMode = false;
}

function resetForm() {
    document.getElementById('name').value = '';
    document.querySelector('input[name="sex"]:checked').checked = false;
    document.getElementById('yearOB').value = '';
    document.getElementById('symptoms-container').innerHTML = '<label for="symptom1">Symptom 1:</label><input type="text" id="symptom1" name="symptoms" required><br>';
    isEditMode = false;
}

fetchPatients();