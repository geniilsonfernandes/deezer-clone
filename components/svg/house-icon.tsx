import React from "react";
import Svg, { Path } from "react-native-svg";

export function HouseIcon(props: React.ComponentProps<typeof Svg>) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <Path d="M1 8.99997C0.99993 8.70904 1.06333 8.42159 1.18579 8.15768C1.30824 7.89378 1.4868 7.65976 1.709 7.47197L8.709 1.47297C9.06999 1.16788 9.52736 1.00049 10 1.00049C10.4726 1.00049 10.93 1.16788 11.291 1.47297L18.291 7.47197C18.5132 7.65976 18.6918 7.89378 18.8142 8.15768C18.9367 8.42159 19.0001 8.70904 19 8.99997V18C19 18.5304 18.7893 19.0391 18.4142 19.4142C18.0391 19.7893 17.5304 20 17 20H13V11H10H7V20H3C2.46957 20 1.96086 19.7893 1.58579 19.4142C1.21071 19.0391 1 18.5304 1 18V8.99997Z" />
    </Svg>
  );
}

