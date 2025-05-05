"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Upload, Image, FileText, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FileUploaderProps {
  onUploadComplete: () => void;
}

export function FileUploader({ onUploadComplete }: FileUploaderProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFiles(acceptedFiles);

      // Create preview for the first image
      const file = acceptedFiles[0];
      const reader = new FileReader();

      reader.onload = () => {
        setPreview(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif"],
    },
    maxFiles: 1,
  });

  const removeFile = () => {
    setFiles([]);
    setPreview(null);
  };

  const handleUpload = () => {
    if (files.length > 0) {
      onUploadComplete();
    }
  };

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {!files.length ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                isDragActive
                  ? "border-primary bg-primary/5"
                  : "border-muted-foreground/20 hover:border-primary/50"
              }`}
            >
              <input {...getInputProps()} />
              <div className="flex flex-col items-center space-y-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Upload className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-base font-medium">
                    Drag & drop an image or click to browse
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Supports PNG, JPG or GIF up to 10MB
                  </p>
                </div>
                <div className="flex space-x-3">
                  <Button type="button" size="sm" variant="outline">
                    <Image className="mr-2 h-4 w-4" />
                    Upload Image
                  </Button>
                  <Button type="button" size="sm" variant="outline">
                    <FileText className="mr-2 h-4 w-4" />
                    Text Input
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            <div className="relative overflow-hidden rounded-lg border">
              <div className="absolute top-2 right-2 z-10">
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={removeFile}
                  className="h-7 w-7 rounded-full"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {preview && (
                <div className="relative aspect-video max-h-[300px] w-full overflow-hidden">
                  <img
                    src={preview}
                    alt="Preview"
                    className="h-full w-full object-contain"
                  />
                </div>
              )}

              <div className="p-3 bg-muted/50 border-t">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 truncate">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm truncate">{files[0]?.name}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {(files[0]?.size / 1024 / 1024).toFixed(2)} MB
                  </span>
                </div>
              </div>
            </div>

            <Button onClick={handleUpload} className="w-full">
              Analyze Mathematics
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
