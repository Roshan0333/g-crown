const Cookies = (res, tokenType, token, maxAge) => {
    res.cookie(tokenType, token, {
        httpOnly: true,
        sameSite: "Lax",
        expires: maxAge
    })
}

export default Cookies;