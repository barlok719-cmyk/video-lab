import React from "react";
import { Composition } from "remotion";
import { ICQAd } from "./Video";

export const RemotionRoot: React.FC = () => (
  <Composition
    id="ICQAd"
    component={ICQAd}
    durationInFrames={540}
    fps={30}
    width={1080}
    height={1920}
  />
);
