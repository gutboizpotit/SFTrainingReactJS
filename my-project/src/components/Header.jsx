export default function Header() {
  return (
    <header className="bg-indigo-600 text-white p-4 flex justify-between items-center">
      <div className="text-xl font-bold">JobTracker</div>
      <nav className="space-x-6 py-2 px-8">
        <a href="#" className="hover:underline font-semibold">
          Home
        </a>
        <a href="#" className="hover:underline font-semibold">
          About
        </a>
        <a href="#" className="hover:underline font-semibold">
          Profile
        </a>
      </nav>
    </header>
  );
}
