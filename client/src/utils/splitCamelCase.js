function splitCamelCase(str) {
  return str.replace(/([A-Z])/g, ' $1');
}

export default splitCamelCase;
