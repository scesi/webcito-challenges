type SparklineProps = {
  data: number[];
};

export const Sparkline = ({ data }: SparklineProps) => {
  if (!data.length) return null;
  const max = Math.max(...data, 1);
  const width = 80;
  const height = 16;
  const points = data
    .map(
      (v, i) =>
        `${(i * width) / (data.length - 1)},${
          height - (v * (height - 2)) / max
        }`
    )
    .join(" ");

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <polyline
        fill="none"
        stroke="#238636"
        strokeWidth="2"
        points={points}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
};
