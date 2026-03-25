# Blazor Console Cleaner

A Chrome extension that removes Blazor/WASM stack trace garbage when copying from the browser DevTools console.

## The Problem

When you copy console output from a Blazor WebAssembly app, you get useless stack traces like:

```
[HttpClientFactory] Retrieved cached client for 'Functions'    blazor.webassembly.js:1
Fc @ scheduling.ts:66
$func790 @ 00b5d28a:0x482b4
$func288 @ 00b5d28a:0x1f336
Module._mono_wasm_invoke_jsexport @ dotnet.native.l1ds2rhypd.js:8
...
```

When all you wanted was:

```
[HttpClientFactory] Retrieved cached client for 'Functions'
```

## Installation

1. Clone or download this repo
2. Open `chrome://extensions` in Chrome
3. Enable "Developer mode" (top right toggle)
4. Click "Load unpacked"
5. Select the `console-cleaner` folder
6. (Optional) Open `create-icons.html` in Chrome and download the 3 icon files to the same folder

## Usage

1. Select and copy text from DevTools console (**Ctrl+C**)
2. Press **Alt+Shift+C** to clean the clipboard
3. Paste (**Ctrl+V**) - the garbage is gone

Or click the extension icon and use the "Clean Clipboard" button.

## What It Removes

- Trailing source references (`blazor.webassembly.js:1`, `polyfills.ts:122`, etc.)
- WASM function calls (`$func790 @ 00b5d28a:0x482b4`)
- Mono/WASM internals (`Module._mono_wasm_invoke_jsexport`, `$mono_wasm_*`)
- Blazor framework stack frames (`scheduling.ts`, `invoke-js.ts`, `marshal-to-cs.ts`, etc.)
- Anonymous function references

## What It Keeps

Your actual log messages:

```
[HttpClientFactory] Retrieved cached client for 'Functions'
[Dashboard] Orders error: Authentication required. Please log in.
[CONSENSUS-TIMER] ConsensusNodesAvailabilityCheckTimerOnElapsedCore FIRED at 13:51:50
```

## License

MIT
