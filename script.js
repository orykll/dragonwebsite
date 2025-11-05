// Import the 'db' instance from your config file
import { db } from './firebase-config.js';

// Import the Firestore functions we need
// UPDATED: Added query, where, deleteDoc, and doc
import { 
  collection, 
  addDoc, 
  getDocs,
  query,        // <-- NEW
  where,        // <-- NEW
  deleteDoc,    // <-- NEW
  doc           // <-- NEW
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

// === GET REFERENCES TO ALL ELEMENTS ===
const form = document.getElementById('surveyForm');
const outputDiv = document.querySelector('.output');

// --- NEW "REMOVE" ELEMENT REFERENCES ---
const removeLairLinkInput = document.getElementById('removeLairLink');
const showConfirmButton = document.getElementById('showConfirmButton');
const confirmationArea = document.getElementById('confirmationArea');
const confirmDeleteButton = document.getElementById('confirmDeleteButton');
const cancelDeleteButton = document.getElementById('cancelDeleteButton');


// === FUNCTION TO DISPLAY SUBMISSIONS ===
async function displaySubmissions() {
  outputDiv.innerHTML = '<em>Loading submissions...</em>';
  const querySnapshot = await getDocs(collection(db, "submissions"));
  
  let submissionsHtml = '<h3>Current Submissions:</h3>';
  
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const userInterests = Object.keys(data.interests)
      .filter(key => data.interests[key] === true)
      .join(', ');

    submissionsHtml += `
      <div class="submission-card">
        <p><strong>Lair:</strong> <a href="${data.lairLink}" target="_blank">${data.lairLink}</a></p>
        <p><strong>Interests:</strong> ${userInterests || 'None listed'}</p>
      </div>
    `;
  });

  if (querySnapshot.empty) {
    submissionsHtml = '<p>No submissions yet!</p>';
  }
  outputDiv.innerHTML = submissionsHtml;
}

// === LISTENER FOR THE "ADD" FORM ===
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const submitButton = form.querySelector('button');
  submitButton.disabled = true;
  submitButton.textContent = 'Submitting...';

  try {
    const lairLink = document.getElementById('username').value;
    const interests = {
      Dya: document.getElementById('interestedDya').checked,
      G2_Imperials: document.getElementById('interestedImp').checked,
      Firuxe: document.getElementById('interestedFir').checked,
      Ausra: document.getElementById('interestedAus').checked,
      Zinovia: document.getElementById('interestedZin').checked,
      Elysian: document.getElementById('interestedEly').checked,
      Seraph: document.getElementById('interestedSer').checked,
      Staff_Descendants: document.getElementById('interestedStf').checked,
      Roundsey_Purebreds: document.getElementById('interestedRnd').checked,
      Naomi: document.getElementById('interestedNao').checked,
      Ignis: document.getElementById('interestedIgn').checked,
      Luck: document.getElementById('interestedLck').checked
    };
    const submissionData = {
      lairLink: lairLink,
      interests: interests,
      submittedAt: new Date()
    };

    await addDoc(collection(db, "submissions"), submissionData);
    
    form.reset(); 
    submitButton.disabled = false;
    submitButton.textContent = 'Submit';

    await displaySubmissions(); // Refresh the list

  } catch (error) {
    console.error("Error adding document: ", error);
    alert('Error: Could not submit form. Please try again.');
    submitButton.disabled = false;
    submitButton.textContent = 'Submit';
  }
});


// === INITIAL PAGE LOAD ===
displaySubmissions();


// =======================================
//  NEW "REMOVE ME" JAVASCRIPT LOGIC
// =======================================

// 1. Listen for click on the first red button
showConfirmButton.addEventListener('click', () => {
  const lairLink = removeLairLinkInput.value;
  if (!lairLink) {
    alert('Please paste in your lair link first.');
    return;
  }
  // If link is present, show the confirmation buttons
  confirmationArea.style.display = 'block';
});

// 2. Listen for click on the "Cancel" button
cancelDeleteButton.addEventListener('click', () => {
  confirmationArea.style.display = 'none'; // Just hide the confirmation
});

// 3. Listen for the final "Yes, I am sure" click
confirmDeleteButton.addEventListener('click', async () => {
  const lairLinkToDelete = removeLairLinkInput.value;
  
  // Disable buttons to prevent double-click
  confirmDeleteButton.disabled = true;
  confirmDeleteButton.textContent = 'Removing...';

  try {
    // A. Find the document(s) that match the lair link
    // Create a query: "In the 'submissions' collection, find all docs
    // where the 'lairLink' field is equal to our variable"
    const q = query(collection(db, "submissions"), where("lairLink", "==", lairLinkToDelete));

    // B. Execute the query
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      alert('No submission found for that Lair link.');
    } else {
      // C. Loop through the results (even if there's only one) and delete them
      let deleteCount = 0;
      for (const docSnapshot of querySnapshot.docs) {
        // 'docSnapshot' is the document we found
        // 'doc' is a function to create a reference to it
        console.log(`Deleting document ${docSnapshot.id}`);
        await deleteDoc(doc(db, "submissions", docSnapshot.id));
        deleteCount++;
      }
      alert(`Successfully removed ${deleteCount} submission(s).`);
    }

    // D. Clean up and refresh
    removeLairLinkInput.value = ''; // Clear the input
    confirmationArea.style.display = 'none'; // Hide confirmation
    confirmDeleteButton.disabled = false;
    confirmDeleteButton.textContent = 'Yes, I am sure';
    
    await displaySubmissions(); // Refresh the list

  } catch (error) {
    console.error('Error removing document: ', error);
    alert('An error occurred. Could not remove submission.');
    confirmDeleteButton.disabled = false;
    confirmDeleteButton.textContent = 'Yes, I am sure';
  }
});
// --- NEW: NAOMI G4 VISIBILITY TOGGLE ---
const naomiG4Checkbox = document.getElementById('nao-g4');
const naomiG4Options = document.getElementById('naomi-g4-options');

naomiG4Checkbox.addEventListener('change', () => {
  if (naomiG4Checkbox.checked) {
    naomiG4Options.style.display = 'block'; // Show the options
  } else {
    naomiG4Options.style.display = 'none'; // Hide them
    
    // Also uncheck all the sub-options when hiding
    const subCheckboxes = naomiG4Options.querySelectorAll('input[type="checkbox"]');
    subCheckboxes.forEach(cb => cb.checked = false);
  }
});