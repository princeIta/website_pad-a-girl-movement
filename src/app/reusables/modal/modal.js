export default function modal({ modalId, trigger, onDismiss = () => { }, onOk = () => { } }) {
    const modalTemplate = document.getElementById(modalId)

    const modalBackdrop = modalTemplate.querySelector(".modal__backdrop")
    const modalBody = modalTemplate.querySelector(".modal__body")

    const close = () => {
        modalTemplate.classList.remove("modal--show")
        modalBackdrop.classList.remove("modal__backdrop--show")
        modalBody.classList.remove("modal__body--show")
    }
    const open = () => {
        modalTemplate.classList.add("modal--show")
        modalBackdrop.classList.add("modal__backdrop--show")
        modalBody.classList.add("modal__body--show")
    }
    const remove = () => {
        modalTemplate.remove()
    }
    const getDomElem = () => {
        return modalTemplate
    }

    window.onclick = e => {
        if (e.target == modalBackdrop) {
            close()
        }
    }

    return {
        open,
        close,
        remove,
        getDomElem
    }
}