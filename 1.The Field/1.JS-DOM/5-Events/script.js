
const _initTime = Date.now();

const getElapsedTime = () => {
  return Number((Date.now() - _initTime) / 1000).toFixed(2) + 's';
};

const cible = document.querySelector(".displayedsquare-wrapper");

const clickOnSquare = (e) => {
  console.log(e.target.classList[1]);
  console.log(getElapsedTime());

  const div = document.createElement("div");
  const color = e.target.classList[1];
  div.classList.add("displayedsquare", `${color}`);
  cible.appendChild(div);

  const time = getElapsedTime();
  const li = document.createElement("li");
  li.innerHTML = `[${time}] Created a new ${color} square`;
  document.querySelector("ul").appendChild(li);

  window.alert(`${color}`);
};

const actionSquares = document.querySelectorAll('.actionsquare');
for (let actionSquare of actionSquares) {
  actionSquare.addEventListener('click', clickOnSquare);
}

const ul = document.querySelector("ul");

const spacebarEffect = (e) => {
  const a = Math.floor(Math.random() * 254);
  const b = Math.floor(Math.random() * 254);
  const c = Math.floor(Math.random() * 254);

  if(e.code == "Space" || e.keyCode == 32) {
    document.body.style.backgroundColor = `rgb(${a}, ${b}, ${c})`;

    const li = document.createElement("li");
    li.innerHTML = `hit it!`;
    ul.appendChild(li);
  }
};

const removeAllChilds = (parent) => {
  while(parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};

const lEffect = (e) => {
  //console.log(e.key);
  //console.log(e.code);
  if(e.key == "l" || e.keyCode == "Keyl") {
    removeAllChilds(ul);
  }
};

const sEffect = (e) => {
  if(e.key == "s" || e.keyCode == "Keys") {
    removeAllChilds(cible);
  }
};

document.body.addEventListener("keypress", spacebarEffect);
document.body.addEventListener("keypress", lEffect);
document.body.addEventListener("keypress", sEffect)



