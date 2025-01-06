const Rules = ({ rule }: { rule: string }) => {
  return (
    <li className="text-lg text-gray-300">
      <span className="font-semibold">{rule}</span>
    </li>
  );
};

export default Rules;
