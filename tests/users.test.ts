const { spec,request } = require("pactum");
const {startServer, stopServer} = require("../utils/mock-server");

type configType = {
  base: string,
  port: number
}

const config: configType = {
  base: "127.0.0.1",
  port: 3001
}

const baseURL: string = `http://${config.base}:${config.port}`;

describe("test suite", () => {
  before(async () => {
    request.setDefaultTimeout(5000);
    await startServer(config.port, config.base);
  });

  it("test 1", async () => {

    await spec()
      .get(`${baseURL}/api/users`)
      .expectStatus(200);
  });

  it("should get health 500 then 200", async () => {
    await spec()
      .get(`${baseURL}/api/health`)
      .expectStatus(500);

      await spec()
      .get(`${baseURL}/api/health`)
      .expectStatus(200);
  });

  after(async () => {
    await stopServer();
  });
});
