const { spec,request } = require("pactum");
const {startServer, stopServer} = require("./utils/mock-standalone");

describe("test suite", () => {
  before(async () => {
    request.defaultTimeout(5000);
    await startServer(3001, "127.0.0.1");
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

  it("should get health 500 then 200", async () => {
    await spec()
      .get("http://localhost:3001/api/health")
      .inspect()
      .expectStatus(500);

      await spec()
      .get("http://localhost:3001/api/health")
      .inspect()
      .expectStatus(200);
  });

  after(async () => {
    await stopServer();
  });
});
