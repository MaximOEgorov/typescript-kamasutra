function keyNextValue(arr, key='key') {
    const maxKey = Math.max(...arr.map(item => parseInt(item[key], 10)));
    return maxKey+1;
}

export default keyNextValue;

