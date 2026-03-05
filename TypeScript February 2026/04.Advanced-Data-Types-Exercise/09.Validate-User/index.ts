type User = {
    id: number | string,
    username: string,
    passwordHash: string | string[],
    status: 'Locked' | 'Unlocked' | 'Deleted',
    email?: string
}

function validateUser(user: object): user is User {
    const isIdValid = "id" in user && (
        (typeof user.id === "number" && user.id > 100) || (typeof user.id === "string" && user.id.length === 14)
    )

    const isUsernameValid = "username" in user && (
        typeof user.username === "string" && (user.username.length >= 5 && user.username.length <= 10)
    )

    const isPasswordValid = "passwordHash" in user && (
        (typeof user.passwordHash === "string" && user.passwordHash.length === 20) || (Array.isArray(user.passwordHash) && user.passwordHash.length === 4 && user.passwordHash.every(i => typeof i === "string" && i.length === 8))
    )

    const isStatusValid = "status" in user && (
        user.status === "Locked" || user.status === "Unlocked"
    )

    const isEmailValid = !("email" in user) || (
        typeof user.email === "string"
    )

    return (isIdValid && isUsernameValid && isPasswordValid && isStatusValid && isEmailValid);
}

console.log(validateUser({ id: 120, username: 'testing', passwordHash: '123456-123456-123456', status: 'Deleted', email: 'something' }));