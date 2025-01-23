import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Remix Test App" },
    { name: "description", content: "Welcome to Remix Test APP!" },
  ];
};

export default function Index() {
  return (
    <div className="p-8">
      <h1 className="mb-4 text-2xl font-bold">
        Authentication Test Application
      </h1>
      <p className="text-gray-600">
        This is a demo application built with Remix.js to showcase and test
        various authentication methods. You can use this app to explore
        different authentication flows and implementations.
      </p>
    </div>
  );
}
