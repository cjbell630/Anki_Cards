/**
 * Checks whether a character is a glottal stop.
 *
 * @param {string} char the character to check
 * @returns {boolean} true if the character is a glottal stop, false if not
 */
function isGlottalStop(char) {
    return "っッ".includes(char);
}

/**
 * Checks whether a character is a combining (small) form character.
 *
 * @param {string} char the character to check
 * @returns {boolean} true if the character is a combining form character, false if not
 */
function isCombiningForm(char) {
    return "ぁぃぅぇぉゃゅょァィゥェォャュョ".includes(char);
}

/* REPLACE WITH YOUR FIELD NAMES */
let word = "ジャックゃ"; // the word in kana
const pattern = "LH"; // the pitch accent pattern of the word (using L, H, l, and h)

/* SETTINGS */
const primaryColor = 'white'; // the color that goes over the background
const secondaryColor = '#303030'; // the color that goes over the primary color
const circScale = 10;


/* CODE */
const c = document.getElementById("pitch-accent");
const ctx = c.getContext("2d");

//let inc = c.width / pattern.length;
//let workingHorizSpace = c.width / ((1 / (5 * pattern.length)) + 1); // working space padding for circle rad

let inc = c.width / (pattern.length - 1 + (2 / circScale)); //calculated in samsung notes
let circRad = inc / circScale;
let curr = circRad;

ctx.beginPath();
ctx.moveTo(curr, pattern[0] === 'L' ? curr + inc : curr);
ctx.fillStyle = primaryColor;
ctx.strokeStyle = primaryColor;
ctx.lineWidth = 2;

for (let c of pattern) {
    let y = (c.toUpperCase() === 'L' ? (circRad) + inc : circRad);

    ctx.lineTo(curr, y);

    if (c.toLowerCase() === c) { // is lowercase
        ctx.stroke(); // finish old path
        ctx.closePath(); // close old path

        ctx.globalCompositeOperation = 'destination-out'; // set to erase mode

        ctx.beginPath(); // start new path
        ctx.moveTo(curr + circRad, y);
        ctx.arc(curr, y, circRad, 0, 2 * Math.PI, false); // draw clear circle
        ctx.moveTo(curr, y);
        ctx.fill(); // fill clear circle with clear
        ctx.closePath(); // close path

        ctx.globalCompositeOperation = 'source-over'; // set to normal mode

        ctx.beginPath(); //start new path
    }

    ctx.moveTo(curr + circRad, y);
    ctx.arc(curr, y, circRad, 0, 2 * Math.PI, false);
    ctx.moveTo(curr, y);

    if (c.toUpperCase() === c) { // is uppercase
        ctx.fill(); // only fill if uppercase, otherwise will just color over the erased part
    }


    //TODO lines are drawn through text bc of order
    let stringToPrint = "";

    if (0 < word.length) { // if there's at least 1 char to check
        let glottalStop = isGlottalStop(word[0]);
        stringToPrint = word[0] + ( // add the first letter
            // if there's another char to check and
            // either the first letter is a glottal stop or the second is a combining form
            1 < word.length && (glottalStop || isCombiningForm(word[1])) ?
                word[1] + ( // then add the second letter and
                    // if there's another letter to check and the first letter is a glottal stop and
                    // the third letter is a glottal stop
                    2 < word.length && glottalStop && isCombiningForm(word[2]) ?
                        // then add the third letter
                        word[2] : ""
                ) : ""
        );
    }

    //TODO change the color before drawing the word if it's a lowercase letter

    ctx.stroke(); // finish old path
    ctx.closePath(); // close old path

    // empty circles should never have text in them bc they're release marks for particles
    ctx.fillStyle = secondaryColor;
    ctx.strokeStyle = secondaryColor;

    let txtHeight = circRad * Math.sqrt(2) / stringToPrint.length; //TODO make more efficient
    // Note: from square inscribed in triangle, corner to center = rad of circle,
    // use as hypot for right triangle with b and h = side length/2, solve for side length using pythagorean theorem

    ctx.font = txtHeight + "px MS Mincho";
    ctx.fillText(stringToPrint, curr - stringToPrint.length * (txtHeight / 2), y + (txtHeight / 4));

    ctx.fillStyle = primaryColor;
    ctx.strokeStyle = primaryColor;

    ctx.beginPath(); //start new path
    ctx.moveTo(curr, y);

    word = word.substr(stringToPrint.length);
    curr += inc;
}
ctx.stroke();