
import moment from "moment-timezone";

export default [
    {
        "srNo": 300500,
        "productName": "Paid",
        "userEmail": "john.deo@dummy.com",
        "userName": "Platinum userName Plan",
        "date": moment().subtract(1, "days").format("DD MMM YYYY"),
        // "dueDate": moment().subtract(1, "days").add(1, "month").format("DD MMM YYYY")
    },
    {
        "srNo": 300499,
        "productName": "Paid",
        "userEmail": "john.deo@dummy.com",
        "userName": "Platinum userName Plan",
        "date": moment().subtract(2, "days").format("DD MMM YYYY"),
        // "dueDate": moment().subtract(2, "days").add(1, "month").format("DD MMM YYYY")
    },
    {
        "srNo": 300498,
        "productName": "Paid",
        "userEmail": "john.deo@dummy.com",
        "userName": "Platinum userName Plan",
        "date": moment().subtract(2, "days").format("DD MMM YYYY"),
        // "dueDate": moment().subtract(2, "days").add(1, "month").format("DD MMM YYYY")
    },
    {
        "srNo": 300497,
        "productName": "Paid",
        "userEmail": "john.deo@dummy.com",
        "userName": "Flexible userName Plan",
        "date": moment().subtract(3, "days").format("DD MMM YYYY"),
        // "dueDate": moment().subtract(3, "days").add(1, "month").format("DD MMM YYYY")
    },
    {
        "srNo": 300496,
        "productName": "Due",
        "userEmail": "john.deo@dummy.com",
        "userName": "Gold userName Plan",
        "date": moment().subtract(1, "day").subtract(1, "month").format("DD MMM YYYY"),
        // "dueDate": moment().subtract(1, "day").format("DD MMM YYYY")
    },
    {
        "srNo": 300495,
        "productName": "Due",
        "userEmail": "john.deo@dummy.com",
        "userName": "Gold userName Plan",
        "date": moment().subtract(3, "days").subtract(1, "month").format("DD MMM YYYY"),
        // "dueDate": moment().subtract(3, "days").format("DD MMM YYYY")
    },
    {
        "srNo": 300494,
        "productName": "Due",
        "userEmail": "john.deo@dummy.com",
        "userName": "Flexible userName Plan",
        "date": moment().subtract(4, "days").subtract(1, "month").format("DD MMM YYYY"),
        // "dueDate": moment().subtract(4, "days").format("DD MMM YYYY")
    },
    {
        "srNo": 300493,
        "productName": "Canceled",
        "userEmail": "john.deo@dummy.com",
        "userName": "Gold userName Plan",
        "date": moment().subtract(20, "days").subtract(1, "month").format("DD MMM YYYY"),
        // "dueDate": moment().subtract(20, "days").format("DD MMM YYYY")
    },
    {
        "srNo": 300492,
        "productName": "Canceled",
        "userEmail": "john.deo@dummy.com",
        "userName": "Platinum userName Plan",
        "date": moment().subtract(2, "months").format("DD MMM YYYY"),
        // "dueDate": moment().subtract(3, "months").format("DD MMM YYYY")
    },
    {
        "srNo": 300491,
        "productName": "Paid",
        "userEmail": "john.deo@dummy.com",
        "userName": "Platinum userName Plan",
        "date": moment().subtract(6, "days").format("DD MMM YYYY"),
        // "dueDate": moment().subtract(6, "days").add(1, "month").format("DD MMM YYYY")
    }
]
