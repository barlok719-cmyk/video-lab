import React from "react";
import { Composition } from "remotion";
import { LaboratoryVideo } from "./Video";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="Laboratory42"
      component={LaboratoryVideo}
      durationInFrames={300}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};
