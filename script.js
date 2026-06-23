document.getElementById('contactForm').addEventListener('submit', function(event) {
    // Prevent the form from default page reload submission behavior
    event.preventDefault();

    // Fetch form field inputs
    const nameInput = document.getElementById('userName').value.trim();
    const emailInput = document.getElementById('userEmail').value.trim();
    const messageInput = document.getElementById('userMessage').value.trim();

    // 1. JavaScript validation -> Ensure no empty fields
    if (nameInput === "" || emailInput === "" || messageInput === "") {
        alert("❌ Error: All fields (Name, Email, and Message) must be filled out!");
        return;
    }

    // Create a structured data object for the new submission
    const newSubmission = {
        name: nameInput,
        email: emailInput,
        message: messageInput,
        date: new Date().toLocaleString()
    };

    // 2. Save form data in LocalStorage
    // Fetch existing entries from memory or initialize an empty array if none exist
    let currentSubmissions = JSON.parse(localStorage.getItem('formSubmissions')) || [];
    
    // Add the new submission object to the array list
    currentSubmissions.push(newSubmission);
    
    // Save the updated array back into LocalStorage as a string
    localStorage.setItem('formSubmissions', JSON.stringify(currentSubmissions));

    // Confirm execution and route to the display page automatically
    alert("✨ Success! Your submission has been saved locally.");
    window.location.href = "submissions.html";
});