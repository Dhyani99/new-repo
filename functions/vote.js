exports.handler = async (event, context) => {
  // Get the vote option from the event.
  const voteOption = event.voteOption;

  // Update the poll results.
  const pollResults = {};
  if (voteOption in pollResults) {
    pollResults[voteOption]++;
  } else {
    pollResults[voteOption] = 1;
  }

  // Emit the updated poll results to all users.
  context.emit("vote", pollResults);

  // Return a response.
  return {
    statusCode: 200,
    body: "Vote recorded successfully.",
  };
};
