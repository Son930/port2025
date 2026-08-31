export default function PixelatedWaves({ children }) {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-transparent">
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 sm:px-10 lg:px-14 py-16 w-full">
        {children}
      </div>
    </section>
  );
}
