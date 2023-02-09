import alert from "alert"

const errorAlert = (err, req, res, next) => {
    if (err.status === 400 ) {
        return alert("wrong")
    }
    next()
}

export default errorAlert