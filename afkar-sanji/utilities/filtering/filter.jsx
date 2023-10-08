export function SetQueryParams(params) {
    if (!params) return;
    return '?' + Object.entries(params)
        .filter(([_, v]) => v)
        .map(([k, v]) => `${k}=${v}`).join('&');
}

export default SetQueryParams;