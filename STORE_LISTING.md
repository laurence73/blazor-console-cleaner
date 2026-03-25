# Chrome Web Store Listing

## Name
Blazor Console Cleaner

## Short Description (132 chars max)
Clean Blazor/WASM stack trace garbage from copied DevTools console output. Press Alt+Shift+C after copying to clean your clipboard.

## Detailed Description
Copy this into the Chrome Web Store description field:

---

Tired of copying console output from your Blazor WebAssembly app and getting pages of useless stack traces?

When you copy from DevTools, you get garbage like:
• $func790 @ 00b5d28a:0x482b4
• Module._mono_wasm_invoke_jsexport @ dotnet.native.js:8
• blazor.webassembly.js:1

When all you wanted was:
• [HttpClientFactory] Retrieved cached client for 'Functions'
• [Dashboard] Orders error: Authentication required

This extension fixes that with one keystroke.

HOW TO USE:
1. Copy from DevTools console (Ctrl+C)
2. Press Alt+Shift+C to clean your clipboard
3. Paste (Ctrl+V) — the garbage is gone!

WHAT IT REMOVES:
✓ Trailing source references (blazor.webassembly.js:1, polyfills.ts:122)
✓ WASM function calls ($func790 @ 00b5d28a:0x482b4)
✓ Mono/WASM internals (Module._mono_wasm_invoke_jsexport)
✓ Blazor framework stack frames (scheduling.ts, invoke-js.ts, marshal-to-cs.ts)
✓ Anonymous function references

WHAT IT KEEPS:
✓ Your actual log messages
✓ Error messages
✓ Timestamps and prefixes

Perfect for Blazor developers who need to share console output in bug reports, Slack messages, or documentation.

Open source: https://github.com/laurence73/blazor-console-cleaner

---

## Category
Developer Tools

## Language
English

## Privacy Policy Justification

### Why clipboardRead permission?
The extension reads your clipboard ONLY when you press Alt+Shift+C or click "Clean Clipboard". It reads the copied console text so it can remove the stack trace garbage.

### Why clipboardWrite permission?
After cleaning the text, the extension writes the cleaned version back to your clipboard so you can paste it.

### Why activeTab + scripting permissions?
The keyboard shortcut (Alt+Shift+C) needs to execute a script in the active tab to access the clipboard API. This only runs when YOU trigger it.

### Data Collection
This extension does NOT collect, store, or transmit any data. All processing happens locally in your browser. No analytics, no tracking, no network requests.

## Screenshots Needed
1. Before/after comparison showing messy console output vs cleaned output
2. The extension popup UI
3. Keyboard shortcut in action

## Suggested Tags
blazor, webassembly, wasm, console, devtools, developer tools, clipboard, stack trace, debugging
