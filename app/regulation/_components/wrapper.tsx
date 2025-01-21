import { ReactNode } from "react";

const Wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="my-8 bg-[#343a40] rounded-lg shadow-md p-6">{children}</div>
  );
};

export default Wrapper;
