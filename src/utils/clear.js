export default function clear(container) {
    if (container instanceof Element || container instanceof HTMLDocument) {
        container.innerHTML = ""
    }
}