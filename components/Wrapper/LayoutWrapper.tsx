import { NextPage } from "next";

interface Props {
  children: React.ReactNode;
  className?: string | "";
}
const LayoutWrapper: NextPage<Props> = ({ children, className }) => {
  return (
    <div className={` md:container mx-auto px-2 ${className}`}>
      {children}
    </div>
  );
};

export default LayoutWrapper;
