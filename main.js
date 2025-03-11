// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡';
const FULL_HEART = '♥';

document.addEventListener("DOMContentLoaded", () => {
  // Находим модальное окно ошибки и скрываем его при загрузке страницы
  const modal = document.getElementById("modal");
  if (modal) {
    modal.classList.add("hidden");
  }

  // Находим все сердечки на странице
  const hearts = document.querySelectorAll(".like-glyph");

  // Перебираем каждое сердечко и добавляем обработчик клика
  hearts.forEach((heart) => {
    heart.addEventListener("click", () => {
      // Имитация запроса к серверу
      mimicServerCall()
        .then(() => {
          // Если сервер ответил успешно, меняем сердце
          if (heart.innerText === EMPTY_HEART) {
            heart.innerText = FULL_HEART;
            heart.classList.add("activated-heart");
          } else {
            heart.innerText = EMPTY_HEART;
            heart.classList.remove("activated-heart");
          }
        })
        .catch((error) => {
          // Если сервер ответил ошибкой, показываем модальное окно
          modal.classList.remove("hidden");
          modal.querySelector("#modal-message").innerText = error;

          // Скрываем ошибку через 3 секунды
          setTimeout(() => {
            modal.classList.add("hidden");
          }, 3000);
        });
    });
  });
});

//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------
function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2;
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}