const numberInp = document.querySelector("#num");
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
  mySelect.innerHTML = numberInp.value;
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
    let num = numberInp.value;
    let sel = [0, Number(num[0]), Number(num[1]), Number(num[2])];
    let corr = 0;
    if (sel[1] === Number(numbers[1].innerHTML)) {
      corr++;
    }
    if (sel[2] === Number(numbers[2].innerHTML)) {
      corr++;
    }
    if (sel[3] === Number(numbers[3].innerHTML)) {
      corr++;
    }
    console.log(
      sel[1],
      Number(numbers[1].innerHTML),
      sel[2],
      Number(numbers[2].innerHTML),
      sel[3],
      Number(numbers[3].innerHTML)
    );

    let bet = Number(moneyInp.value);
    if (
      numbers[1].innerHTML === numbers[2].innerHTML &&
      numbers[2].innerHTML === numbers[3].innerHTML &&
      numbers[3].innerHTML === numbers[1].innerHTML &&
      corr < 3
    ) {
      result.innerHTML = "트리플! x3배 🤑";
      money += bet * 3;
    } else if (
      (numbers[1].innerHTML === numbers[2].innerHTML ||
        numbers[2].innerHTML === numbers[3].innerHTML ||
        numbers[3].innerHTML === numbers[1].innerHTML) &&
      corr < 3
    ) {
      result.innerHTML = "더블! x2배 🤑";
      money += bet * 2;
    } else if (corr === 0) {
      result.innerHTML = "배팅 대실패... x0배 😭";
    } else if (corr === 1) {
      result.innerHTML = "원금 회수. 1배 🫤";
      money += bet;
    } else if (corr === 2) {
      result.innerHTML = "굿! x2배 💰";
      money += bet * 2;
    } else if (corr === 3) {
      result.innerHTML = "잭팟!!! x20배 🤑";
      money += bet * 20;
    }

    clsBtn.style.display = "block";
    money -= bet;
    nowMoney.innerHTML = money;
    if (!money) {
      const reload = window.confirm("돈이 없습니다. 게임을 재시작할까요?");
      if (reload) {
        window.location.reload();
      }
    }
  }, Number(rollInp.value) * 800);
});

clsBtn.addEventListener("click", () => {
  rollingPage.style.display = "none";
  clsBtn.style.display = "none";
});
