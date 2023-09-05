import html2vdom from "html-to-vdom";
import pako from "pako";
import vnode from "virtual-dom/vnode/vnode";
import vtext from "virtual-dom/vnode/vtext";
import './style.css';
import html from "./temp";

const convertHTML = html2vdom({
  VNode: vnode,
  VText: vtext
});
console.time('vdom');
const vtree = convertHTML(html);
const vtreeStr = JSON.stringify(vtree);
const compressedData = pako.gzip(vtreeStr, { to: 'string' });
console.log(compressedData);
// console.log(vtree);
// vtree.forEach(element => {
//   const el = createElement(element);
//   document.body.appendChild(el);
// });

console.timeEnd('vdom');
// console.log(createElement);

// setupCounter(document.querySelector('#counter'))