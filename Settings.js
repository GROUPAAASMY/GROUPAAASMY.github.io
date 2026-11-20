document.querySelectorAll('.Accountsection, .House, .Managemembers').forEach(section => { //Selecting every division containing blocks (both the expandable and header part)
    const details = section.querySelector('.content2'); //For each division, selecting the expandable part
    const icon = section.querySelector('ion-icon'); //For each division, selecting its chevron

    icon.addEventListener('click', () => {
        details.hidden = !details.hidden; //Shows the details (hidden by default in the html) when chevron is clicked
        section.classList.toggle('isopen', !details.hidden); //Adds the 'isopen' class to the corresponding division
        icon.classList.toggle('open', !details.hidden); //Adds the 'open' class to the corresponding chevron
    });
});
const button1 = document.getElementById('Button1')
const button2 = document.getElementById('Button2')

    button1.addEventListener('click', () => {
        document.querySelectorAll('.Pass').forEach(input =>{
            input.value='';
        });
    });
    button2.addEventListener('click' , () => {
        const name = document.getElementById('Housename')
        name.value='';
    });

