import classes from 'utils/classes'

type Props = {
  label: string
  disabled?: boolean
  checked?: boolean
  onChange?: React.ChangeEventHandler<HTMLInputElement>
}

export default function Checkbox({ label, disabled, ...props }: Props) {
  return (
    <label className={classes('text-textSecondary', disabled && 'opacity-30')}>
      <input
        type="checkbox"
        className="mr-2 h-4 w-4 appearance-none rounded border-2 border-bgSecondary bg-bgSecondary align-sub transition checked:bg-primary"
        {...props}
      />
      {label}
    </label>
  )
}
