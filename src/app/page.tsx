import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div>
          <p className="text-5xl font-extrabold">LS API</p>
        </div>
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            <Link href="/api/destinations">Destination</Link>
          </li>
          <li className="mb-2">
            <Link href="/api/categories">Category</Link>
          </li>
          <li className="mb-2">
            <Link href="/api/transportations">Transportation</Link>
          </li>
          <li className="mb-2">
            <Link href="">Homestay</Link>
          </li>
          <li className="mb-2">
            <Link href="">Culinary</Link>
          </li>
        </ol>
      </main>
    </div>
  );
}
