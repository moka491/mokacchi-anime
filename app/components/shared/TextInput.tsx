import cls from "~/utils/classes";

export default function TextInput({ fullWidth = false, ...props }) {
  const styles: React.CSSProperties = {
    ...(fullWidth && {
      width: "100%",
    }),
  };

  return (
    <input
      className={cls(
        "px-2 py-2 rounded outline-none bg-bgSecondary text-textPrimary placeholder:text-textSecondary",
        fullWidth && "w-full"
      )}
      style={styles}
      {...props}
    />
  );
}
