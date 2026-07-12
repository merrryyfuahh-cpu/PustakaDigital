import { useState } from "react";
import { Search, Home, MessageSquare, User, ChevronLeft, Bookmark, Clock, Calendar, CheckCircle } from "lucide-react";

type Screen =
  | "splash"
  | "login"
  | "home"
  | "search"
  | "book-detail"
  | "borrow-confirm"
  | "borrow-success"
  | "loans"
  | "return-confirm"
  | "return-success";

const LIBRARY_BG = "https://images.unsplash.com/photo-1625053376622-e462848c453f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800";
const TECH_IMG = "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400";
const SASTRA_IMG = "https://images.unsplash.com/photo-1630062823445-2deb4c35ec3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400";
const SAINS_IMG = "https://images.unsplash.com/photo-1462332420958-a05d1e002413?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400";

const BOOK_COVER_1 = "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200";
const BOOK_COVER_2 = "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200";

const BROWN = "#B07530";
const CYAN = "#40D4D4";

interface Book {
  id: number;
  title: string;
  author: string;
  year: string;
  publisher: string;
  stock: number;
  status: "Tersedia" | "Dipinjam";
  cover: string;
  description: string;
}

const books: Book[] = [
  {
    id: 1,
    title: "Pemograman Python",
    author: "Andi S.",
    year: "2023",
    publisher: "Stotex",
    stock: 5,
    status: "Tersedia",
    cover: BOOK_COVER_1,
    description:
      "Buku Pemrograman Dasar Python adalah panduan ramah pemula untuk belajar coding dari nol menggunakan bahasa Python yang simpel dan mudah dipahami.",
  },
  {
    id: 2,
    title: "Python Dasar",
    author: "Andi S.",
    year: "2023",
    publisher: "Stotex",
    stock: 0,
    status: "Dipinjam",
    cover: BOOK_COVER_2,
    description:
      "Panduan lengkap untuk memahami logika pemrograman Python dari dasar hingga tingkat lanjut dengan contoh-contoh praktis.",
  },
  {
    id: 3,
    title: "Python Dasar",
    author: "Andi S.",
    year: "2023",
    publisher: "Stotex",
    stock: 0,
    status: "Dipinjam",
    cover: BOOK_COVER_2,
    description:
      "Buku referensi Python yang komprehensif untuk sains dan numerik.",
  },
  {
    id: 4,
    title: "Python Dasar",
    author: "Andi S.",
    year: "2023",
    publisher: "Stotex",
    stock: 3,
    status: "Tersedia",
    cover: BOOK_COVER_1,
    description:
      "Buku Pemrograman Dasar Python adalah panduan ramah pemula untuk belajar coding dari nol.",
  },
];

interface LoanItem {
  id: number;
  book: Book;
  borrowDate: string;
  dueDate: string;
}

const loanItems: LoanItem[] = [
  {
    id: 1,
    book: books[0],
    borrowDate: "20 nov 2023",
    dueDate: "27 nov 2023",
  },
  {
    id: 2,
    book: books[1],
    borrowDate: "20 nov 2023",
    dueDate: "27 nov 2023",
  },
];

function BookCover({ src, className }: { src: string; className?: string }) {
  return (
    <img
      src={src}
      alt="Book cover"
      className={`object-cover ${className ?? ""}`}
      onError={(e) => {
        (e.target as HTMLImageElement).style.background = "#1a3a5c";
      }}
    />
  );
}

