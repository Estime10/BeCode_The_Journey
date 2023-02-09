import readlineSync from "readline-sync";

const questions = [
  {
    prompt: "What would you do for love? \n(1) Nothing\n(2) Climb the highest mountain\n(3) Give do push-ups",
    answer: [2]
  },
  {
    prompt: "Is the earth turning around the sun? \n(1) No\n(2) Yes\n(3) Ask JCVD",
    answer: [2]
  },
  {
    prompt: "How fast can you run? \n(1) Very fast\n(2) Gimme a beer, I'll show you how\n(3) Usain Bolt ain't nothin' on me",
    answer: [1, 3]
  }
];

let score = 0;

for (let i = 0; i < questions.length; i++) {
  const response = Number(readlineSync.question(questions[i].prompt));

  if (questions[i].answer.includes(response)) {
    console.log("Correct!");
    score++;
  } else {
    console.log("Wrong!");
  }
}

console.log(`You got ${score}/${questions.length} correct!`);

  