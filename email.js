// Initialise EmailJS
emailjs.init("GzVIhjxHJvn0KjhhO");

const contactUsForm = document.getElementById("contact_us_form");
const contactSubmitButton = document.getElementById("contact_submit_button");
const formSubmissionError = document.getElementById("form_submission_error");

const handleEmailSubmission = async () => {
  try {
    contactSubmitButton.innerText = "Sending...";
    await emailjs.sendForm(
      "service_t4pcmhl",
      "template_fms1jmt",
      "contact_us_form",
    );
    toggleElementVisibility("thankyou");
    contactSubmitButton.innerText = "Sent";
    contactUsForm.reset();
  } catch (err) {
    console.error(err);
  } finally {
    contactSubmitButton.innerText = "Submit";
  }
};

contactUsForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  // Prevent double submission
  if (contactSubmitButton.innerText === "Sending...") return;

  const honeypot = document.getElementById("honeypot").value;
  // Check if the honeypot field is empty
  if (honeypot) {
    // Honeypot filled; prevent form submission
    alert("Spam detected! Your submission cannot be processed.");
  } else {
    handleEmailSubmission();
  }
});
