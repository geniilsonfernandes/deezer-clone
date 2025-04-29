import React from "react";
import Svg, { Circle, Path } from "react-native-svg";

export function CompassIcon(props: React.ComponentProps<typeof Svg>) {
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
      <Circle cx={12} cy={12} r={10} fill={"none"} />
      <Path d="M16.24 7.76 14.436 13.171a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z" />
    </Svg>
  );
}
