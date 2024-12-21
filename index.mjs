import clipboard from "clipboardy";

const clipboardContents = clipboard.readSync();

const location = clipboardContents.match(/Location=\(X=(.*),Y=(.*),Z=(.*)\)/);
const locationString = `Location=(X=${location?.[1]},Y=${location?.[2]},Z=${location?.[3]})`;

const rotation = clipboardContents.match(
  /Rotation=\(Pitch=(.*),Yaw=(.*),Roll=(.*)\)/
);
const pitchInDegrees = (Number(rotation?.[1] ?? 0) / 65536) * 360;
const yawInDegrees = (Number(rotation?.[2] ?? 0) / 65536) * 360;
const rollInDegrees = (Number(rotation?.[3] ?? 0) / 65536) * 360;
const rotationString = `Rotation=(Pitch=${pitchInDegrees},Yaw=${yawInDegrees},Roll=${rollInDegrees})`;

const scale = clipboardContents.match(/DrawScale3D=\(X=(.*),Y=(.*),Z=(.*)\)/);
const scaleString = scale
  ? `DrawScale3D=(X=${scale[1]},Y=${scale[2]},Z=${scale[3]})`
  : "DrawScale3D=(X=1,Y=1,Z=1)";

const output = `{
  "Tagged": [
    [
      "RelativeLocation",
      "${locationString}"
    ],
    [
      "RelativeRotation",
      "${rotationString}"
    ],
    [
      "RelativeScale3D",
      "${scaleString}"
    ]
  ]
}`;

clipboard.writeSync(output);
