const bonusList = document.querySelector('.getBonus');
const modal = document.querySelector('.modal');

let cardsLength = null;
let newCard = null;

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

const fetchId = id => {
  fetch('http://localhost:8082/api/v1/' + id)
    .then(response => {
      response.json().then(user => {
        console.log();
        renderStatsList(user.description, user.datetimeCreate.slice(0, 19));
      });
    })
    .catch(arguments => {
      console.log(arguments);
    });
};
const fetchBonusId = id => {
  fetch('http://localhost:8082/api/v1/' + id)
    .then(response => {
      response.json().then(card => {
        renderBonusBtnList(card.description, card.bonusName, card.id);
      });
    })
    .catch(arguments => {
      console.log(arguments);
    });
};

const renderStatsList = (description, date) => {
  return (modal.innerHTML = `
      <ul  class="modal-content">
        <li class="modal-header">
        <h2>${description}</h2>
        </li>
        <li class="modal-body"><b>Date update</b> : ${date}</li>
      </ul>`);
};
const renderBonusBtnList = (description, bonusName, id) => {
  const popUp = `
    <ul  class="modal-content">
      <li class="modal-header">
      <h2>Get Bonus</h2>
      </li>
      <li class="modal-body modal__getbonus">
      <form id="form">
        <span class="bonusBtn__span"><b>Edit :</b> ${bonusName}</span><br>
        <input class="bonusBtn__input"type="text" id="bonusNameInput" name="uname" value="${bonusName}"><br>
        <span class="bonusBtn__span"><b>Edit :</b> ${description}</span><br>
        <input class="bonusBtn__input"type="text" name="uname" id="descriptionInput" value="${description}"><br>
        <input class="bonus__get-button bonus__get-button-submit" type="submit">
      </form></li>
    </ul>`;

  modal.innerHTML = popUp;

  const desc = document.getElementById('descriptionInput');
  const bName = document.getElementById('bonusNameInput');
  const btnSubmit = document.getElementById('form');

  newCard = {
    id,
    description,
    bonusName,
    datetimeCreate: new Date(),
  };

  for (let i = 0; i < cardsLength; i++) {
    desc;
    bName;
    btnSubmit;
  }

  desc.addEventListener('change', event => {
    newCard.description = event.target.value;
  });

  bName.addEventListener('change', event => {
    newCard.bonusName = event.target.value;
  });

  const sendDate = async (url, date) => {
    const req = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json; charset=utf-8',
      },
      body: date,
    });
    return await req.json();
  };

  btnSubmit.addEventListener('submit', () => {
    const json = JSON.stringify(newCard);
    sendDate('http://localhost:8082/api/v1/update', json)
      .then(date => console.log(date))
      .then();
  });

  console.log(newCard);
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};

const renderBonusList = users => {
  cardsLength = users.length;
  const markup = users
    .map(user => {
      return `
      <ul class="bonus__list">
      <li class='bonus__logo'>
      <a class='bonus__logo-voice' href='#!'>
        <img src="https://i.ibb.co/RHj3DWR/voice.png" alt='voice' />OUR TOP CHOICE
      </a>
      <img class='bonus__logo-logo' src="https://i.ibb.co/b3FDr4W/logo.png" alt='logo' id="${user.id}"/>
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
        <button class="bonus__get-button" id="${user.description}" type='button'>
          Get Bonus
          <img src="https://i.ibb.co/C9xw45X/fire.png" alt='fire' />
        </button>
        <a class='bonus__get-link' href='https://ru.wikipedia.org/wiki/William_Hill'>Visit William Hill</a>
      </div>
    </li>
    </ul>`;
    })
    .join('');

  bonusList.innerHTML = markup;

  for (let i = 0; i < users.length; i++) {
    document.getElementById(users[i].description).addEventListener('click', function () {
      fetchBonusId(users[i].id);
      modal.style.display = 'block';
    });
  }

  for (let i = 0; i < users.length; i++) {
    document.getElementById(users[i].id).addEventListener('click', function () {
      fetchId(users[i].id);
      modal.style.display = 'block';
    });
  }

  document.querySelectorAll('.rating').forEach(dom => new Rating(dom));
};

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
