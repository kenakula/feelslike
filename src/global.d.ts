/* eslint-disable @typescript-eslint/no-explicit-any */
/** Global definitions for developement **/

// for style loader
declare module '*.css' {
  const styles: any;
  export = styles;
}

declare module '*.scss' {
  const content: { [className: string]: string };
  export = content;
}

declare module '*.svg' {
  const content: any;
  export = content;
}

declare module '*.png' {
  const content: any;
  export = content;
}

declare module '*.jpg' {
  const content: any;
  export = content;
}

declare module '*.jsx' {
  const content: any;
  export = content;
}
