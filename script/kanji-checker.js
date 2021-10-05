const LEARNED_KANJI = "着千葉九魚";
const CLASS_NAME = "kanji-check";

const KANJI_REGEX = /[一-龯]/gm;

function checkKanji(text) {

    const matches = text.matchAll(KANJI_REGEX);

    for (const match of matches) {
        if (!LEARNED_KANJI.includes(match[0])) {
            return false;
        }
    }

    return true;
}

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