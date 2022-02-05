type Props = {
  progress: number;
  max: number;
};

export default function ProgressBar({ progress = 0, max = 100 }: Props) {
  const remainingProgress = 100 - (Math.min(progress, max) / max) * 100;

  const computed: React.CSSProperties = {
    transform: `translate(${-remainingProgress}%)`,
  };

  return (
    <div className="relative h-5 overflow-hidden rounded bg-bgSecondary">
      <div
        className="absolute inset-0 h-full transition-transform duration-200 bg-secondary"
        style={computed}
      ></div>
    </div>
  );
}
