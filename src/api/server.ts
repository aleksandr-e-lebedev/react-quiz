import { createServer } from "miragejs";

import { SERVER_URL } from "@/config";
import { questions } from "@/data";

function makeServer() {
  createServer({
    routes() {
      this.get(SERVER_URL, () => questions);
    },
  });
}

makeServer();
