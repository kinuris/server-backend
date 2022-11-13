import { browserRouting } from "../browserRouting";
import { staticRouting } from "../staticRouting";

export const routingConfig = [
    browserRouting("cookie-bite", {
        "/login": {
            redirect: "/cookie-bite/",
            onFail: false,
            adminOnly: false
        },
        "/signup": {
            redirect: "/cookie-bite/",
            onFail: false,
            adminOnly: false
        },
        "/manage-menu-items": {
            redirect: "/cookie-bite/",
            onFail: true,
            adminOnly: true
        }
    }),
    staticRouting("qwik-test"),
]