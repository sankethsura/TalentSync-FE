'use client';

import { useRef, useState } from 'react';
import api from '@/lib/api';

interface ResumeUploadProps {
  currentResumeUrl:  string | null;
  currentFileName:   string | null;
  onUploadSuccess:   (url: string, name: string) => void;
}

export function ResumeUpload({ currentResumeUrl, currentFileName, onUploadSuccess }: ResumeUploadProps) {
  const inputRef   = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error,     setError]     = useState<string | null>(null);
  const [dragOver,  setDragOver]  = useState(false);

  const uploadFile = async (file: File) => {
    if (file.type !== 'application/pdf') {
      setError('Only PDF files are allowed.');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('File must be under 10 MB.');
      return;
    }

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append('resume', file);

    try {
      const res = await api.post<{ resumeUrl: string; resumeFileName: string }>(
        '/api/profile/resume',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } },
      );
      onUploadSuccess(res.data.resumeUrl, res.data.resumeFileName);
    } catch {
      setError('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) uploadFile(file);
  };

  return (
    <div className="space-y-3">
      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={[
          'flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-8 transition-all',
          dragOver
            ? 'border-brand-primary/60 bg-brand-primary/5'
            : 'border-border/20 bg-surface/30 hover:border-border/40 hover:bg-surface/50',
        ].join(' ')}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-primary/10">
          <svg className="h-6 w-6 text-brand-primary-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        {uploading ? (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-brand-primary border-t-transparent" />
            Uploading…
          </div>
        ) : (
          <div className="text-center">
            <p className="text-sm font-medium text-foreground">
              Drop your resume here, or <span className="text-brand-primary-light">browse</span>
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground/60">PDF only · max 10 MB</p>
          </div>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {/* Current file */}
      {currentResumeUrl && currentFileName && (
        <div className="flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-3">
          <svg className="h-4 w-4 shrink-0 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <a
            href={currentResumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-emerald-400 hover:underline truncate"
          >
            {currentFileName}
          </a>
        </div>
      )}

      {error && (
        <p className="text-xs text-red-400">{error}</p>
      )}
    </div>
  );
}
