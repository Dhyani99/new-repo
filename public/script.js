const socket = io();

document.querySelector("#vote-button").addEventListener("click", () => {
  const voteOption = document.querySelector(
    'input[name="voteOption"]:checked'
  ).value;
  socket.emit("vote", voteOption);
});

socket.on("vote", (pollResults) => {
  const pollResultsList = document.querySelector("#poll-results ul");
  pollResultsList.innerHTML = "";

  for (const voteOption in pollResults) {
    const voteResultListItem = document.createElement("li");
    voteResultListItem.textContent = `${voteOption}: ${pollResults[voteOption]}`;
    pollResultsList.appendChild(voteResultListItem);
  }
});
