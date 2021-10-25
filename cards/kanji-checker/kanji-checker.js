const LEARNED_KANJI = "着千葉九魚";
const CLASS_NAME = "kanji-check";

const KANJI_REGEX = /[一-龯]/gm;

/**
 * Checks whether or not the provided text has unknown kanji in it.
 *
 * @param text {string} the text to check
 * @returns {boolean} true if all the kanji in the text have been learned, false if not
 */
function checkKanji(text) {
    const matches = text.matchAll(KANJI_REGEX);

    for (const match of matches) {
        if (!LEARNED_KANJI.includes(match[0])) { // if the current kanji is not in the list of learned kanji
            return false;
        }
    }

    return true;
}

/**
 * Checks all elements with class `CLASS_NAME` to see if their kanji are known.
 * Replaces the `innerHTML` of the elements with the kana if there are non-learned kanji, and the kanji if all the kanji
 * are learned.
 *
 * HTML element data:
 * `data-kanji` - the kanji of the word
 * `data-kana` - the kana of the word
 */
function checkElements() {
    [...document.getElementsByClassName(CLASS_NAME)].forEach(elem => {
        elem.innerHTML = (
            elem.dataset.kanji !== "" &&
            checkKanji(elem.dataset.kanji) ? elem.dataset.kanji :
                elem.dataset.kana
        );
    });
}

checkElements();