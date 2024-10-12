"use client";

import { useEffect, useState } from "react";

import { FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL } from "@ffmpeg/util";

interface FFmpegClientProps {
  files: File[];
  outputFormat: string;
  isCompressing: boolean;
  setIsCompressing: (value: boolean) => void;
  onCompressionComplete: (results: CompressionResult[]) => void;
}

interface CompressionResult {
  originalFile: File;
  compressedBlob: Blob;
  compressionRatio: number;
}

const FFmpegClient: React.FC<FFmpegClientProps> = ({
  files,
  outputFormat,
  setIsCompressing,
  onCompressionComplete,
}) => {
  const [ffmpeg, setFfmpeg] = useState<FFmpeg | null>(null);

  useEffect(() => {
    const loadFFmpeg = async () => {
      const ffmpegInstance = new FFmpeg();
      const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.4/dist/umd";
      await ffmpegInstance.load({
        coreURL: await toBlobURL(
          `${baseURL}/ffmpeg-core.js`,
          "text/javascript",
        ),
        wasmURL: await toBlobURL(
          `${baseURL}/ffmpeg-core.wasm`,
          "application/wasm",
        ),
      });
      setFfmpeg(ffmpegInstance);
    };

    loadFFmpeg();
  }, []);

  const compressImages = async () => {
    if (!ffmpeg) {
      console.error("FFmpeg is not loaded yet");
      return;
    }

    setIsCompressing(true);
    const results: CompressionResult[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileData = new Uint8Array(await file.arrayBuffer());
        await ffmpeg.writeFile(file.name, fileData);

        await ffmpeg.exec([
          "-i",
          file.name,
          "-vf",
          "scale='min(1920,iw)':'-1'",
          "-c:v",
          outputFormat === "webp"
            ? "libwebp"
            : outputFormat === "jpeg"
              ? "mjpeg"
              : "png",
          "-quality",
          "80",
          `output_${i}.${outputFormat}`,
        ]);

        const data = await ffmpeg.readFile(`output_${i}.${outputFormat}`);
        const compressedBlob = new Blob([data], {
          type: `image/${outputFormat}`,
        });

        const compressionRatio = 1 - compressedBlob.size / file.size;

        results.push({
          originalFile: file,
          compressedBlob,
          compressionRatio,
        });
      }
      onCompressionComplete(results);
    } catch (error) {
      console.error("Error compressing images:", error);
    } finally {
      setIsCompressing(false);
    }
  };

  useEffect(() => {
    if (files.length > 0 && ffmpeg) {
      compressImages();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files, ffmpeg]);

  return null;
};

export default FFmpegClient;
