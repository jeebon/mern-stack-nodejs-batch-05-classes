import { z } from "zod";
/**
 * {
        "id": "1",
        "name": "Alice",
        "createdAt": "2026-04-18T10:00:00.000Z",
        "updatedAt": "2026-04-18T10:00:00.000Z",
        "currentTime": "2026-04-23T16:25:55.612Z"
    },
 *
 */

const userSchema = z.object({
  id: z.coerce.number(),
  name: z.string().min(3).max(20),
  createdAt: z.string(),
});

console.log(
  userSchema.parse({
    id: "200",
    name: "Alice",
    createdAt: "2026-26-04-18T10:00:00.000Z",
  }),
);
