const splitMessage = (message: string, maxLength: number): string[] => {
  const parts = [];
  for (let i = 0; i < message.length; i += maxLength) {
    parts.push(message.slice(i, i + maxLength));
  }
  return parts;
};

function formatString(str: string) {
  try {
    if (!str) {
      throw new Error("Invalid string input");
    }

    return str
      .toLowerCase()
      .replace(/,/g, '')
      .replace(/\s+/g, '-')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  } catch (err) {
    console.log("Format String Error", str, err);
    return "";
  }
}

export { splitMessage, formatString };