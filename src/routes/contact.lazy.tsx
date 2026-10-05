import { createLazyFileRoute } from "@tanstack/react-router";
import type { FormEvent } from "react";

import { usePostContactMutation } from "../api/pizzaApi";

export const Route = createLazyFileRoute("/contact")({
  component: ContactRoute,
});

const inputClass =
  "my-3.75 block w-full max-w-125 rounded-[5px] border-2 border-border bg-white p-2 text-[16px] focus:border-primary disabled:bg-[#999]";

function getString(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

function ContactRoute() {
  const [postContact, { isSuccess, isLoading }] = usePostContactMutation();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    void postContact({
      name: getString(formData, "name"),
      email: getString(formData, "email"),
      message: getString(formData, "message"),
    });
  };

  return (
    <div>
      <h2>Contact</h2>

      {isSuccess ? (
        <h3 className="m-12.5 text-center font-pacifico text-[30px] font-normal text-secondary">
          Submitted!
        </h3>
      ) : (
        <form
          className="flex flex-col items-center justify-center"
          onSubmit={handleSubmit}
        >
          <input
            className={inputClass}
            type="text"
            name="name"
            placeholder="Name"
            required
            disabled={isLoading}
          />

          <input
            className={inputClass}
            type="email"
            name="email"
            placeholder="Email"
            required
            disabled={isLoading}
          />

          <textarea
            className={`${inputClass} min-h-[200px]`}
            name="message"
            placeholder="Message"
            required
            disabled={isLoading}
          ></textarea>

          <button
            type="submit"
            className="btn relative z-10"
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </form>
      )}
    </div>
  );
}

export default ContactRoute;