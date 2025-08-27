const getHomepage = async (req, res) => {
    return res.render('index.ejs')
}

module.exports = {
    getHomepage,
}