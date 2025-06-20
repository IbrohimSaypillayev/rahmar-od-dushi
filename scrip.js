let kartochki = document.querySelector('.kartochki');
let input = document.querySelector('.inp');
let searchBtn = document.querySelector('.btn');
let modeBtn = document.querySelector('.mode-toggle');
let allUsers = [];

// Rejimni localStorage'dan olish
let currentMode = localStorage.getItem('mode') || 'day';
document.body.classList.add(currentMode + '-mode');
modeBtn.textContent = currentMode === 'day' ? '🌙' : '☀️';

// Rejimni almashtirish
modeBtn.addEventListener('click', () => {
  currentMode = currentMode === 'day' ? 'night' : 'day';
  document.body.classList.remove('day-mode', 'night-mode');
  document.body.classList.add(currentMode + '-mode');
  modeBtn.textContent = currentMode === 'day' ? '🌙' : '☀️';
  localStorage.setItem('mode', currentMode);
});

// Foydalanuvchilarni olish
fetch('https://jsonplaceholder.typicode.com/users')
  .then(res => res.json())
  .then(data => {
    allUsers = data;
    displayCards(allUsers);
  });

// Kartalarni chiqarish
function displayCards(users) {
  kartochki.innerHTML = '';
  if (users.length === 0) {
    kartochki.innerHTML = '<h2>Hech narsa topilmadi</h2>';
    return;
  }
  users.forEach(user => {
    let card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <h2>${user.name}</h2>
      <img src="https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png" alt="">
      <p>Почта: ${user.email}</p>
      <p>Город проживания: ${user.address.city}</p>
    `;
    kartochki.appendChild(card);
  });
}

// Qidiruv tugmasi
searchBtn.addEventListener('click', (e) => {
  e.preventDefault();
  let value = input.value.toLowerCase().trim();
  let result = allUsers.filter(user =>
    user.name.toLowerCase().includes(value) ||
    user.email.toLowerCase().includes(value)
  );
  displayCards(result);
});
