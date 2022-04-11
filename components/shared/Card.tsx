type Props = { children?: React.ReactNode }

export default function Card({ children }: Props) {
  return <div className="rounded bg-bgSecondary p-4">{children}</div>
}
