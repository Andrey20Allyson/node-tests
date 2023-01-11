export function formatNumber(value: number, separator: string = ','): string {
    const text = value.toString();
    let newText = '';

    for (let i = 0; i < text.length; i++) {
        const sub = i % 3 || !i?
            text.at(-i - 1):
            text.at(-i - 1) + separator;

        newText = sub + newText;
    }

    return newText
}