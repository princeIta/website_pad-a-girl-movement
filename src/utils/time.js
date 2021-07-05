const months = [
    'Jan',
    'Feb',
    'Mar',
    'April',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
];
const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
];
export default function formatTime(dateTime) {
    let arr = ('' + dateTime).split(/[- :]/),
        dateTimeInstance = new Date(
            arr[0],
            arr[1] - 1,
            arr[2],
            arr[3],
            arr[4],
            arr[5]
        );
    if (isNaN(dateTimeInstance.getTime())) {
        dateTimeInstance = new Date(dateTime);
    }
    const month = dateTimeInstance.getMonth();
    const date = dateTimeInstance.getDate();
    const day = dateTimeInstance.getDay();
    const year = dateTimeInstance.getFullYear();
    const monthLabel = months[month];

    return {
        toDateMonthYearString() {
            return `${date} ${monthLabel}, ${year}`;
        },
        toDayMonthYearString() {
            let dateEndingText;
            if (date >= 10 && date <= 20) {
                dateEndingText = 'th';
            } else {
                const dateLastDigit = date % 10;
                switch (dateLastDigit) {
                    case 1:
                        dateEndingText = 'st';
                        break;
                    case 2:
                        dateEndingText = 'nd';
                        break;
                    case 3:
                        dateEndingText = 'rd';
                        break;

                    default:
                        dateEndingText = 'th';
                        break;
                }
            }
            return `${days[day]}, ${months[month]} ${date}${dateEndingText}, ${year}`;
        },
        getDateTimeInstance() {
            return dateTimeInstance;
        }
    };
}
