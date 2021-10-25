# Kanji Checker [SECTION INCOMPLETE] #

[Click here for  a demo][0]

This card displays a word in kanji only if every kanji in the word is in a list of known kanji.

Here's how to use it:

1. Download the latest version of [_kanji-checker.min.js][3] [TODO: change link to release version]
2. Open it in a text editor (such as Notepad) and in the first line:
    ```js
    const LEARNED_KANJI = "REPLACE ME";
    ```
   Replace `REPLACE ME` with all of the kanji you know. The files in [../../res/kanji_lists][4] might help!
3. Put that file in your Anki media folder. ([see here for how to find it][5])
4. To be continued [TODO]

[comment]: <> (@formatter:off)
```html
<script>if("undefined"==typeof checkElements){let e=document.createElement("script");e.src="_kanji-checker.js",e.async=!1,document.head.appendChild(e)}else checkElements();</script>
```
[comment]: <> (@formatter:on)

[0]: https://cjbell630.github.io/anki-cards/cards/kanji-checker

[3]: _kanji-checker.min.js

[4]: ../../res/kanji_lists

[5]: https://docs.ankiweb.net/files.html#file-locations