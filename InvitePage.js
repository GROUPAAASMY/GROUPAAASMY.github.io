const message = document.getElementById('message');
const code = document.getElementById('familyCode').textContent;
const link = 'https://groupaaasmy.github.io/Join.html';

// Copies the family code when the copy button is clicked
document.getElementById('copyBtn').addEventListener('click', () => {
  navigator.clipboard.writeText(code);
  message.textContent = 'Family code copied!';
});

// Copies the invite link when the share button is clicked
document.getElementById('shareBtn').addEventListener('click', () => {
  navigator.clipboard.writeText(link);
  message.textContent = 'Invite link copied!';
});
