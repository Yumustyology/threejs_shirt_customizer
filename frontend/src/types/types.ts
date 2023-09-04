import { GLTF } from "three-stdlib";

export type ButtonType = {
  type?: string;
  title: string;
  customStyles?: {};
  handleClick?: () => void;
};

export type TabType = { name: string; icon: any };

export type TabsTypes = {
  tab: TabType;
  key: string;
  handleClick: () => void;
  isFilterTab?: boolean;
  isActiveTab?: boolean;
};

export type GLTFResult = GLTF & {
  nodes: {
    Cube: THREE.Mesh;
  };
  materials: {};
};

export type TabPickerType = {
  tab: TabType;
  isFilterTab?: boolean;
  isActiveTab?: boolean;
  handleClick: () => void;
};

// export type FilePickerType = { file:any, setFile:(arg:HTMLInputElement["files"])=>void, readFile:(arg:string)=>void }
export type FilePickerType = {
  file: any;
  setFile: (arg: any) => void;
  readFile: (arg: string) => void;
};

export type AIPickerTypes = {
  prompt: string;
  setPrompt: (arg: any) => void;
  generatingImg: boolean;
  handleSubmit: (arg:keyof DecalsTypes) => void;
  // handleSubmit: (arg: string | number) => Promise<void> | void;
};

export type DecalsTypes = {
  logo: { stateProperty: string; filterTab: string };
  full: { stateProperty: string; filterTab: string };
};

export type ValtioStateTypes = {
  introScreen: boolean;
  color: string;
  isLogoTexture: boolean;
  isFullTexture: boolean;
  logoDecal: string;
  fullDecal: string;
};
