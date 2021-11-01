import * as React from 'react';
import classNames from 'classnames';
import './ThreeBounce.scss';

interface Props {
  centered?: boolean;
  type?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'light'
    | 'dark';
  color?: string;
  distance?: number;
  size?: 'small' | 'medium' | 'large' | number;
  className?: string;
}

export default function ThreeBounce({
  centered,
  type,
  color,
  distance,
  size,
  className,
}: Props): JSX.Element {
  const bounceStyles: React.CSSProperties = {
    backgroundColor: color,
  };

  let sizeStyles: React.CSSProperties = {};
  if (typeof size === 'number') {
    sizeStyles = {
      width: `${size}px`,
      height: `${size}px`,
    };
  }

  let distanceStyles: React.CSSProperties = {};
  if (distance != null) {
    distanceStyles = {
      marginRight: `${distance}px`,
    };
  }

  const bounceClassNames = (bounceId: number): string =>
    classNames(
      'three-bounce__bounce',
      `three-bounce__bounce--${bounceId}`,
      `three-bounce__bounce--${type}`,
      `three-bounce__bounce--${size}`
    );

  return (
    <div
      className={classNames('three-bounce', className)}
      style={{ justifyContent: centered ? 'center' : undefined }}
    >
      <div
        style={{ ...bounceStyles, ...sizeStyles, ...distanceStyles }}
        className={bounceClassNames(1)}
      />
      <div
        style={{ ...bounceStyles, ...sizeStyles, ...distanceStyles }}
        className={bounceClassNames(2)}
      />
      <div
        style={{ ...bounceStyles, ...sizeStyles }}
        className={bounceClassNames(3)}
      />
    </div>
  );
}

ThreeBounce.defaultProps = {
  type: 'primary',
  size: 'medium',
  centered: true,
};
