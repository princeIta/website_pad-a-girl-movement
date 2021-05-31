export default function isDomElement(elem) {
    return elem instanceof Element || elem instanceof HTMLDocument || false
}