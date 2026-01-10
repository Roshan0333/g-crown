let Cookies = (res, tokenType, token, maxAge) => {
    res.cookie(tokenType, token, {
        httpOnly: true,
        sameSite: "Lax",
        expire: maxAge,
    })
}

export default Cookies;