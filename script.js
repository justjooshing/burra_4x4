// Initialise EMAILJS
emailjs.init("GzVIhjxHJvn0KjhhO");

const elementTriggerMap = {
  call_now_button: [{ element: "phone_number" }],
  map_button: [{ element: "map_window" }],
  map_close_button: [{ element: "map_window" }],
  contact_button: [
    { element: "contact_window" },
    { element: "map_window", directive: "hide" },
  ],
  contact_close_button: [
    { element: "contact_window" },
    { element: "thankyou", directive: "hide" },
  ],
  thankyou_close_button: [
    { element: "thankyou" },
    { element: "contact_window" },
  ],
};

/**
 * @param elementName contact_window | thankyou | map_window | phone_number
 * @optional @param directive hide | show
 */
const toggleElementVisibility = (elementName, directive) => {
  const element = document.getElementById(elementName);
  const elementHidden = element.classList.contains("hidden");

  const method = (() => {
    if (directive) {
      return directive === "show" ? "remove" : "add";
    }
    return elementHidden ? "remove" : "add";
  })();

  return element.classList[method]("hidden");
};

Object.entries(elementTriggerMap).forEach(([id, elements]) => {
  document.getElementById(id).addEventListener("click", () => {
    elements.forEach(({ element, directive }) =>
      toggleElementVisibility(element, directive),
    );
  });
});

const contactUsForm = document.getElementById("contact_us_form");
const contactSubmitButton = document.getElementById("contact_submit_button");
const formSubmissionError = document.getElementById("form_submission_error");

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
    try {
      contactSubmitButton.innerText = "Sending...";
      // update to sending?
      await emailjs.sendForm(
        "service_bmmdnnf",
        "template_fms1jmt",
        "contact_us_form",
      );
      // update to sent
      contactSubmitButton.innerText = "Sent";
      toggleElementVisibility("thankyou");
      // set timeout
      // update to submit
      await (async () =>
        setTimeout(() => {
          // reset form
          contactUsForm.reset();
        }))();
    } catch (err) {
      console.error(err);
    } finally {
      contactSubmitButton.innerText = "Submit";
    }
  }
});
