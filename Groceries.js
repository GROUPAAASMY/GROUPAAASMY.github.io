const originalPositions = new WeakMap();

window.addEventListener("load", () => { //Waits until the entire page is loaded

    const buyFrame = document.getElementById("buyframe"); // Assigning iframes to variables
    const boughtFrame = document.getElementById("boughtframe");

    const buyDoc = buyFrame.contentDocument;  // To access the documents inside the iframes
    const boughtDoc = boughtFrame.contentDocument;

    const boughtList = boughtDoc.getElementById("Boughtlist"); //Accessing the list of bought items

    function moveItem(event) {
        const checkbox = event.target; //Targets whichever checkbox the user interacts with

        const item = checkbox.closest("li"); //Targets the item linked to the corresponding checkbox

        if (checkbox.checked) {
            if (!originalPositions.has(item)) { //Prevents the original position of the item from being erased by making sure it isn't registered already
                originalPositions.set(item, {
                    parent: item.parentNode,
                    nextSibling: item.nextSibling
                });
            }
            const boughtColumn1 = boughtDoc.getElementById("BoughtColumn1");
            const boughtColumn2 = boughtDoc.getElementById("BoughtColumn2");
            const destination = boughtColumn1.children.length <= boughtColumn2.children.length
                ? boughtColumn1   //Shortened if statement (translates to if the above condition is true, BoughtColumn1 will be selected, otherwise BoughtColumn2 will be)
                : boughtColumn2;


            destination.appendChild(item); //Moves the item to whichever column was selected
            return;
        }

        const position = originalPositions.get(item); //interrupts the procedure in case the item's original position isn't found
        if (!position) {
            return;
        }

        const reference = position.nextSibling && //Assigns the original position of the item to a variable
            position.nextSibling.parentNode === position.parent  //Verifies that were was an element after the item
            ? position.nextSibling 
            : null;  //If the following element is still there, it is used as a reference
        position.parent.insertBefore(item, reference); //Gets the item back to its original position (if the checkbox gets unchecked)
        originalPositions.delete(item); //Deletes the registered position on the map (to prevent double positionning issues)
    }

    buyDoc.addEventListener("change", moveItem); //Calls the above function in both the buy and bought pages
    boughtDoc.addEventListener("change", moveItem);


    const textbox = buyDoc.getElementById("Additem"); //Assigning a constant to the textbox in the buying frame

    textbox.addEventListener("keydown", (event) => { //
        if (event.key !== "Enter") return; //Cancels the procedure if the pressed key isn't enter

        const itemName = textbox.value.trim(); //Extracts the input text in the textbox (Think of it like python's .read().strip())
        if (!itemName) return; //Cancels the procedure when there's no text and enter is still pressed

        const buyColumn1 = buyDoc.getElementById("Column1");
        const buyColumn2 = buyDoc.getElementById("Column2"); 
        const destination = buyColumn1.children.length <= buyColumn2.children.length
            ? buyColumn1
            : buyColumn2; //Another shortened if statement to chose the destination

        const item = buyDoc.createElement("li"); //Creates a new 'li' element
        const checkbox = buyDoc.createElement("input"); //Creates its corresponding input
        const linebreak = buyDoc.createElement("br"); 
        item.id = "item";
        checkbox.type = "checkbox"; //Makes the input a checkbox (And gives it the checkbox class on the line below)
        checkbox.className = "Check"; //Assigns the item id to the new element for the style to be the same as the others

        item.appendChild(checkbox);
        item.appendChild(buyDoc.createTextNode(` ${itemName}`));
        destination.appendChild(item);
        destination.appendChild(linebreak) 
        textbox.value = "";
    });

    document.querySelectorAll(".plus").forEach((plus) => { //Selects every element with the plus class, the 'forEach(plus)' part allows the function to execute without using all plus elements simultaneously as input
    plus.addEventListener("click", () => {
        const itemName = plus.closest("li").textContent.replace("+", "").trim(); //Extracts the text from the corresponding list element and removes the +

        const column1 = buyDoc.getElementById("Column1");
        const column2 = buyDoc.getElementById("Column2");
        const destination = column1.children.length <= column2.children.length  //Destination selecting procedure is the same every time
            ? column1
            : column2;

        const item = buyDoc.createElement("li"); 
        const checkbox = buyDoc.createElement("input"); 
        checkbox.type = "checkbox"; 
        checkbox.className = "Check";
        item.id = 'item' //item element creation works the same as the textbox part of this page's code (look at code above)

        item.appendChild(checkbox); //Appending system is the same as when moving an element to the bought list
        item.appendChild(buyDoc.createTextNode(` ${itemName}`));
        destination.appendChild(item);
    });
});

    
    }, { once: true });
