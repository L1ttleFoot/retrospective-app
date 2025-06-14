/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

declare module '*.png' {
    const value: any;
    export default value;
  }
  
  declare module '*.gif' {
    const value: any;
    export default value;
  }
  
  declare module '*.svg' {
    const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    export default ReactComponent;
  }
  
  declare module '*.jpg' {
    const value: any;
    export default value;
  }
  
  declare module '*.jpeg' {
    const value: any;
    export default value;
  }
  
  declare module '*.pdf' {
    const value: any;
    export default value;
  }
  
  declare module '*.scss' {
    const content: Record<string, string>;
    export default content;
  }
  
  declare module '*.wav' {
      const value: any;
      export default value;
  }
  
  declare interface Window {
    __ENV__?: Record<string, string>;
  }
  

  interface TelegramWebApp {
  initData: string;
  initDataUnsafe: {
    user?: {
      id: number;
      first_name: string;
      last_name?: string;
      username?: string;
      photo_url?: string;
      language_code?: string;
      is_premium?: boolean;
    };
    [key: string]: any;
  };
  ready: () => void;
  sendData: (data: string) => void;
  [key: string]: any;
}

interface Window {
  Telegram: {
    WebApp: TelegramWebApp;
  };
}