export function Footer() {
  return (
    <footer className="footer footer-center p-10 bg-base-200 text-base-content mt-auto">
      <aside>
        <p className="font-semibold text-lg">Context Window Simulator</p>
        <p className="text-sm opacity-70">
          An interactive educational tool to understand AI context windows
        </p>
        <p className="text-xs opacity-50 mt-2">
          Built with Next.js, TypeScript, Tailwind CSS, and DaisyUI
        </p>
      </aside>
      <nav>
        <div className="grid grid-flow-col gap-4">
          <a
            href="https://github.com"
            className="link link-hover text-sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a href="#" className="link link-hover text-sm">
            Documentation
          </a>
          <a href="#" className="link link-hover text-sm">
            About
          </a>
        </div>
      </nav>
    </footer>
  );
}
