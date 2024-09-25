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

contactUsForm.addEventListener("submit", (e) => {
  const honeypot = document.getElementById("honeypot").value;
  // Check if the honeypot field is empty
  if (honeypot) {
    // Honeypot filled; prevent form submission
    e.preventDefault();
    alert("Spam detected! Your submission cannot be processed.");
  } else {
    e.preventDefault();
    toggleElementVisibility("thankyou");

    const formData = new FormData(e.target);
    // Send somewhere
    console.log(Array.from(formData.entries()));

    contactUsForm.reset();
  }
});
