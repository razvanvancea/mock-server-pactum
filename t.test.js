const { spec, handler, mock, settings, like } = require("pactum");
const {addMockGetUsers} = require("./utils/mocks");

describe("test suite", () => {
  beforeEach(async () => {
    settings.setLogLevel("ERROR");
    await mock.start(3001, "127.0.0.1");
  });

  it("should get random 1", async () => {
    await mock.addInteraction({
      request: {
        method: "GET",
        path: "/api/users",
      },
      response: {
        status: 200,
        body: "user 2",
      },
    });

    await spec()
      .get("http://localhost:3001/api/users")
      .inspect()
      .expectStatus(200);
  });

  it("should get random 2", async () => {
    addMockGetUsers(5);
    await spec()
      .get("http://localhost:3001/api/users?id=5")
      .inspect()
      .expectStatus(200);
  });

  afterEach(async () => {
    await mock.stop();
  });
});
