import { Button } from "@/components/button";
import React from "react";

type Props = {
  count: number;
  Icon: () => JSX.Element;
};

export const MetaInfo: React.FC<Props> = ({ count, Icon }) => {
  return (
    <Button className="min-w-[80px] h-[40px] rounded-2xl justify-start py-0 px-3" variant="outline">
      <Icon />
      {count > 0 && (
        <p className="font-semibold ml-1 text-default-400 text-l">{count}</p>
      )}
    </Button>
  );
};
