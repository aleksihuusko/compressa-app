"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { UploadIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import CompressionResults from "@/components/compression-results";

const FFmpegClient = dynamic(() => import("@/components/ffmpeg-client"), {
  ssr: false,
});

interface CompressionResult {
  originalFile: File;
  compressedBlob: Blob;
  compressionRatio: number;
}

export default function Home() {
  const [files, setFiles] = useState<File[]>([]);
  const [outputFormat, setOutputFormat] = useState<string>("webp");
  const [isCompressing, setIsCompressing] = useState(false);
  const [compressionResults, setCompressionResults] = useState<
    CompressionResult[]
  >([]);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles((prevFiles) => [...prevFiles, ...droppedFiles].slice(0, 20));
  }, []);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const selectedFiles = Array.from(e.target.files);
        setFiles((prevFiles) => [...prevFiles, ...selectedFiles].slice(0, 20));
      }
    },
    [],
  );

  const handleCompressionComplete = (results: CompressionResult[]) => {
    setCompressionResults(results);
  };

  return (
    <main>
      <section className="bg-accent py-12">
        <div className="container mx-auto max-w-7xl px-[5%]">
          <div className="flex flex-col gap-8 lg:flex-row">
            {/* Left section - Heading and Button */}
            <div className="lg:w-1/4">
              <Badge className="mb-4">Compressa</Badge>
              <h1 className="scroll-m-20 text-balance text-3xl font-bold capitalize leading-tight">
                Free image compression for faster websites
              </h1>
            </div>
            {/* Right section - Image Compressor */}
            <div className="rounded-lg border border-border bg-background p-8 shadow-lg lg:w-3/4">
              <label htmlFor="file-upload" className="block cursor-pointer">
                <div
                  className="rounded-lg border-2 border-dashed border-border p-12 text-center"
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                >
                  <div className="mb-4">
                    <UploadIcon className="mx-auto size-8 text-muted-foreground" />
                  </div>
                  <h2 className="mb-2 text-xl font-semibold text-muted-foreground">
                    Drop your images here
                  </h2>
                  <p className="text-muted-foreground">
                    Up to 20 images, max 5 MB each.
                  </p>
                  <p className="mt-4 text-primary hover:underline">
                    or click anywhere to upload
                  </p>
                </div>
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <div className="mt-6 flex flex-col items-center justify-between gap-4 lg:flex-row">
                <span className="text-sm font-medium text-muted-foreground">
                  Convert:
                </span>
                <ToggleGroup
                  type="single"
                  value={outputFormat}
                  onValueChange={(value) => value && setOutputFormat(value)}
                  className="flex items-center gap-2"
                >
                  <ToggleGroupItem value="webp">WebP</ToggleGroupItem>
                  <ToggleGroupItem value="jpeg">JPEG</ToggleGroupItem>
                  <ToggleGroupItem value="png">PNG</ToggleGroupItem>
                </ToggleGroup>
              </div>
              <FFmpegClient
                files={files}
                outputFormat={outputFormat}
                isCompressing={isCompressing}
                setIsCompressing={setIsCompressing}
                onCompressionComplete={handleCompressionComplete}
              />
            </div>
          </div>
        </div>
      </section>
      <CompressionResults results={compressionResults} />
    </main>
  );
}
