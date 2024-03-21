interface RivenRowProps {
  label: string;
  info: RivenMod | undefined;
}

export default function RivenRow({ label, info }: RivenRowProps) {
  return (
    <tr>
      <th>{label}</th>
      <td>{info?.avg || "N/A"}</td>
      <td>{info?.stddev || "N/A"}</td>
      <td>{info?.max || "N/A"}</td>
      <td>{info?.min || "N/A"}</td>
      <td>{info?.pop || "N/A"}</td>
      <td>{info?.median || "N/A"}</td>
    </tr>
  );
}
