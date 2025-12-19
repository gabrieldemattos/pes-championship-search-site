import { FORMATIONS } from "@/app/_constants/formations";

export const FormationSelector = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="p-2 rounded-lg border text-black"
    >
      {Object.keys(FORMATIONS).map((f) => (
        <option key={f} value={f}>
          {f}
        </option>
      ))}
    </select>
  );
};

export default FormationSelector;
