import { createLazyFileRoute } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import type { FormEvent } from "react";
import postContact from "../api/postContact";

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
  const mutation = useMutation({
    mutationFn: (formData: FormData) => {
      return postContact(
        getString(formData, "name"),
        getString(formData, "email"),
        getString(formData, "message")
      );
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    mutation.mutate(formData);
  };

  return (
    <div>
      <h2>Contact</h2>
      {mutation.isSuccess ? (
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
            disabled={mutation.isPending}
          />
          <input
            className={inputClass}
            type="email"
            name="email"
            placeholder="Email"
            required
            disabled={mutation.isPending}
          />
          <textarea
            className={`${inputClass} min-h-[200px]`}
            name="message"
            placeholder="Message"
            required
            disabled={mutation.isPending}
          ></textarea>
          <button
            type="submit"
            className="btn relative z-10"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Submitting..." : "Submit"}
          </button>
        </form>
      )}
    </div>
  );
}

export default ContactRoute;