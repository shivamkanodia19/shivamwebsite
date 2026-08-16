import { useId, useState } from "react";

type AdminLoginProps = {
  error: string | null;
  pending: boolean;
  onSubmit: (password: string) => Promise<void>;
};

export function AdminLogin({ error, pending, onSubmit }: AdminLoginProps) {
  const passwordId = useId();
  const [password, setPassword] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const submittedPassword = password;
    setPassword("");
    await onSubmit(submittedPassword);
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 py-12">
      <p className="font-mono text-xs tracking-[0.16em] text-[#555]">ANALYTICS / PRIVATE</p>
      <h1 className="mt-3 font-serif text-4xl text-[#0D0D0D]">Private analytics</h1>
      <p className="mt-3 text-sm leading-6 text-[#555]">Enter the owner password to access this dashboard.</p>
      <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
        <div>
          <label className="block font-mono text-xs uppercase tracking-wide text-[#333]" htmlFor={passwordId}>
            Password
          </label>
          <input
            autoComplete="current-password"
            className="mt-2 min-h-11 w-full border border-[#333] bg-white px-3 py-2 text-base text-[#0D0D0D]"
            disabled={pending}
            id={passwordId}
            name="password"
            onChange={(event) => setPassword(event.target.value)}
            required
            type="password"
            value={password}
          />
        </div>
        {error ? <p role="alert" className="text-sm text-[#8E2F2F]">{error}</p> : null}
        <button
          className="min-h-11 bg-[#1747A6] px-4 py-2 font-mono text-sm text-white disabled:cursor-wait disabled:opacity-70"
          disabled={pending}
          type="submit"
        >
          {pending ? "Signing in…" : "Sign in"}
        </button>
      </form>
      <a className="mt-8 font-mono text-sm text-[#1747A6] underline" href="/">
        Return to portfolio
      </a>
    </main>
  );
}
