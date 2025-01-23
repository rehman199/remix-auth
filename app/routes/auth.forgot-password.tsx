import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import { requestPasswordReset } from "~/apis/user";
import { DashboardPage } from "~/constants/routes";
import { isLoggedIn } from "~/utils";

export async function loader({ request }: LoaderFunctionArgs) {
  if (await isLoggedIn(request)) return redirect(DashboardPage);
  return null;
}

export default function ForgotPassword() {
  const actionData = useActionData<{ errors: string[] }>();
  return (
    <div className="flex flex-grow flex-col items-center justify-center gap-4">
      <h2 className="text-2xl font-bold">Forgot Password</h2>
      {actionData?.errors ? <p>{actionData?.errors?.join(".")}</p> : null}
      <div className="flex w-full max-w-sm rounded-md border border-gray-100 shadow-lg">
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <form method="POST" className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-zinc-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-zinc-900 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-zinc-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Reset Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = formData.get("email");
  try {
    await requestPasswordReset(email!);
    return redirect("/");
  } catch (error) {
    return { error: ["Failed to request password reset"] };
  }
}
