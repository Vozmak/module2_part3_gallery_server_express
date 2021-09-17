"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPage = void 0;
function getPage() {
    const searchParams = new URL(window.location.href).searchParams;
    let page = searchParams.get('page') || localStorage.page || '1';
    // if (page === "1") previous.disabled = true
    // else if (page === "3") next.disabled = true
    return page;
}
exports.getPage = getPage;
//# sourceMappingURL=getPage.js.map