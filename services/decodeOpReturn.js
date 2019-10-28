function decodeOpReturn(opReturn) {
  return Buffer(opReturn, 'hex')
    .slice(2)
    .toString();
}

export default decodeOpReturn;
