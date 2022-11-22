/**
 * Minified by jsDelivr using Terser v5.3.0.
 * Original file: /npm/parse-unit@1.0.1/index.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
 function ParseUnit(r,t){t||(t=[0,""]),r=String(r);var a=parseFloat(r,10);return t[0]=a,t[1]=r.match(/[\d.\-\+]*\s*(.*)/)[1]||"",t};
 //# sourceMappingURL=/sm/ab58abf999b9e91c2b136c8e930863981e24722a3db730d329e72b2bb6ee3e3b.map


/**
 * Minified by jsDelivr using Terser v3.14.1.
 * Original file: /npm/to-px@1.1.0/browser.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
 "use strict";var parseUnit=ParseUnit
 
 export default toPX;var PIXELS_PER_INCH=getSizeBrutal("in",document.body);function getPropertyInPX(e,t){var r=parseUnit(getComputedStyle(e).getPropertyValue(t));return r[0]*toPX(r[1],e)}function getSizeBrutal(e,t){var r=document.createElement("div");r.style.height="128"+e,t.appendChild(r);var n=getPropertyInPX(r,"height")/128;return t.removeChild(r),n}function toPX(e,t){if(!e)return null;switch(t=t||document.body,e=(e+""||"px").trim().toLowerCase(),t!==window&&t!==document||(t=document.body),e){case"%":return t.clientHeight/100;case"ch":case"ex":return getSizeBrutal(e,t);case"em":return getPropertyInPX(t,"font-size");case"rem":return getPropertyInPX(document.body,"font-size");case"vw":return window.innerWidth/100;case"vh":return window.innerHeight/100;case"vmin":return Math.min(window.innerWidth,window.innerHeight)/100;case"vmax":return Math.max(window.innerWidth,window.innerHeight)/100;case"in":return PIXELS_PER_INCH;case"cm":return PIXELS_PER_INCH/2.54;case"mm":return PIXELS_PER_INCH/25.4;case"pt":return PIXELS_PER_INCH/72;case"pc":return PIXELS_PER_INCH/6;case"px":return 1}var r=parseUnit(e);if(!isNaN(r[0])&&r[1]){var n=toPX(r[1],t);return"number"==typeof n?r[0]*n:null}return null}
 //# sourceMappingURL=/sm/41ed9e4ce7d980d24e189fc35c968eb05a048ffacb33747dd27ad02b316883cc.map