const apiUrl = '/api/IssueInfo';

async function fetchIssueInfo() {
    const issueIdInput = document.getElementById('issue-id');
    const issueId = issueIdInput.value.trim();
    if (!issueId) {
        alert('Please enter an Issue ID.');
        return;
    }

    try {
        const response = await fetch(`${apiUrl}/${issueId}`);
        if (!response.ok) {
            throw new Error('Issue not found.');
        }
        const issueInfo = await response.json();
        displayIssueInfo(issueInfo);
    } catch (error) {
        console.error('Error fetching issue information:', error);
        alert('Error fetching issue information. Please check the ID and try again.');
    }
}

function displayIssueInfo(issueInfo) {
    const issueInfoDetails = document.getElementById('issue-info-details');
    issueInfoDetails.innerHTML = '';

    const row = document.createElement('tr');
    row.innerHTML = `
            <td>${issueInfo.name}</td>
            <td>${issueInfo.description}</td>
            <td>${issueInfo.descriptionShort}</td>
            <td>${issueInfo.medicalCondition}</td>
            <td>${issueInfo.possibleSymptoms}</td>
            <td>${issueInfo.synonyms}</td>
            <td>${issueInfo.treatmentDescription}</td>
            <td>${issueInfo.profName}</td>
        `;
    issueInfoDetails.appendChild(row);
}