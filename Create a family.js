window.addEventListener("load", () => { // Waits until the page is fully loaded

    const createBtn = document.getElementById("Createbtn");
    const householdNameInput = document.getElementById("Househouldname");

    // Click event for the create household button
    createBtn.addEventListener("click", () => {
        const householdName = householdNameInput.value.trim();

        if (!householdName) {
            householdNameInput.focus();
            return;
        }

        // Redirect straight to the invite page
        window.location.href = "InvitePage.html";
    });

}, { once: true });