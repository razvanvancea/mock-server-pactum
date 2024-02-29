const { mock, handler } = require("pactum");
const { like } = require("pactum-matchers");

async function startServer(port: number, host: string) {
  mock.addInteraction({
    request: {
      method: "GET",
      path: "/api/hello",
    },
    response: {
      status: 200,
      body: "Hello, 👋",
    },
  });

  type User = {
    id: number;
    name: string;
    username: string;
    email: string;
  };

  const users: User[] = [
    {
      id: 1,
      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz",
    },
    {
      id: 2,
      name: "John Snow",
      username: "Bret",
      email: "Sincere@april.biz",
    },
    {
      id: 3,
      name: "Michael Graham",
      username: "Bret",
      email: "Sincere@april.biz",
    },
  ];

  mock.addInteraction({
    request: {
      method: "GET",
      path: "/api/users",
    },
    response: {
      status: 200,
      body: users,
    },
  });

  mock.addInteraction({
    request: {
      method: "GET",
      path: "/api/users",
      queryParams: {
        id: 1,
      },
    },
    response: {
      status: 200,
      body: "user 1",
    },
  });

  mock.addInteraction({
    request: {
      method: "GET",
      path: "/api/users",
      queryParams: {
        id: 2,
      },
    },
    response: {
      status: 200,
      body: "user 2",
    },
  });

  mock.addInteraction({
    request: {
      method: "GET",
      path: "/api/health",
    },
    response: {
      onCall: {
        0: {
          status: 500,
        },
        1: {
          fixedDelay: 2000,
          status: 200,
          body: "OK",
        },
      },
    },
  });

  mock.addInteraction({
    request: {
      method: "POST",
      path: "/api/users",
      body: {
        id: 3,
      },
    },
    response: {
      status: 200,
      fixedDelay: 1000,
    },
  });

  mock.addInteraction({
    strict: false,
    request: {
      method: "POST",
      path: "/api/person",
      body: {
        id: 3,
      },
    },
    response: {
      status: 200,
      fixedDelay: 1000,
    },
  });

  mock.addInteraction({
    request: {
      method: "GET",
      path: "/api/projects/{id}",
      pathParams: {
        id: like("random-id"),
      },
    },
    stores: {
      ProjectId: "req.pathParams.id",
    },
    response: {
      status: 200,
      body: {
        id: "$S{ProjectId}",
      },
    },
  });

  mock.start(port, host);
}

async function stopServer(): Promise<void> {
  await mock.stop();
}

module.exports = {
  startServer,
  stopServer,
};
