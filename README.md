# anki-cards

This is a collection of code I use in my Anki cards. So far, they're all focused on learning Japanese. I figured I'd
share it in case it helps anyone else.

# Pitch Accent Drawer #

[Click here for  a demo][0]

This card draws a pitch accent pattern, including the kana in the drawing. To use it, go to the card edit screen. Then,
put this line where you want the drawing to go:

```html
<canvas id="pitch-accent" height="2000" width="2000" style="width: 100%; height: 100%"></canvas>
```

Then, at the end (or anywhere as long as it's after the previous line), put the following:

```html
<script>
    /* REPLACE WITH YOUR FIELD NAMES */
    let word = "{{My Field Name}}"; // the word in kana
    const pattern = "{{My Field Name}}"; // the pitch accent pattern of the word (using L, H, l, and h)

    /* SETTINGS */
    const primaryColor = "white", // the color that goes over the background
            secondaryColor = "#303030", // the color that goes over the primary color
            circScale = 5; // the bigger this number is, the smaller the circles are, and vice versa

    
    /* CODE */
    function g(t){return"っッ".includes(t)}function f(t){return"ぁぃぅぇぉゃゅょァィゥェォャュョ".includes(t)}const c=document.getElementById("pitch-accent"),ctx=c.getContext("2d");let inc=c.width/(pattern.length-1+2/circScale),circRad=inc/circScale,curr=circRad;ctx.beginPath(),ctx.moveTo(curr,"L"===pattern[0]?curr+inc:curr),ctx.fillStyle=primaryColor,ctx.strokeStyle=primaryColor,ctx.lineWidth=2;for(let t of pattern){let c="L"===t.toUpperCase()?circRad+inc:circRad;ctx.lineTo(curr,c),t.toLowerCase()===t&&(ctx.stroke(),ctx.closePath(),ctx.globalCompositeOperation="destination-out",ctx.beginPath(),ctx.moveTo(curr+circRad,c),ctx.arc(curr,c,circRad,0,2*Math.PI,!1),ctx.moveTo(curr,c),ctx.fill(),ctx.closePath(),ctx.globalCompositeOperation="source-over",ctx.beginPath()),ctx.moveTo(curr+circRad,c),ctx.arc(curr,c,circRad,0,2*Math.PI,!1),ctx.moveTo(curr,c),t.toUpperCase()===t&&ctx.fill();let r="";if(0<word.length){let t=g(word[0]);r=word[0]+(1<word.length&&(t||f(word[1]))?word[1]+(2<word.length&&t&&f(word[2])?word[2]:""):"")}ctx.stroke(),ctx.closePath(),ctx.fillStyle=secondaryColor,ctx.strokeStyle=secondaryColor;let e=circRad*Math.sqrt(2)/r.length;ctx.font=e+"px MS Mincho",ctx.fillText(r,curr-r.length*(e/2),c+e/4),ctx.fillStyle=primaryColor,ctx.strokeStyle=primaryColor,ctx.beginPath(),ctx.moveTo(curr,c),word=word.substr(r.length),curr+=inc}ctx.stroke();
</script>
```

In order for this code to work for your cards, you'll have to change a few things with what you just copied and pasted.
Here's my card as an example:

![my card example][1]

In my card, the field that contains the word in kana is called `Kana`, and the one with the pitch accent pattern is
called `Pitch Accent Pattern`. So, I should replace this:

```js
let word = "{{My Field Name}}"; // the word in kana
const pattern = "{{My Field Name}}"; // the pitch accent pattern of the word (using L, H, l, and h)
```

With this:

```js
let word = "{{Kana}}"; // the word in kana
const pattern = "{{Pitch Accent Pattern}}"; // the pitch accent pattern of the word (using L, H, l, and h)
```

Do this for whatever your fields are named. Now, it should display the pattern on any card that has one! Hope this helps
you!

### Pitch Accent Field Formatting ###

You can use 4 characters in the pitch accent field:

* `L`: a low-pitched mora
* `H`: a high-pitched mora
* `l` (lowercase L): a low-pitched mora that's a particle
* `h`: a high-pitched mora that's a particle

The code looks through your provided word and tries to grab one mora for each letter you provide in the pattern. If you
don't match up the number of moras with the number of letters, it'll just display what it can. If you ever notice it not
grouping moras correctly, let me know!

### Extra Customization ###

* If you want to stop the giant space from appearing on cards without pitch accent patterns, you can put this:

    ```markdown
    {{#Pitch Accent Pattern}}
        /*Paste Code Here*/
    {{/Pitch Accent Pattern}}
    ```
  around each section you pasted in earlier (so twice in total). Make sure you use the same name you used before for the
  pitch accent pattern field. Also, make sure the `#` and `/` don't get erased.
* You can use the `SETTINGS` section to change a few things:
    * `Colors` - If you're using standard, dark mode Anki, the default colors should be fine, but you can change them if
      you'd like. Just replace the names with the color you want instead.
        * The primary color is the color that goes directly over the background color.
        * The secondary color is the color that goes over the primary color. In my opinion, it looks best being the same
          as the background.
    * `Scaling` - The text in the bubbles scales to the bubble size itself, but depending on your device, you may want
      to change that some. The value of `circScale` changes this, but it's inverted. So increasing makes the circles
      smaller, and vice versa. I'd recommend using Anki's preview feature to play around with it until you find a size
      you like.

[![wakatime](https://wakatime.com/badge/github/cjbell630/anki-cards.svg)](https://wakatime.com/badge/github/cjbell630/anki-cards)

[0]: https://cjbell630.github.io/anki-cards/demo/pitch-accent-card.html

[1]: images/anki-card-example.png
