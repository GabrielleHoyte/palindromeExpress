//CLIENT SIDE: 
document.querySelector("button").addEventListener("click", checkClientPalindrome);

function checkClientPalindrome() {
  const wordInput = document.querySelector("input").value;

  console.log(wordInput);

  // console.log("fetching api")
  fetch(`/check/${wordInput}`) //where our key value pair is...API key = checkIfPalindrome and template literal = our value! 
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      document.querySelector("h2").innerText = data.result;
    });
}
