import { htmlToElement } from "../../../utils/html-to-elem"
import commentTemplate from "./comment-box.template"

export default class CommentBox {
    constructor(name, message, date) {
        this.name = name
        this.message = message
        this.date = date

        this.toDOMElement()
    }

    toDOMElement() {
        return htmlToElement(
            commentTemplate(
                {
                    name: this.name,
                    message: this.message,
                    date: this.date
                }
            )
        )
    }
}