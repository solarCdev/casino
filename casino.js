const moneyInp = document.querySelector("#money");
const rollInp = document.querySelector("#roll");
const rollingPage = document.querySelector(".bg-black");
const info = document.querySelector("#info");
const mySelect = document.querySelector("#now-value");
const result = document.querySelector("h3");
const clsBtn = document.querySelector(".cls-btn");
const nowMoney = document.querySelector("#now-money-value");
const numbers = [
  null,
  document.querySelector("#f-value"),
  document.querySelector("#s-value"),
  document.querySelector("#t-value"),
];

let money = 10;

info.addEventListener("submit", (event) => {
  event.preventDefault();
  if (money < Number(moneyInp.value)) {
    alert("돈이 충분하지 않습니다.");
    return;
  }
  result.innerHTML = "어떤 숫자가 나올까요? 🤔";
  rollingPage.style.display = "block";
  let rolls = Number(rollInp.value);

  for (let i = 1; i <= rolls; i++) {
    setTimeout(() => {
      numbers[1].innerHTML = Math.floor(Math.random() * 7) + 1;
    }, i * 200);
  }
  for (let i = 1; i <= rolls; i++) {
    setTimeout(() => {
      numbers[2].innerHTML = Math.floor(Math.random() * 7) + 1;
    }, i * 300);
  }
  for (let i = 1; i <= rolls; i++) {
    setTimeout(() => {
      numbers[3].innerHTML = Math.floor(Math.random() * 7) + 1;
    }, i * 800);
  }

  setTimeout(() => {
    let bet = Number(moneyInp.value);
    if (
      numbers[1].innerHTML === numbers[2].innerHTML &&
      numbers[2].innerHTML === numbers[3].innerHTML &&
      numbers[3].innerHTML === numbers[1].innerHTML
    ) {
      if (numbers[1].innerHTML === "7") {
        result.innerHTML = "777 JACKPOT!!! x20배 🔥";
      } else {
        result.innerHTML = "JACKPOT! x6배 🤑";
        money += bet * 3;
      }
    } else if (
      numbers[1].innerHTML === numbers[2].innerHTML ||
      numbers[2].innerHTML === numbers[3].innerHTML ||
      numbers[3].innerHTML === numbers[1].innerHTML
    ) {
      result.innerHTML = "더블! x2배 💰";
      money += bet * 2;
    } else if (
      numbers[1].innerHTML === "1" &&
      numbers[2].innerHTML === "2" &&
      numbers[3].innerHTML === "3"
    ) {
      result.innerHTML = "123 스트레이트! x9배 🪙";
      money += bet * 0;
    } else if (
      Number(numbers[2].innerHTML) === Number(numbers[1].innerHTML) + 1 &&
      Number(numbers[3].innerHTML) === Number(numbers[2].innerHTML) + 1
    ) {
      result.innerHTML = "스트레이트! x3배 🪙";
      money += bet * 0;
    } else {
      result.innerHTML = "배팅 실패... x0배 😭";
      money += bet * 0;
    }

    clsBtn.style.display = "block";
    numbers[1].style.color = "red";
    numbers[2].style.color = "red";
    numbers[3].style.color = "red";
    money -= bet;
    nowMoney.innerHTML = money;
  }, Number(rollInp.value) * 800);

  setTimeout(() => {
    if (!money) {
      const reload = window.confirm("돈이 없습니다. 게임을 재시작할까요?");
      if (reload) {
        window.location.reload();
      }
    }
  }, Number(rollInp.value) * 800 + 10);
});

clsBtn.addEventListener("click", () => {
  rollingPage.style.display = "none";
  clsBtn.style.display = "none";
  numbers[1].innerHTML = "0";
  numbers[2].innerHTML = "0";
  numbers[3].innerHTML = "0";
  numbers[1].style.color = "black";
  numbers[2].style.color = "black";
  numbers[3].style.color = "black";
});
