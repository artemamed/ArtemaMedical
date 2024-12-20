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
          type="button"
          variant="default"
          className="rounded-full w-12 h-12 fixed bottom-8 right-8 z-50 animate-bounce"
        >
          <FaArrowUpLong className="h-5 w-5" />
        </Button>
      )}
    </>
  );
};
export default ScrollTop;
