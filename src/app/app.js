import QuoteComponent from "./animated-quote/animated-quote"
import { quotes, accounts, padPickups } from "./app.model"
import { htmlToElement } from "../utils/html-to-elem"
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
        this._initBankAccountsUi()
        this._initPadPickupsUi()

        const screenWidth = window.innerWidth

        if (+screenWidth < 768) {
            this._initGetPadButton()
        }
    }

    _initGetPadButton() {
        const getpadButton = document.querySelector("#pad-pickup-button")
        getpadButton.onclick = this._handleGetPadButtonClick
    }

    _handleGetPadButtonClick(e) {
        e.preventDefault()
        const getPadModal = modal({ modalId: "pad-pickup-modal-js" })
        getPadModal.open()
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

    _initBankAccountsUi() {
        const accountTemplate = (account, { hideable }) => {
            const className = `class = "account ${hideable ? "account--hideable" : ""}"`

            return `
            <div ${className} >
                <div class="article-inf article-inf--size"> Account Number: ${account.acctNumber}
                </div>
                <div class="article-inf article-inf--size"> Bank: ${account.bankName} </div>
                <div class="article-inf article-inf--size"> Account Name: ${account.name} </div>
            </div >
            `
        }

        const accountsTemplate = `
        <div class="accounts">
            ${accounts.length > 1 ? `
                <div class="arrow" id="accounts-more-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                </div>
            `: ""}
            ${accounts.reduce(
            (html, accountModel, idx) => {
                return html + accountTemplate(accountModel,
                    {
                        hideable: (accounts.length - 1 === idx) ? false : true
                    })
            }, "")}
        </div > `

        this.accountsTemplate = htmlToElement(accountsTemplate)
    }

    _initQuotes() {
        const quoteComponent = new QuoteComponent(quotes)
        const quotesTemplate = htmlToElement('<section class="quotes"></section>')
        this.quotesTemplate = quotesTemplate
        this.quoteComponent = quoteComponent
    }

    _initAppMenu() {
        const burgerBtn = document.querySelector("#burger-btn-js")
        burgerBtn.onclick = this._onBurgerBtnClick
    }

    _onBurgerBtnClick(e, ) {
        this.classList.toggle("burger-btn--active")
        document.querySelector("#fly-out-js").classList.toggle("fly-out--hidden")
    }

    mount() {
        this.quotesTemplate.appendChild(this.quoteComponent.mount())
        this.appTemplate.appendChild(this.quotesTemplate)
        document.querySelector("#accounts-js").appendChild(this.accountsTemplate)
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