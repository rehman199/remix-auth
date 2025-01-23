import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import { AxiosError } from "axios";
import { loginUser } from "~/apis/user";
import { LoginForm } from "~/components/auth/login-form";
import { DashboardPage } from "~/constants/routes";
import { commitSession, getSession } from "~/sessions";
import { isLoggedIn } from "~/utils";

export async function loader({ request }: LoaderFunctionArgs) {
  if (await isLoggedIn(request)) return redirect(DashboardPage);
  return null;
}

export default function LoginPage() {
  const actionData = useActionData<{ errors: string[] }>();

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      {actionData?.errors ? <p>{actionData.errors.join(".")}</p> : null}
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  try {
    const response = await loginUser({ username, password });

    const session = await getSession();
    session.set("accessToken", response.data.access);
    session.set("refreshToken", response.data.refresh);

    return redirect(DashboardPage, {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  } catch (err: unknown) {
    console.log(err);
    return {
      errors: [
        (err as AxiosError<{ error: unknown }>)?.response?.data?.error,
        (err as AxiosError<{ detail: unknown }>)?.response?.data?.detail,
      ],
    };
  }
}
