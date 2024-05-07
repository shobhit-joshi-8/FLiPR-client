export const getUserData = (user) => ({
    uuid: `uuid_${user?.firstName}_${user?.email}`,
    from: "custom-db",
    role: `${user?.role}`,
    data: {
            displayName: `${user?.firstName}`,
        photoURL: "assets/images/logo/icmlogo.png",
            email: user?.email,
        settings: {
            layout: {},
            theme: {}
        },
        shortcuts: [],
        userData: user,

    },
})