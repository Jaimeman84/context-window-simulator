'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Header() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <header className="navbar bg-base-100 border-b border-base-300 px-4 lg:px-8 sticky top-0 z-50">
      <div className="navbar-start">
        <Link href="/" className="btn btn-ghost text-xl font-bold">
          <span className="text-2xl">🧠</span>
          <span className="hidden sm:inline">Context Window Simulator</span>
          <span className="sm:hidden">CWS</span>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-1">
          <li>
            <Link
              href="/tutorial"
              className={isActive('/tutorial') ? 'active' : ''}
            >
              Tutorial
            </Link>
          </li>
          <li>
            <Link
              href="/scenarios"
              className={
                pathname?.startsWith('/scenarios') ? 'active' : ''
              }
            >
              Scenarios
            </Link>
          </li>
          <li>
            <Link
              href="/visualizer"
              className={isActive('/visualizer') ? 'active' : ''}
            >
              Visualizer
            </Link>
          </li>
          <li>
            <Link
              href="/sandbox"
              className={isActive('/sandbox') ? 'active' : ''}
            >
              Sandbox
            </Link>
          </li>
        </ul>
      </div>

      <div className="navbar-end gap-2">
        <div className="dropdown dropdown-end lg:hidden">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 border border-base-300"
          >
            <li>
              <Link href="/tutorial">Tutorial</Link>
            </li>
            <li>
              <Link href="/scenarios">Scenarios</Link>
            </li>
            <li>
              <Link href="/visualizer">Visualizer</Link>
            </li>
            <li>
              <Link href="/sandbox">Sandbox</Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
