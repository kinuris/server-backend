type RedirectOption = {
    alertMessage?: string,
    expireMessage?: string
}

type RouterOption = {
    [key: string]: {
        redirect: string,
        onFail: boolean,
        adminOnly: boolean
    }
}