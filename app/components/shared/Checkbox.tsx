import classes from "~/utils/classes";

export default function Checkbox(props) {
  return (
    <label
      className={classes("text-textSecondary", props.disabled && "opacity-30")}
    >
      <input
        type="checkbox"
        className="w-4 h-4 mr-2 transition border-2 rounded appearance-none bg-bgSecondary align-sub border-bgSecondary checked:bg-primary"
        {...props}
      />
      {props.label}
    </label>
  );
}
