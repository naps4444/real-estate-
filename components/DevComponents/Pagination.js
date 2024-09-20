import React, { useState } from "react";
import { ButtonGroup, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

export function PaginationGroup() {
  const [active, setActive] = useState(1);

  const getItemProps = (index) => ({
    className: active === index ? "bg-gray-100 text-gray-900" : "",
    onClick: () => setActive(index),
  });

  const next = () => {
    if (active === 5) return;
    setActive(active + 1);
  };

  const prev = () => {
    if (active === 1) return;
    setActive(active - 1);
  };

  return (
    <ButtonGroup>
      <IconButton onClick={prev}>
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
      </IconButton>
      {[...Array(5)].map((_, i) => (
        <IconButton key={i} {...getItemProps(i + 1)}>
          {i + 1}
        </IconButton>
      ))}
      <IconButton onClick={next}>
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </IconButton>
    </ButtonGroup>
  );
}
