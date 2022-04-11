import classes from 'utils/classes'

export default function TextInput({ fullWidth = false, ...props }) {
  const styles: React.CSSProperties = {
    ...(fullWidth && {
      width: '100%',
    }),
  }

  return (
    <input
      className={classes(
        'bg-bgSecondary text-textPrimary placeholder:text-textSecondary rounded px-2 py-2 outline-none',
        fullWidth && 'w-full'
      )}
      style={styles}
      {...props}
    />
  )
}
