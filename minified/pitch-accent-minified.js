/* REPLACE WITH YOUR FIELD NAMES */
let word = "{{My Field Name}}"; // the word in kana
const pattern = "{{My Field Name}}"; // the pitch accent pattern of the word (using L, H, l, and h)

/* SETTINGS */
const primaryColor = "white", // the color that goes over the background
    secondaryColor = "#303030", // the color that goes over the primary color
    circScale = 10; // the bigger this number is, the smaller the circles are, and vice versa


function g(t){return"っッ".includes(t)}function f(t){return"ぁぃぅぇぉゃゅょァィゥェォャュョ".includes(t)}const c=document.getElementById("pitch-accent"),ctx=c.getContext("2d");let inc=c.width/(pattern.length-1+2/circScale),circRad=inc/circScale,curr=circRad;ctx.beginPath(),ctx.moveTo(curr,"L"===pattern[0]?curr+inc:curr),ctx.fillStyle=primaryColor,ctx.strokeStyle=primaryColor,ctx.lineWidth=2;for(let t of pattern){let c="L"===t.toUpperCase()?circRad+inc:circRad;ctx.lineTo(curr,c),t.toLowerCase()===t&&(ctx.stroke(),ctx.closePath(),ctx.globalCompositeOperation="destination-out",ctx.beginPath(),ctx.moveTo(curr+circRad,c),ctx.arc(curr,c,circRad,0,2*Math.PI,!1),ctx.moveTo(curr,c),ctx.fill(),ctx.closePath(),ctx.globalCompositeOperation="source-over",ctx.beginPath()),ctx.moveTo(curr+circRad,c),ctx.arc(curr,c,circRad,0,2*Math.PI,!1),ctx.moveTo(curr,c),t.toUpperCase()===t&&ctx.fill();let r="";if(0<word.length){let t=g(word[0]);r=word[0]+(1<word.length&&(t||f(word[1]))?word[1]+(2<word.length&&t&&f(word[2])?word[2]:""):"")}ctx.stroke(),ctx.closePath(),ctx.fillStyle=secondaryColor,ctx.strokeStyle=secondaryColor;let e=circRad*Math.sqrt(2)/r.length;ctx.font=e+"px MS Mincho",ctx.fillText(r,curr-r.length*(e/2),c+e/4),ctx.fillStyle=primaryColor,ctx.strokeStyle=primaryColor,ctx.beginPath(),ctx.moveTo(curr,c),word=word.substr(r.length),curr+=inc}ctx.stroke();