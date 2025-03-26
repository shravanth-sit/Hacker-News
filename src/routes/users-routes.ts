import { Hono } from "hono";
import { tokenMiddleware } from "./middlewares/token-middleware";
import { GetMe, GetAllUsers } from "../controllers/users/users-controllers";
import { GetAllUsersError, GetMeError } from "../controllers/users/users-type";

export const usersRoutes = new Hono();

usersRoutes.get("/me", tokenMiddleware, async (context) => {
  try {
    const userId = context.get("userId");
    const result = await GetMe({ userId });
    if (!result) {
      return context.json({ error: "User not found" }, 404);
    }
    return context.json(result, 200);
  } catch (error) {
    if (error === GetMeError.USER_NOT_FOUND) {
      return context.json({ error: "User not found" }, 404);
    }
    if (error === GetMeError.UNKNOWN) {
      return context.json({ error: "Unknown error" }, 500);
    }
  }
});

usersRoutes.get("/all", tokenMiddleware, async (context) => {
  try {
    const result = await GetAllUsers();
    if (!result) {
      return context.json({ error: "Users not found" }, 404);
    }
    return context.json(result, 200);
  } catch (error) {
    if (error === GetAllUsersError.NO_USERS_FOUND) {
      return context.json({ error: "Users not found" }, 404);
    }
    if (error === GetAllUsersError.UNKNOWN) {
      return context.json({ error: "Unknown error" }, 500);
    }
  }
});