export type ImageType = {
  lqip: string | null;
  width: number;
  height: number;
  url: string;
};

interface Color {
  _type: "color";
  hex: string;
  alpha: number;
  hsl: {
    _type: "hslaColor";
    h: number;
    s: number;
    l: number;
    a: number;
  };
  hsv: {
    _type: "hsvaColor";
    h: number;
    s: number;
    v: number;
    a: number;
  };
  rgb: {
    _type: "rgbaColor";
    r: number;
    g: number;
    b: number;
    a: number;
  };
}

export type RgbColor = Color["rgb"];

export interface GalleryImage extends ImageType {
  description: string | null;
  title: string;
  slug: string;
  lightColor: RgbColor | null;
  darkColor: Color["rgb"] | null;
}

export type Blog = {
  title: string;
  slug: string;
  titleImageData: GalleryImage | null;
  publishedAt: string;
};
