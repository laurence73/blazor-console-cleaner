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

## Privacy Practices Tab - Copy/Paste These:

### Single Purpose Description
Clean Blazor/WASM stack trace garbage from clipboard when copying DevTools console output.

### activeTab Justification
Required to execute the clipboard cleaning script when the user presses the Alt+Shift+C keyboard shortcut. Only activates on user action, never automatically.

### clipboardRead Justification
Required to read console text that the user has copied to their clipboard. The extension reads clipboard content only when the user explicitly triggers cleaning via Alt+Shift+C or the popup button. No automatic clipboard monitoring.

### clipboardWrite Justification
Required to write the cleaned text back to the clipboard after removing stack trace garbage. Only writes when explicitly triggered by the user.

### scripting Justification
Required to execute the clipboard read/write operations in the active tab when the user presses Alt+Shift+C. The Clipboard API requires a page context to function. Script only runs on explicit user action.

### Remote Code Justification
This extension does NOT use any remote code. All JavaScript is bundled locally in the extension package. No external scripts are loaded.

### Data Use Certification
- This extension does NOT collect any user data
- This extension does NOT transmit any data externally
- All processing happens locally in the browser
- No analytics, tracking, or network requests
- Clipboard data is only read when user triggers cleaning and is never stored

## Screenshots Needed
1. Before/after comparison showing messy console output vs cleaned output
2. The extension popup UI
3. Keyboard shortcut in action

## Suggested Tags
blazor, webassembly, wasm, console, devtools, developer tools, clipboard, stack trace, debugging
