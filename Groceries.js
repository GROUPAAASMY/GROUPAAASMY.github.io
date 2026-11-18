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

            item.style.marginBottom = "12px"; //Sets the margin between items
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


    const textbox = buyDoc.getElementById("Additem"); //Assigning a constant to the textbox

    textbox.addEventListener("keydown", (event) => {  //Cancels the procedure when any othe key and enter is pressed
        if (event.key !== "Enter") return;
        event.preventDefault();

        const itemName = textbox.value.trim(); //Extracts the input item in the text box
        if (!itemName) return; //Stops the procedure when nothing is written

        const buyColumn1 = buyDoc.getElementById("Column1"); //Assigning the buylist's columns to constants
        const buyColumn2 = buyDoc.getElementById("Column2");
        const destination = buyColumn1.children.length <= buyColumn2.children.length //Choosing the destination of the new item depending on the longer column
            ? buyColumn1 //Shortened if statement explained in groceries page
            : buyColumn2;

        const item = buyDoc.createElement("li"); //Creating a new listed element, adding its checkbox and create a linebreak (that will be added later)
        const checkbox = buyDoc.createElement("input");
        const linebreak = buyDoc.createElement("br")
        item.id = "item"; //Assigning the same item id and checkbox class to the new element to keep the style
        checkbox.type = "checkbox";
        checkbox.className = "Check";

        item.appendChild(checkbox); //adding the checkbox to the item
        item.appendChild(buyDoc.createTextNode(` ${itemName}`)); //Giving the item the name written in the text box
        destination.appendChild(item); //Adding the item to the previously selected column
        destination.appendChild(linebreak) //Adding the linebreak below the item
        textbox.value = ""; //Removing the text in the textbox
    });
    }, { once: true });
