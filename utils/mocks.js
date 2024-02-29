const { spec, handler, mock, settings, like } = require("pactum");

function addMockGetUsers(userId) {
    mock.addInteraction({
      request: {
        method: "GET",
        path: "/api/users",
        queryParams: {
          id: userId,
        },
      },
      response: {
        status: 200,
        body: "user 2",
      },
    });
  }

  module.exports = {
    addMockGetUsers,
  };