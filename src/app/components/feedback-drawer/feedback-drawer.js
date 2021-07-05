import loader from "../../reusables/loader/loader.template"
import { FormSubmitObservable } from "../../observables/form-observables"
import CommentBox from "../../reusables/comment-box/comment-box"

export default class FeedbackDrawer {
    static display(DB) {
        return new FeedbackDrawer(DB)
    }

    constructor(DB) {
        this.DB = DB
        const that = this
        const feedbackForm = document.querySelector(".feedback-form-js")
        const feedbackScrollBox = document.querySelector(".feedback-scroll-box-js")
        this.feedbackScrollBox = feedbackScrollBox
        this.feedbackForm = feedbackForm
        this.formSubmitObservable = new FormSubmitObservable(feedbackForm)
        this.unsubmitObserverRef = this.formSubmitObservable
            .subscribe(
                function (e) {
                    e.preventDefault()
                    const isInvalidForm = that.validateFeedbackForm.call(this)

                    if (!isInvalidForm) {
                        const unsetSubmitLoading = that.setSubmitLoading.call(this)
                        that.handleSubmitFeedbackForm.call(this, that, e)
                            .then(() => {
                                unsetSubmitLoading();
                                this.reset()
                            })
                            .catch(() => unsetSubmitLoading())
                    }
                }
            )

        this.fetchData()

        feedbackScrollBox.addEventListener("scroll", (e) => {
            const top = feedbackScrollBox.scrollTop
            if (top === 0) {
                if (this.next) {
                    this.next().then(result => {
                        if (result) {
                            result.forEach(doc => this.display(doc.data()));
                        }
                    })
                }
            }
        })
    }

    setSubmitLoading() {
        const buttonContent = this.submit.innerHTML
        this.submit.innerHTML = loader({ size: "14px" })
        this.submit.disabled = true

        return () => {
            this.submit.innerHTML = buttonContent
            this.submit.disabled = false
        }
    }

    fetchData() {
        const feedbackScrollBox = this.feedbackScrollBox
        const data = this.DB.get(
            "testimonials"
        )

        data.first().then(result => {
            if (result) {
                result.forEach(doc => this.display(doc.data()));
                this.scrollToBottom()
            }
        })

        this.next = data.next
    }

    scrollToBottom(){
        const feedbackScrollBox = this.feedbackScrollBox
        feedbackScrollBox.scrollTo(0, feedbackScrollBox.scrollHeight);
    }

    generateCommentDOM(change) {
        const data = change
        const commentBox = new CommentBox(
            data.userName,
            data.feedback,
            data.createdAt?.toDate
                ? data.createdAt.toDate()
                : data.createdAt
        )
        const commentBoxDOM = commentBox.toDOMElement()
        return commentBoxDOM
    }

    display(change) {
        const domElement = this.generateCommentDOM(change)
        const displayContainer = document.querySelector(".feedback__body")
        displayContainer.prepend(domElement)
    }

    appendCreated(change) {
        const domElement = this.generateCommentDOM(change)
        const displayContainer = document.querySelector(".feedback__body")
        displayContainer.appendChild(domElement)
    }

    handleSubmitFeedbackForm = function (model, e) {
        const payload = {
            feedback: this.feedback.value,
            userName: this.name.value,
            createdAt: new Date()
        }
        return model.DB.create("testimonials", payload).then(() => {
            model.appendCreated(payload)
            model.scrollToBottom()
        })
    }

    validateFeedbackForm = function () {
        const name = this.name.value
        const feedback = this.feedback.value
        let error = false

        if (!name) {
            handleNameError.call(this, "Name is required")
            error = true
        }

        if (!feedback) {
            handleFeedbackError(this, "Feedback is required")
            error = true
        }

        return error
    }

    handleNameError = function (message) {
        const nameElem = this.name
        let elem = window.getComputedStyle(nameElem, ':after');
        displayError(elem, message)
    }

    handleFeedbackError = function (message) {
        const feedbackElem = this.feedback
        let elem = window.getComputedStyle(feedbackElem, ':after');
        displayError(elem, message)
    }

    displayError = function (elem, message) {
        console.log(message)
    }
}
