import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react";
import { resetPasswordSubmit, verifyPasswordResetToken } from "~/apis/user";
import { LoginPage } from "~/constants/routes";

export async function loader({ request }: LoaderFunctionArgs) {
  const token = request.url.split("token=")[1];

  if (!token) return redirect(LoginPage);

  try {
    const response = await verifyPasswordResetToken(token);
    return { email: response.data.email, token };
  } catch (err) {
    return redirect(LoginPage);
  }
}

const ResetPassword = () => {
  const { email, token } = useLoaderData<{ email: string; token: string }>();
  const actionData = useActionData<{ errors: string[] }>();

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
          className="mx-auto h-10 w-auto"
        />
        {actionData?.errors ? <p>{actionData?.errors?.join(".")}</p> : null}
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Reset Password for {email}
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form method="POST" className="space-y-3">
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-zinc-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="confirm_password"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Confirm Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="confirm_password"
                name="confirm_password"
                type="password"
                required
                autoComplete="current-password"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-zinc-600 sm:text-sm/6"
              />
            </div>
          </div>

          <input id="token" name="token" type="hidden" value={token} />

          <div>
            <button
              type="submit"
              className="mt-6 flex w-full justify-center rounded-md bg-zinc-900 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-zinc-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirm_password") as string;
  const token = formData.get("token") as string;

  if (password !== confirmPassword)
    return { errors: ["Passwords do not match"] };

  try {
    await resetPasswordSubmit({ password, token });
    return redirect(LoginPage);
  } catch (err) {
    console.log(err);
    return { errors: ["Failed to reset password"] };
  }
}
