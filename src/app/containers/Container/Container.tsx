import React from "react";
import "./Container.scss";

interface Props {
  children: JSX.Element | JSX.Element[];
  className?: string;
}

const Container = (props: Props) => {
  const containerClass = props.className
    ? `${props.className} container`
    : `container`;

  return <div className={containerClass}>{props.children}</div>;
};

export default Container;
