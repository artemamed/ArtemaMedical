"use client";
import { useWindowScroll } from "@mantine/hooks";
import { Button } from "../ui/button";
import { FaArrowUpLong } from "react-icons/fa6";

const ScrollTop = () => {
  const [scroll, scrollTo] = useWindowScroll();

  return (
    <>
      {scroll.y > 10 && (
        <Button
          onClick={() => scrollTo({ y: 0 })}
          size="icon"
          className="bg-black rounded-full w-14 h-14"
        >
          <FaArrowUpLong className="h-8 w-8 text-white" />
        </Button>
      )}
    </>
  );
};
export default ScrollTop;
