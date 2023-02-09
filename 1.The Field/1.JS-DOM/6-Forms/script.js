
const firstnameInput = document.getElementById("firstname");
const firstnameDisplay = document.getElementById("display-firstname");
let spanContent = "";

const putInSpan = (e) => {
    spanContent = e.target.value;
    firstnameDisplay.innerHTML = spanContent;
};

firstnameInput.addEventListener("keyup", putInSpan);

const ageInput = document.getElementById("age");
const hardTruth = document.getElementById("a-hard-truth");

const isOfAge = (number) => {
    return number >= 18;
};

const isEmpty = (x) => {
    return x == "";
};

const displayHardTruth = (e) => {
    console.log(e.target.value)
    if (!isOfAge(e.target.value) && !isEmpty(e.target.value)) {
        hardTruth.style.visibility = "visible";
    } else {
        hardTruth.style.visibility = "hidden";
    }
};

ageInput.addEventListener("keyup", displayHardTruth);

const password = document.getElementById("pwd");
const passwordConfirm = document.getElementById("pwd-confirm");

const isValid = (s) => {
    return s.length >= 6;
};

const areSame = (a, b) => {
    return a === b;
};

const showHint = (e) => {
    if(!isValid(e.target.value)) {
        password.style.backgroundColor = "red";
        passwordConfirm.style.backgroundColor = "red";
    } else {
        password.style.backgroundColor = "initial";
        passwordConfirm.style.backgroundColor = "initial";
    }
};

password.addEventListener("keyup", showHint);
passwordConfirm.addEventListener("keyup", showHint);

const toggleDarkMode = document.getElementById("toggle-darkmode");

const toggleMode = (e) => {
    if(e.target.options.selectedIndex == 0) {
        document.body.style.backgroundColor = "#303030";
        document.body.style.color = "white";
    } else {
        document.body.style.backgroundColor = "initial";
        document.body.style.color = "initial";
    }
};

toggleDarkMode.addEventListener("change", toggleMode);

