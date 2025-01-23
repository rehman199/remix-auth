import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react";
import { logoutUser } from "~/apis/user";
import LogoutButton from "~/components/auth/logout-button";
import { LoginPage } from "~/constants/routes";
import { IUser } from "~/interfaces/user";
import { commitSession, getSession } from "~/sessions";
import { isUserLoggedIn } from "~/utils";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await isUserLoggedIn(request);
  if (user) return { user };

  const session = await getSession(request.headers.get("Cookie"));
  session.flash("error", "Failed to load dashboard, Login required.");
  return redirect(LoginPage, {
    headers: { "Set-Cookie": await commitSession(session) },
  });
};

const Dashboard = () => {
  const { user } = useLoaderData<{ user: IUser }>();
  const actionData = useActionData<{ errors: string[] }>();

  return (
    <div>
      <h1>This is Dashboard</h1>
      <h2>{user.username}</h2>
      <h2>{user.email}</h2>
      <LogoutButton />
      {actionData?.errors ? <p>{actionData?.errors?.join(".")}</p> : null}
    </div>
  );
};

export const action = async ({ request }: ActionFunctionArgs) => {
  return await logoutUser(request);
};

export default Dashboard;
