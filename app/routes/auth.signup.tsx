import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import { AxiosError } from "axios";
import { registerUser } from "~/apis/user";
import { SignUpForm } from "~/components/auth/signup-form";
import { DashboardPage, LoginPage } from "~/constants/routes";
import { isLoggedIn } from "~/utils";

export async function loader({ request }: LoaderFunctionArgs) {
  if (await isLoggedIn(request)) return redirect(DashboardPage);
  return null;
}

export default function Signup() {
  const actionData = useActionData<{ errors: string[] }>();
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        {actionData?.errors ? <p>{actionData?.errors?.join(".")}</p> : null}
        <SignUpForm />
      </div>
    </div>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  try {
    await registerUser({
      user: {
        username: formData.get("username") as string,
        email: formData.get("email") as string,
        password: formData.get("password") as string,
      },
    });
    return redirect(LoginPage);
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
