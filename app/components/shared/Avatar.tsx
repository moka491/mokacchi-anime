import avatarDefault from "~/images/avatarDefault.png";

type Props = {
  imageUrl?: string;
  size?: string;
  faded?: boolean;
};

export default function Avatar({
  imageUrl = avatarDefault,
  size = "32px",
  faded,
  ...props
}: Props) {
  const computed: React.CSSProperties = {
    opacity: faded ? "30%" : "100%",
    width: size,
    height: size,
  };

  return (
    <img
      src={imageUrl}
      className="overflow-hidden transition-opacity duration-500 border-2 rounded-full w-9 h-9 border-primary "
      style={computed}
      {...props}
    />
  );
}
