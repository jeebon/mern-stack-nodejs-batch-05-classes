import pino from "pino";

const transport = pino.transport({
  targets: [
    {
      level: "info",
      target: "pino-pretty",
    },
    {
      level: "info",
      target: "pino/file",
      options: { destination: "./logs/app.log" },
    },
  ],
});

const logger = pino(transport);

logger.info("Hello World");
logger.error("Error Message");
