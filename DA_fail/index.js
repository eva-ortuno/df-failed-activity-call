// activity function only throwing an error
module.exports = async function (context) {
    throw new Error("The activity function DA_fail has thrown an error. This is the error message.")

    return "DA_fail finished";
};


