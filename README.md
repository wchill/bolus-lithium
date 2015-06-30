# bolus-lithium
Port of the Bolus theme for Alkaline to Lithium for iOS. Color and standard versions available.

Original source is in `.original.js` files.

Battery theme can be [previewed here.](http://wchill.github.io/bolus-lithium/preview.html)

## Compilation

Remove the function signature and brackets, then test using https://supermamon.github.io/Lithium/ThemeMaker.html

Use http://closure-compiler.appspot.com/home (with simple settings) to minify. Make sure to:

* Remove `function renderBattery` from the beginning of the script. The first character of the script should be `(` (left parenthesis).
* Remove the semicolon `;` from the end of the script. The last character of the script should be `}` (right curly brace).

## Installation
Copy `Bolus.js` and/or `Bolus Color.js` to the directory `/Library/Lithium/` on your iOS device.

Activate the desired theme in Lithium's settings.
