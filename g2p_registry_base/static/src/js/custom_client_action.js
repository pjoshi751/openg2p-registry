/** @odoo-module **/

import {registry} from "@web/core/registry";
import {sprintf} from "@web/core/utils/strings";

const {utils} = owl;
const {escape} = utils;

export const displayNotificationAction = (env, action) => {
    const params = action.params || {};
    const options = {
        className: params.className || "",
        sticky: params.sticky || false,
        title: params.title,
        type: params.type || "info",
        messageIsHtml: true,
    };
    const links = (params.links || []).map((link) => {
        console.log(link);
        return `<a href="#" onClick="window.location.reload();return false;">Refresh Page</a>`;
    });
    const message = sprintf(escape(params.message), ...links);
    env.services.notification.add(message, options);
    return params.next;
};
registry.category("actions").remove("display_notification");
registry.category("actions").add("display_notification", displayNotificationAction);
