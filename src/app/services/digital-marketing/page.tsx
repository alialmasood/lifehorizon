import Link from "next/link";

export default function DigitalMarketingPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 p-6">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">التسويق الرقمي</h1>
      <p className="text-lg text-gray-300 mb-10 text-center max-w-xl">
        حلول تسويق رقمي متكاملة لنجاح أعمالك عبر الإنترنت.
      </p>
      <div className="flex flex-col md:flex-row gap-6 w-full max-w-md justify-center">
        <Link href="/services/game-store" className="flex-1 bg-primary text-white rounded-lg px-6 py-4 text-center text-lg font-semibold shadow hover:bg-primary/90 transition">
          متجر الألعاب
        </Link>
        <Link href="/services/ebook-library" className="flex-1 bg-secondary text-white rounded-lg px-6 py-4 text-center text-lg font-semibold shadow hover:bg-secondary/90 transition">
          المكتبة الإلكترونية الشاملة
        </Link>
      </div>
    </main>
  );
} 