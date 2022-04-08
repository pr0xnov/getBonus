const bonusList = document.querySelector('.getBonus');

function fetchBonus() {
  fetch('http://localhost:8082/api/v1/cards')
    .then(response => response.json())
    .then(json => {
      this.element = json;
      renderBonusList(json);
      console.log(json);
    });
}
fetchBonus();

const fetchId = function (id) {
  fetch('http://localhost:8082/api/v1/' + id)
    .then(response => response.json())
    .then(json => {
      console.log(json);
    });
  console.log(1);
};

function renderBonusList(users) {
  const markup = users
    .map(user => {
      return `
      <ul class="bonus__list">
      <li class='bonus__logo'>
      <a class='bonus__logo-voice' href='#!'>
        <img src="https://i.ibb.co/RHj3DWR/voice.png" alt='voice' />OUR TOP CHOICE
      </a>
      <img class='bonus__logo-logo' src="https://i.ibb.co/b3FDr4W/logo.png" alt='logo' onclick='fetchId(${user.id})'/>
    </li>
    <li class='bonus__welcome'>
      <p class='bonus__welcome-title'>${user.bonusName}</p>
      <p class='bonus__welcome-descr'>
        ${user.description}
      </p>
      <p class='bonus__welcome-licence'>18+. Play Safe. Opt in required.</p>
    </li>
    <li class='bonus__rate'>
      <p class='bonus__rate-title'>Please vote!</p>
      <span class='rating'></span>
      <p class='bonus__rate-rated'>Rated by (3,904)</p>
    </li>
    <li class='bonus__get'>
      <p class='bonus__get-rate'>9.9</p>
      <div class='bonus__getBonus'>
        <button class='bonus__get-button' type='button'>
          Get Bonus
          <img src="https://i.ibb.co/C9xw45X/fire.png" alt='fire' />
        </button>
        <a class='bonus__get-link' href='#!'>Visit William Hill</a>
      </div>
    </li>
    </ul>`;
    })
    .join('');
  bonusList.innerHTML = markup;
}
class Rating {
  constructor(dom) {
    dom.innerHTML = '<svg width="110" height="20"></svg>';
    this.svg = dom.querySelector('svg');
    for (let i = 0; i < 5; i++)
      this.svg.innerHTML += `<polygon data-value="${i + 1}"
             transform="translate(${i * 22},0)" 
             points="10,1 4,19.8 19,7.8 1,7.8 16,19.8">`;
    this.svg.onclick = e => this.change(e);
    this.render();
  }

  change(e) {
    let value = e.target.dataset.value;
    value && (this.svg.parentNode.dataset.value = value);
    this.render();
  }

  render() {
    this.svg.querySelectorAll('polygon').forEach(star => {
      let on = +this.svg.parentNode.dataset.value >= +star.dataset.value;
      star.classList.toggle('active', on);
    });
  }
}

document.querySelectorAll('.rating').forEach(dom => new Rating(dom));

// const fetchUsersBtn = document.querySelector('.btn');
// const userList = document.querySelector('.user-list');

// fetchUsersBtn.addEventListener('click', () => {
//   fetchUsers()
//     .then(users => renderUserList(users))
//     .catch(error => console.log(error));
// });

// function fetchUsers() {
//   return fetch('http://localhost:8082/api/v1/cards').then(response => {
//     if (!response.ok) {
//       throw new Error(response.status);
//     }
//     return response.json();
//   });
// }

// function renderUserList(users) {
//   const markup = users
//     .map(user => {
//       return `<li>
//           <p><b>bonusName</b>: ${user.bonusName}</p>
//           <p><b>description</b>: ${user.description}</p>
//           <p><b>datetimeCreate</b>: ${user.datetimeCreate}</p>
//         </li>`;
//     })
//     .join('');
//   userList.innerHTML = markup;
// }

// function getIdCard(idCard) {
//   console.log(idCard);
//   return idCard;
// }

// if (img) {
//   img.addEventListener('click', function (target) {
//     console.log(target);
//   });
// }