function BottomNav({ active, onNavigate }: { active: string; onNavigate: (s: Screen) => void }) {
  return (
    <div className="flex items-center justify-around py-3 border-t border-white/20" style={{ background: BROWN }}>
      {[
        { icon: Home, label: "Home", screen: "home" as Screen },
        { icon: Search, label: "Search", screen: "search" as Screen },
        { icon: MessageSquare, label: "Message", screen: "loans" as Screen },
        { icon: User, label: "Profil", screen: "home" as Screen },
      ].map(({ icon: Icon, label, screen }) => (
        <button
          key={label}
          onClick={() => onNavigate(screen)}
          className="flex flex-col items-center gap-1"
        >
          <Icon
            size={24}
            className={active === screen ? "text-white" : "text-white/60"}
            strokeWidth={active === screen ? 2.5 : 1.5}
          />
          <span
            className={`text-xs font-bold ${active === screen ? "text-white" : "text-white/60"}`}
            style={{ fontFamily: "Nunito, sans-serif" }}
          >
            {label}
          </span>
        </button>
      ))}
    </div>
  );
}

// ── Screen 1: Splash ──────────────────────────────────────────────────────────
function SplashScreen({ onNext }: { onNext: () => void }) {
  return (
    <div className="relative flex flex-col items-center justify-end min-h-screen pb-16 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${LIBRARY_BG})` }}
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 flex flex-col items-center text-center px-8">
        <div className="text-6xl mb-4">📖</div>
        <h1
          className="text-5xl font-black text-white mb-4 drop-shadow-lg"
          style={{ fontFamily: "Nunito, sans-serif" }}
        >
          PustakaKita
        </h1>
        <p
          className="text-xl font-bold text-white mb-12 drop-shadow"
          style={{ fontFamily: "Nunito, sans-serif" }}
        >
          Selamat Datang Di
          <br />
          Perpustakaan Digital
        </p>
        <button
          onClick={onNext}
          className="w-full py-4 rounded-lg font-bold text-white text-lg tracking-wide"
          style={{ background: "#D4841A", fontFamily: "Nunito, sans-serif" }}
        >
          Mulai
        </button>
      </div>
    </div>
  );
}

// ── Screen 2: Login ───────────────────────────────────────────────────────────
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [nim, setNim] = useState("");
  const [pw, setPw] = useState("");

  return (
    <div className="min-h-screen flex flex-col px-6 pt-12 pb-10" style={{ background: BROWN }}>
      <div className="flex justify-center mb-6">
        <span className="text-7xl">📖</span>
      </div>
      <h2
        className="text-center text-2xl font-black text-white mb-10 tracking-wide"
        style={{ fontFamily: "Nunito, sans-serif" }}
      >
        LOGIN KE AKUN ANDA
      </h2>

      <div className="mb-5">
        <label
          className="text-white font-bold text-lg mb-2 block"
          style={{ fontFamily: "Nunito, sans-serif" }}
        >
          Nim/Username
        </label>
        <input
          value={nim}
          onChange={(e) => setNim(e.target.value)}
          className="w-full py-4 px-4 rounded-md text-gray-900 font-semibold bg-white outline-none text-base"
          style={{ fontFamily: "Nunito, sans-serif" }}
          placeholder=""
        />
      </div>

      <div className="mb-14">
        <label
          className="text-white font-bold text-lg mb-2 block"
          style={{ fontFamily: "Nunito, sans-serif" }}
        >
          Password
        </label>
        <input
          type="password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          className="w-full py-4 px-4 rounded-md text-gray-900 font-semibold bg-white outline-none text-base"
          style={{ fontFamily: "Nunito, sans-serif" }}
          placeholder=""
        />
      </div>

      <button
        onClick={onLogin}
        className="w-full py-4 rounded-full font-black text-white text-xl tracking-widest"
        style={{ background: CYAN, fontFamily: "Nunito, sans-serif" }}
      >
        MASUK
      </button>
    </div>
  );
}

