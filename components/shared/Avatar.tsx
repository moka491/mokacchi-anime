type Props = {
  imageUrl?: string
  size?: string
  faded?: boolean
  onClick: React.MouseEventHandler<HTMLDivElement>
}

export default function Avatar({
  imageUrl = '/images/avatarDefault.png',
  size = '32px',
  faded,
  ...props
}: Props) {
  const computed: React.CSSProperties = {
    opacity: faded ? '30%' : '100%',
    width: size,
    height: size,
  }

  return (
    <img
      src={imageUrl}
      className="border-primary h-9 w-9 overflow-hidden rounded-full border-2 transition-opacity duration-500 "
      style={computed}
      {...props}
    />
  )
}
