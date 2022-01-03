import React, { useEffect, useState } from "react";

// ض ص ث ق ف غ ع ه خ ح ج د ش س ي ب ل ا ت ن م ك ط ئ ء ؤ ر لا ى ة و ز ظ 
function ehandle(ll){
    if (ll === null || ll === ' ') return "إ"
    else  return "ِ"
}

function ahandle(ll){
    if (ll === null || ll === ' ') return "أ"
    else  return 'ا'
}

export default function App(){
    // TODO e is first it makes إ
    const vowle = ['a','e','i','o','u']
    const ftoArmap = {
        // fat7a
        'a': ahandle,
        'A': "َ",
        'b': 'ب',
        'c': 'ك',
        'd': 'د',
        'D': 'ض',
        // kasra
        'e': ehandle,
        'f': 'ف',
        'g': 'ج',
        'h': 'ه',
        'H': 'ة',
        'i': 'ي',
        'j': 'چ',
        'k': 'ك',
        'l': 'ل',
        'm': 'م',
        'n': 'ن',
        // DAMMA
        'o': 'ُ',
        'p': 'ب',
        'q': 'ق',
        'r': 'ر',
        's': 'س',
        'S': 'ص',
        't': 'ت',
        'T': 'ط',
        'u': 'و',
        'v': 'ڤ',
        'w': 'و',
        'x': 'ْ',
        'y': 'ي',
        'z': 'ز',
        'Z': 'ظ',
        '3': 'ع',
        '8': 'غ',
        '4': 'ش',
        '2': 'ء',
        '5': 'خ',
        '7': 'ح',
    }
    
    const [text, setText] = useState('')
    // Arabictext is computable so it shouldn't be a state but i can't handle the setText async right now
    const [arabictext, setArabictext] = useState('')
    const handleTextChange = (e)=>{
        setText(e.target.value)
        setArabictext(translate())
    }
    useEffect(()=>{
        // arabicText = translate()
        setArabictext(translate())
    })

    const translate = ()=>{
        let orignialWordFlag = false
        let lastLetter = null;
        let transArr = text.split('').map((letter) =>{
            let t;
            if (letter === '(' && !orignialWordFlag) {
                orignialWordFlag = true
                return ''
            }
            if (letter ===")" && orignialWordFlag){
                orignialWordFlag = false
                return ''
            }
            if (!orignialWordFlag){
                if (letter === lastLetter && !(letter in vowle)) t = 'ّ'           // shadda
                else if (letter == lastLetter && letter in vowle) {
                    t = ""}
                else if ( letter in ftoArmap) {
                    if (typeof ftoArmap[letter] === 'string')  t = ftoArmap[letter]
                    else if (typeof ftoArmap[letter] === 'function') t = ftoArmap[letter](lastLetter)
                }
                else t = letter

                lastLetter = letter
                return t
            }
            else return letter
        })
        console.log('tranarr', transArr)
        let tranlatedText = transArr.join('')
        console.log(tranlatedText)
        return tranlatedText
    }

    return(
        <>
        <Rules />
        <textarea onChange={handleTextChange} cols="30" rows="10" value={text}></textarea>
        <p> {arabictext}</p>
        </>
    )
}

function Rules(){
    return(
        <div>
            a, e, o = fat7a, kasra, damma <br></br>
            <ul>
                <li>3 : ع</li>
                <li>8 : غ</li>
                <li>4 : ش</li>
                <li>2 : ء</li>
                <li>5 : خ</li>
                <li>7 : ح</li>
            </ul>
            <p>
        'A': 'ا',
        'd': 'ذ',
        'h': 'ه',
        'H': 'ة',
        'i': 'ي',
        'j': 'چ',
        'q': 'ق',
        'capital S': 'ص',
        'capital T': 'ط',
        'u': 'و',
        'v': 'ڤ',
        'w': 'و',
        'y': 'ي',
        'z': 'ز',
        'Z': 'ظ',</p>

        </div>
    )
}