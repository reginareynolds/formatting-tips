// This script shows how to:
//     1. Create and link an event listener to a form.
//     2. Process the form asynchronously.
//     3. Send a response based on the form processing.
//
//     How it works:
//     Normally, submitting a form refreshes the page. By listening to the form element to detect form submission, this
//     script intercepts the form before it can go through the normal submission process. Once intercepted, a FormData
//     object is linked to the submitted form and asynchronously sent in a XMLHttpRequest to the location where the form
//     processing occurs. Listeners on the XMLHttpRequest object detect whether the request successfully completed or
//     not and determine what response to send to the initial request page.
//
//     I wrote this in vanilla JavaScript in order to better understand the process behind how an AJAX request works.
//     However, unless there is a limitation on using outside libraries, jQuery is much easier to use for this purpose.

window.addEventListener("load", function() {
    function request() {
        let xhttp = new XMLHttpRequest();  // Create request
        let data = new FormData(form);  // Connect form element to FormData object

        // Request successfully submitted
        xhttp.addEventListener("load", function(event){
            // Get target element to change
            let div = document.getElementById("container");

            // Set target to desired response based on outcome
            div.innerHTML = this.responseText;
        });

        // Request submission failed
        xhttp.addEventListener("error", function(event) {
            // Get target element to change
            let div = document.getElementById("container");

            // Set target to desired response
            div.innerHTML="<h2>There was a problem submitting your request. Please try again later.</h2>";
        });

        // Set up and send request to form processing location
        xhttp.open('POST','/Validate');
        xhttp.send(data);
    }

    // Get target form element
    let form = document.getElementById("request");

    // Listen for form submission
    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent default submission methods

        request(); // Call AJAX function
    });
});