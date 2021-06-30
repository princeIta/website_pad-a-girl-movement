import { htmlToElement } from "../../utils/html-to-elem";

export default class Drawer {
    constructor({ className, id }) {
        let drawer
        if (className) {
            drawer = document.querySelector(`.${className}`);
        } else {
            if (id) {
                drawer = document.querySelector(`#${id}`)
            } else {
                throw new Error("Please pass in the class or id name of the drawer")
            }
        }

        if (!drawer) {
            throw new Error("wrong class or id name")
        }

        this.drawer = drawer
        this._init()
    }


    _init() {
        const drawerBody = this.drawer.querySelector(".drawer__body")
        const closeButton = drawerCloseButton()
        closeButton.onclick = () => this.hide()
        drawerBody.appendChild(closeButton)

        const drawerBackdrop = this.drawer.querySelector(".drawer__backdrop")

        window.onclick = e => {
            if (e.target == drawerBackdrop) {
                this.hide()
            }
        }

    }

    show() {
        this.drawer.classList.add("show")
    }

    hide() {
        this.drawer.classList.remove("show")
    }
}

function drawerCloseButton() {
    return htmlToElement(`
    <div>
        <style>
            .drawer__close-button{
                position: absolute;
                right: 10px;
                top: 15px;
                text-transform: capitalize;
                border: 0;
                outline: none;
                color: #333333;
                font-size: 20px;
                background: transparent;
                cursor: pointer;
            }
        </style>
        <button  class="drawer__close-button">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
            width="22" height="22"
            viewBox="0 0 172 172"
            style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#95a5a6"><path d="M33.73372,23.59961l-10.13411,10.13411l52.26628,52.26628l-52.26628,52.26628l10.13411,10.13411l52.26628,-52.26628l52.26628,52.26628l10.13411,-10.13411l-52.26628,-52.26628l52.26628,-52.26628l-10.13411,-10.13411l-52.26628,52.26628z"></path></g></g></svg>
        </button>
    </div>`)
}