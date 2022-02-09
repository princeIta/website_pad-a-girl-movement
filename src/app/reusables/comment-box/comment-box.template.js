import formatTime from "../../../utils/time"

export default function template({ name, message, date }) {
    const nameArr = String(name).trim().split(/\s+/)
    let initials = ""

    if (nameArr.length > 1) {
        const firstName = nameArr[0]
        const lastName = nameArr[nameArr.length - 1]
        initials += `${firstName[0]}${lastName[0]}`
        console.log({name, nameArr, firstName, lastName, initials})
    } else {
        const firstName = nameArr[0]
        initials += firstName[0]
        console.log({name, nameArr, firstName, lastName, initials, branch: "true"})
    }

    return `
    <div style="width: 100%;">
        <style>
            .comment-box {
                width: calc(100% - 9px);
                height: fit-content;
                padding: 7px;
                margin: 20px 5px 10px 4px;
                box-shadow: -2px -1px 3px rgb(255 255 255 / 20%);
                border-radius: 10px;
                background: rgba(245, 245, 245, 0.02);
                color: #aeaeae;
            }

            .comment-box__avatar-container {
                height: 40px;
                display: flex;
                justify-content: flex-start;
            }

            .comment-box__avatar {
                font-size: 13px;
                height: 40px;
                width: 40px;
                border-radius: 50%;
                border: 2px solid #795548;
                text-transform: uppercase;
                text-transform: uppercase;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
            }

            .comment-box__user-info {
                flex-basis: calc(100% - 50px);
                margin-left: 10px;
                display: flex;
                flex-direction: column;
                justify-content: space-evenly;
            }

            .comment-box__date-posted {
                font-size: 12.5px;
            }

            .comment-box__name {
                font-size: 14px;
                font-weight: 600;
            }

            .comment-box__message{
                font-size: 14px;
                color: #aeaeae;
                margin: 10px 4px 5px;
            }
        </style>
        <article class="comment-box">
            <section class="comment-box__avatar-container">
                <div class="comment-box__avatar">${initials}</div>
                <div class="comment-box__user-info">
                    <div class="comment-box__name">
                        ${name}
                    </div>
                    <div class="comment-box__date-posted">
                        ${formatTime(date).toDateMonthYearString()}, ${new Date(date).toLocaleTimeString()}
                    </div>
                </div>
            </section>
            <section class="comment-box__message">
                ${message}
            </section>
        </article>
    </div>
    `
}