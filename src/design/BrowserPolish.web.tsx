export function BrowserPolish() {
  return <style>{`
    html { color-scheme: light; background: #F0F6F3; }
    ::selection { background: #C6E6D6; color: #183D34; }
    :is(button, a, [role="button"], [role="tab"], [role="checkbox"], input, textarea):focus-visible {
      outline: 2px solid #23755F; outline-offset: 3px;
      box-shadow: 0 0 0 3px #FFFFFF;
    }
    input, textarea { caret-color: #23755F; scroll-margin-block: 24px; }
    [data-glass-input="true"]:focus-visible { outline: none; box-shadow: none; }
    input:autofill { -webkit-text-fill-color: #183D34; caret-color: #23755F; }
    :is(button, [role="button"], [role="tab"], [role="checkbox"])[aria-disabled="true"] { cursor: default; }
    @media (hover: hover) and (pointer: fine) {
      :is(button, [role="button"], [role="tab"], [role="checkbox"]) {
        transition: opacity 140ms ease, background-color 140ms ease, box-shadow 140ms ease, transform 140ms ease;
      }
      input, textarea { transition: color 140ms ease; }
    }
    * { scrollbar-width: thin; scrollbar-color: #BFCFC5 transparent; }
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after { scroll-behavior: auto !important; animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
      :is(button, [role="button"], [role="tab"], [role="checkbox"]) { transform: none !important; }
    }
  `}</style>;
}
