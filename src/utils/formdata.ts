export default function formdata(data: {[key: string]: any}) {
  const form = new FormData();
  Object.keys(data).forEach(x => {
    if (x == 'img') {
      form.append(x, {
        name: data[x].fileName,
        uri: data[x].uri,
        type: data[x].type,
      });
    } else if (typeof data[x] == 'object')
      form.append(x, JSON.stringify(data[x]));
    else form.append(x, data[x]);
  });
  return form;
}
