export default function handleErrors(resp: Response) {
  if (!resp.ok) {
    throw Error(resp.statusText);
  }
  return resp;
}
