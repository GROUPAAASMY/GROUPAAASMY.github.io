window.addEventListener("load", () => { // Waits until the entire page is loaded

    const markReadBtn = document.getElementById("Markread");
    const viewAllBtn = document.getElementById("Viewall");
    const unreadCountText = document.getElementById("Unreadcount");
    const unreadDescText = document.getElementById("Unreaddesc");
    const allCards = document.querySelectorAll(".Notifcard");
    const tags = document.querySelectorAll(".Tag");


    function updateUnreadNumber() { // Updates the number in the right-hand "2 unread" box
        const unreadCards = document.querySelectorAll(".Notifcard.unread");
        const count = unreadCards.length;

        unreadCountText.textContent = `${count} unread`;
        unreadDescText.textContent = count === 1 
            ? "You have 1 unread household update." 
            : `You have ${count} unread household updates.`;
    }

   
    allCards.forEach((card) => {  // Clicking an individual unread card marks it as read
        card.addEventListener("click", () => {
            if (card.classList.contains("unread")) {
                card.classList.remove("unread");

                const dot = card.querySelector(".Reddot"); // Removes the red dot
                if (dot) dot.remove();

                const iconBox = card.querySelector(".Cardicon"); // Changes pink icon background to grey
                iconBox.classList.remove("pinkicon");
                iconBox.classList.add("greyicon");

                updateUnreadNumber();
            }
        });
    });

  
    markReadBtn.addEventListener("click", () => {   // Clicking "Mark all as read" clears all unread states at once
        const unreadCards = document.querySelectorAll(".Notifcard.unread");

        unreadCards.forEach((card) => {
            card.classList.remove("unread");

            const dot = card.querySelector(".Reddot");
            if (dot) dot.remove();

            const iconBox = card.querySelector(".Cardicon");
            iconBox.classList.remove("pinkicon");
            iconBox.classList.add("greyicon");
        });

        updateUnreadNumber();
    });


    let expanded = false; // Shows or hides older notifications when clicking "+ View all notifications"
    viewAllBtn.addEventListener("click", () => {
        const hiddenCards = document.querySelectorAll(".Notifcard.hidden");
        expanded = !expanded;

        hiddenCards.forEach((card) => {
            card.style.display = expanded ? "block" : "none";
        });

        viewAllBtn.textContent = expanded ? "- Show fewer notifications" : "+ View all notifications";
    });

    let selectedCategory = null;     // Allows filtering notifications by clicking the tags on the right card
    tags.forEach((tag) => {
        tag.addEventListener("click", () => {
            const category = tag.textContent.trim();

            if (selectedCategory === category) {
                selectedCategory = null;
                tag.classList.remove("active");
            } else {
                tags.forEach((t) => t.classList.remove("active"));
                selectedCategory = category;
                tag.classList.add("active");
            }

            allCards.forEach((card) => {
                if (card.classList.contains("hidden") && !expanded) return;

                if (!selectedCategory || card.dataset.category === selectedCategory) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });

}, { once: true });