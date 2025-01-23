"use client";

import { Form } from "@remix-run/react";
import { Button } from "../ui/button";

const LogoutButton = () => {
  return (
    <Form method="DELETE">
      <Button type="submit">Logout</Button>
    </Form>
  );
};

export default LogoutButton;
