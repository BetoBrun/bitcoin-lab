import Link from "next/link";

export default function Home() {
  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold mb-4">Bitcoin Lab — Open Source</h1>
      <Link href="/bitcoin-lab" className="text-accent underline">
        Open the dashboard →
      </Link>
    </main>
  );
}