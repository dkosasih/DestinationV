
export function getTheme() {
    return {
        "palette": {
            "type": "dark",
            "common": { "black": "#000", "white": "#fff" },
            "primary": {
                "light": "rgba(167, 71, 195, 1)",
                "main": "rgba(137, 50, 157, 1)", "dark": "rgba(95, 32, 106, 1)", "contrastText": "#fff"
            },
            "secondary": {
                "light": "rgba(195, 189, 191, 1)",
                "main": "rgba(133, 131, 130, 1)", "dark": "rgba(88, 87, 87, 1)", "contrastText": "#fff"
            },
            "error": {
                "light": "#e57373",
                "main": "#f44336", "dark": "#d32f2f", "contrastText": "#fff"
            },
            "text": {
                "primary": "rgba(0, 0, 0, 0.87)", "secondary": "rgba(0, 0, 0, 0.54)", "disabled": "rgba(0, 0, 0, 0.38)", "hint": "rgba(0, 0, 0, 0.38)"
            }
        }
    }
}