import * as React from "react";
import { BootState } from "app/constants/boot-state";
import TechnicalIssues from "../TechnicalIssues/TechnicalIssues";
import ThreeBounce from "../ThreeBounce/ThreeBounce";

interface IProps {
  bootState: BootState;
  children: JSX.Element | JSX.Element[];
}

export const BootStateWrapper = (props: IProps): JSX.Element => {
  switch (props.bootState) {
    case BootState.Error:
      return <TechnicalIssues />;
    case BootState.Success:
      return <>{props.children}</>;
    default:
      return <ThreeBounce />;
  }
};
