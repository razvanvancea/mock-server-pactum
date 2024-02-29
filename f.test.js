const { spec, handler, mock } = require("pactum");
mock.useRemoteServer("http://localhost:3001");

it("should get random users", async () => {
  await spec()
    .get("http://localhost:3001/api/users")
    .inspect()
    .expectStatus(200);
});
