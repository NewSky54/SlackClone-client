export default errors => {
  errors.reduce((acc, cur) => {
    if (cur.path in acc) {
      acc[cur.path].push(cur.message);
    } else {
      acc[cur.path] = [cur.message]
    }
    return acc;
  }, {}); 
};