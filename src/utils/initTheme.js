/** Apply saved or system theme before first paint (also called from inline index.html script). */
export function initTheme() {
  const stored = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme =
    stored === "dark" || stored === "light" ? stored : prefersDark ? "dark" : "light";
  document.documentElement.classList.toggle("dark", theme === "dark");
}
