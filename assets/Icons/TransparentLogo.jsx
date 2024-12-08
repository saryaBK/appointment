import React from "react";
import { Svg, Path } from "react-native-svg";
import { Wrapper } from "./styled";
import useTheme from "../../context/useTheme/useTheme";

const TransparentLogo = ({ fillColor }) => {
  const {theme} = useTheme();

  return (
    <Wrapper>
      <Svg width="238" height="254" viewBox="0 0 238 254" fill="none">
        <Path
          d="M264 75.3457V253.969H193.432V86.3702C193.432 85.2354 192.985 84.1471 192.191 83.3447C191.397 82.5422 190.319 82.0914 189.195 82.0914H83.9258C82.8023 82.0914 81.7248 82.5422 80.9303 83.3447C80.1358 84.1471 79.6895 85.2354 79.6895 86.3702V178.169C79.6895 179.304 80.1358 180.393 80.9303 181.195C81.7248 181.997 82.8023 182.448 83.9258 182.448H179.01V254H70.3149C31.5393 254 0 224.898 0 189.163V75.3457C0 42.3643 26.8571 15.0436 61.4774 11.0515V-6.35023C61.4827 -8.64615 62.3895 -10.8462 63.9988 -12.4677C65.608 -14.0893 67.7884 -14.9999 70.0615 -14.9999H89.3175C90.2764 -15.0043 91.228 -14.8308 92.1248 -14.4881C93.8119 -13.9042 95.2745 -12.7993 96.3058 -11.3297C97.337 -9.86013 97.8847 -8.10027 97.8713 -6.29906V33.6225H110.418V10.5397H157.697V-6.31952C157.695 -7.45493 157.916 -8.57946 158.345 -9.62883C158.774 -10.6782 159.404 -11.6318 160.198 -12.4352C160.993 -13.2385 161.936 -13.8758 162.975 -14.3106C164.013 -14.7454 165.126 -14.9692 166.25 -14.9692H185.506C187.771 -14.9402 189.934 -14.0201 191.537 -12.4048C193.14 -10.7895 194.056 -8.60635 194.091 -6.31952V33.6021H205.239V11.4507C238.552 16.5791 264 43.2958 264 75.3457Z"
          fill="#7551D6" fillOpacity="0.1"
        //   fill={fillColor || theme.light_color} 
        />
      </Svg>
    </Wrapper>
  );
};

export default TransparentLogo;
