import { createLazyFileRoute } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import type { SubmitEvent } from "react";
import postContact from "../api/postContact";

export const Route = createLazyFileRoute("/contact")({
  component: ContactRoute,
});

function getString(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

function ContactRoute() {
  const mutation = useMutation({
    mutationFn: async (e: SubmitEvent<HTMLFormElement>) => {
      e.preventDefault();

      // Gunakan e.target, BUKAN e.currentTarget!
      const formData = new FormData(e.target);

      return postContact(
        getString(formData, "name"),
        getString(formData, "email"),
        getString(formData, "message"),
      );
    },
  });

  return (
    <div className="contact">
      <h2>Contact Us</h2>
      {mutation.isSuccess ? (
        <h3>Submitted!</h3>
      ) : (
        <form onSubmit={(e) => mutation.mutate(e)}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
          />
          <textarea
            name="message"
            placeholder="Message"
            required
          ></textarea>
          <button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? "Submitting..." : "Submit"}
          </button>
        </form>
      )}
    </div>
  );
}

export default ContactRoute;