document.querySelectorAll('.Accountsection, .House, .Addmember, .Managemembers').forEach(section => {
    const details = section.querySelector('.content2');
    const icon = section.querySelector('ion-icon');

    icon.addEventListener('click', () => {
        details.hidden = !details.hidden;
        section.classList.toggle('isopen', !details.hidden);
        icon.classList.toggle('open', !details.hidden);
    });
});

