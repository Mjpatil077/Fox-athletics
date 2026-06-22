declare module "react-360-view" {
  import { Component } from "react";
  
  interface React360ViewerProps {
    amount: number;
    imagePath: string;
    fileName?: string;
    spinReverse?: boolean;
    autoplay?: boolean;
    speed?: number;
    className?: string;
    boxShadow?: string;
    buttonClass?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  }

  export default class React360Viewer extends Component<React360ViewerProps> {}
}
