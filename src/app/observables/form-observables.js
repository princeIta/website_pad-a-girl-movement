import isDomElement from "../../utils/is-dom-elem";

export class FormSubmitObservable {
    constructor(form) {
        this.subscriptions = []
        let domEl

        if (isDomElement(form)) {
            domEl = form
        }
        else {
            domEl = document.querySelector(form)
            if (!domEl) {
                throw new Error("please pass in a valid dom element or a selector to a dom element")
            }
        }

        const that = this
        domEl.onsubmit = function (e) {
            e.preventDefault()
            that.handleFormSubmit.call(this, that, e)
        }
    }

    handleFormSubmit(o, e) {
        o.subscriptions.forEach(cb => cb.call(this, e))
    }

    subscribe(callback) {
        this.subscriptions.push(callback)

        return () => {
            this.subscriptions = this.subscriptions.filter(cb => !(cb === callback))
        }
    }
}