// ── Screen 3: Home / Beranda ──────────────────────────────────────────────────
function HomeScreen({
  onSearch,
  onBookDetail,
  onNavigate,
}: {
  onSearch: () => void;
  onBookDetail: (book: Book) => void;
  onNavigate: (s: Screen) => void;
}) {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: BROWN }}>
      <div className="flex-1 overflow-y-auto pb-4">
        <h1
          className="text-center text-2xl font-black text-white py-5 tracking-widest"
          style={{ fontFamily: "Nunito, sans-serif" }}
        >
          BERANDA
        </h1>

        {/* Search bar */}
        <div className="px-4 mb-6">
          <button
            onClick={onSearch}
            className="w-full flex items-center gap-3 bg-gray-200/90 rounded-full px-5 py-3"
          >
            <Search size={22} className="text-gray-500" />
            <span className="text-gray-500 text-lg" style={{ fontFamily: "Nunito, sans-serif" }}>
              Search...
            </span>
          </button>
        </div>

        {/* Category */}
        <div className="px-4 mb-6">
          <h2
            className="text-white font-black text-xl mb-4 tracking-wide"
            style={{ fontFamily: "Nunito, sans-serif" }}
          >
            KATEGORI BUKU
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Teknologi", img: TECH_IMG },
              { label: "Sastra", img: SASTRA_IMG },
              { label: "Sains", img: SAINS_IMG },
            ].map(({ label, img }) => (
              <button key={label} className="flex flex-col items-center">
                <div className="w-full h-24 rounded-lg overflow-hidden mb-1">
                  <img src={img} alt={label} className="w-full h-full object-cover" />
                </div>
                <span
                  className="text-white font-black text-sm"
                  style={{ fontFamily: "Nunito, sans-serif" }}
                >
                  {label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Popular books */}
        <div className="px-4">
          <h2
            className="text-white font-black text-xl mb-4 tracking-wide"
            style={{ fontFamily: "Nunito, sans-serif" }}
          >
            BUKU POPULER
          </h2>
          <div className="flex flex-col gap-4">
            {books.slice(0, 2).map((book) => (
              <button
                key={book.id}
                onClick={() => onBookDetail(book)}
                className="flex items-center gap-4 text-left"
              >
                <BookCover src={book.cover} className="w-24 h-32 rounded-lg flex-shrink-0" />
                <div>
                  <p
                    className="text-white font-black text-lg leading-tight"
                    style={{ fontFamily: "Nunito, sans-serif" }}
                  >
                    {book.title}
                  </p>
                  <p
                    className="text-white/80 font-bold text-base"
                    style={{ fontFamily: "Nunito, sans-serif" }}
                  >
                    {book.author}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <BottomNav active="home" onNavigate={onNavigate} />
    </div>
  );
}

// ── Screen 4: Search ──────────────────────────────────────────────────────────
function SearchScreen({
  onBack,
  onBookDetail,
  onNavigate,
}: {
  onBack: () => void;
  onBookDetail: (book: Book) => void;
  onNavigate: (s: Screen) => void;
}) {
  const [query, setQuery] = useState("Pemograman Pyton");

  return (
    <div className="min-h-screen flex flex-col" style={{ background: BROWN }}>
      <div className="flex-1 overflow-y-auto pb-4">
        <div className="px-4 pt-6 mb-4">
          <button onClick={onBack} className="mb-2">
            <ChevronLeft size={34} className="text-white font-black" strokeWidth={3} />
          </button>
          <h1
            className="text-white font-black text-2xl tracking-wide mb-4"
            style={{ fontFamily: "Nunito, sans-serif" }}
          >
            CARI BUKU ANDA
          </h1>
          <div className="flex items-center gap-3 bg-gray-200/90 rounded-full px-5 py-3 mb-6">
            <Search size={22} className="text-gray-600" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="bg-transparent flex-1 text-gray-900 font-bold text-base outline-none"
              style={{ fontFamily: "Nunito, sans-serif" }}
            />
          </div>
        </div>

        <div className="px-4 flex flex-col gap-5">
          {books.map((book) => (
            <button
              key={book.id}
              onClick={() => onBookDetail(book)}
              className="flex items-start gap-4 text-left"
            >
              <BookCover src={book.cover} className="w-20 h-28 rounded-lg flex-shrink-0" />
              <div className="flex-1 pt-1">
                <p
                  className="text-white font-black text-lg leading-tight mb-1"
                  style={{ fontFamily: "Nunito, sans-serif" }}
                >
                  {book.title}
                </p>
                <p
                  className="text-white/80 font-semibold text-sm mb-3"
                  style={{ fontFamily: "Nunito, sans-serif" }}
                >
                  {book.author}
                </p>
                <div className="flex items-center gap-2">
                  <span
                    className="text-white/80 font-semibold text-sm"
                    style={{ fontFamily: "Nunito, sans-serif" }}
                  >
                    Status
                  </span>
                  <span
                    className="px-4 py-1 rounded-full font-bold text-sm"
                    style={{
                      fontFamily: "Nunito, sans-serif",
                      background: book.status === "Tersedia" ? "#4CAF50" : "#FF6B8A",
                      color: "white",
                    }}
                  >
                    {book.status}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <BottomNav active="search" onNavigate={onNavigate} />
    </div>
  );
}

// ── Screen 5: Book Detail ─────────────────────────────────────────────────────
function BookDetailScreen({
  book,
  onBack,
  onBorrow,
}: {
  book: Book;
  onBack: () => void;
  onBorrow: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: BROWN }}>
      <div className="flex items-center justify-between px-4 pt-6 pb-4">
        <button onClick={onBack}>
          <ChevronLeft size={34} className="text-white" strokeWidth={3} />
        </button>
        <Bookmark size={28} className="text-white" strokeWidth={2} />
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-6">
        <div className="flex justify-center mb-6">
          <BookCover src={book.cover} className="w-52 h-72 rounded-xl shadow-2xl" />
        </div>

        <h2
          className="text-white font-black text-2xl mb-1"
          style={{ fontFamily: "Nunito, sans-serif" }}
        >
          {book.title}
        </h2>
        <p className="text-white/70 font-semibold mb-1" style={{ fontFamily: "Nunito, sans-serif" }}>
          {book.author}
        </p>
        <p className="text-white/70 font-semibold mb-5" style={{ fontFamily: "Nunito, sans-serif" }}>
          {book.year}
        </p>

        <h3
          className="text-white font-black text-xl mb-2"
          style={{ fontFamily: "Nunito, sans-serif" }}
        >
          Deskripsi
        </h3>
        <p
          className="text-white font-bold text-sm leading-relaxed mb-5"
          style={{ fontFamily: "Nunito, sans-serif" }}
        >
          {book.description}
        </p>

        <h3
          className="text-white font-black text-xl mb-1"
          style={{ fontFamily: "Nunito, sans-serif" }}
        >
          Stekis
        </h3>
        <p
          className="text-white/80 font-semibold mb-8"
          style={{ fontFamily: "Nunito, sans-serif" }}
        >
          stok: {book.stock}
        </p>

        <button
          onClick={onBorrow}
          className="w-full py-4 rounded-full font-black text-white text-xl"
          style={{ background: CYAN, fontFamily: "Nunito, sans-serif" }}
        >
          Pinjam Buku
        </button>
      </div>
    </div>
  );
}

// ── Screen 6: Borrow Confirmation ─────────────────────────────────────────────
function BorrowConfirmScreen({
  book,
  onBack,
  onConfirm,
}: {
  book: Book;
  onBack: () => void;
  onConfirm: () => void;
}) {
  const [duration, setDuration] = useState<7 | 14>(7);

  return (
    <div className="min-h-screen flex flex-col px-4 pt-6 pb-10" style={{ background: BROWN }}>
      <div className="flex items-center gap-3 mb-1">
        <button onClick={onBack}>
          <ChevronLeft size={34} className="text-white" strokeWidth={3} />
        </button>
        <h1
          className="text-white font-black text-2xl leading-tight"
          style={{ fontFamily: "Nunito, sans-serif" }}
        >
          Konfirmasi
          <br />
          Peminjaman
        </h1>
      </div>

      <hr className="border-white/30 my-5" />

      {/* Book card */}
      <div className="bg-white rounded-3xl p-4 flex items-center gap-4 mb-8">
        <BookCover src={book.cover} className="w-28 h-36 rounded-2xl flex-shrink-0" />
        <div>
          <p
            className="text-gray-900 font-black text-lg leading-tight mb-2"
            style={{ fontFamily: "Nunito, sans-serif" }}
          >
            {book.title}
          </p>
          <p className="text-gray-600 font-semibold" style={{ fontFamily: "Nunito, sans-serif" }}>
            {book.author}
          </p>
          <p className="text-gray-600 font-semibold" style={{ fontFamily: "Nunito, sans-serif" }}>
            {book.publisher}
          </p>
          <p className="text-gray-600 font-semibold" style={{ fontFamily: "Nunito, sans-serif" }}>
            {book.year}
          </p>
        </div>
      </div>

      <h2
        className="text-white font-black text-2xl mb-4"
        style={{ fontFamily: "Nunito, sans-serif" }}
      >
        Lama Peminjaman
      </h2>

      <div className="bg-gray-200/80 rounded-2xl overflow-hidden mb-10">
        {[
          { days: 7 as const, icon: <Clock size={18} /> },
          { days: 14 as const, icon: <span className="text-xs font-bold border border-gray-700 rounded px-1">15</span> },
        ].map(({ days, icon }) => (
          <button
            key={days}
            onClick={() => setDuration(days)}
            className="w-full flex items-center justify-between px-5 py-4 border-b border-gray-300 last:border-0"
          >
            <div className="flex items-center gap-3 text-gray-900 font-black text-lg" style={{ fontFamily: "Nunito, sans-serif" }}>
              {icon}
              <span>{days} hari</span>
            </div>
            <div
              className={`w-6 h-6 border-2 rounded ${
                duration === days ? "bg-amber-600 border-amber-700" : "border-gray-500 bg-white"
              }`}
            />
          </button>
        ))}
      </div>

      <button
        onClick={onConfirm}
        className="w-full py-4 rounded-full font-black text-white text-xl"
        style={{ background: CYAN, fontFamily: "Nunito, sans-serif" }}
      >
        Konfirmasi Pinjam
      </button>
    </div>
  );
}

// ── Screen 7: Borrow Success ──────────────────────────────────────────────────
function BorrowSuccessScreen({
  book,
  onHome,
}: {
  book: Book;
  onHome: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-between px-6 py-16" style={{ background: BROWN }}>
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="w-32 h-32 rounded-full bg-green-500 flex items-center justify-center mb-10 shadow-xl">
          <CheckCircle size={70} className="text-white" strokeWidth={2.5} />
        </div>
        <h1
          className="text-white font-black text-4xl text-center mb-12"
          style={{ fontFamily: "Nunito, sans-serif" }}
        >
          Peminjaman Berhasil!
        </h1>
        <div className="flex items-center gap-4 w-full">
          <BookCover src={book.cover} className="w-24 h-32 rounded-xl flex-shrink-0" />
          <div>
            <p
              className="text-white font-black text-lg leading-tight"
              style={{ fontFamily: "Nunito, sans-serif" }}
            >
              {book.title}
            </p>
            <p className="text-white font-black text-lg" style={{ fontFamily: "Nunito, sans-serif" }}>
              {book.author}
            </p>
            <p className="text-white font-black text-lg" style={{ fontFamily: "Nunito, sans-serif" }}>
              {book.year}
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={onHome}
        className="w-full py-4 rounded-full font-black text-white text-xl"
        style={{ background: CYAN, fontFamily: "Nunito, sans-serif" }}
      >
        Kembali Ke Beranda
      </button>
    </div>
  );
}

// ── Screen 8: Loans (Message tab) ────────────────────────────────────────────
function LoansScreen({
  loans,
  onReturnConfirm,
  onNavigate,
}: {
  loans: LoanItem[];
  onReturnConfirm: (loan: LoanItem) => void;
  onNavigate: (s: Screen) => void;
}) {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: BROWN }}>
      <div className="flex-1 overflow-y-auto pb-4">
        <h1
          className="text-center text-2xl font-black text-white py-5"
          style={{ fontFamily: "Nunito, sans-serif" }}
        >
          Pinjaman
        </h1>

        <div className="px-4">
          <h2
            className="text-white font-black text-2xl mb-3"
            style={{ fontFamily: "Nunito, sans-serif" }}
          >
            Sedang dipinjam
          </h2>

          <div className="flex flex-col gap-5">
            {loans.map((loan, idx) => (
              <div key={loan.id} className="relative">
                {/* Action button */}
                <div className="flex justify-end mb-2">
                  <button
                    onClick={() => onReturnConfirm(loan)}
                    className="px-5 py-2 rounded-full font-bold text-white text-sm"
                    style={{ background: CYAN, fontFamily: "Nunito, sans-serif" }}
                  >
                    {idx === 0 ? "Batalkan" : "Perpanjang"}
                  </button>
                </div>
                <div className="flex items-start gap-4">
                  <BookCover src={loan.book.cover} className="w-24 h-32 rounded-xl flex-shrink-0" />
                  <div>
                    <p
                      className="text-white font-black text-lg mb-1"
                      style={{ fontFamily: "Nunito, sans-serif" }}
                    >
                      {loan.book.title}
                    </p>
                    <p
                      className="text-white/80 font-semibold text-sm mb-1"
                      style={{ fontFamily: "Nunito, sans-serif" }}
                    >
                      {loan.book.author}
                    </p>
                    <p
                      className="text-white/70 text-sm"
                      style={{ fontFamily: "Nunito, sans-serif" }}
                    >
                      tgl pinjam : {loan.borrowDate}
                    </p>
                    <p
                      className="text-white/70 text-sm"
                      style={{ fontFamily: "Nunito, sans-serif" }}
                    >
                      jatuh tempo: {loan.dueDate}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav active="loans" onNavigate={onNavigate} />
    </div>
  );
}

// ── Screen 9: Return Confirmation ─────────────────────────────────────────────
function ReturnConfirmScreen({
  loan,
  onBack,
  onConfirm,
}: {
  loan: LoanItem;
  onBack: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col px-4 pt-6 pb-24" style={{ background: BROWN }}>
      <div className="flex items-center gap-3 mb-8">
        <button onClick={onBack}>
          <ChevronLeft size={34} className="text-white" strokeWidth={3} />
        </button>
        <h1
          className="text-white font-black text-2xl"
          style={{ fontFamily: "Nunito, sans-serif" }}
        >
          Konfirmasi Pengembalian
        </h1>
      </div>

      {/* Book card */}
      <div className="bg-white rounded-3xl p-4 flex items-center gap-4 mb-10">
        <BookCover src={loan.book.cover} className="w-28 h-36 rounded-2xl flex-shrink-0" />
        <div>
          <p
            className="text-gray-900 font-black text-lg leading-tight mb-2"
            style={{ fontFamily: "Nunito, sans-serif" }}
          >
            {loan.book.title}
          </p>
          <p className="text-gray-600 font-semibold" style={{ fontFamily: "Nunito, sans-serif" }}>
            {loan.book.author}
          </p>
          <p className="text-gray-600 font-semibold" style={{ fontFamily: "Nunito, sans-serif" }}>
            {loan.book.publisher}
          </p>
          <p className="text-gray-600 font-semibold" style={{ fontFamily: "Nunito, sans-serif" }}>
            {loan.book.year}
          </p>
        </div>
      </div>

      <h2
        className="text-white font-black text-2xl text-center mb-10"
        style={{ fontFamily: "Nunito, sans-serif" }}
      >
        Yakin untuk mengembalikan
        <br />
        buku ini?
      </h2>

      <div className="flex flex-col gap-4">
        <button
          onClick={onConfirm}
          className="w-full py-4 rounded-full font-black text-white text-xl"
          style={{ background: CYAN, fontFamily: "Nunito, sans-serif" }}
        >
          Ya,Kembalikan
        </button>
        <button
          onClick={onBack}
          className="w-full py-4 rounded-full font-black text-xl border-2"
          style={{
            color: "#FF6B8A",
            borderColor: "#FF6B8A",
            background: "transparent",
            fontFamily: "Nunito, sans-serif",
          }}
        >
          Batal
        </button>
      </div>
    </div>
  );
}

// ── Screen 10: Return Success ─────────────────────────────────────────────────
function ReturnSuccessScreen({ onDone }: { onDone: () => void }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-between px-6 py-20" style={{ background: BROWN }}>
      <div className="flex-1 flex flex-col items-center justify-center">
        <div
          className="w-36 h-36 rounded-full flex items-center justify-center mb-10 shadow-2xl"
          style={{
            background: "radial-gradient(circle at 35% 35%, #7FE8D0, #40C8C8, #3090D0)",
          }}
        >
          <CheckCircle size={72} className="text-white" strokeWidth={2.5} />
        </div>
        <h1
          className="text-white font-black text-4xl text-center"
          style={{ fontFamily: "Nunito, sans-serif" }}
        >
          Pengembalian
          <br />
          Berhasil!
        </h1>
      </div>

      <button
        onClick={onDone}
        className="w-full py-4 rounded-full font-black text-white text-xl"
        style={{ background: CYAN, fontFamily: "Nunito, sans-serif" }}
      >
        Selesai
      </button>
    </div>
  );
}

// ── Root App ──────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState<Screen>("splash");
  const [selectedBook, setSelectedBook] = useState<Book>(books[0]);
  const [selectedLoan, setSelectedLoan] = useState<LoanItem>(loanItems[0]);

  const go = (s: Screen) => setScreen(s);

  const handleBookDetail = (book: Book) => {
    setSelectedBook(book);
    go("book-detail");
  };

  const handleReturnConfirm = (loan: LoanItem) => {
    setSelectedLoan(loan);
    go("return-confirm");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div
        className="relative overflow-hidden shadow-2xl"
        style={{ width: 390, minHeight: "100vh", maxHeight: "100vh", overflowY: "auto" }}
      >
        {screen === "splash" && <SplashScreen onNext={() => go("login")} />}
        {screen === "login" && <LoginScreen onLogin={() => go("home")} />}
        {screen === "home" && (
          <HomeScreen
            onSearch={() => go("search")}
            onBookDetail={handleBookDetail}
            onNavigate={go}
          />
        )}
        {screen === "search" && (
          <SearchScreen
            onBack={() => go("home")}
            onBookDetail={handleBookDetail}
            onNavigate={go}
          />
        )}
        {screen === "book-detail" && (
          <BookDetailScreen
            book={selectedBook}
            onBack={() => go("home")}
            onBorrow={() => go("borrow-confirm")}
          />
        )}
        {screen === "borrow-confirm" && (
          <BorrowConfirmScreen
            book={selectedBook}
            onBack={() => go("book-detail")}
            onConfirm={() => go("borrow-success")}
          />
        )}
        {screen === "borrow-success" && (
          <BorrowSuccessScreen book={selectedBook} onHome={() => go("home")} />
        )}
        {screen === "loans" && (
          <LoansScreen
            loans={loanItems}
            onReturnConfirm={handleReturnConfirm}
            onNavigate={go}
          />
        )}
        {screen === "return-confirm" && (
          <ReturnConfirmScreen
            loan={selectedLoan}
            onBack={() => go("loans")}
            onConfirm={() => go("return-success")}
          />
        )}
        {screen === "return-success" && <ReturnSuccessScreen onDone={() => go("home")} />}
      </div>
    </div>
  );
}
