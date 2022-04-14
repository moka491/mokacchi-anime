type Props = {
  label: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export default function Button({ label, ...props }: Props) {
  return (
    <button
      className="px-6 py-2 rounded bg-secondary text-textPrimary disabled:bg-bgSecondary disabled:text-textSecondary"
      {...props}
    >
      {label}
    </button>
  )
}
