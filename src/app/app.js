import QuoteComponent from "./animated-quote/animated-quote"
import { quotes, accountStatement, padPickups, about } from "./app.model"
import { htmlToElement } from "../utils/html-to-elem"
import Drawer from "./drawer/drawer"
import modal from "./modal/modal"

const padPickupContainerTemplate = (pickup, { className }) => `
<div ${className} >
    <div class="article-inf article-inf--size"> Location: ${pickup.location}
    </div>
    <div class="article-inf article-inf--size"> Contact Person: ${pickup.contactPerson} </div>
    <div class="article-inf article-inf--size"> Contact: ${pickup.contact} </div>
</div >
`

export default class App {
    breakpoints = {
        mobile: 480,
        tab: 768,
        pc: 1024
    }

    static display() {
        return new App().mount()
    }

    constructor() {
        this._init()
    }

    _init() {
        const appTemplate = document.querySelector("#app-body-js")
        this.appTemplate = appTemplate
        this._initAppMenu()
        this._initQuotes()
        this._initAccountStatementUI()
        this._initPadPickupsUi()
        this._initAboutModal()
        this._initDrawer()

        const screenWidth = window.innerWidth

        if (+screenWidth < 768) {
            this._initGetPadButton()
        }
    }

    _initAboutModal() {
        document.querySelector("#about-button-js").onclick = (e) => {
            e.preventDefault()
            modal({ modalId: "about-modal-js" }).open()
        }

        const eachSectionTemplate = (title, text) => `
            <article>
                <h3 style="width: fit-content; text-decoration: underline">${title}</h3>
                <div>
                    ${text}
                </div>
            </article>
        `

        const aboutBody = `<div>
            ${about.reduce((html, data) => {
            return html + eachSectionTemplate(data.title, data.value)
        }, "")}
        </div>`

        document.querySelectorAll(".about-text").forEach((elem) => {
            elem.appendChild(htmlToElement(aboutBody))
        })

        document.querySelectorAll(".about-close-button-js").forEach(elem => {
            elem.onclick = (e) => {
                e.preventDefault();
                modal({ modalId: "about-modal-js" }).close()
            }
        })
    }

    _initGetPadButton() {
        const getpadButton = document.querySelector("#pad-pickup-button")
        getpadButton.onclick = handleGetPadButtonClick
    }

    _initPadPickupsUi() {
        const padPickupTemplate = (pickup, { hideable }) => {
            const className = `class = "pad-pickup ${hideable ? "pad-pickup--hideable" : ""}"`

            return `
                ${padPickupContainerTemplate(pickup, { className })}
            `
        }

        const padPickupsTemplate = `
        <div class="pad-pickups">
            ${padPickups.length > 1 ? `
                <div class="arrow" id="get-pad-more-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            `: ""}
            ${padPickups.reduce(
            (html, padPickupModel, idx) => {
                return html + padPickupTemplate(padPickupModel,
                    {
                        hideable: (padPickups.length - 1 === idx) ? false : true
                    })
            }, "")}
        </div > `

        this.padPickupsTemplate = htmlToElement(padPickupsTemplate)
    }

    _initAccountStatementUI() {
        const accountStatementArray = [accountStatement]
        const statementTemplate = (statement, { hideable }) => {
            const className = `class = "account ${hideable ? "account--hideable" : ""}"`

            return `
            <div ${className} >
                ${statement.length ? statement.reduce((html, data) => {
                return html + `
                    <div class="article-inf article-inf--size"> 
                        <span class="article__field-name"> 
                            ${data.field}: 
                        </span> 
                        <span class="article__field-sep"> 
                            - 
                        </span> 
                        <span class="article__field-val">
                            ${data.value}
                        </span>
                    </div>`
            }, "") : ""}
            </div >
            `
        }

        const accountStatementTemplate = `
        <div class="accounts">
            ${accountStatementArray.length > 1 ? `
                <div class="arrow" id="accounts-more-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                </div>
            `: ""}
            ${accountStatementArray.reduce(
            (html, accountStatementModel, idx) => {
                return html + statementTemplate(accountStatementModel,
                    {
                        hideable: (accountStatementArray.length - 1 === idx) ? false : true
                    })
            }, "")}
        </div > `

        this.accountStatementTemplate = htmlToElement(accountStatementTemplate)
    }

    _initQuotes() {
        const quoteComponent = new QuoteComponent(quotes)
        const quotesTemplate = htmlToElement('<section class="quotes"></section>')
        this.quotesTemplate = quotesTemplate
        this.quoteComponent = quoteComponent
    }

    _initAppMenu() {
        const burgerBtn = document.querySelector("#burger-btn-js")
        burgerBtn.onclick = onBurgerBtnClick
    }

    _initDrawer() {
        const drawer = new Drawer({ id: "feedback-drawer-js" })
        document.querySelectorAll(".message-bubble-button-js")
            .forEach(each => (each.onclick = handleMessageBubbleButtonClick.bind(this, drawer)))
    }

    mount() {
        this.quotesTemplate.appendChild(this.quoteComponent.mount())
        this.appTemplate.appendChild(this.quotesTemplate)
        document.querySelector("#accounts-js").appendChild(this.accountStatementTemplate.cloneNode(true))
        document.querySelector(".fly-out__article-js").appendChild(this.accountStatementTemplate.cloneNode(true))
        document.querySelector("#padpickups-js").appendChild(this.padPickupsTemplate)
        this._mountPadPickupBody()
        this.onMount()
    }

    _mountPadPickupBody() {
        const padPickupsViewHTML = padPickups.reduce((html, padPickup) => {
            return html + padPickupContainerTemplate(padPickup, { className: 'class = "pad-pickup"' })
        }, "")

        const padPickupsViewElem = htmlToElement(` 
        <div class="pad-pickups">
            ${padPickupsViewHTML}
        </div>`)

        document
            .querySelector("#pad-pickup-modal-js .modal__content")
            .appendChild(padPickupsViewElem)
    }

    onMount() {
        const elemHeight = this.quotesTemplate.clientHeight
        const elemWidth = this.quotesTemplate.clientWidth
        this.quoteComponent.setDimensions(
            { parentWitdth: elemWidth, parentHeight: elemHeight }
        )
        this.quoteComponent.onMount()
    }
}

function onBurgerBtnClick(e) {
    this.classList.toggle("burger-btn--active")
    document.querySelector("#fly-out-js").classList.toggle("fly-out--hidden")
}

function handleGetPadButtonClick(e) {
    e.preventDefault()
    const getPadModal = modal({ modalId: "pad-pickup-modal-js" })
    getPadModal.open()
}

function handleMessageBubbleButtonClick(drawer, e) {
    e.preventDefault()
    drawer.show()
    closeFlyoutMenuIfOpen()
}

function closeFlyoutMenuIfOpen() {
    const activeMenubtn = document.querySelector(".burger-btn--active")

    if (activeMenubtn) {
        activeMenubtn.classList.toggle("burger-btn--active")
        document.querySelector("#fly-out-js").classList.toggle("fly-out--hidden")
    }
}