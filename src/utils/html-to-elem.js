export function htmlToElement(html) {
    let temp = document.createElement("template")
    html = html.trim()
    temp.innerHTML = html
    return temp.content.firstElementChild
}

export function htmlToElements(html) {
    html = html.trim()

    let temp = document.createElement("template")
    temp.innerHTML = html

    const fragment = new DocumentFragment()
    fragment.append(temp.content.childNodes)

    return fragment
}