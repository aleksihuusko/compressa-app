import { Button } from "@/components/ui/button";
import { Badge } from "./ui/badge";

interface CompressionResult {
  originalFile: File;
  compressedBlob: Blob;
  compressionRatio: number;
}

interface CompressionResultsProps {
  results: CompressionResult[];
}

export default function CompressionResults({
  results,
}: CompressionResultsProps) {
  if (results.length === 0) return null;

  const totalOriginalSize = results.reduce(
    (sum, result) => sum + result.originalFile.size,
    0,
  );
  const totalCompressedSize = results.reduce(
    (sum, result) => sum + result.compressedBlob.size,
    0,
  );
  const overallCompressionRatio = 1 - totalCompressedSize / totalOriginalSize;

  const handleDownload = (blob: Blob, fileName: string) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="bg-background py-12 text-foreground">
      <div className="container mx-auto max-w-7xl px-[5%]">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex max-w-2xl flex-col gap-2">
            <h2 className="mb-2 scroll-m-20 text-balance text-2xl font-bold capitalize leading-tight text-foreground">
              Compressa saved you {(overallCompressionRatio * 100).toFixed(2)}%
            </h2>
            <p className="text-muted-foreground">
              {results.length} image{results.length > 1 ? "s" : ""} optimized |{" "}
              {(totalCompressedSize / 1024).toFixed(2)} KB total
            </p>
          </div>
          <Button
            onClick={() =>
              results.forEach((r) =>
                handleDownload(
                  r.compressedBlob,
                  `${r.originalFile.name.split(".")[0]}_compressa.${r.compressedBlob.type.split("/")[1]}`,
                ),
              )
            }
          >
            Download all
          </Button>
        </div>
        {results.map((result, index) => (
          <div
            key={index}
            className="mb-4 rounded-lg border border-border bg-background px-6 py-4 shadow-lg"
          >
            <div className="flex items-center gap-4">
              <div className="size-12 rounded bg-muted-foreground">
                {/* TODO: Add thumbnail of the image here */}
              </div>
              <div className="flex-grow">
                <h3 className="mb-1 font-semibold">
                  {result.originalFile.name}
                </h3>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">
                    {result.originalFile.type.split("/")[1].toUpperCase()}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {(result.originalFile.size / 1024).toFixed(2)} KB
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-center gap-1">
                <h3 className="mb-1 font-semibold">
                  {result.originalFile.name.split(".")[0]}_compressa.
                  {result.compressedBlob.type.split("/")[1]}
                </h3>
                <div className="flex items-center gap-2 text-center">
                  <Badge variant="outline">
                    {result.compressedBlob.type.split("/")[1].toUpperCase()}
                  </Badge>
                  <p className="text-xs text-green-500">
                    -{(result.compressionRatio * 100).toFixed(2)}%
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {(result.compressedBlob.size / 1024).toFixed(2)} KB
                  </p>
                </div>
              </div>
              <Button
                onClick={() =>
                  handleDownload(
                    result.compressedBlob,
                    `${result.originalFile.name.split(".")[0]}_compressa.${result.compressedBlob.type.split("/")[1]}`,
                  )
                }
              >
                Download
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
