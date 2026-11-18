const message = document.getElementById('message');
const code = document.getElementById('familyCode').textContent;
const link = 'https://groupaaasmy.github.io/Join.html';


document.getElementById('copyBtn').addEventListener('click', () => {
  navigator.clipboard.writeText(code);
  message.textContent = 'Family code copied!';
});


document.getElementById('shareBtn').addEventListener('click', () => {
  navigator.clipboard.writeText(link);
  message.textContent = 'Invite link copied!';
});
