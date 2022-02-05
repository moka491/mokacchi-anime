type Props = {
  label: string;
};

export default function Button({ label, ...props }: Props) {
  return (
    <button
      className="px-6 py-2 rounded bg-secondary disabled:bg-bgSecondary disabled:text-textSecondary text-textPrimary"
      {...props}
    >
      {label}
    </button>
  );
}
