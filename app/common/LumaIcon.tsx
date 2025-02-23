import React from "react";

const LumaIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    width="28"
    height="28"
    viewBox="0 0 935 935"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor" // 🔥 Позволяет Tailwind менять цвет
    stroke="currentColor" // 🔥 Поддержка цвета обводки
    strokeWidth="6"
  >
    <circle cx="467.66" cy="467.66" r="200" />
    <path d="M300 800h335v50H300z" />
  </svg>
);

export default LumaIcon;