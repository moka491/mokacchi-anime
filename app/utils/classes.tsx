export default function classes(...args: any[]) {
  return args.filter(Boolean).join(" ");
}
