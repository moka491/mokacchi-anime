type Props = {
  label: string
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

export default function Button({ label, ...props }: Props) {
  return (
    <button
      className="rounded bg-secondary px-6 py-2 text-textPrimary disabled:bg-bgSecondary disabled:text-textSecondary"
      {...props}
    >
      {label}
    </button>
  )
}
